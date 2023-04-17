import { css } from "@emotion/react";
import styles from "@/styles/Search.module.scss";
import Slider from "@mui/material/Slider";
import { Publisher } from "@/entities/book";
import Head from "next/head";
import Navbar from "@/components/Navbar";
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
  let MIN_BOOK_YEAR = 1500;
  let MAX_BOOK_YEAR = 2023;
  const [selectedPublishers, setSelectedPublishers] = useState<Array<Publisher>>([]);
  const [maxYear, setMaxYear] = useState<number>(2023);
  const [minYear, setMinYear] = useState<number>(1984);
  const [query, setQuery] = useState<string>("");
  const submitToBE = () => {
    console.log(query, maxYear, minYear, selectedPublishers);
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
          <form onSubmit={submitToBE}>
            <input
              className={styles.inputField}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button className={styles.submitButton} type="submit">
              Meow!
            </button>
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
          <p className={styles.filterTitle}>Choose Max Year</p>
          <Slider
            max={MAX_BOOK_YEAR}
            min={MIN_BOOK_YEAR}
            css={sliderColor}
            value={maxYear}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={(event: Event, newValue: number | number[]) => {
              newValue = newValue as number;
              if (newValue < minYear) {
                setMaxYear(minYear);
              } else setMaxYear(newValue);
            }}
          />
          <p className={styles.filterTitle}>Choose Min Year</p>

          <Slider
            css={sliderColor}
            max={MAX_BOOK_YEAR}
            min={MIN_BOOK_YEAR}
            value={minYear}
            aria-label="Big"
            valueLabelDisplay="auto"
            onChange={(event: Event, newValue: number | number[]) => {
              newValue = newValue as number;
              if (newValue > maxYear) {
                setMinYear(maxYear);
              } else setMinYear(newValue);
            }}
          />
          <p css={filterInfoCss}>
            Range: {minYear} - {maxYear}
          </p>
        </div>
        <div className={styles.results}>
          <BookGrid books={mockBooks} />
        </div>
      </div>
    </>
  );
}

const filterInfoCss = css`
    font-weight: bold;
`
const sliderColor = css`
    color: var(--color-accent);
`
