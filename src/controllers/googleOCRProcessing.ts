import { ImageAnnotatorClient } from "@google-cloud/vision";
import { googleOcrCredentials } from "../constants.js";

const client = new ImageAnnotatorClient({ credentials: googleOcrCredentials });

export async function extractTextFromImage(imageBuffer: any) {
  try {
    const [result] = await client.textDetection(imageBuffer);
    if (!result.textAnnotations) {
      throw new Error("text annotaions does not exist on OCR result. PH");
    }
    console.log("result.textAnnotations", result.textAnnotations);
    const text = result.textAnnotations.length
      ? result.textAnnotations[0]?.description
      : "";
    return text;
  } catch (error) {
    console.error("Failed to process image with Google OCR (PH):", error);
    return;
  }
}
