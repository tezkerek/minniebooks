import Head from "next/head";
import { css } from "@emotion/react";
import { Box } from "@mui/material";
import { useFeed } from "@/api/feed";
import Navbar from "@/components/Navbar";
import Feed from "@/components/feed/Feed";

export default function FeedPage() {
  return (
    <>
      <Head>
        <title>Feed | MinnieBooks</title>
        <meta name="description" content="Find and track books" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px;
        `}
      >
        <h1
          css={css`
            margin-bottom: 15px;
          `}
        >
          Feed
        </h1>
        <Box width="100%" maxWidth={800}>
          <FeedSection />
        </Box>
      </main>
    </>
  );
}

function FeedSection() {
  const { entries, error, isLoading } = useFeed();

  if (isLoading) return <>Loading</>;
  if (error) return <>{`Error: ${error}`}</>;

  return <Feed entries={entries!} />;
}
