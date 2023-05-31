import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { BriefBook } from "@/entities/book"
import StarRating from "./StarRating"

interface BookItemProps {
    book: BriefBook
}

const Item = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 5px 10px;
    text-align: center;
`

export default function BookItem({ book }: BookItemProps) {
    // Indicate if there is more than one author
    const authorCount = book.authors.length
    const firstAuthor = book.authors.at(0)?.fullName ?? "unknown"
    const fullAuthorLine = firstAuthor + (authorCount >= 2 ? ` +${authorCount - 1}` : "")

    return (
        <Item>
            <img src={book.coverImageUrl} width={100} height={160} alt="Book cover" css={css`border: 1px solid gray;`} />
            <p css={css`
                font-size: 1.1em;
                font-weight: bold;
            `}>{book.title}</p>
            <p css={css`font-size: 0.9em`}>{fullAuthorLine}</p>
            <StarRating rating={book.rating} />
        </Item>
    )
}