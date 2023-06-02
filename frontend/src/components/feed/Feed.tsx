import { Box, Card, CardContent, CardMedia, Paper } from "@mui/material";
import { css } from "@emotion/react";
import { FeedEntry } from "@/entities/feed";
import FeedItem from "./FeedItem";

export interface FeedProps {
  entries: Array<FeedEntry>;
}

export default function Feed({ entries }: FeedProps) {
  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        max-width: 600px;
      `}
    >
      {entries.map((entry, i) => (
        <FeedItem key={i} entry={entry} />
      ))}
    </Box>
  );
}
