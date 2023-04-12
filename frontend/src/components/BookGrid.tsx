import Book from "@/entities/book";
import BookItem from "@/components/BookItem";
import Link from "next/link";

export default function BookGrid({ books }: BookGridProps) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
            {books.map(book =>
                <Link key={book.id} href={`/books/${book.id}`}>
                    <BookItem book={book} />
                </Link>
            )}
        </div>
    )
}

interface BookGridProps {
    books: Array<Book>
}