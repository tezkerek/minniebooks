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
                    <StarRating rating={review.rating} />
                    {review.authorUsername}
                    <p>{review.text}</p>
                </div>
            )}
        </div>
    )
}
