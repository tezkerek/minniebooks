import Head from "next/head";
import Book from "@/entities/book";
import User from "@/entities/user";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import Navbar from "@/components/Navbar";
import UserDetail from "@/components/UserDetail";
import BookGrid from "@/components/BookGrid";

const mockUser: User = {
  id: 1,
  firstName: "Mr.",
  lastName: "Beast",
  isFriend: false,
  profilePicture:
    "https://i1.sndcdn.com/avatars-eVP8xuqmsqyHe4pw-znzVTg-t500x500.jpg",
};

const mockBooks: Array<Book> = [
  {
    id: 0,
    title: "I got reincarnated as a...",
    author: "John Doe",
    rating: 3,
    coverImageUrl: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
  },
  {
    id: 1,
    title: "Saving gold in another world for my retirement",
    author: "Dr. Stone",
    rating: 4.25,
    coverImageUrl: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
  },
];
export default function BookDetailPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  return (
    <>
      <Head>
        <title>{`${mockUser.firstName} ${mockUser.lastName} | MinnieBooks`}</title>
        <meta name="description" content={id} />
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
        <UserDetail user={mockUser} />
        <BookGrid books={mockBooks} />
      </main>
    </>
  );
}
