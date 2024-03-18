import { DragEvent } from "react";
import styles from "./DropArea.module.css";

type DropAreaProps = {
  callback: (file: File) => void;
  imageUrl: string;
};

function DropArea({ callback, imageUrl }: DropAreaProps) {
  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (!file || !file.type.match(/^image\//)) {
      console.error("there is no photo. need to code and actual error later");
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
        src="./assets/book_drag_and_drop.png"
        alt=""
        className={styles["drop-png"]}
      />
      <div className={styles["image-preview"]} id="imagePreview">
        {imageUrl && <img src={imageUrl} alt="" />}
      </div>
    </div>
  );
}

export default DropArea;
