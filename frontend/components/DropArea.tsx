import { DragEvent, useState } from "react";
import styles from "./DropArea.module.css";

function DropArea() {
  const [imageUrl, setImageUrl] = useState("");
  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (!file || !file.type.match(/^image\//)) {
      console.error("there is no photo. need to code and actual error later");
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    // image.src = fileUrl;
    setImageUrl(fileUrl);
    processImage(file);
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  async function processImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch("/process-image", {
        method: "post",
        body: formData,
        // headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.ok) {
        const { data } = await response.json();
        console.log(JSON.parse(data));
      } else {
        console.warn("response failed:", response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={styles["drop-area"]}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      id="drop-area-javascript"
    >
      <h4 id="drag-and-drop-text">Drag and drop a photo of books here</h4>
      <img
        src="./assets/book_drag_and_drop.png"
        alt=""
        className={styles["drop-png"]}
      />
      <div className={styles["image-preview"]} id="imagePreview">
        {imageUrl && <img src={imageUrl} alt="" />}
        <p id="imageMessage"></p>
      </div>
    </div>
  );
}

export default DropArea;
