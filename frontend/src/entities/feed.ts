import { ProgressUpdateStatus } from "./ProgressUpdate";
import { BriefBook } from "./book";

export enum FeedEntryType {
  BookRecommendation,
  ProgressUpdate,
  Review,
}

export type FeedEntry = FeedBookRecommendation | FeedProgressUpdate | FeedReview;

interface CommonFeed {
  id: number;
  message: string;
  timestamp: Date;
  book: BriefBook;
}

export interface FeedBookRecommendation extends CommonFeed {
  type: FeedEntryType.BookRecommendation;
  senderId: number;
  senderName: string;
}

export interface FeedProgressUpdate extends CommonFeed {
  type: FeedEntryType.ProgressUpdate;
  status: ProgressUpdateStatus;
  posterId: number;
  posterName: string;
}

export interface FeedReview extends CommonFeed {
  type: FeedEntryType.Review;
  stars: number;
  likes: number;
  authorId: number;
  authorName: string;
}
