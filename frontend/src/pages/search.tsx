import styles from "@/styles/Search.module.scss"
import Slider from "@mui/material/Slider";
import { Publisher } from "@/entities/book";
import Head from "next/head";
import Navbar from "@/components/navbar";
import Book from "@/entities/book";
import PublisherFilter from "@/components/filters";
import { useState } from "react";
import BookGrid from "@/components/BookGrid";

const mockPublishers: Array<Publisher> = ["Alcatel", "Briceag", "Babadag"];

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
    title: "Saving gold for my rretirem",
    author: "Me",
    rating: 4.25,
    coverImageUrl: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
  },
  {
    id: 0,
    title: "I got reincarnated as a...",
    author: "John Doe",
    rating: 3,
    coverImageUrl: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
  },
  {
    id: 1,
    title: "Saving gold for my rretirem",
    author: "Me",
    rating: 4.25,
    coverImageUrl: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
  },
  {
    id: 0,
    title: "I got reincarnated as a...",
    author: "John Doe",
    rating: 3,
    coverImageUrl: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
  },
  {
    id: 1,
    title: "Saving gold for my rretirem",
    author: "Me",
    rating: 4.25,
    coverImageUrl: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
  },
  {
    id: 0,
    title: "I got reincarnated as a...",
    author: "John Doe",
    rating: 3,
    coverImageUrl: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
  },
  {
    id: 1,
    title: "Saving gold for my rretirem",
    author: "Me",
    rating: 4.25,
    coverImageUrl: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
  },
  {
    id: 0,
    title: "I got reincarnated as a...",
    author: "John Doe",
    rating: 3,
    coverImageUrl: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
  },
  {
    id: 1,
    title: "Saving gold for my rretirem",
    author: "Me",
    rating: 4.25,
    coverImageUrl: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
  },
];

export default function SearchPage() {
  const [selectedPublishers, setSelectedPublishers] = useState<Array<Publisher>>([]);
  const [yearRange, setYearRange] = useState<Array<number>>([2020, 2023]);
  const [query, setQuery] = useState<string>("");

  const submitToBE = () => {
    console.log(query, yearRange, selectedPublishers);
  };

  return (
    <>
      <Head>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.search}>
          <h2>Search</h2>
          <form onSubmit={submitToBE}>
            <input className={styles.inputField}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className={styles.filters}>
          <p className={styles.filterTitle}>Choose Publisher</p>
            <PublisherFilter
              publishers={mockPublishers}
              selectedPublishers={selectedPublishers}
              onChange={(publishers: Array<Publisher>) =>
                setSelectedPublishers(publishers)
              }
            />
          <p className={styles.filterTitle}>Choose Year</p>

            <Slider
              max={3000}
              min={800}
              step={1}
              value={yearRange}
              onChange={(event: Event, newValue: number | number[]) => {
                setYearRange(newValue as number[]);
              }}
              
            />
            <p>From: {yearRange[0]} to {yearRange[1]}</p>
        </div>
        <div className={styles.results}>
          <BookGrid books={mockBooks} />
        </div>
      </div>
    </>
  );
}
