from django.shortcuts import get_object_or_404
from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import filters
from rest_framework.decorators import action
from django.db.models import Q
from django.db.models import Avg

from .serializers import BookSerializer, ReviewSerializer, AuthorSerializer, QuoteSerializer, ProgressUpdateSerializer, LikeDislikeSerializer, BookRecommandationSerializer
from .models import Book, Review, Author, Quote, ProgressUpdate, LikeDislike, BookRecommandation


class BookViewSet(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['title']       # Books that contain given string - example: books/?search=meow

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
        max_year = self.request.query_params.get('max_year')
        if min_year and max_year:
            queryset = queryset.filter(year__range=(min_year, max_year))

        # Examples:
        # api/books/?publisher="misu2"&publisher="misu"&min_rating=3.5
        # api/books/?min_year=2000&max_year=2020&publisher="misu"&min_rating=4.5

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def search(self, request):
        query = request.GET.get('query', '')
        queryset = self.get_queryset().filter(title__icontains=query)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ReviewViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class AuthorViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class QuoteViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer

class ProgressUpdateViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):
    queryset = ProgressUpdate.objects.all()
    serializer_class = ProgressUpdateSerializer

class LikeDislikeViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):
    queryset = LikeDislike.objects.all()
    serializer_class = LikeDislikeSerializer

class BookRecommandationViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):
    queryset = BookRecommandation.objects.all()
    serializer_class = BookRecommandationSerializer




