from django.db import models
from django.db.models import CheckConstraint, Q, F
import os
import sys



# script_dir = os.path.dirname(__file__)
# userModulePath = os.path.join(script_dir, '..', 'users')
# sys.path.append(userModulePath)
import users.models as usr


class Book(models.Model):
    title = models.CharField(max_length=200)
    publisher = models.CharField(max_length=100)
    year = models.BigIntegerField
    bookCover = models.FileField(upload_to='files/bookcovers')

class Review(models.Model):
    message = models.CharField(max_length=2048)
    stars = models.IntegerField()
    reader = models.ForeignKey(
        usr.MinnieBooksUser,
        on_delete=models.CASCADE
    )
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE
    )
    

    class Meta:
        constraints = [
            CheckConstraint(
                check = Q(stars__gte=0) & Q(stars__lte=5),
                name='verifyValidStars'
            )
        ]

class LikeDislike(models.Model):
    value = models.IntegerField(default= -1)
    reader = models.ForeignKey(
        usr.MinnieBooksUser,
        on_delete=models.CASCADE
    )
    review = models.ForeignKey(
        Review,
        on_delete=models.CASCADE
    )
    
    class Meta:
        constraints = [
            CheckConstraint(
                check = Q(value__gte=-1) & Q(value__lte=1),
                name='verifyValidLikeValue'
            )
        ]

class ProgressUpdate(models.Model):
    status = models.CharField(max_length=20)
    message = models.CharField(max_length=512)
    reader = models.ForeignKey(
        usr.MinnieBooksUser,
        on_delete=models.CASCADE
    )
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE
    )

class Quote(models.Model):
    message = models.CharField(max_length=2048)
    uploader = models.ForeignKey(
        usr.MinnieBooksUser,
        on_delete=models.CASCADE
    )
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE
    )

class BookRecommandation(models.Model): 
    message = models.CharField(max_length=512)
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        usr.MinnieBooksUser,
        on_delete=models.CASCADE,
        related_name='receiver'
    )
    sender = models.ForeignKey(
        usr.MinnieBooksUser,
        on_delete=models.CASCADE
    )
    

class Author(models.Model):
    FirstName = models.CharField(max_length=50)
    LastName = models.CharField(max_length=50)
    Description = models.CharField(max_length=2048)
    Picture = models.FileField(upload_to='files/authors')
    Books = models.ManyToManyField(Book)




    