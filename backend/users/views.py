from django.db import IntegrityError
from django.db.models import Q

from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_403_FORBIDDEN,
)
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError

from .models import MinnieBooksUser, FriendRequest
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    LoginSerializer,
    FriendRequestSerializer,
    FriendSerializer,
)
from books.permissions import IsAdminOrReadOnly


class RegisterAPIView(APIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        serialized_user = self.serializer_class(user)
        return Response(data=serialized_user.data, status=HTTP_201_CREATED)


class LoginAPIView(APIView):
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class UserViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = MinnieBooksUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrReadOnly]


class FriendsViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = FriendSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        friends = user.friends.all()
        return friends

    def perform_destroy(self, instance):
        user = self.request.user
        instance.friends.remove(user)
        user.friends.remove(instance)


class FriendRequestViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        request_type = self.request.query_params.get("type", None)
        queryset = FriendRequest.objects.filter(Q(sender=user) | Q(receiver=user))
        if request_type == "sent":
            queryset = queryset.filter(sender=user)
        elif request_type == "received":
            queryset = queryset.filter(receiver=user)
        return queryset

    def perform_create(self, serializer):
        user = self.request.user
        receiver = serializer.validated_data["receiver"]
        reverse_request = FriendRequest.objects.filter(receiver=user, sender=receiver)
        if reverse_request.exists():
            reverse_request.delete()
            receiver.friends.add(user)
            user.friends.add(receiver)
        else:
            try:
                serializer.save(sender=self.request.user)
            except IntegrityError:
                raise ValidationError("Friend request already exists.")
