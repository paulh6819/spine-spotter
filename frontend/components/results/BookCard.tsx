import { useState, useContext } from "react";
import { BookData } from "../../App";
import { shortenText } from "../../utils/formatting";
import styles from "./BookCard.module.css";
import { BooksDataContext } from "../../contexts/BooksDataContext";
import notFoundImage from "../../assets/no_book_found_photo.webp";

type BookCardProps = {
  book: BookData;
  bookDataIndex?: number;
};

export function BookCard({ book, bookDataIndex }: BookCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [fullText, setFullText] = useState(false);
  const { booksData, setBooksData } = useContext(BooksDataContext);

  function deleteBook() {
    if (typeof bookDataIndex === "undefined") return;
    const newBooksData = Array.from(booksData);
    newBooksData.splice(bookDataIndex, 1);
    setBooksData(newBooksData);
  }

  return (
    <div className={styles["book-card-wrapper"]}>
      <div className={styles["book-style-wrapper"]}>
        <img
          className={`${styles["book-card-img"]} ${
            detailsOpen ? styles["details-open"] : ""
          }`}
          src={book.imageLinks?.thumbnail ?? notFoundImage}
          alt={book.title ?? "Loading..."}
        />
        <details
          className={styles["details"]}
          onToggle={(event) => {
            const target = event.target as HTMLDetailsElement;
            setDetailsOpen(target.open);
          }}
        >
          <summary>{book.title ?? "Loading..."}</summary>
          <span>
            <span style={{ color: "gray" }}>Author:</span>
            {book.authors ?? ["Loading"]}
          </span>
          <span>
            <span style={{ color: "gray" }}>Publisher:</span>
            {book.publisher ?? "Loading..."}
          </span>
          <span>
            <span style={{ color: "gray" }}>ISBN:</span>
            {book.isbn?.length && book.isbn[0].identifier}
          </span>
          <span>
            <span style={{ color: "gray" }}> Price on Google books:</span>
            {book.listPrice ? book.listPrice.amount : "No price found."}
          </span>
        </details>
      </div>
      {detailsOpen && (
        <>
          <a href={book.previewLink ?? "#"} target="_blank" rel="noreferrer">
            <span style={{ paddingLeft: "1rem", color: "gray" }}>
              {" "}
              Link to Google books
            </span>
          </a>
          <hr className={styles.hr} />
          <p className={styles.description}>
            {fullText === true
              ? null
              : book.description
              ? shortenText(book.description, 80)
              : "No summary found."}

            {fullText && book.description}

            {book.description &&
              book.description.split(" ").length > 81 &&
              !fullText && (
                <button
                  onClick={() => {
                    setFullText(true);
                  }}
                  className={styles.ellipses}
                >
                  (...)
                </button>
              )}
          </p>
        </>
      )}
      {typeof bookDataIndex !== "undefined" && (
        <button onClick={deleteBook} className={styles["close-button"]}>
          X
        </button>
      )}
    </div>
  );
}
