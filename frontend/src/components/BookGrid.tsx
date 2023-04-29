import Link from "next/link";
import styled from "@emotion/styled";
import { BriefBook } from "@/entities/book";
import BookItem from "@/components/BookItem";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
`

export default function BookGrid({ books }: BookGridProps) {
    return (
        <Grid>
            {books.map(book =>
                <Link key={book.id} href={`/books/${book.id}`}>
                    <BookItem book={book} />
                </Link>
            )}
        </Grid>
    )
}

interface BookGridProps {
    books: Array<BriefBook>
}