import Book from "@/entities/book"
import styles from "@/styles/BookDetail.module.scss"

interface BookItemProps {
    book: Book
}

export default function BookItem({ book }: BookItemProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '5px 10px' }}>
            <img src={book.coverImageUrl} width={100} height={160} alt="Book cover" style={{ border: '1px solid gray' }} />
            <p style={{ textAlign: 'center', fontSize: '1.1em' }}><b>{book.title}</b></p>
            <p style={{ textAlign: 'center', fontSize: '0.9em' }}>{book.author}</p>
            <span className={styles.ratingStar}>{"★".repeat(book.rating).padEnd(5, "☆")}</span>
        </div>
    )
}