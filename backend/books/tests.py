from django.test import TestCase
from users.models import MinnieBooksUser
from .models import Book, Review


class BookRatingTestCase(TestCase):
    def setUp(self):
        book1 = Book.objects.create(title="Book 1", publisher="Pub 1", year=2020)

        user1 = MinnieBooksUser.objects.create(email="user1@example.com")
        Review.objects.create(book=book1, message="Review 1", stars=1, reader=user1)

        user2 = MinnieBooksUser.objects.create(email="user2@example.com")
        Review.objects.create(book=book1, message="Review 2", stars=2, reader=user2)

    def test_book_with_rating_is_correct(self):
        book1 = Book.objects.with_rating().get(title="Book 1")
        self.assertAlmostEqual(book1.rating, 1.5)

    def test_book_annotate_rating_is_correct(self):
        book1 = Book.annotate_rating(Book.objects.filter(title="Book 1")).first()
        self.assertAlmostEqual(book1.rating, 1.5)
