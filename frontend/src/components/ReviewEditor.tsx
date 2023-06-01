import { css } from "@emotion/react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { useState } from "react";
import RatingSelector from "@/components/RatingSelector";

interface Review {
  text: string;
  rating: number;
}

interface ReviewEditorProps {
  onDone: (review: Review) => void;
}

export default function ReviewEditor({
  onDone,
}: ReviewEditorProps): JSX.Element {
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const finalReview: Review = { text: reviewText, rating };

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

        <RatingSelector
          maxRating={5}
          rating={rating}
          onRatingChange={setRating}
        />

        <TextareaAutosize
          minRows={10}
          css={css`
            display: block;
            width: 100%;
            font-family: Arial, Helvetica, sans-serif;
          `}
          value={reviewText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setReviewText(e.target.value);
          }}
        />
        <Button
          css={css`
            margin: 8px;
          `}
          color="warning"
          variant="outlined"
          disabled={!(rating >= 1 && rating <= 5)}
          onClick={() => onDone(finalReview)}
        >
          Post review
        </Button>
      </div>
    </>
  );
}
