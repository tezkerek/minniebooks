import { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { css } from "@emotion/react"
import BookDetail from "@/components/BookDetail"
import Navbar from "@/components/Navbar"
import ReviewList from "@/components/ReviewList"
import AuthGuard from "@/components/AuthGuard"
import Button from "@/components/Button"
import ReviewEditor from "@/components/ReviewEditor"
import { Book } from "@/entities/book"
import Review from "@/entities/review"
import { useBook } from "@/api/book"
import { postReview } from "@/api/review"

export default function BookDetailPage() {
    const router = useRouter()
    const { id } = router.query as { id?: string };

    let { book, error, isLoading, mutate } = useBook(id ?? null)
    isLoading = isLoading || typeof book === "undefined"

    const [isReviewEditorOpen, toggleReviewEditor] = useState<boolean>(false)

    const isBookReviewed = book?.is_rated ?? false

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
                        <AuthGuard>
                            {!isBookReviewed && (
                                <Button onClick={() => toggleReviewEditor(true)}>
                                    Add review
                                </Button>
                            )}
                        </AuthGuard>
                        <ReviewList reviews={book?.reviews as Array<Review>} />
                    </>
                )}

                {isReviewEditorOpen && (
                    <ReviewEditor
                        onDone={async (review) => {
                            await postReview(
                                review.rating,
                                review.text,
                                book?.id as number,
                            ).catch(err => alert(err))
                            toggleReviewEditor(false)
                            mutate()
                        }}
                    />
                )}
            </main>
        </>
    )
}