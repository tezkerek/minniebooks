import useSWR, { mutate } from 'swr'
import { authFetcher } from './fetcher'
import User, { FriendshipStatus } from '@/entities/user'

export function useUser(id: string | null) {
    const { data, error, isLoading } = useSWR<JsonUser, any>(id ? `/api/users/${id}/` : null, authFetcher)

    return {
        user: data ? parseUser(data) : data,
        error,
        isLoading
    }
}

export function mutateUser(id: string | number) {
    mutate(`/api/users/${id}/`)
}

export function useCurrentUser() {
    return useUser("0")
}

export interface JsonUser {
    id: number
    first_name: string
    last_name: string
    profile_picture: string
    friendship_id?: number
    friendship_status?: string
}

export function parseUser(json: JsonUser): User {
    return new User(
        json.id,
        json.first_name,
        json.last_name,
        json.profile_picture,
        json.friendship_id,
        json.friendship_status as FriendshipStatus | undefined,
    )
}