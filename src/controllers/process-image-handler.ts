import { Request, Response, response } from "express";
import { extractTextFromImage } from "./googleOCRProcessing.js";
import {
  parseTitlesWithChatGPT,
  parseTitlesWithChatGPTSSE,
} from "./parseTitlesWithChatGPT.js";
import {
  googleBooksAPIProcessing,
  linearSearch,
  BookData,
} from "./google-books-api-processing.js";

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
    const allBooksDataBackFromGooglesBooksAPI = [];
    for (const bookObj of parsedGPTResult) {
      if (!bookObj?.title) {
        return;
      }
      const booksData = await googleBooksAPIProcessing(bookObj.title);
      allBooksDataBackFromGooglesBooksAPI.push(booksData);
    }

    res.json({
      serverMessage: "Image processed successfully",
      data: JSON.stringify(allBooksDataBackFromGooglesBooksAPI),
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

export async function processImageSSE(req: Request, res: Response) {
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
    const stageOneResponse = {
      stage: "one",
      payload: ocrResult,
    };
    res.write(JSON.stringify(stageOneResponse));

    //streaming approach

    // Adjusted to handle streaming data from parseTitlesWithChatGPT
    const gptPayload = await parseTitlesWithChatGPTSSE(
      ocrResult,
      (chunk: string) => {
        const stageTwoResponse = { stage: "two", payload: chunk };
        res.write(JSON.stringify(stageTwoResponse));
      }
    );

    //parse titles with chatGPT's API ----> payload approach
    // const gptPayload = await parseTitlesWithChatGPT(ocrResult);
    if (!gptPayload) {
      return res
        .status(500)
        .json({ error: "Failed to parse titles from OCR with chatGPT" });
    }
    const parsedGPTResult = JSON.parse(gptPayload);
    // const stageTwoResponse = { stage: "two", payload: gptPayload };
    // res.write(JSON.stringify(stageTwoResponse));

    // getting books information from googles book API
    for (const bookObj of parsedGPTResult) {
      if (!bookObj?.title) {
        return;
      }

      const booksData = await googleBooksAPIProcessing(bookObj.title);
      const stageThreeResponse = {
        stage: "three",
        payload: booksData,
      };

      const num = 8;
      let randonObj: BookData = {
        id: "q8Jx0AEACAAJ",
        etag: " ",
        title: " ",
        authors: [" "],
        publisher: " ",
        publishedDate: " ",
        description: " ",
        pageCount: 1,
        categories: [" "],
        imageLinks: {
          smallThumbnail: " ",
          thumbnail: " ",
          small: " ",
          medium: " ",
          large: " ",
          extraLarge: " ",
        },
        language: " ",
        previewLink: " ",
        country: " ",
        forSaleOnGoogleBooks: true,
        availibleAsGoogleEbook: true,
        listPrice: {
          amount: 1,
          currencyCode: " ",
        },
        retailPrice: {
          amount: 1,
          currencyCode: " ",
        },
        buyLink: " ",
        isbn: [
          {
            type: " ",
            identifier: " ",
          },
        ],
      };

      const response = linearSearch(
        booksData as BookData[],
        randonObj as BookData
      );
      console.log("this is the linear test", response);
      res.write(JSON.stringify(stageThreeResponse));
    }

    res.write("\n\n");
    res.end();
  } catch (error) {
    console.error("There was an error.", error);
    res.end();
  }
}
