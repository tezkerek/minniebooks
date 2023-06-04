from django.db.models import Q, Exists, OuterRef, Prefetch
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView
from rest_framework import filters
from rest_framework.request import QueryDict
from rest_framework.exceptions import NotAuthenticated
from users.models import MinnieBooksUser
from .models import (
    Author,
    Book,
    BookRecommendation,
    LikeDislike,
    ProgressUpdate,
    Quote,
    Review,
)
from .permissions import IsAdminOrReadOnly
from .serializers import (
    AuthorSerializer,
    BookRecommendationSerializer,
    BookRecommendationFeedSerializer,
    BookSerializer,
    BookBriefSerializer,
    LikeDislikeSerializer,
    ProgressUpdateSerializer,
    ProgressUpdateFeedSerializer,
    QuoteSerializer,
    ReviewSerializer,
    ReviewFeedSerializer,
    PublisherSerializer,
)
from utils import weighted_sample


class BookViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    """
    Filtering:
    /api/books/?publisher=pub1&publisher=pub2&min_rating=3.5
    /api/books/?min_year=2000&max_year=2020&search=dune+messiah
    """

    serializer_class = BookSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ["title"]

    def get_queryset(self):
        # Annotate each review with its votes
        reviews_queryset = Review.objects.with_likes().prefetch_related("reader")

        queryset = Book.annotate_rating(
            Book.objects.prefetch_related(
                Prefetch("reviews", queryset=reviews_queryset)
            )
        )

        # Filter by status
        status = self.request.query_params.get("status")
        if status:
            user = self.request.query_params.get("user")
            if user == "0" or user is None:
                if self.request.user.is_authenticated:
                    queryset = self.filter_by_status(
                        self.request.user, queryset, status
                    )
                else:
                    raise NotAuthenticated("Must be authenticated to set user=0")
            else:
                queryset = self.filter_by_status(user, queryset, status)

        # Filter by publishers
        publishers = self.request.query_params.getlist("publisher")
        if publishers:
            queryset = queryset.filter(publisher__in=publishers)

        # Filter by minimum rating
        min_rating = self.request.query_params.get("min_rating")
        if min_rating:
            queryset = queryset.filter(rating__gte=float(min_rating))

        # Filter by year
        min_year = self.request.query_params.get("min_year")
        if min_year:
            queryset = queryset.filter(year__gte=min_year)

        max_year = self.request.query_params.get("max_year")
        if max_year:
            queryset = queryset.filter(year__lte=max_year)

        if self.request.user.is_authenticated:
            # For each book, indicate if it's rated by the current user
            queryset = queryset.annotate(
                is_rated=Exists(self.request.user.reviews.filter(book=OuterRef("id")))
            )

        return queryset

    @classmethod
    def filter_by_status(cls, user, queryset, status):
        if status == "finished":
            return Book.filter_finished(queryset, user)
        elif status == "reading":
            return Book.filter_reading(queryset, user)

    def search(self, request):
        query = request.GET.get("query", "")
        queryset = self.get_queryset().filter(title__icontains=query)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ReviewViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Review.objects.with_likes()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(reader=self.request.user)


class AuthorViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Author.objects.prefetch_related(
        Prefetch("books", queryset=Book.objects.with_rating())
    )
    serializer_class = AuthorSerializer
    permission_classes = [IsAdminOrReadOnly]


class QuoteViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProgressUpdateViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = ProgressUpdateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        reader_id = self.request.query_params.get("reader")
        if reader_id is None or reader_id == "0":
            reader_id = self.request.user.id
        return ProgressUpdate.objects.filter(reader=reader_id)

    def perform_create(self, serializer):
        serializer.save(reader=self.request.user)


class LikeDislikeViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = LikeDislike.objects.all()
    serializer_class = LikeDislikeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class BookRecommendationViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = BookRecommendationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return BookRecommendation.objects.filter(receiver=self.request.user)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


class PublishersAPIView(APIView):
    def get(self, request):
        publishers = Book.objects.values("publisher").distinct()
        serializer = PublisherSerializer(publishers, many=True)
        return Response(serializer.data, status=HTTP_200_OK)


class BookSuggestionsAPIView(APIView):
    def get(self, request):
        if self.request.user.is_anonymous:
            books = Book.objects.with_rating().all()
        else:
            friends = MinnieBooksUser.objects.get_friends(request.user)

            books = Book.objects.with_rating().none()

            for friend in friends:
                books = books.union(
                    Book.filter_finished(Book.objects.with_rating(), friend)
                )

            user_book_ids = request.user.progress_updates.values("book_id")
            user_books = Book.objects.with_rating().filter(id__in=user_book_ids)

            books = books.difference(user_books)

        weights = [min(0.1, book.rating) for book in books]
        if sum(weights) == 0:
            weights = None

        chosen_books = weighted_sample(
            list(books), weights=weights, k=min(len(books), 3)
        )

        book_serializer = BookBriefSerializer(
            chosen_books, many=True, context={"request": request}
        )

        return Response(book_serializer.data, status=HTTP_200_OK)


class FeedAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = self.request.user

        friends = MinnieBooksUser.objects.get_friends(user)

        # Prefetch books with their rating
        books_queryset = Book.objects.with_rating()

        # Load the feed entries
        recommendations = BookRecommendation.objects.filter(
            sender__in=friends, receiver=user
        ).prefetch_related("sender", Prefetch("book", books_queryset))

        progress_updates = ProgressUpdate.objects.filter(
            reader__in=friends
        ).prefetch_related("reader", Prefetch("book", books_queryset))

        reviews = (
            Review.objects.with_likes()
            .filter(reader__in=friends)
            .prefetch_related("reader", Prefetch("book", books_queryset))
        )

        # Concatenate the serializer results
        kwargs = {"many": True, "context": {"request": request}}
        feed = (
            BookRecommendationFeedSerializer(recommendations, **kwargs).data
            + ProgressUpdateFeedSerializer(progress_updates, **kwargs).data
            + ReviewFeedSerializer(reviews, **kwargs).data
        )
        feed.sort(key=lambda entity: entity["created_at"])

        return Response(feed, status=HTTP_200_OK)
