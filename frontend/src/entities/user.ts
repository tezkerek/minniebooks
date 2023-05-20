export default class User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public profilePicture: string,
        public friendshipId?: number | null,
        public friendshipStatus?: FriendshipStatus,
    ) { }

    get fullName() {
        return this.firstName + " " + this.lastName
    }
}

export enum FriendshipStatus {
    None = "NONE",
    Pending = "PENDING",
    Incoming = "INCOMING",
    Accepted = "ACCEPTED",
}