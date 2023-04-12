from rest_framework import mixins, viewsets

from .models import MinnieBooksUser
from .serializers import UserSerializer


class UserViewSet(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):
    queryset = MinnieBooksUser.objects.all()
    serializer_class = UserSerializer

