from django.db import models
from django.db.models import CheckConstraint, UniqueConstraint, Q, Sum, Avg
from django.db.models.functions import Coalesce
from utils.models import TimestampedModel
from users.models import MinnieBooksUser


class Author(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    description = models.CharField(max_length=2048)
    picture = models.FileField(upload_to="files/authors")


class BookManager(models.Manager):
    def with_rating(self):
        return Book.objects.prefetch_related("reviews").annotate(
            rating=Avg("reviews__stars")
        )


class Book(models.Model):
    title = models.CharField(max_length=200)
    publisher = models.CharField(max_length=100)
    year = models.IntegerField(null=True, blank=True)
    book_cover = models.FileField(upload_to="files/bookcovers", null=True, blank=True)
    authors = models.ManyToManyField(Author, related_name="books")

    objects = BookManager()

    @classmethod
    def annotate_rating(cls, queryset):
        return queryset.prefetch_related("reviews").annotate(
            rating=Coalesce(Avg("reviews__stars"), 0.0)
        )

    @classmethod
    def filter_by_reader(cls, queryset, user):
        """
        Filter books for which the user has progress updates.
        """
        user_book_ids = (
            ProgressUpdate.objects.filter(reader=user).values("book_id").distinct()
        )

        return queryset.filter(id__in=user_book_ids)

    @classmethod
    def filter_finished(cls, queryset, user):
        """
        Filter books that the user has finished.
        """
        return queryset.filter(
            id__in=ProgressUpdate.objects.filter(
                reader=user, status=ProgressUpdate.FINISHED
            )
            .values("book_id")
            .distinct()
        )

    @classmethod
    def filter_reading(cls, queryset, user):
        """
        Filter books that the user has started but has not finished.
        """
        finished_book_ids = cls.filter_finished(Book.objects.all(), user)
        print(list(b.id for b in finished_book_ids))
        reading_book_ids = (
            ProgressUpdate.objects.filter(
                reader=user, status__in=(ProgressUpdate.STARTED, ProgressUpdate.READING)
            )
            .values("book_id")
            .distinct()
        )
        return queryset.filter(id__in=reading_book_ids).exclude(
            id__in=finished_book_ids
        )


class ReviewManager(models.Manager):
    def with_likes(self):
        return Review.objects.prefetch_related("votes").annotate(
            likes=Sum("votes__value", default=0)
        )


class Review(TimestampedModel):
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


class ProgressUpdate(TimestampedModel):
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


class BookRecommendation(TimestampedModel):
    message = models.CharField(max_length=512)
    book = models.ForeignKey(
        Book, on_delete=models.CASCADE, related_name="recommendations"
    )
    receiver = models.ForeignKey(
        MinnieBooksUser, on_delete=models.CASCADE, related_name="recommendations"
    )
    sender = models.ForeignKey(MinnieBooksUser, on_delete=models.CASCADE)
