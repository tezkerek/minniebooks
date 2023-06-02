import Head from 'next/head'
import styled from '@emotion/styled'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import BookGrid from '@/components/BookGrid'
import AuthGuard from '@/components/AuthGuard'
import Feed from '@/components/feed/Feed'
import { BriefBook } from '@/entities/book'
import { useBookList } from '@/api/book'
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
          <SectionHeader>Recent activity</SectionHeader>
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
  margin-bottom: 20px;
`

function FeedSection() {
  const { entries, error, isLoading } = useFeed()

  if (isLoading) return <>Loading</>
  if (error) return <>{`Error: ${error}`}</>

  return <Feed entries={entries!} />
}

function FeaturedBooks() {
  const { books, error, isLoading } = useBookList()

  if (isLoading) return <>Loading</>
  if (error) return <>{`Error: ${error}`}</>

  return <BookGrid books={books as Array<BriefBook>} />
}