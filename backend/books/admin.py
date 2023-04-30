from django.contrib import admin
from .models import Book, Author, BookRecommandation, Review, LikeDislike, ProgressUpdate, Quote

# Register your models here.
admin.site.register(Book)
admin.site.register(Author)
admin.site.register(Review)
admin.site.register(BookRecommandation)
admin.site.register(LikeDislike)
admin.site.register(ProgressUpdate)
admin.site.register(Quote)