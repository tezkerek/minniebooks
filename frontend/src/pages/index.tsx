import Head from 'next/head'
import styled from '@emotion/styled'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import BookGrid from '@/components/BookGrid'
import { BriefBook } from '@/entities/book'
import { useBookList } from '@/api/book'

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
  margin-bottom: 20px;
`

function FeaturedBooks() {
  const { books, error, isLoading } = useBookList()

  if (isLoading) return <>Loading</>
  if (error) return <>{`Error: ${error}`}</>

  return <BookGrid books={books as Array<BriefBook>} />
}