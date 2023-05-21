import Link from "next/link";
import { css } from "@emotion/react";
import Review from "@/entities/review";
import StarRating from "./StarRating";

interface ReviewListProps {
    reviews: Array<Review>;
}

export default function ReviewList({ reviews }: ReviewListProps) {
    return (
        <div>
            {reviews.map(review =>
                <div key={review.id}>
                    <p css={css`display: flex; align-items: center;`}>
                        <StarRating rating={review.rating} />
                        <Link href={`/users/${review.authorId}`} css={css`margin-left: 5px;`}>
                            {review.authorUsername}
                        </Link>
                    </p>
                    <p>{review.text}</p>
                    <span css={likeCounterCss}>
                        {review.likes} {review.likes == 1 ? "like" : "likes"}
                    </span>
                </div>
            )}
        </div>
    )
}

const likeCounterCss = css`
    display: inline-block;
    font-size: 0.9em;
    color: #777777;
    border: 1px solid #777777;
    border-radius: 20px;
    margin-top: 5px;
    padding: 2px 5px;
`