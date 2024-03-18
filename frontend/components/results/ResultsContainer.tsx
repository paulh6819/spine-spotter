import { BookCardsContainer } from "./BookCardsContainer";
import styles from "./ResultsContainer.module.css";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { BooksDataContext } from "../../contexts/BooksDataContext";

const colors = ["blue-shadow", "pink-shadow", "green-shadow", "yellow-shadow"];

export function ResultsContainer() {
  const { booksData } = useContext(BooksDataContext);
  return (
    <div className={styles.container}>
      {booksData.map((bookDataArray, index) => {
        return (
          <BookCardsContainer
            bookDataIndex={index}
            shadowColor={colors[index % 4]}
            key={uuidv4()}
            bookData={bookDataArray}
          />
        );
      })}
    </div>
  );
}
