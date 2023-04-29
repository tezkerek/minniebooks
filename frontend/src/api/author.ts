import useSWR from 'swr'
import fetcher from './fetcher'
import { BriefAuthor, Author } from '@/entities/author'
import { JsonBriefBook, parseBriefBook } from './book'

export function useAuthor(id: string | null) {
    const { data, error, isLoading } = useSWR<JsonAuthor, any>(id ? `/api/authors/${id}/` : null, fetcher)

    return {
        author: data ? parseAuthor(data) : data,
        error,
        isLoading
    }
}

export interface JsonBriefAuthor {
    id: number
    first_name: string
    last_name: string
    description: string
    picture: string
}

export function parseBriefAuthor(json: JsonBriefAuthor): BriefAuthor {
    return new BriefAuthor(
        json.id,
        json.first_name,
        json.last_name,
        json.description,
        json.picture,
    )
}

export interface JsonAuthor {
    id: number
    first_name: string
    last_name: string
    description: string
    picture: string
    books: Array<JsonBriefBook>
}

export function parseAuthor(json: JsonAuthor): Author {
    return new Author(
        json.id,
        json.first_name,
        json.last_name,
        json.description,
        json.picture,
        json.books.map(parseBriefBook),
    )
}