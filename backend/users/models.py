from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, password):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_employee(self, email, password=None):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_employee = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_employee = True
        user.is_admin = True
        user.save(using=self._db)
        return user


class MinnieBooksUser(AbstractBaseUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(verbose_name="email address", max_length=255, unique=True)
    date_joined = models.DateTimeField(default=timezone.now)
    profile_picture = models.FileField(upload_to="files/pictures", null=True)
    is_admin = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = "email"  # Changes the default username login to email login
    REQUIRED_FIELDS = []  # Email and password are required by default

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True
        # If User.is_active and is_superuser are both True, this method always returns True.

    def has_module_perms(self, app_label):
        return True
        # If User.is_active and is_superuser are both True, this method always returns True.

    @property
    def is_staff(self):
        return self.is_admin
