from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import filters
from django.db.models import Avg
from .models import (
    Author,
    Book,
    BookRecommandation,
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
    LikeDislikeSerializer,
    ProgressUpdateSerializer,
    QuoteSerializer,
    ReviewSerializer,
)


class BookViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['title']  # Books that contain given string - example: books/?search=meow

    def get_queryset(self):
        queryset = super().get_queryset()

        # Filter by publishers
        publishers = self.request.query_params.getlist('publisher')
        if publishers:
            queryset = queryset.filter(publisher__in=publishers)

        # Filter by minimum rating
        min_rating = self.request.query_params.get('min_rating')
        if min_rating:
            queryset = queryset.annotate(ratio=Avg('reviews__stars')).filter(ratio__gte=float(min_rating))

        # Filter by year
        min_year = self.request.query_params.get('min_year')
        if min_year:
            queryset = queryset.filter(year__gte=min_year)

        max_year = self.request.query_params.get('max_year')
        if max_year:
            queryset = queryset.filter(year__lte=max_year)

        # Examples:
        # api/books/?publisher="misu2"&publisher="misu"&min_rating=3.5
        # api/books/?min_year=2000&max_year=2020&publisher="misu"&min_rating=4.5

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

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
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


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
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = ProgressUpdate.objects.all()
    serializer_class = ProgressUpdateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


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
    queryset = BookRecommandation.objects.all()
    serializer_class = BookRecommendationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
