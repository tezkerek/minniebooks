import { Stack } from "@mui/material";
import { FeedEntry } from "@/entities/feed";
import FeedItem from "./FeedItem";

export interface FeedProps {
  entries: Array<FeedEntry>;
}

export default function Feed({ entries }: FeedProps) {
  return (
    <Stack rowGap="10px">
      {entries.map((entry, i) => (
        <FeedItem key={i} entry={entry} />
      ))}
    </Stack>
  );
}
