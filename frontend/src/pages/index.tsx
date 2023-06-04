import Head from 'next/head'
import { Box, Stack } from '@mui/material'
import EastIcon from '@mui/icons-material/East'
import styled from '@emotion/styled'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import BookGrid from '@/components/BookGrid'
import AuthGuard from '@/components/AuthGuard'
import Feed from '@/components/feed/Feed'
import ShortLink from '@/components/ShortLink'
import { BriefBook } from '@/entities/book'
import { useBookSuggestions } from '@/api/book'
import { useFeed } from '@/api/feed'

export default function Home() {
  return (
    <>
      <Head>
        <title>MinnieBooks</title>
        <meta name="description" content="Find and track books" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <SiteHeader>MinnieBooks</SiteHeader>
        <AuthGuard>
          <SectionHeader>
            <ShortLink href="/feed">
              <Stack
                display="inline-flex"
                direction="row"
                alignItems="center"
                gap={0.5}
              >
                Recent activity <EastIcon fontSize="inherit" />
              </Stack>
            </ShortLink>
          </SectionHeader>
          <FeedSection />
        </AuthGuard>
        <SectionHeader>For you</SectionHeader>
        <FeaturedBooks />
      </main>
    </>
  )
}

const SiteHeader = styled.h1`
  font-size: 6em;
  margin-bottom: 40px;
`

const SectionHeader = styled.h1`
  margin-top: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`

function FeedSection() {
  const { entries, error, isLoading } = useFeed()

  if (isLoading) return <>Loading</>
  if (error) return <>{`Error: ${error}`}</>

  return (
    <Box maxWidth={600}>
      <Feed entries={entries!.slice(0, 3)} />
    </Box>
  )
}

function FeaturedBooks() {
  const { books, error, isLoading } = useBookSuggestions()

  if (isLoading) return <>Loading</>
  if (error) return <>{`Error: ${error}`}</>

  return <BookGrid books={books as Array<BriefBook>} />
}