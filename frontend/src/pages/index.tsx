import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import BookGrid from '@/components/BookGrid'
import Book from '@/entities/book'

const inter = Inter({ subsets: ['latin'] })

const mockBooks: Array<Book> = [
  { id: 1, title: "Book1", author: "Author1", rating: 3, coverImageUrl: '' },
  { id: 2, title: "Book2", author: "Author1", rating: 4, coverImageUrl: '' },
  { id: 3, title: "Book3", author: "Author1", rating: 4, coverImageUrl: '' },
  { id: 4, title: "Book4", author: "Author1", rating: 4, coverImageUrl: '' },
  { id: 5, title: "Book5", author: "Author1", rating: 4, coverImageUrl: '' },
  { id: 6, title: "Book6", author: "Author1", rating: 4, coverImageUrl: '' },
  { id: 7, title: "Book7", author: "Author1", rating: 4, coverImageUrl: '' },
  { id: 8, title: "Book8", author: "Author1", rating: 4, coverImageUrl: '' },
  { id: 9, title: "Book9", author: "Author1", rating: 4, coverImageUrl: '' },
]

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
        <BookGrid books={mockBooks} />
      </main>
    </>
  )
}
