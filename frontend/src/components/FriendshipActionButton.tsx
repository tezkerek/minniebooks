import User, { FriendshipStatus } from "@/entities/user";
import {
  acceptFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "@/api/friend";
import { mutateUser } from "@/api/user";
import Button from "./Button";

export default function FriendshipActionButton({ user }: { user: User }) {
  switch (user.friendshipStatus) {
    case FriendshipStatus.Pending:
      return <Button disabled>Pending friend request</Button>;

    case FriendshipStatus.Incoming:
      return (
        <Button
          onClick={() =>
            user.friendshipId != null &&
            acceptFriendRequest(user.friendshipId).then(
              () => mutateUser(user.id),
              (err) => alert(JSON.stringify(err))
            )
          }
        >
          Accept friend request
        </Button>
      );

    case FriendshipStatus.Accepted:
      return (
        <Button
          onClick={() =>
            removeFriend(user.id).then(
              () => mutateUser(user.id),
              (err) => alert(JSON.stringify(err))
            )
          }
        >
          Remove friend
        </Button>
      );

    case FriendshipStatus.None:
      return (
        <Button
          onClick={() =>
            sendFriendRequest(user.id).then(
              () => mutateUser(user.id),
              (err) => alert(JSON.stringify(err))
            )
          }
        >
          Add friend
        </Button>
      );
  }

  return <></>;
}
