import { useState } from "react"
import Link from "next/link"
import { css } from "@emotion/react"
import { BriefBook } from "@/entities/book"
import { recommendBook } from "@/api/friend"
import { BookRecommendation } from "@/components/BookRecommendationEditor"
import Button from "./Button"
import AuthGuard from "./AuthGuard"
import BookRecommendationEditorDialog from "./BookRecommendationEditorDialog"
import ProgressUpdateEditorDialog from "./ProgressUpdateEditorDialog"

interface BookDetailProps {
    book: BriefBook
}

export default function BookDetail({ book }: BookDetailProps) {
    const [isRecommendationEditorOpen, toggleRecommendationEditor] =
      useState<boolean>(false)
    const [isProgressUpdateEditorOpen, toggleProgressUpdateEditor] =
      useState<boolean>(false)

    const authorNames = book.authors
        .map((author) => (
            <Link key={author.id} href={`/authors/${author.id}`}>
                {author.fullName}
            </Link>
        ))
        // Place commas between authors
        .reduce(
            (acc: JSX.Element | null, e: JSX.Element) => acc === null ? e : <>{acc}, {e}</>,
            null
        );

    return (
        <div css={mainCss}>
            <img src={book.coverImageUrl} alt="Book cover" width={300} height={480} />

            <div css={detailsCss}>
                <p css={titleCss}>{book.title}</p>
                <p css={authorCss}>{book.authors.length ? <>by {authorNames}</> : <i>unknown author</i>}</p>

                <AuthGuard>
                    <div css={css`margin-top: 10px; display: flex; column-gap: 5px;`}>
                        <Button onClick={() => toggleRecommendationEditor(true)}>
                            Recommend
                        </Button>
                        <Button onClick={() => toggleProgressUpdateEditor(true)}>
                            Update progress
                        </Button>
                    </div>
                </AuthGuard>
            </div>

            <BookRecommendationEditorDialog
                open={isRecommendationEditorOpen}
                onClose={() => {
                    toggleRecommendationEditor(false)
                }}
                onDone={({ friend, message }: BookRecommendation): void => {
                    recommendBook(message, book.id, friend.id)
                    toggleRecommendationEditor(false)
                }}
            />

            <ProgressUpdateEditorDialog
                open={isProgressUpdateEditorOpen}
                onClose={() => toggleProgressUpdateEditor(false)}
                onDone={(progressUpdate) => {
                    toggleProgressUpdateEditor(false)
                }}
            />
        </div>
    )
}

const mainCss = css`
    width: 100%;
    display: flex;
    padding: 25px 0;
`

const detailsCss = css`
    display: inline-flex;
    flex-grow: 1;
    flex-direction: column;
    padding: 25px 20px;
`

const titleCss = css`
    font-size: 2em;
    font-weight: bold;
`

const authorCss = css`
    font-size: 1.1.em;
`