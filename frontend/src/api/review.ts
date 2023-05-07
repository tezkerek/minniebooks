import useSWR from 'swr'
import { fetcher } from './fetcher'
import { post } from './requests'
import Review from '@/entities/review'

export async function postReview(rating: number, text: string, bookId: number) {
    return post('reviews/', { stars: rating, message: text, book: bookId })
}

export interface JsonReview {
    id: number
    message: string
    stars: number
    book: number
    author_id: number
    author_username: string
}

export function parseReview(json: JsonReview): Review {
    return {
        id: json.id,
        text: json.message,
        rating: json.stars,
        authorId: json.author_id,
        authorUsername: json.author_username,
    }
}
