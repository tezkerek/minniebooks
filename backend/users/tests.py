from django.test import TestCase
from .models import MinnieBooksUser, Friendship


class FriendsTestCase(TestCase):
    def setUp(self):
        user1 = MinnieBooksUser.objects.create(email="user1@example.com")
        user2 = MinnieBooksUser.objects.create(email="user2@example.com")
        user3 = MinnieBooksUser.objects.create(email="user3@example.com")

        friendship12 = Friendship.objects.create(
            sender=user1, receiver=user2, status=Friendship.PENDING
        )

        friendship31 = Friendship.objects.create(
            sender=user3, receiver=user1, status=Friendship.ACCEPTED
        )

    def test_annotated_friendship_is_correct(self):
        user1 = MinnieBooksUser.objects.get(email="user1@example.com")
        users_qs = MinnieBooksUser.objects.filter(
            email__in=("user2@example.com", "user3@example.com")
        )
        annotated_qs = Friendship.annotate_status(user1, users_qs)

        user2 = annotated_qs.get(email="user2@example.com")
        user3 = annotated_qs.get(email="user3@example.com")

        friendship12 = Friendship.objects.get(sender=user1, receiver=user2)
        friendship31 = Friendship.objects.get(sender=user3, receiver=user1)

        self.assertEqual(user2.friendship_id, friendship12.id)
        self.assertEqual(user2.friendship_status, Friendship.PENDING)
        self.assertEqual(user3.friendship_id, friendship31.id)
        self.assertEqual(user3.friendship_status, Friendship.ACCEPTED)
