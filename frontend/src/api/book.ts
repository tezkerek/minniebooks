import useSWR from 'swr'
import { authFetcher, fetcher } from './fetcher'
import { Book, BriefBook } from '@/entities/book'
import { JsonBriefAuthor, parseBriefAuthor } from './author'
import { JsonReview, parseReview } from './review'

export function useBook(id: string | null) {
    const { data, error, isLoading } = useSWR<JsonBook, any>(id ? `/api/books/${id}/` : null, authFetcher)

    return {
        book: data ? parseBook(data) : data,
        error,
        isLoading
    }
}

export function useBookList() {
    const { data, error, isLoading } = useSWR<Array<JsonBook>, any>(`/api/books/`, fetcher)

    return {
        books: data ? data.map(parseBook) : data,
        error,
        isLoading
    }
}

export interface JsonBriefBook {
    id: number
    title: string
    publisher: string
    year: number
    authors: Array<JsonBriefAuthor>
    rating: number
    book_cover: string
}

export function parseBriefBook(json: JsonBriefBook): BriefBook {
    return new BriefBook(
        json.id,
        json.title,
        json.authors.map(parseBriefAuthor),
        json.rating,
        json.book_cover,
    )
}

export interface JsonBook {
    id: number
    title: string
    publisher: string
    year: number
    authors: Array<JsonBriefAuthor>
    rating: number
    book_cover: string
    reviews: Array<JsonReview>
    is_rated?: Boolean
}

export function parseBook(json: JsonBook): Book {
    return new Book(
        json.id,
        json.title,
        json.authors.map(parseBriefAuthor),
        json.rating,
        json.book_cover,
        json.reviews.map(parseReview),
        json.is_rated,
    )
}