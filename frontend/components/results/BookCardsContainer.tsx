import { BookData } from "../../App";
import { BookCard } from "./BookCard";
import styles from "./BookCardsContainer.module.css";
import { useState } from "react";
import arrowImage from "../../assets/arrow.png";
import { v4 as uuidv4 } from "uuid";

type BookCardsContainerProps = {
  bookData: BookData[];
  shadowColor: string;
  bookDataIndex: number;
};

export function BookCardsContainer({
  bookData,
  shadowColor,
  bookDataIndex,
}: BookCardsContainerProps) {
  const [firstBook, ...otherBooks] = bookData;
  const [showMoreBooks, setShowMoreBooks] = useState(false);

  function toggleShowMoreBooks() {
    setShowMoreBooks(!showMoreBooks);
  }
  return (
    <>
      {" "}
      <div
        className={`${styles["book-card-container"]} ${styles[shadowColor]}`}
      >
        {/* Display the first book separately if it exists */}
        {firstBook && (
          <div className={styles["first-book"]}>
            <BookCard
              bookDataIndex={bookDataIndex}
              key={firstBook.id}
              book={firstBook}
            />
          </div>
        )}
        {otherBooks.length > 0 && (
          <button
            className={styles["see-more-versions"]}
            onClick={(event) => {
              console.log(event.target);
              toggleShowMoreBooks();
            }}
          >
            <img
              src={arrowImage}
              className={`${styles.arrow} ${
                showMoreBooks ? "" : styles.closed
              }`}
            />
            See More Versions
          </button>
        )}
      </div>
      {showMoreBooks && (
        <ul className={styles["more-books-list"]}>
          {otherBooks.map((book) => (
            <div
              className={`${styles["book-card-container"]} ${styles[shadowColor]}`}
            >
              <BookCard key={uuidv4()} book={book} />
            </div>
          ))}
        </ul>
      )}
    </>
  );
}
