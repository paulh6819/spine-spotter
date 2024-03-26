import { useState, useContext } from "react";
import DropArea from "./DropArea";
import UpLoadFile from "./UpLoadFile";
import { BooksDataContext } from "../../contexts/BooksDataContext";
import type { BookData } from "../../App";

export function UploadContainer() {
  const [imageUrl, setImageUrl] = useState("");
  const { setBooksData } = useContext(BooksDataContext);

  async function processImage(file: File) {
    if (!file || !file.type.match(/^image\//)) {
      console.error("Please select an image file.");
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    setImageUrl(fileUrl);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const eventSource = await fetch("/process-image-stream", {
        method: "post",
        body: formData,
      });
      if (eventSource.ok) {
        const reader = eventSource.body
          ?.pipeThrough(new TextDecoderStream())
          .getReader();
        if (!reader) {
          throw new Error("failed to create reader");
        }
        let books: BookData[][] = [];
        let count = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const output = await JSON.parse(value);
          if (output.stage === "two") {
            const book = [{ title: output.payload }];
            books = [...books, book];

            console.log("this is the book title stage two", book, books.length);
            setBooksData(books);
          }
          if (output.stage === "three") {
            console.log("this is in stage three", output.payload);
            books[count] = output.payload;
            setBooksData([...books]);
            count++;
          }
        }
      } else {
        console.warn("Response failed:", eventSource);
      }
    } catch (error) {
      console.error(error);
    }

    // try {
    //   const response = await fetch("/process-image", {
    //     method: "post",
    //     body: formData,
    //   });
    //   if (response.ok) {
    //     const { data } = await response.json();
    //     setBooksData(JSON.parse(data));
    //   } else {
    //     console.warn("Response failed:", response);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }
  return (
    <>
      <DropArea callback={processImage} imageUrl={imageUrl} />
      <UpLoadFile callback={processImage} />
    </>
  );
}
