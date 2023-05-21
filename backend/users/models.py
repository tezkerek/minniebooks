from django.db import models
from django.db.models import Q, Value as V, Exists, Case, When, OuterRef
from django.db.models.functions import Concat, Greatest, Least, Cast, Coalesce
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, password, **kwargs):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(email=self.normalize_email(email), **kwargs)

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

    def get_friendships(self, user):
        return Friendship.objects.filter(Q(receiver=user) | Q(sender=user))

    def get_friends(self, user):
        return self.model.objects.filter(
            Q(received_friendships__status=Friendship.ACCEPTED)
            | Q(sent_friendships__status=Friendship.ACCEPTED),
            Q(received_friendships__sender=user) | Q(sent_friendships__receiver=user),
        )


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

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class Friendship(models.Model):
    sender = models.ForeignKey(
        MinnieBooksUser, on_delete=models.CASCADE, related_name="sent_friendships"
    )
    receiver = models.ForeignKey(
        MinnieBooksUser,
        on_delete=models.CASCADE,
        related_name="received_friendships",
    )

    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    STATUS_CHOICES = [(PENDING, "Pending"), (ACCEPTED, "Accepted")]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                Concat(
                    Cast(Least("receiver", "sender"), models.CharField()),
                    V("_"),
                    Cast(Greatest("receiver", "sender"), models.CharField()),
                ),
                name="unique_friendship",
            )
        ]

    @classmethod
    def annotate_status(cls, user, queryset):
        """
        Annotate a queryset of users with the friendship status
        in relation to the given user.
        """

        def exists_friendship(is_outgoing: bool, status: str):
            sender, receiver = (
                (user, OuterRef("pk"))
                if is_outgoing
                else (
                    OuterRef("pk"),
                    user,
                )
            )
            return Exists(
                cls.objects.filter(sender=sender, receiver=receiver, status=status)
            )

        return queryset.annotate(
            friendship_id=cls.objects.filter(
                Q(sender=user, receiver=OuterRef("pk"))
                | Q(sender=OuterRef("pk"), receiver=user)
            ).values("pk"),
            friendship_status=Coalesce(
                Case(
                    When(
                        exists_friendship(False, cls.PENDING),
                        then=V("INCOMING"),
                    ),
                    When(
                        exists_friendship(False, cls.ACCEPTED),
                        then=V("ACCEPTED"),
                    ),
                    When(
                        exists_friendship(True, cls.PENDING),
                        then=V("PENDING"),
                    ),
                    When(
                        exists_friendship(True, cls.ACCEPTED),
                        then=V("ACCEPTED"),
                    ),
                ),
                V("NONE"),
            ),
        )
