import Review from "@/entities/review";
import styles from "@/styles/Review.module.scss"

interface ReviewListProps {
    reviews: Array<Review>;
}

export default function ReviewList({ reviews }: ReviewListProps) {
    return (
        <div>
            {reviews.map(review =>
                <div>
                    <span className={styles.ratingStar}>{"★".repeat(review.rating).padEnd(5, "☆")}</span>
                    {review.authorUsername}
                    <p>{review.text}</p>
                </div>
            )}
        </div>
    )
}
