import { DragEvent } from "react";
import styles from "./DropArea.module.css";
import DragAndDropImage from "../../assets/book_drag_and_drop.png";

type DropAreaProps = {
  callback: (file: File) => void;
  imageUrl: string;
};

function DropArea({ callback, imageUrl }: DropAreaProps) {
  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (!file) {
      console.error("Please select an image file.");
      return;
    }

    callback(file);
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
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
        src={DragAndDropImage}
        alt="Drag and drop image"
        className={styles["drop-png"]}
      />
      <div className={styles["image-preview"]} id="imagePreview">
        {imageUrl && <img src={imageUrl} alt="" />}
      </div>
    </div>
  );
}

export default DropArea;
