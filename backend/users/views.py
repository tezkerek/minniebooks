from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from .models import MinnieBooksUser
from .serializers import UserSerializer, RegisterSerializer
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
