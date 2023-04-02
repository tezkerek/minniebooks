import Book from "@/entities/book";
import Link from "next/link";

function BookItem({ book }: BookItemProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '5px 10px' }}>
            <img src={book.coverImageUrl} width={100} height={160} alt="Book cover" style={{ border: '1px solid gray' }} />
            <p style={{ textAlign: 'center', fontSize: '1.1em' }}><b>{book.title}</b></p>
            <p style={{ textAlign: 'center', fontSize: '0.9em' }}>{book.author}</p>
        </div>
    )
}

interface BookItemProps {
    book: Book;
}

export default function BookGrid({ books }: BookGridProps) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
            {books.map(book =>
                <Link href={`/books/${book.id}`}>
                    <BookItem book={book} />
                </Link>
            )}
        </div>
    )
}

interface BookGridProps {
    books: Array<Book>
}