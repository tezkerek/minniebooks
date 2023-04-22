export default class User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public profilePicture: string,
        public friends: Array<number> = [],
    ) { }

    get fullName() {
        return this.firstName + " " + this.lastName
    }
}