from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny

from .models import MinnieBooksUser
from .serializers import UserSerializer, RegisterSerializer
from books.permissions import IsAdminOrReadOnly


class RegisterViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = MinnieBooksUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class UserViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = MinnieBooksUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrReadOnly]
