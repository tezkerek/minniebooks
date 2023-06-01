import useSWR from 'swr'
import { authFetcher, fetcher } from './fetcher'
import { ProgressUpdateStatus as Status } from "@/entities/ProgressUpdate"
import { Book, BriefBook, Publisher } from '@/entities/book'
import { JsonBriefAuthor, parseBriefAuthor } from './author'
import { JsonReview, parseReview } from './review'

export function useBook(id: string | null) {
    const { data, error, isLoading, mutate } = useSWR<JsonBook, any>(
        id ? `/api/books/${id}/` : null,
        authFetcher
    )

    return {
        book: data ? parseBook(data) : data,
        error,
        isLoading,
        mutate,
    }
}

export interface BookFilters {
    publishers?: Array<Publisher>
    minYear?: number
    maxYear?: number
    minRating?: number
    query?: string
}

export function useBookList(filters?: BookFilters) {
    const queryString =
        typeof filters !== "undefined"
            ? bookFiltersToURLSearchParams(filters).toString()
            : ""

    const { data, error, isLoading } = useSWR<Array<JsonBook>, any>(
        `/api/books/?` + queryString,
        fetcher
    )

    return {
        books: data ? data.map(parseBook) : data,
        error,
        isLoading
    }
}

export function useUserBooks(userId: string | null, status: Status) {
    const { data, error, isLoading, mutate } = useSWR<Array<JsonBook>, any>(
        userId ? `/api/books/?status=${status.toLowerCase()}&user=${userId}` : null,
        authFetcher
    )
    return {
        books: data ? data.map(parseBook) : data,
        error,
        isLoading,
        mutate,
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

const BOOK_FILTERS_JS_TO_URL_MAPPING: {[key in keyof BookFilters]-?: string} = {
    publishers: "publisher",
    minYear: "min_year",
    maxYear: "max_year",
    minRating: "min_rating",
    query: "search",
}

function bookFiltersToURLSearchParams(filters: BookFilters): URLSearchParams {
    const urlParams = new URLSearchParams()

    Object.keys(filters).forEach(key => {
        const filterKey = key as keyof typeof filters
        const filter = filters[filterKey]
        const queryKey = BOOK_FILTERS_JS_TO_URL_MAPPING[filterKey]

        if (typeof filter === "undefined") return

        if (Array.isArray(filter)) {
            filter.forEach(v => urlParams.append(queryKey, v))
            return
        }

        urlParams.append(queryKey, filter.toString())
    })

    return urlParams
}