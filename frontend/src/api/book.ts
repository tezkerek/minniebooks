import useSWR from 'swr'
import fetcher from './fetcher'
import Book from '@/entities/book'

export function useBook(id: string | null) {
    const { data, error, isLoading } = useSWR<JsonBook, any>(id ? `/api/books/${id}/` : null, fetcher)

    return {
        book: data ? fromJson(data) : data,
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
}

function fromJson(json: JsonBook): Book {
    return {
        id: json.id,
        title: json.title,
        author: json.authors.at(0) ?? "Unknown",
        rating: json.rating,
        coverImageUrl: json.book_cover,
    }
}