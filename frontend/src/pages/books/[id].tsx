import Head from "next/head"
import { useRouter } from "next/router"
import { css } from "@emotion/react"
import BookDetail from "@/components/BookDetail"
import Navbar from "@/components/Navbar"
import ReviewList from "@/components/ReviewList"
import Book from "@/entities/book"
import { useBook } from "@/api/book"

const reviews = [{ id: 1, rating: 4, text: "Pretty good book", authorUsername: 'the_critic' }, { id: 2, rating: 2, text: "GarBAGE", authorUsername: 'hater' }]

export default function BookDetailPage() {
    const router = useRouter()
    const { id } = router.query as { id?: string };

    let { book, error, isLoading } = useBook(id ?? null)
    isLoading = isLoading || typeof book === "undefined"

    return (
        <>
            <Head>
                <title>{`${book?.title ?? id} | MinnieBooks`}</title>
                <meta name="description" content={id} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <main css={css`
                width: 80%;
                margin: auto;
            `}>
                {isLoading ? "Loading" : (
                    <>
                        <BookDetail book={book as Book} />
                        <ReviewList reviews={reviews} />
                    </>
                )}
            </main>
        </>
    )
}