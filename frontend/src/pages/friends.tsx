import { Stack } from "@mui/material";
import { FriendRequest } from "@/api/friend";
import Link from "next/link";
import styled from "@emotion/styled";
import Head from "next/head";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import Navbar from "@/components/Navbar";
import { useUser } from "@/api/user";
import { useIncomingFriendRequests } from "@/api/friend";
import FriendshipActionButton from "@/components/FriendshipActionButton";

export default function FriendRequestsPage() {
  let { incomingfriends, error, isLoading } = useIncomingFriendRequests();
  isLoading = isLoading || typeof incomingfriends === "undefined";
    console.log(incomingfriends);
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  gap: 15px;
`;

interface FriendReqestGridProps {
  friendRequests: Array<FriendRequest>;
}

function FriendReqestGrid({ friendRequests }: FriendReqestGridProps) {
  return (
    <>
      <Grid>
        {friendRequests.map((friendRequest) => (
          <Link key={friendRequest.id} href={`/users/${friendRequest.sender}`}>
            <FriendReqestItem userId={String(friendRequest.sender)} />
          </Link>
        ))}
      </Grid>
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
        <>
          <div
            css={css`
              border: 4px solid gray;
            `}
          >
            <p>{user?.fullName} wants to become your friend!</p>
            <FriendshipActionButton user={user!} />
          </div>
        </>
      )}
    </>
  );
}