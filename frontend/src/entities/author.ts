export default class Author {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public description: string,
        public picture: string,
    ) { }

    get fullName() {
        return this.firstName + " " + this.lastName
    }
}