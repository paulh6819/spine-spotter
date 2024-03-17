import { useState } from "react";
import { BookData } from "../../App";
import { shortenText } from "../../utils/formatting";
import styles from "./BookCard.module.css";

type BookCardProps = {
  book: BookData;
};

export function BookCard({ book }: BookCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [fullText, setFullText] = useState(false);
  return (
    <div className={styles["book-card-wrapper"]}>
      <div className={styles["book-style-wrapper"]}>
        <img
          className={`${styles["book-card-img"]} ${
            detailsOpen ? styles["details-open"] : ""
          }`}
          src={book.imageLinks?.thumbnail}
          alt={book.title}
        />
        <details
          className={styles["details"]}
          onToggle={(event) => {
            const target = event.target as HTMLDetailsElement;
            setDetailsOpen(target.open);
          }}
        >
          <summary>{book.title}</summary>
          <span>
            <span style={{ color: "gray" }}>Author:</span>
            {book.authors}
          </span>
          <span>
            <span style={{ color: "gray" }}>Publisher:</span>
            {book.publisher}
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
          ({" "}
          <a href={book.previewLink ?? "#"} target="_blank" rel="noreferrer">
            <span style={{ color: "gray" }}> Link to Google books:</span>
          </a>
          <hr />
          <p>
            {fullText === true
              ? ""
              : book.description
              ? shortenText(book.description, 80)
              : "No summary found."}

            <p>{fullText && book.description}</p>

            {/* style button below on css page, make sure it's indicated that it's clickable */}
            {book.description && (
              <button onClick={() => setFullText(true)}>...</button>
            )}
          </p>
          <hr />)
        </>
      )}
      {/* <p>{isbn13 && <p>ISBN-13: {isbn13}</p>}</p> */}
      <button
        onClick={() => console.log("delete this id", book.id)}
        className={styles["close-button"]}
      >
        X
      </button>
    </div>
  );
}
