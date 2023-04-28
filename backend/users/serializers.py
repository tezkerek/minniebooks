from rest_framework import serializers
from .models import MinnieBooksUser
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.FileField(required=False)

    class Meta:
        model = MinnieBooksUser
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "date_joined",
            "profile_picture",
            "reviews",
            "is_admin",
            "is_employee",
            "is_active",
            "recommendations",
            "quotes",
            "progress_updates",
            "likes",
        ]
        read_only_fields = ["id"]


class RegisterSerializer(serializers.ModelSerializer):
    profile_picture = serializers.FileField(required=False)
    password = serializers.CharField(
        min_length=8,
        write_only=True,
        required=True,
        style={"input_type": "password"},
    )

    class Meta:
        model = MinnieBooksUser
        fields = ["first_name", "last_name", "email", "profile_picture", "password"]

    def create(self, validated_data):
        user = MinnieBooksUser.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={"input_type": "password"})

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(email=email, password=password)
            if user:
                attrs["user"] = user
                return attrs
            else:
                raise serializers.ValidationError(
                    "Unable to log in with provided credentials."
                )
        else:
            raise serializers.ValidationError('Must include "email" and "password".')
