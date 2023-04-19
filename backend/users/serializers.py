from rest_framework import serializers
from .models import MinnieBooksUser
from books.serializers import ReviewSerializer


class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.FileField()

    class Meta:
        model = MinnieBooksUser
        fields = ['id', 'first_name', 'last_name', 'email',
                  'date_joined', 'profile_picture', 'reviews',
                  'is_admin', 'is_employee', 'is_active', 'recommendations', 'quotes', 'progress_updates', 'likes']
        read_only_fields = ['id']
