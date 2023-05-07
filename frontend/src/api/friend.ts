import User from '@/entities/user'
import useSWR from 'swr'
import { authFetcher } from './fetcher'
import { JsonUser, parseUser } from './user'
import { post } from './requests'

export function useFriendList() {
    const { data, error, isLoading } = useSWR<Array<JsonUser>, any>(`/api/friends/`, authFetcher)
    return {
        friends: data ? data.map(parseUser) : data,
        error,
        isLoading
    }
}

export async function recommendBook(message: string, bookId: number, userId: number) {
    return post("book-recommendations/", { message, book: bookId, receiver: userId })
}

export function fromJson(json: JsonUser): User {
    return new User(json.id, json.first_name, json.last_name, json.profile_picture)
}