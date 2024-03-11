import { useState } from "react";
import DropArea from "./DropArea";
import UpLoadFile from "./UpLoadFile";

type UploadContainerProps = {
  setBooksData: (data: any) => void;
};

export function UploadContainer({ setBooksData }: UploadContainerProps) {
  const [imageUrl, setImageUrl] = useState("");

  async function processImage(file: File) {
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
        console.warn("response failed:", response);
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
