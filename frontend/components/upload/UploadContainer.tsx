import { useState, useContext } from "react";
import DropArea from "./DropArea";
import UpLoadFile from "./UpLoadFile";
import { BooksDataContext } from "../../contexts/BooksDataContext";

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
      const response = await fetch("/process-image", {
        method: "post",
        body: formData,
      });
      if (response.ok) {
        const { data } = await response.json();
        setBooksData(JSON.parse(data));
      } else {
        console.warn("Response failed:", response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <DropArea callback={processImage} imageUrl={imageUrl} />
      <UpLoadFile callback={processImage} />
    </>
  );
}
