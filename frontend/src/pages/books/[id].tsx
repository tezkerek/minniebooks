import Head from "next/head"
import { useRouter } from "next/router"
import { css } from "@emotion/react"
import BookDetail from "@/components/BookDetail"
import Navbar from "@/components/Navbar"
import ReviewList from "@/components/ReviewList"
import TextareaAutosize from "@mui/material/TextareaAutosize"
import Button from "@mui/material/Button"
import { useState } from "react"

interface StarsProps {
  ratingMax: number;
  stars: number;
  setStars: Function;
}

function Stars({ ratingMax, stars, setStars }: StarsProps) {
  let starArr = [];
  for (let index = 1; index <= ratingMax; index++) {
    starArr.push(
      <div
        key={index}
        css={css`
          display: inline;
        `}
        onClick={() => {
          setStars(index);
        }}
      >
        {/* from google maps source code */}
        <svg focusable="false" width="34" height="34" viewBox="0 0 40 40">
          <path
            d="M30.1738537,33.7654006 L27.0921483,24.1156159 C26.959813,23.7012327 27.1105413,23.2488331 27.4649676,22.9966268 L35.4477621,17.3161477 C35.8977477,16.9959424 36.0029553,16.3715793 35.68275,15.9215937 C35.4950528,15.6578223 35.1912764,15.5012346 34.8675395,15.5013769 L25.0804893,15.5056789 C24.6453619,15.5058702 24.2600542,15.2246667 24.1275461,14.8102063 L20.9521753,4.87824826 C20.7839895,4.35219504 20.2211976,4.06208615 19.6951444,4.23027193 C19.3871406,4.32874458 19.1457633,4.57007364 19.047229,4.87805774 L15.8695464,14.8103968 C15.7369778,15.2247605 15.3517177,15.5058702 14.916664,15.5056789 L5.13246101,15.5013772 C4.58017631,15.5011344 4.13226426,15.9486528 4.13202145,16.5009375 C4.13187911,16.8246744 4.28846681,17.1284508 4.55223829,17.316148 L12.5352875,22.9968084 C12.8895911,23.2489273 13.0403512,23.7011146 12.908231,24.1154083 L9.83068127,33.7657819 C9.66288114,34.2919582 9.95340248,34.8545373 10.4795788,35.0223375 C10.7880012,35.1206948 11.1249561,35.0636649 11.3838335,34.8692915 L19.3997363,28.8506971 C19.7553884,28.5836621 20.2446591,28.5835988 20.6003804,28.8505416 L28.6210329,34.8694549 C29.0627701,35.2009464 29.6895959,35.1115746 30.0210874,34.6698373 C30.2154254,34.4108674 30.2723531,34.073833 30.1738537,33.7654006 Z"
            fill={stars >= index ? "#fabb05" : "#80868b"}
          ></path>
        </svg>
      </div>
    );
  }

  return <div>{starArr}</div>;
}

function WriteReviewPopup(): JSX.Element {
  const [textReview, setTextReview] = useState<string>("");
  const [stars, setStars] = useState<number>(0);

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <p>Write review</p>

        <Stars ratingMax={5} stars={stars} setStars={setStars} />

        <TextareaAutosize
          css={css`
            display: block;
          `}
          value={textReview}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTextReview(e.target.value);
          }}
        />
        <Button
          color="warning"
          variant="outlined"
          disabled={!(stars >= 1 && stars <= 5)}
          onClick={() => {
            console.log(textReview, stars);
          }}
        >
          Post review
        </Button>
      </div>
    </>
  );
}

const mockBook = {
  id: 1,
  title: "Book1",
  author: "Author1",
  rating: 3,
  coverImageUrl: "https://picsum.photos/300/480",
};
const reviews = [
  { id: 1, rating: 4, text: "Pretty good book", authorUsername: "the_critic" },
  { id: 2, rating: 2, text: "GarBAGE", authorUsername: "hater" },
];

export default function BookDetailPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  return (
    <>
      <Head>
        <title>{`${mockBook.title} | MinnieBooks`}</title>
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
        <BookDetail book={mockBook} />
        <ReviewList reviews={reviews} />
      </main>
    </>
  );
}
