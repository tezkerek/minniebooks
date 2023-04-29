import { BriefAuthor } from "./author"
import Review from "./review"

export class BriefBook {
    constructor(
        public id: number,
        public title: string,
        public authors: Array<BriefAuthor>,
        public rating: number,
        public coverImageUrl: string,
    ) { }
}

export class Book extends BriefBook {
    constructor(
        id: number,
        title: string,
        authors: Array<BriefAuthor>,
        rating: number,
        coverImageUrl: string,
        public reviews: Array<Review>,
    ) {
        super(id, title, authors, rating, coverImageUrl)
    }
}

export type Publisher = string;
