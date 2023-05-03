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
                </div>
            )}
        </div>
    )
}
