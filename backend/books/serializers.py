from rest_framework import serializers
from .models import Book, Review, Author, Quote, ProgressUpdate, BookRecommandation, LikeDislike


class ReviewSerializer(serializers.ModelSerializer):
    stars = serializers.IntegerField()

    class Meta:
        model = Review
        fields = ['id', 'message', 'stars', 'book', 'reader', 'likes']
        read_only_fields = ['id']

class AuthorSerializer(serializers.ModelSerializer):
    picture = serializers.FileField()

    class Meta:
        model = Author
        fields = ['id', 'first_name', 'last_name', 'description', 'picture', 'books']
        read_only_fields = ['id']


class BookSerializer(serializers.ModelSerializer):
    year = serializers.IntegerField()
    book_cover = serializers.FileField()
    authors = AuthorSerializer(many = True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'publisher', 'year', 'book_cover', 'reviews', 'authors', 'recommendations', 'quotes', 'progress_updates']
        read_only_fields = ['id']
        

class QuoteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Quote
        fields = ['id', 'message', 'uploader', 'book']
        read_only_fields = ['id']

class ProgressUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProgressUpdate
        fields = ['id', 'status', 'message', 'reader', 'book']
        read_only_fields = ['id']

class LikeDislikeSerializer(serializers.ModelSerializer):
    value = serializers.IntegerField()

    class Meta:
        model = LikeDislike
        fields = ['id', 'value', 'reader','review'] 
        read_only_fields = ['id']

class BookRecommandationSerializer(serializers.ModelSerializer):

    class Meta:
        model = BookRecommandation
        fields = ['id', 'message', 'book', 'receiver', 'sender']   



