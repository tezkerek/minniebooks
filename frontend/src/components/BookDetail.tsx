import { css } from "@emotion/react"
import Book from "@/entities/book"
import Button from "./Button"

interface BookDetailProps {
    book: Book
}

export default function BookDetail({ book }: BookDetailProps) {
    return (
        <div css={mainCss}>
            <img src={book.coverImageUrl} alt="Book cover" width={300} height={480} />

            <div css={detailsCss}>
                <p css={titleCss}>{book.title}</p>
                <p css={authorCss}>by {book.author}</p>

                <div css={css`margin-top: 10px;`}>
                    <Button onClick={console.log}>Recommend</Button>
                </div>
            </div>
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