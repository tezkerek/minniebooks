import Head from "next/head";
import Book from "@/entities/book";
import Author from "@/entities/author";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import Navbar from "@/components/Navbar";
import AuthorDetail from "@/components/AuthorDetail";
import BookGrid from "@/components/BookGrid";

const mockAuthor: Author = {
  id: 1,
  firstName: "Ion",
  lastName: "Creanga",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eos molestias autem blanditiis cumque voluptatibus aperiam suscipit reiciendis quisquam voluptates, illum, facilis rerum ducimus, sequi provident saepe eius neque placeat? Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eos molestias autem blanditiis cumque voluptatibus aperiam suscipit reiciendis quisquam voluptates, illum, facilis rerum ducimus, sequi provident saepe eius neque placeat? Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eos molestias autem blanditiis cumque voluptatibus aperiam suscipit reiciendis quisquam voluptates, illum, facilis rerum ducimus, sequi provident saepe eius neque placeat?",
  picture:
    "https://static.cinemagia.ro/img/resize/db/actor/03/46/21/ion-creanga-192313l-600x0-w-f709806b.jpg",
};

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
  const { id } = router.query as { id: string };

  return (
    <>
      <Head>
        <title>{`${mockAuthor.firstName} ${mockAuthor.lastName} | MinnieBooks`}</title>
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
        <AuthorDetail author={mockAuthor} />
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
