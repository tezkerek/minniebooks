import { HTMLAttributes, ReactNode } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Card, CardContent, CardMedia, Stack } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import {
  FeedBookRecommendation,
  FeedEntry,
  FeedEntryType,
  FeedProgressUpdate,
  FeedReview,
} from "@/entities/feed";
import { BriefBook } from "@/entities/book";
import { ProgressUpdateStatus as Status } from "@/entities/ProgressUpdate";
import { timeSince } from "@/utils/date";
import ShortLink from "@/components/ShortLink";
import StarRating from "../StarRating";

export default function FeedItem({ entry }: { entry: FeedEntry }) {
  switch (entry.type) {
    case FeedEntryType.BookRecommendation:
      return <BookRecommendationItem entry={entry} />;
    case FeedEntryType.ProgressUpdate:
      return <ProgressUpdateItem entry={entry} />;
    case FeedEntryType.Review:
      return <ReviewItem entry={entry} />;
  }
}

function BookRecommendationItem({ entry }: { entry: FeedBookRecommendation }) {
  return (
    <FeedCard>
      <CardMedia
        component="img"
        image={entry.book.coverImageUrl}
        sx={{ width: 100 }}
      />
      <FeedItemContent>
        <EntryHeader timestamp={entry.timestamp}>
          <LinkToUser id={entry.senderId}>
            <b>{entry.senderName}</b>
          </LinkToUser>{" "}
          recommends
        </EntryHeader>
        <LinkToBook book={entry.book} />
        <MessageBox>{entry.message}</MessageBox>
      </FeedItemContent>
    </FeedCard>
  );
}

function ProgressUpdateItem({ entry }: { entry: FeedProgressUpdate }) {
  const statusText =
    entry.status === Status.STARTED
      ? "started reading"
      : entry.status === Status.READING
      ? " is reading"
      : entry.status === Status.FINISHED
      ? " finished reading"
      : "";

  return (
    <FeedCard>
      <CardMedia
        component="img"
        image={entry.book.coverImageUrl}
        sx={{ width: 100 }}
      />
      <FeedItemContent>
        <EntryHeader timestamp={entry.timestamp}>
          <LinkToUser id={entry.posterId}>
            <b>{entry.posterName}</b>
          </LinkToUser>{" "}
          {statusText}
        </EntryHeader>
        <LinkToBook book={entry.book} />
        <MessageBox>{entry.message}</MessageBox>
      </FeedItemContent>
    </FeedCard>
  );
}

function ReviewItem({ entry }: { entry: FeedReview }) {
  return (
    <FeedCard>
      <CardMedia
        component="img"
        image={entry.book.coverImageUrl}
        sx={{ width: 100 }}
      />
      <FeedItemContent>
        <EntryHeader timestamp={entry.timestamp}>
          <LinkToUser id={entry.authorId}>
            <b>{entry.authorName}</b>
          </LinkToUser>{" "}
          posted a review for
        </EntryHeader>
        <LinkToBook book={entry.book} />
        <StarRating rating={entry.stars} />
        <MessageBox>{entry.message}</MessageBox>
      </FeedItemContent>
    </FeedCard>
  );
}

const FeedCard = styled(Card)`
  display: flex;
`;

const FeedItemContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const SmallHeader = styled.p`
  font-size: 0.9em;
`;

const EntryHeader = (
  props: HTMLAttributes<HTMLElement> & { timestamp?: Date }
) => {
  const { timestamp, children, ...otherProps } = props;
  const timeString = timestamp ? timeSince(timestamp) : "";
  return (
    <SmallHeader
      {...otherProps}
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      <span>{children}</span>
      <Stack
        direction="row"
        alignItems="center"
        gap={0.25}
        title={timestamp?.toISOString()}
      >
        <HistoryIcon />
        {timeString}
      </Stack>
    </SmallHeader>
  );
};

const LinkToUser = ({ id, children }: { id: number; children: ReactNode }) => (
  <ShortLink href={`/users/${id}`}>{children}</ShortLink>
);

const LinkToBook = ({ book }: { book: BriefBook }) => (
  <h2
    css={css`
      margin-top: 10px;
    `}
  >
    <ShortLink href={`/books/${book.id}`}>{book.title}</ShortLink>
  </h2>
);

const MessageBox = styled.p`
  margin-top: 10px;
  border: 1px solid rgb(var(--background-rgb));
  background-color: rgb(var(--card-tint-rgb));
  padding: 5px;
  border-radius: 5px;
  flex-grow: 1;
`;
