import Head from "next/head"
import { useRouter } from "next/router"
import BookDetail from "@/components/BookDetail"
import Navbar from "@/components/navbar"
import ReviewList from "@/components/ReviewList"
import styles from "@/styles/BookDetailPage.module.scss"

const mockBook = { id: 1, title: "Book1", author: "Author1", rating: 3, coverImageUrl: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg' }
const reviews = [{ id: 1, rating: 4, text: "Pretty good book", authorUsername: 'the_critic' }, { id: 2, rating: 2, text: "GarBAGE", authorUsername: 'hater' }]

export default function BookDetailPage() {
    const router = useRouter()
    const { id } = router.query as { id: string };

    return (
        <>
            <Head>
                <title>{mockBook.title} | MinnieBooks</title>
                <meta name="description" content={id} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <main className={styles.main}>
                <BookDetail book={mockBook} />
                <ReviewList reviews={reviews} />
            </main>
        </>
    )
}