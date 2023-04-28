import useSWR from 'swr'
import fetcher from './fetcher'
import Author from '@/entities/author'

export function useAuthor(id: string | null) {
    const { data, error, isLoading } = useSWR<JsonAuthor, any>(id ? `/api/authors/${id}/` : null, fetcher)

    return {
        author: data ? parseAuthor(data) : data,
        error,
        isLoading
    }
}

export interface JsonAuthor {
    id: number
    first_name: string
    last_name: string
    description: string
    picture: string
}

export function parseAuthor(json: JsonAuthor): Author {
    return new Author(json.id, json.first_name, json.last_name, json.description, json.picture)
}