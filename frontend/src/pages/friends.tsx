import Head from "next/head";
import { Card, CardContent, Stack } from "@mui/material";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FriendRequest } from "@/api/friend";
import { useUser } from "@/api/user";
import { useIncomingFriendRequests } from "@/api/friend";
import Navbar from "@/components/Navbar";
import ShortLink from "@/components/ShortLink";
import FriendshipActionButton from "@/components/FriendshipActionButton";

export default function FriendRequestsPage() {
  let { friendRequests, error, isLoading } = useIncomingFriendRequests();
  isLoading = isLoading || typeof friendRequests === "undefined";

  return (
    <>
      <Head>
        <title>Friend requests | MinnieBooks</title>
        <meta name="description" content="Friend reqests" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main
        css={css`
          width: 80%;
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        {isLoading ? (
          "Loading"
        ) : (
          <FriendRequestList friendRequests={friendRequests!} />
        )}
      </main>
    </>
  );
}

interface FriendRequestListProps {
  friendRequests: Array<FriendRequest>;
}

function FriendRequestList({ friendRequests }: FriendRequestListProps) {
  return (
    <>
      {friendRequests.length === 0 ? (
        <h3
          css={css`
            text-align: center;
            margin-top: 6px;
          `}
        >
          No incoming friend requests
        </h3>
      ) : (
        <Stack rowGap="10px" width="100%" maxWidth={600}>
          {friendRequests.map((friendRequest) => (
            <FriendRequestItem
              key={friendRequest.id}
              userId={String(friendRequest.sender)}
            />
          ))}
        </Stack>
      )}
    </>
  );
}

interface FriendRequestItemProps {
  userId: string;
}

function FriendRequestItem({ userId }: FriendRequestItemProps) {
  let { user, error, isLoading } = useUser(userId);
  isLoading = isLoading || typeof user === "undefined";

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <FeedCard>
          <FeedItemContent>
            <p
              css={css`
                margin-bottom: 15px;
              `}
            >
              <ShortLink href={`/users/${userId}`}>
                <b>{user?.fullName}</b>
              </ShortLink>{" "}
              sent you a friend request.
            </p>
            <FriendshipActionButton user={user!} />
          </FeedItemContent>
        </FeedCard>
      )}
    </>
  );
}

const FeedItemContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const FeedCard = styled(Card)`
  display: flex;
`;
