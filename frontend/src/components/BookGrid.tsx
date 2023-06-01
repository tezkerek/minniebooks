import Link from "next/link";
import styled from "@emotion/styled";
import { BriefBook } from "@/entities/book";
import BookItem from "@/components/BookItem";
import { css } from "@emotion/react";

const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
`

export default function BookGrid({ books }: BookGridProps) {
    return (
        <Grid>
            {books.map(book =>
                <div
                    key={book.id}
                    css={css`
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                    `}
                >
                    <Link href={`/books/${book.id}`}>
                        <BookItem book={book} />
                    </Link>
                </div>
            )}
        </Grid>
    )
}

interface BookGridProps {
    books: Array<BriefBook>
}