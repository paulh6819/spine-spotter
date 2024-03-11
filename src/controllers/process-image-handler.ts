import { Request, Response } from "express";
import { extractTextFromImage } from "./googleOCRProcessing.js";
import { parseTitlesWithChatGPT } from "./parseTitlesWithChatGPT.js";
import { googleBooksAPIProcessing } from "./google-books-api-processing.js";

export async function processImage(req: Request, res: Response) {
  try {
    // Check for the presence of the file and its buffer
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No image file provided." });
    }

    //get text from images with googles OCR
    const imageDataBuffer = req.file.buffer;
    const ocrResult = await extractTextFromImage(imageDataBuffer);
    if (!ocrResult) {
      return res.status(500).json({ error: "Failed to get OCR result" });
    }

    //parse titles with chatGPT's API
    const gptPayload = await parseTitlesWithChatGPT(ocrResult);
    if (!gptPayload) {
      return res
        .status(500)
        .json({ error: "Failed to parse titles from OCR with chatGPT" });
    }
    const parsedGPTResult = JSON.parse(gptPayload);

    //getting books information from googles book API
    for (const bookObj of parsedGPTResult) {
      if (!bookObj?.title) {
        return;
      }
      const booksData = await googleBooksAPIProcessing(bookObj.title);
      console.log("book data from googles book API", booksData);
    }

    res.json({
      serverMessage: "Image processed successfully",
      data: JSON.stringify(gptPayload),
    });
  } catch (error) {
    // Log the error or handle it accordingly
    console.error("Error processing image:", error);

    // Respond with a server error status code and message
    res
      .status(500)
      .json({ error: "An error occurred while processing the image." });
  }
}
