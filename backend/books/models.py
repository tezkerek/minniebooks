from django.db import models
from django.db.models import CheckConstraint, UniqueConstraint, Q, Sum
from users.models import MinnieBooksUser


class Author(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    description = models.CharField(max_length=2048)
    picture = models.FileField(upload_to="files/authors")


class Book(models.Model):
    title = models.CharField(max_length=200)
    publisher = models.CharField(max_length=100)
    year = models.IntegerField(null=True, blank=True)
    book_cover = models.FileField(upload_to="files/bookcovers", null=True, blank=True)
    authors = models.ManyToManyField(Author, related_name="books")

class ReviewManager(models.Manager):
    def with_likes(self):
        return Review.objects.prefetch_related("votes").annotate(
            likes=Sum("votes__value", default=0)
        )


class Review(models.Model):
    message = models.CharField(max_length=2048)
    stars = models.IntegerField()
    reader = models.ForeignKey(
        MinnieBooksUser, on_delete=models.CASCADE, related_name="reviews"
    )
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="reviews")

    objects = ReviewManager()

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(stars__gte=0) & Q(stars__lte=5), name="verifyValidStars"
            ),
            UniqueConstraint(fields=("reader", "book"), name="unique_review"),
        ]


class LikeDislike(models.Model):
    value = models.IntegerField()
    reader = models.ForeignKey(
        MinnieBooksUser, on_delete=models.CASCADE, related_name="votes"
    )
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name="votes")

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(value__gte=-1) & Q(value__lte=1), name="verifyValidLikeValue"
            )
        ]


class ProgressUpdate(models.Model):
    STARTED = "STARTED"
    READING = "READING"
    FINISHED = "FINISHED"

    STATUS_CHOICES = [
        (STARTED, "Started reading"),
        (READING, "Currently reading"),
        (FINISHED, "Finished reading"),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    message = models.CharField(max_length=512)
    reader = models.ForeignKey(
        MinnieBooksUser, on_delete=models.CASCADE, related_name="progress_updates"
    )
    book = models.ForeignKey(
        Book, on_delete=models.CASCADE, related_name="progress_updates"
    )


class Quote(models.Model):
    message = models.CharField(max_length=2048)
    uploader = models.ForeignKey(
        MinnieBooksUser, on_delete=models.CASCADE, related_name="quotes"
    )
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="quotes")


class BookRecommendation(models.Model):
    message = models.CharField(max_length=512)
    book = models.ForeignKey(
        Book, on_delete=models.CASCADE, related_name="recommendations"
    )
    receiver = models.ForeignKey(
        MinnieBooksUser, on_delete=models.CASCADE, related_name="recommendations"
    )
    sender = models.ForeignKey(MinnieBooksUser, on_delete=models.CASCADE)
