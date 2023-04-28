import Author from "./author"
import Review from "./review"

export default interface Book {
    id: number
    title: string
    authors: Array<Author>
    rating: number
    coverImageUrl: string
    reviews: Array<Review>
}

export type Publisher = string;
