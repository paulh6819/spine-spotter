import { useState } from "react";
import styles from "./UpLoadFile.module.css";

function UpLoadFile() {
  const [uploadStatus, setUploadStatus] = useState<string>("");

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file || !file.type.match(/^image\//)) {
      console.error("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      await fetch("/detectLabels", {
        method: "POST",
        body: formData,
      });
      setUploadStatus("File uploaded. Waiting for processing...");
      setupSSE();
    } catch (error) {
      console.error("Error submitting image:", error);
      setUploadStatus("Failed to upload file.");
    }
  }

  function setupSSE() {
    const eventSource = new EventSource("/detectLabels");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Update from server:", data);
      setUploadStatus(`Processing: ${data.stage}`);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
      setUploadStatus("Connection closed.");
    };
  }

  return (
    <>
      <div className={styles["upload-container"]}>
        {/* Explicitly setting htmlFor="file-upload" to match input id */}
        <label className={styles["upload-button"]} htmlFor="file-upload">
          Or click here to upload
        </label>
        <p>{uploadStatus}</p>
      </div>
      {/* Use a consistent id "file-upload" that matches the htmlFor attribute of the label */}
      <input
        id="file-upload" // This needs to match the htmlFor attribute of the label
        type="file"
        onChange={handleFileSelect}
        style={{ display: "none" }} // Hide the actual input but keep it functional
      />
    </>
  );
}

export default UpLoadFile;
