import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { BriefBook } from "@/entities/book"
import StarRating from "./StarRating"
import { Card, CardContent, CardMedia } from "@mui/material"

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

const Cover = styled.img`
    width: 140px;
    height: 224px;
    border-radius: 5px;
`

export default function BookItem({ book }: BookItemProps) {
    // Indicate if there is more than one author
    const authorCount = book.authors.length
    const firstAuthor = book.authors.at(0)?.fullName ?? "unknown"
    const fullAuthorLine = firstAuthor + (authorCount >= 2 ? ` +${authorCount - 1}` : "")

    return (
        <Card css={css`width: 160px;`}>
            <CardMedia component="img" image={book.coverImageUrl} alt="Book cover" height="224" />
            <CardContent css={css`text-align: center;`}>
                <p css={css`
                    margin-top: 5px;
                    font-size: 1.2em;
                    font-weight: bold;
                `}>{book.title}</p>
                <p css={css`font-size: 0.8em`}>{fullAuthorLine}</p>
                <StarRating rating={book.rating} />
            </CardContent>
        </Card>
    )
}