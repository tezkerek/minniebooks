from django.db.models import Avg, Q, Exists, OuterRef, Sum, Prefetch
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView
from rest_framework import filters
from django.db.models import Avg
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
    BookSerializer,
    BookBriefSerializer,
    LikeDislikeSerializer,
    ProgressUpdateSerializer,
    QuoteSerializer,
    ReviewSerializer,
    PublisherSerializer,
)


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

        queryset = Book.objects.prefetch_related(
            Prefetch("reviews", queryset=reviews_queryset)
        ).annotate(rating=Avg("reviews__stars"))

        # Filter by status
        status = self.request.query_params.get("status")
        if status:
            user = self.request.query_params.get("user")
            if user == "0" or user is None:
                user = self.request.user
            queryset = self.filter_by_status(user, queryset, status)

        # Filter by publishers
        publishers = self.request.query_params.getlist("publisher")
        if publishers:
            queryset = queryset.filter(publisher__in=publishers)

        # Filter by minimum rating
        min_rating = self.request.query_params.get("min_rating")
        if min_rating:
            queryset = queryset.annotate(ratio=Avg("reviews__stars")).filter(
                ratio__gte=float(min_rating)
            )

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

    def filter_by_status(self, user, queryset, status):
        reader_book_ids = ProgressUpdate.objects.filter(reader=user).values("book")
        finished_book_ids = reader_book_ids.filter(
            status=ProgressUpdate.FINISHED
        ).distinct()
        reading_book_ids = reader_book_ids.filter(
            Q(status=ProgressUpdate.READING) | Q(status=ProgressUpdate.STARTED)
        ).distinct()

        if status == "finished":
            queryset = queryset.filter(id__in=finished_book_ids)
        elif status == "reading":
            queryset = queryset.filter(id__in=reading_book_ids).exclude(
                id__in=finished_book_ids
            )

        return queryset

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
    queryset = Author.objects.all()
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


class PublishersApiView(APIView):
    def get(self, request):
        publishers = Book.objects.values("publisher").distinct()
        serializer = PublisherSerializer(publishers, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
