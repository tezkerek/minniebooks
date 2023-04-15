import { css } from "@emotion/react"
import styled from "@emotion/styled"
import Book from "@/entities/book"
import StarRating from "./StarRating"

interface BookItemProps {
    book: Book
}

const Item = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 10px;
    text-align: center;
`

export default function BookItem({ book }: BookItemProps) {
    return (
        <Item>
            <img src={book.coverImageUrl} width={100} height={160} alt="Book cover" css={css`border: 1px solid gray;`} />
            <p css={css`
                font-size: 1.1em;
                font-weight: bold;
            `}>{book.title}</p>
            <p css={css`font-size: 0.9em`}>{book.author}</p>
            <StarRating rating={book.rating} />
        </Item>
    )
}