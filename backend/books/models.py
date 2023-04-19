from django.db import models
from django.db.models import CheckConstraint, Q
from users.models import MinnieBooksUser


class Book(models.Model):
    title = models.CharField(max_length=200)
    publisher = models.CharField(max_length=100)
    year = models.IntegerField(null=True, blank=True)
    book_cover = models.FileField(upload_to="files/bookcovers", null=True, blank=True)


class Review(models.Model):
    message = models.CharField(max_length=2048)
    stars = models.IntegerField()
    reader = models.ForeignKey(
        MinnieBooksUser, on_delete=models.CASCADE, related_name="reviews"
    )
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="reviews")

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(stars__gte=0) & Q(stars__lte=5), name="verifyValidStars"
            )
        ]


class LikeDislike(models.Model):
    value = models.IntegerField()
    reader = models.ForeignKey(
        MinnieBooksUser, on_delete=models.CASCADE, related_name="likes"
    )
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name="likes")

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(value__gte=-1) & Q(value__lte=1), name="verifyValidLikeValue"
            )
        ]


class ProgressUpdate(models.Model):
    status = models.CharField(max_length=20)
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


class BookRecommandation(models.Model):
    message = models.CharField(max_length=512)
    book = models.ForeignKey(
        Book, on_delete=models.CASCADE, related_name="recommendations"
    )
    receiver = models.ForeignKey(
        MinnieBooksUser, on_delete=models.CASCADE, related_name="recommendations"
    )
    sender = models.ForeignKey(MinnieBooksUser, on_delete=models.CASCADE)


class Author(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    description = models.CharField(max_length=2048)
    picture = models.FileField(upload_to="files/authors")
    books = models.ManyToManyField(Book, related_name="authors")
