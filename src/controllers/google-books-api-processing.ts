import { apiKEYGoogleBooks } from "../constants.js";

export async function googleBooksAPIProcessing(bookTitle: string) {
  const constructedURL = `https://www.googleapis.com/books/v1/volumes?q=intitle:"${encodeURIComponent(
    bookTitle
  )}"&key=${apiKEYGoogleBooks}`;

  try {
    //this is what's bringing back the actul data from googles book API
    const googleBooksResponse = await fetch(constructedURL);
    if (googleBooksResponse.ok) {
      const parsedResponse = await googleBooksResponse.json();
    } else {
      console.log("Fetch from google books failed", googleBooksResponse);
    }
  } catch (error) {
    console.warn(error);
  }
}
