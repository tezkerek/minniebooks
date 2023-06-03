import { Card, CardContent, Stack } from "@mui/material";
import { FriendRequest } from "@/api/friend";
import Link from "next/link";
import styled from "@emotion/styled";
import Head from "next/head";
import { css } from "@emotion/react";
import Navbar from "@/components/Navbar";
import { useUser } from "@/api/user";
import { useIncomingFriendRequests } from "@/api/friend";
import FriendshipActionButton from "@/components/FriendshipActionButton";

export default function FriendRequestsPage() {
  let { incomingfriends, error, isLoading } = useIncomingFriendRequests();
  isLoading = isLoading || typeof incomingfriends === "undefined";

  return (
    <>
      <Head>
        <title>{`Friend Reqests | MinnieBooks`}</title>
        <meta name="description" content="Friend Reqests" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main
        css={css`
          width: 80%;
          margin: auto;
        `}
      >
        {isLoading ? (
          "Loading"
        ) : (
          <FriendReqestGrid friendRequests={incomingfriends!} />
        )}
      </main>
    </>
  );
}

interface FriendReqestGridProps {
  friendRequests: Array<FriendRequest>;
}

function FriendReqestGrid({ friendRequests }: FriendReqestGridProps) {
  return (
    <>
      {friendRequests.length === 0 ? (
        <h3
          css={css`
            text-align: center;
            margin-top: 6px;
          `}
        >
          No friend requests
        </h3>
      ) : (
        <Stack rowGap="10px">
          {friendRequests.map((friendRequest) => (
            <Link
              key={friendRequest.id}
              href={`/users/${friendRequest.sender}`}
            >
              <FriendReqestItem userId={String(friendRequest.sender)} />
            </Link>
          ))}
        </Stack>
      )}
    </>
  );
}

interface FriendReqestItem {
  userId: string;
}

function FriendReqestItem({ userId }: FriendReqestItem) {
  let { user, error, isLoading } = useUser(userId);
  isLoading = isLoading || typeof user === "undefined";

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <FeedCard>
          <FeedItemContent>
            <MessageBox>
              {user?.fullName} wants to become your friend!
            </MessageBox>
            <FriendshipActionButton user={user!} />
          </FeedItemContent>
        </FeedCard>
      )}
    </>
  );
}

const MessageBox = styled.p`
  margin-top: 10px;
  border: 1px solid rgb(var(--background-rgb));
  background-color: rgb(var(--card-tint-rgb));
  padding: 5px;
  border-radius: 5px;
  flex-grow: 1;
`;

const FeedItemContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const FeedCard = styled(Card)`
  display: flex;
`;
