from rest_framework.serializers import (
    ModelSerializer,
    IntegerField,
    FloatField,
    CharField,
    BooleanField,
    ReadOnlyField,
)
from rest_framework.exceptions import ValidationError
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
    likes = IntegerField(read_only=True)

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
        read_only_fields = ["id"]

    def validate_book(self, book):
        if self.context["request"].user.reviews.filter(book=book).exists():
            raise ValidationError("You've already reviewed this book.")

        return book


class AuthorBriefSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = ["id", "first_name", "last_name", "description", "picture"]
        read_only_fields = ["id"]


class BookBriefSerializer(ModelSerializer):
    authors = AuthorBriefSerializer(many=True)
    rating = FloatField(required=False)

    class Meta:
        model = Book
        fields = ["id", "title", "publisher", "year", "book_cover", "authors", "rating"]
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
    is_rated = BooleanField(required=False)

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
            "is_rated",
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
        read_only_fields = ["id", "reader"]


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


class PublisherSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = ["publisher"]


class BookRecommendationFeedSerializer(ModelSerializer):
    entry_type = ReadOnlyField(default="book-recommendation")
    sender_id = IntegerField(source="sender.pk", read_only=True)
    sender_name = CharField(source="sender.full_name", read_only=True)
    book = BookBriefSerializer()

    class Meta:
        model = BookRecommendation
        fields = [
            "entry_type",
            "id",
            "message",
            "book",
            "sender_id",
            "sender_name",
            "created_at",
        ]


class ProgressUpdateFeedSerializer(ModelSerializer):
    entry_type = ReadOnlyField(default="progress-update")
    reader_id = IntegerField(source="reader.pk", read_only=True)
    reader_name = CharField(source="reader.full_name", read_only=True)
    book = BookBriefSerializer()

    class Meta:
        model = ProgressUpdate
        fields = [
            "entry_type",
            "id",
            "status",
            "message",
            "book",
            "reader_id",
            "reader_name",
            "created_at",
        ]


class ReviewFeedSerializer(ModelSerializer):
    entry_type = ReadOnlyField(default="review")
    likes = IntegerField()
    author_id = IntegerField(source="reader.pk", read_only=True)
    author_username = CharField(source="reader.full_name", read_only=True)
    book = BookBriefSerializer()

    class Meta:
        model = Review
        fields = [
            "entry_type",
            "id",
            "message",
            "stars",
            "book",
            "likes",
            "author_id",
            "author_username",
            "created_at",
        ]
