from rest_framework import serializers
from .models import MinnieBooksUser
from books.serializers import ReviewSerializer


class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.FileField()
    reviews = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = MinnieBooksUser
        fields = ['id', 'first_name', 'last_name', 'email',
                  'date_joined', 'profile_picture', 'reviews',
                  'is_admin', 'is_employee', 'is_active']
        read_only_fields = ['id']
