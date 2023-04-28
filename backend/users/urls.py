from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, RegisterAPIView, LoginAPIView

router = DefaultRouter()
router.register("users", UserViewSet, basename="user")


urlpatterns = [
    path("api/", include(router.urls), name="users"),
    path("api/register/", RegisterAPIView.as_view(), name="register"),
    path("api/login/", LoginAPIView.as_view(), name="login"),
]
