import { useState } from "react";
import Head from "next/head";
import { css } from "@emotion/react";
import Slider from "@mui/material/Slider";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import styles from "@/styles/Search.module.scss";
import { Publisher } from "@/entities/book";
import { useBookList, BookFilters, usePublishers } from "@/api/book";
import Navbar from "@/components/Navbar";
import PublisherFilter from "@/components/PublisherFilter";
import BookGrid from "@/components/BookGrid";
import RatingSelector from "@/components/RatingSelector";

const MIN_BOOK_YEAR = 1500;
const MAX_BOOK_YEAR = 2023;

export default function SearchPage() {
  // prettier-ignore
  const [selectedPublishers, setSelectedPublishers] = useState<Array<Publisher>>([]);
  const [maxYear, setMaxYear] = useState<number>(2023);
  const [minYear, setMinYear] = useState<number>(1984);
  const [query, setQuery] = useState<string>("");
  const [minRating, setMinRating] = useState<number>(0);

  const filters: BookFilters = { minYear, maxYear };
  if (selectedPublishers.length > 0) {
    filters.publishers = selectedPublishers;
  }
  if (minRating > 0) {
    filters.minRating = minRating;
  }
  if (query.length > 0) {
    filters.query = query;
  }

  const { books, error, isLoading } = useBookList(filters);
  const publishers = usePublishers();
  return (
    <>
      <Head>
        <title>Search | MinnieBooks</title>
        <meta name="description" />
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
        <div className={styles.container}>
          <div className={styles.search}>
            <TextField
              id="searchInput"
              variant="outlined"
              fullWidth={true}
              label="Search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><SearchIcon /></InputAdornment>
                ),
              }}
            />
          </div>
          <div className={styles.filters}>
            <p className={styles.filterTitle}>Choose Publisher</p>
            <PublisherFilter
              publishers={publishers.isLoading ? [] : publishers.publishers!}
              selectedPublishers={selectedPublishers}
              onChange={(publishers: Array<Publisher>) =>
                setSelectedPublishers(publishers)
              }
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
                setMinYear(Math.min(newValue as number, maxYear));
              }}
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
                setMaxYear(Math.max(newValue as number, minYear));
              }}
            />

            <p css={filterInfoCss}>
              Range: {minYear} - {maxYear}
            </p>

            <p className={styles.filterTitle}>Select min rating</p>

            <div
              css={css`
                padding-bottom: 32px;
              `}
            >
              <RatingSelector
                rating={minRating}
                maxRating={5}
                onRatingChange={(value) => {
                  setMinRating(value);
                }}
              />
            </div>
          </div>
          <div className={styles.results}>
            <BookGrid books={books ?? []} />
          </div>
        </div>
      </main>
    </>
  );
}

const filterInfoCss = css`
  padding-bottom: 30px;
  font-weight: bold;
`;

const sliderColor = css`
  color: var(--color-accent);
`;
