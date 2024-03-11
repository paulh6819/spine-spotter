import { BookData } from "../../App";

type ResultsContainerProps = { booksData: BookData[][] };

export function ResultsContainer({ booksData }: ResultsContainerProps) {
  console.log(booksData);
  return (
    <div>
      <h1>Results Container</h1>
    </div>
  );
}
