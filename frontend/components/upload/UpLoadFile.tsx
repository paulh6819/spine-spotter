import styles from "./UpLoadFile.module.css";

type UploadFileProps = {
  callback: (file: File) => void;
};

function UpLoadFile({ callback }: UploadFileProps) {
  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      console.error("Please select an image file.");
      return;
    }

    callback(file);
  }

  return (
    <>
      <div className={styles["upload-container"]}>
        <label className={styles["upload-button"]} htmlFor="file-upload">
          Or click here to upload
        </label>
      </div>

      <input
        id="file-upload"
        type="file"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
    </>
  );
}

export default UpLoadFile;
