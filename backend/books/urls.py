from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
import users.views as uv

router = DefaultRouter()
router.register('books', views.BookViewSet, basename='book')
router.register('reviews', views.ReviewViewSet, basename='review')
router.register('users', uv.UserViewSet, basename='user')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/books/search/', views.BookViewSet.as_view({'get': 'search'}), name='book-search')
]
