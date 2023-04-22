import useSWR from 'swr'
import fetcher from './fetcher'
import User from '@/entities/user'

export function useUser(id: string | null) {
    const { data, error, isLoading } = useSWR<JsonUser, any>(id ? `/api/users/${id}/` : null, fetcher)

    return {
        user: data ? fromJson(data) : data,
        error,
        isLoading
    }
}

export function useCurrentUser() {
    return useUser("0")
}

interface JsonUser {
    id: number
    first_name: string
    last_name: string
    profile_picture: string
}

function fromJson(json: JsonUser): User {
    return new User(json.id, json.first_name, json.last_name, json.profile_picture)
}