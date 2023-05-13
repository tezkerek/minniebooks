from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    RegisterAPIView,
    LoginAPIView,
    FriendshipViewSet,
    FriendsViewSet,
)

router = DefaultRouter()
router.register("users", UserViewSet, basename="user")
router.register("friends", FriendsViewSet, basename="friend")
router.register("friend-requests", FriendshipViewSet, basename="friend-request")


urlpatterns = [
    path("api/", include(router.urls), name="users"),
    path("api/register/", RegisterAPIView.as_view(), name="register"),
    path("api/login/", LoginAPIView.as_view(), name="login"),
]
