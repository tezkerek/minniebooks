import Book from "@/entities/book"
import styles from "@/styles/BookDetail.module.scss"

interface BookDetailProps {
    book: Book
}

export default function BookDetail({ book }: BookDetailProps) {
    return (
        <div className={styles.main}>
            <img src={book.coverImageUrl} alt="Book cover" className={styles.bookCover} />

            <div className={styles.details}>
                <p className={styles.title}>{book.title}</p>
                <p className={styles.author}>by {book.author}</p>
            </div>
        </div>
    )
}