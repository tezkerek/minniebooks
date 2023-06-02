import useSWR from "swr";
import { FeedEntry, FeedEntryType } from "@/entities/feed";
import { ProgressUpdateStatus } from "@/entities/ProgressUpdate";
import { authFetcher } from "./fetcher";
import { JsonBriefBook, parseBriefBook } from "./book";

export function useFeed() {
  const { data, error, isLoading, mutate } = useSWR<Array<JsonFeedEntry>, any>(
    "/api/feed/",
    authFetcher
  );

  return {
    entries: data ? data.map(parseFeedEntry) : data,
    error,
    isLoading,
    mutate,
  };
}

function parseFeedEntry(json: JsonFeedEntry): FeedEntry {
  switch (json.entry_type) {
    case "book-recommendation":
      return {
        id: json.id,
        type: FeedEntryType.BookRecommendation,
        message: json.message,
        timestamp: new Date(json.created_at),
        book: parseBriefBook(json.book),
        senderId: json.sender_id,
        senderName: json.sender_name,
      };

    case "progress-update":
      return {
        id: json.id,
        type: FeedEntryType.ProgressUpdate,
        message: json.message,
        timestamp: new Date(json.created_at),
        book: parseBriefBook(json.book),
        status: json.status as ProgressUpdateStatus,
        posterId: json.reader_id,
        posterName: json.reader_name,
      };

    case "review":
      return {
        id: json.id,
        type: FeedEntryType.Review,
        message: json.message,
        timestamp: new Date(json.created_at),
        book: parseBriefBook(json.book),
        stars: json.stars,
        likes: json.likes,
        authorId: json.author_id,
        authorName: json.author_username,
      };
  }
}

export type JsonFeedEntry =
  | JsonBookRecommendation
  | JsonProgressUpdate
  | JsonReview;

interface JsonCommon {
  id: number;
  message: string;
  created_at: string;
  book: JsonBriefBook;
}

export interface JsonBookRecommendation extends JsonCommon {
  entry_type: "book-recommendation";
  sender_id: number;
  sender_name: string;
}

export interface JsonProgressUpdate extends JsonCommon {
  entry_type: "progress-update";
  status: string;
  reader_id: number;
  reader_name: string;
}

export interface JsonReview extends JsonCommon {
  entry_type: "review";
  stars: number;
  likes: number;
  author_id: number;
  author_username: string;
}
