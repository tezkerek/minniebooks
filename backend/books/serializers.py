from rest_framework.serializers import (
    ModelSerializer,
    IntegerField,
    FloatField,
    CharField,
)
from .models import (
    Book,
    Review,
    Author,
    Quote,
    ProgressUpdate,
    BookRecommendation,
    LikeDislike,
)


class ReviewSerializer(ModelSerializer):
    author_id = IntegerField(source="reader.pk", read_only=True)
    author_username = CharField(source="reader.full_name", read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "message",
            "stars",
            "book",
            "likes",
            "author_id",
            "author_username",
        ]
        read_only_fields = ["id", "book", "likes"]


class AuthorBriefSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = ["id", "first_name", "last_name", "description", "picture"]
        read_only_fields = ["id"]


class BookBriefSerializer(ModelSerializer):
    authors = AuthorBriefSerializer(many=True)

    class Meta:
        model = Book
        fields = ["id", "title", "publisher", "year", "book_cover", "authors"]
        read_only_fields = ["id"]


class AuthorSerializer(ModelSerializer):
    books = BookBriefSerializer(many=True)

    class Meta:
        model = Author
        fields = ["id", "first_name", "last_name", "description", "picture", "books"]

        read_only_fields = ["id"]


class BookSerializer(ModelSerializer):
    rating = FloatField()
    authors = AuthorBriefSerializer(many=True)
    reviews = ReviewSerializer(many=True)

    class Meta:
        model = Book
        fields = [
            "id",
            "title",
            "publisher",
            "year",
            "book_cover",
            "rating",
            "reviews",
            "authors",
            "recommendations",
            "quotes",
            "progress_updates",
        ]
        read_only_fields = ["id"]


class QuoteSerializer(ModelSerializer):
    class Meta:
        model = Quote
        fields = ["id", "message", "uploader", "book"]
        read_only_fields = ["id"]


class ProgressUpdateSerializer(ModelSerializer):
    class Meta:
        model = ProgressUpdate
        fields = ["id", "status", "message", "reader", "book"]
        read_only_fields = ["id"]


class LikeDislikeSerializer(ModelSerializer):
    class Meta:
        model = LikeDislike
        fields = ["id", "value", "reader", "review"]
        read_only_fields = ["id"]


class BookRecommendationSerializer(ModelSerializer):
    class Meta:
        model = BookRecommendation
        fields = ["id", "message", "book", "receiver", "sender"]
        read_only_fields = ["sender"]
