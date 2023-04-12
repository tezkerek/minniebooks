from rest_framework import serializers
from .models import Book, Review


class ReviewSerializer(serializers.ModelSerializer):
    stars = serializers.IntegerField()

    class Meta:
        model = Review
        fields = ['id', 'message', 'stars', 'book']
        read_only_fields = ['id', 'book']

    def create(self, validated_data):
        book = self.context['book']
        review = Review.objects.create(
            message=validated_data['message'],
            stars=validated_data['stars'],
            reader=self.context['request'].user,
            book=book
        )
        return review


class BookSerializer(serializers.ModelSerializer):
    year = serializers.IntegerField()
    book_cover = serializers.FileField()
    reviews = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'publisher', 'year', 'book_cover', 'reviews']
        read_only_fields = ['id']

    # def create(self, validated_data):
    #     book = Book.objects.create(
    #         title=validated_data['title'],
    #         publisher=validated_data['publisher'],
    #         year=validated_data['year'],
    #         book_cover=validated_data['book_cover']
    #     )
    #     return book

