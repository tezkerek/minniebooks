import Head from "next/head";
import User from "@/entities/user";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import Navbar from "@/components/Navbar";
import UserDetail from "@/components/UserDetail";
import { useUser } from "@/api/user";

export default function BookDetailPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  let { user, error, isLoading } = useUser(id)
  isLoading = isLoading || typeof user === "undefined"

  return (
    <>
      <Head>
        <title>{`${user?.fullName ?? id} | MinnieBooks`}</title>
        <meta name="description" content={user?.fullName ?? id} />
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
        {isLoading ? "Loading" : <UserDetail user={user as User} />}
      </main>
    </>
  );
}
