import { ProgressUpdateStatus } from "@/entities/ProgressUpdate";
import { post } from "./requests";

export function postProgressUpdate(
  status: ProgressUpdateStatus,
  message: string,
  bookId: number
) {
  return post("progress-updates/", { status, message, book: bookId });
}
