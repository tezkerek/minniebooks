import Head from "next/head";
import User from "@/entities/user";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import Navbar from "@/components/Navbar";
import BookGrid from "@/components/BookGrid";
import UserDetail from "@/components/UserDetail";
import { useUser } from "@/api/user";
import { useUserBooks } from "@/api/book";
import { ProgressUpdateStatus as Status } from "@/entities/ProgressUpdate";

export default function BookDetailPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  let { user, error, isLoading } = useUser(id);
  isLoading = isLoading || typeof user === "undefined";

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

        <UserBooks userId={id} />
      </main>
    </>
  );
}

interface UserBooksProps {
  userId: string;
}

export function UserBooks({ userId }: UserBooksProps) {
  let finishedBooks = useUserBooks(userId, Status.FINISHED);
  let readingBooks = useUserBooks(userId, Status.READING);

  const isLoading =
    finishedBooks.isLoading ||
    readingBooks.isLoading ||
    typeof finishedBooks.books === "undefined" ||
    typeof readingBooks.books === "undefined";

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      {readingBooks.books!.length > 0 && (
        <>
          <p css={titleCss}>Currently reading</p>
          <BookGrid books={readingBooks.books!} />
        </>
      )}
      {finishedBooks.books!.length > 0 && (
        <>
          <p css={titleCss}>Finished books</p>
          <BookGrid books={finishedBooks.books!} />
        </>
      )}
    </>
  );
}

const titleCss = css`
  font-size: 2em;
  padding-bottom: 25px;
  font-weight: bold;
`;
