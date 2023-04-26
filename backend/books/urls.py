from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
import users.views as uv

router = DefaultRouter()
router.register("books", views.BookViewSet, basename="book")
router.register("reviews", views.ReviewViewSet, basename="review")
router.register("author", views.AuthorViewSet, basename="author")
router.register("quote", views.QuoteViewSet, basename="quote")
router.register(
    "progressUpdate", views.ProgressUpdateViewSet, basename="progressUpdate"
)
router.register("likeDislike", views.LikeDislikeViewSet, basename="likeDislike")
router.register(
    "bookRecommandation", views.BookRecommandationViewSet, basename="bookRecommandation"
)

urlpatterns = [
    path("api/", include(router.urls)),
    path(
        "api/books/search/",
        views.BookViewSet.as_view({"get": "search"}),
        name="book-search",
    ),
]
