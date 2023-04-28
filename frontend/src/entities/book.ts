import Review from "./review"

export default interface Book {
    id: number
    title: string
    author: string
    rating: number
    coverImageUrl: string
    reviews: Array<Review>
}

export type Publisher = string;
