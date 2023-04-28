import useSWR from 'swr'
import fetcher from './fetcher'
import Book from '@/entities/book'
import { JsonReview, parseReview } from './review'

export function useBook(id: string | null) {
    const { data, error, isLoading } = useSWR<JsonBook, any>(id ? `/api/books/${id}/` : null, fetcher)

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

interface JsonBook {
    id: number
    title: string
    publisher: string
    year: number
    authors: Array<string>
    rating: number
    book_cover: string
    reviews: Array<JsonReview>
}

function parseBook(json: JsonBook): Book {
    return {
        id: json.id,
        title: json.title,
        author: json.authors.at(0) ?? "Unknown",
        rating: json.rating,
        coverImageUrl: json.book_cover,
        reviews: json.reviews.map(parseReview),
    }
}