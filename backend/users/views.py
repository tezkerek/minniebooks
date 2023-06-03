from django.db import IntegrityError
from django.db.models import Q

from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError, NotAuthenticated

from .models import MinnieBooksUser, Friendship
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    LoginSerializer,
    FriendshipSerializer,
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

    def get_queryset(self):
        queryset = super().get_queryset()

        if self.request.user.is_authenticated:
            # Annotate friendship_status to each user in the queryset
            queryset = Friendship.annotate_status(self.request.user, queryset)

        return queryset

    def get_object(self):
        if self.kwargs.get("pk") == "0":
            user = self.request.user
            if user.is_anonymous:
                raise NotAuthenticated("Must be signed in to access this route")
            self.check_object_permissions(self.request, user)
            return user
        else:
            return super().get_object()


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
        return MinnieBooksUser.objects.get_friends(user)

    def perform_destroy(self, instance):
        user = self.request.user
        friendship = Friendship.objects.filter(
            Q(receiver=user, sender=instance) | Q(receiver=instance, sender=user)
        )
        if friendship.exists():
            friendship.delete()
        else:
            raise ValidationError("Friendship not found!")


class FriendshipViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = FriendshipSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        request_type = self.request.query_params.get("type", None)
        queryset = Friendship.objects.filter(
            Q(sender=user) | Q(receiver=user), status=Friendship.PENDING
        )
        if request_type == "sent":
            queryset = queryset.filter(sender=user)
        elif request_type == "received":
            queryset = queryset.filter(receiver=user)
        return queryset

    def perform_create(self, serializer):
        try:
            serializer.save(sender=self.request.user, status=Friendship.PENDING)
        except IntegrityError:
            raise ValidationError("Friendship already exists.")

    def update(self, request, pk=None):
        instance = self.get_object()
        user = request.user
        if user.id == instance.receiver_id:
            instance.status = Friendship.ACCEPTED
        else:
            raise ValidationError("Cannot accept this request.")
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
