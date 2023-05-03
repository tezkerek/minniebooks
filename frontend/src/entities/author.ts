import { BriefBook } from "./book";

export class BriefAuthor {
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

export class Author extends BriefAuthor {
    constructor(
        id: number,
        firstName: string,
        lastName: string,
        description: string,
        picture: string,
        public books: Array<BriefBook>
    ) {
        super(id, firstName, lastName, description, picture)
    }
}