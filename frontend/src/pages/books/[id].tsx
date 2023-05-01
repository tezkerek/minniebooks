import Head from "next/head"
import { useRouter } from "next/router"
import { css } from "@emotion/react"
import BookDetail from "@/components/BookDetail"
import Navbar from "@/components/Navbar"
import ReviewList from "@/components/ReviewList"
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { useState } from "react";
import RatingSelector from "@/components/RatingSelector"


function ReviewEditor(): JSX.Element {
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

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

        <RatingSelector maxRating={5} rating={rating} onRatingChange={setRating} />

        <TextareaAutosize
          css={css`
            display: block;
          `}
          value={reviewText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setReviewText(e.target.value);
          }}
        />
        <Button
        
          color="warning"
          variant="outlined"
          disabled={!(rating >= 1 && rating <= 5)}
          onClick={() => {
            console.log(reviewText, rating);
          }}
        >
          Post review
        </Button>
      </div>
    </>
  );
}


const mockBook = { id: 1, title: "Book1", author: "Author1", rating: 3, coverImageUrl: 'https://picsum.photos/300/480' }
const reviews = [{ id: 1, rating: 4, text: "Pretty good book", authorUsername: 'the_critic' }, { id: 2, rating: 2, text: "GarBAGE", authorUsername: 'hater' }]

export default function BookDetailPage() {
    const router = useRouter()
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

            <main css={css`
                width: 80%;
                margin: auto;
            `}>
                <BookDetail book={mockBook} />
                <ReviewList reviews={reviews} />
            </main>
        </>
    )
}