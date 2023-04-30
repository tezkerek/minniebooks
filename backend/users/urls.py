from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, RegisterViewSet

router = DefaultRouter()
router.register("users", UserViewSet, basename="user")
router.register("register", RegisterViewSet, basename="register")

urlpatterns = [
    path("api/", include(router.urls), name="users"),
]