import { Router } from "express";
import multer from "multer"; // For handling file uploads

import { parseTitlesWithChatGPT } from "./parseTitlesWithChatGPT.js"; // Mock function for ChatGPT processing

import { extractTextFromImage } from "./googleOCRProcessing.js";
const router = Router();
const PORT = process.env.PORT || 3000;
const upload = multer({ storage: multer.memoryStorage() });

router.post("/detectLabels", upload.single("image"), async (req, res) => {
  // Set headers for Server-Sent Events
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  if (!req.file) {
    console.log("No image provided.");
    return res.status(400).send("No image uploaded.");
  }

  try {
    // Step 1: Process the image with OCR and get text
    const ocrResult = await extractTextFromImage(req.file.buffer);
    if (!ocrResult) {
      console.log("There is no OCR text result.PH");
      return;
    }
    res.write(
      `data: ${JSON.stringify({
        stage: "OCR processing complete",
        ocrResult,
      })}\n\n`
    );

    // Step 2: Use ChatGPT to parse OCR result into likely book titles
    // const chatGPTResult = await parseTitlesWithChatGPT(ocrResult);
    // res.write(
    //   `data: ${JSON.stringify({
    //     stage: "ChatGPT parsing complete",
    //     chatGPTResult,
    //   })}\n\n`
    // );

    // Step 3: Fetch book information from Google Books API
    // const booksInfo = await fetchBooksInfo(chatGPTResult.titles);
    // res.write(
    //   `data: ${JSON.stringify({
    //     stage: "Fetched book info from Google Books",
    //     booksInfo,
    //   })}\n\n`
    // );
  } catch (error) {
    console.error("Error in processing:", error);
    res.write(
      `data: ${JSON.stringify({
        error: "An error occurred during processing.",
      })}\n\n`
    );
  }

  // Ensure the connection is closed properly
  res.end();
});
