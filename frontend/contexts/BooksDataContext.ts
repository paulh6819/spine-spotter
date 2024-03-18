import { createContext } from "react";
import type { BookData } from "../App";

type BooksData = {
  booksData: BookData[][];
  setBooksData: (booksData: BookData[][]) => void;
};

const defaultBooks: BooksData = {
  booksData: [],
  setBooksData: () => {},
};
export const BooksDataContext = createContext(defaultBooks);
