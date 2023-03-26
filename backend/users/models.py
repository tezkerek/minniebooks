from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from django.utils import timezone

class MinnieBooksUser(AbstractBaseUser):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    dateJoined = models.DateTimeField(default=timezone.now)
    profilePicture = models.FileField(upload_to='files/pictures', null=True)
    isStaff = models.BooleanField(default=False)
    isAdmin = models.BooleanField(default=False)

    @property
    def isStaff(self):
        return self.isStaff
    
    @property
    def isAdmin(self):
        return self.isAdmin


    USERNAME_FIELD = 'email'  #Changes the default username login to email login
    REQUIRED_FIELDS = [] #Email and password are required by default


class UserManager(BaseUserManager):
    def create_user(self, email, password):
        if not email:
            raise ValueError('Users must have an email address')
        
        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_staffuser(self, email, password):
        user = self.create_user(
            email,
            password=password,
        )
        user.isStaff = True
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password):
        user = self.create_user(
            email,
            password = password,
        )
        user.isStaff = True
        user.isAdmin = True
        user.save(using=self._db)
        return user
    
class User(AbstractBaseUser):
    ...
    objects = UserManager()
