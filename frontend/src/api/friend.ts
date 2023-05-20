import User from '@/entities/user'
import useSWR from 'swr'
import { authFetcher } from './fetcher'
import { JsonUser, parseUser } from './user'
import { post, performDelete, performPut } from './requests'

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

export async function sendFriendRequest(userId: number) {
    return post("friend-requests/", { receiver: userId })
}

export async function acceptFriendRequest(friendshipId: number) {
    return performPut(`friend-requests/${friendshipId}/`, undefined)
}

export async function removeFriend(userId: number) {
    return performDelete(`friends/${userId}/`)
}

export function fromJson(json: JsonUser): User {
    return new User(json.id, json.first_name, json.last_name, json.profile_picture)
}