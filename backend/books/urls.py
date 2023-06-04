from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
import users.views as uv

router = DefaultRouter()
router.register("books", views.BookViewSet, basename="book")
router.register("reviews", views.ReviewViewSet, basename="review")
router.register("authors", views.AuthorViewSet, basename="author")
router.register("quotes", views.QuoteViewSet, basename="quote")
router.register("likes", views.LikeDislikeViewSet, basename="like")
router.register(
    "progress-updates", views.ProgressUpdateViewSet, basename="progress-update"
)
router.register(
    "book-recommendations",
    views.BookRecommendationViewSet,
    basename="book-recommendation",
)

urlpatterns = [
    path("api/", include(router.urls)),
    path(
        "api/books/search/",
        views.BookViewSet.as_view({"get": "search"}),
        name="book-search",
    ),
    path("api/publishers/", views.PublishersAPIView.as_view(), name="publisher"),
    path("api/feed/", views.FeedAPIView.as_view(), name="feed"),
    path("api/book-suggestions/", views.BookSuggestionsAPIView.as_view(), name="book-suggestions")
]
