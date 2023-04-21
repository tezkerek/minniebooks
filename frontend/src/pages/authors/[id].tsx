import Head from "next/head";
import Book from "@/entities/book";
import Author from "@/entities/author";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import Navbar from "@/components/Navbar";
import AuthorDetail from "@/components/AuthorDetail";
import BookGrid from "@/components/BookGrid";
import { useAuthor } from "@/api/author";

const mockWrittenBooks: Array<Book> = [
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
  const { id } = router.query as { id?: string };

  let { author, error, isLoading } = useAuthor(id ?? null)
  isLoading = isLoading || typeof author === "undefined"

  return (
    <>
      <Head>
        <title>{`${author?.fullName ?? id} | MinnieBooks`}</title>
        <meta name="description" content={author?.fullName ?? id} />
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
        {isLoading ? "Loading" : <AuthorDetail author={author as Author} />}
        <p css={titleCss}>Books</p>
        <BookGrid books={mockWrittenBooks} />
      </main>
    </>
  );
}

const titleCss = css`
  font-size: 2em;
  padding-bottom: 25px;
  font-weight: bold;
`;
