import styles from "./UpLoadFile.module.css";

type UploadFileProps = {
  callback: (file: File) => void;
};

function UpLoadFile({ callback }: UploadFileProps) {
  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file || !file.type.match(/^image\//)) {
      console.error("Please select an image file.");
      return;
    }

    callback(file);
  }

  return (
    <>
      <div className={styles["upload-container"]}>
        {/* Explicitly setting htmlFor="file-upload" to match input id */}
        <label className={styles["upload-button"]} htmlFor="file-upload">
          Or click here to upload
        </label>
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
