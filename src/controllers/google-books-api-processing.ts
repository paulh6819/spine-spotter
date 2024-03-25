import { apiKEYGoogleBooks } from "../constants.js";

type BookData = {
  id: string;
  etag: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: number;
  categories: string[];
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
  };
  language: string;
  previewLink: string;
  country: string;
  forSaleOnGoogleBooks: boolean;
  availibleAsGoogleEbook: boolean;
  listPrice: {
    amount: number;
    currencyCode: string;
  };
  retailPrice: {
    amount: number;
    currencyCode: string;
  };
  buyLink: string;
  isbn: {
    type: string;
    identifier: string;
  }[];
};

export async function googleBooksAPIProcessing(bookTitle: string) {
  const constructedURL = `https://www.googleapis.com/books/v1/volumes?q=intitle:"${encodeURIComponent(
    bookTitle
  )}"&key=${apiKEYGoogleBooks}`;

  try {
    //this is what's bringing back the actul data from googles book API
    const googleBooksResponse = await fetch(constructedURL);
    if (googleBooksResponse.ok) {
      const parsedResponse = await googleBooksResponse.json();
      const booksData: BookData[] = [];
      for (const item of parsedResponse.items) {
        const data = {
          id: item.id,
          etag: item.etag,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          publisher: item.volumeInfo.publisher,
          publishedDate: item.volumeInfo.publishedDate,
          description: item.volumeInfo.description,
          pageCount: item.volumeInfo.pageCount,
          categories: item.volumeInfo.categories,
          imageLinks: item.volumeInfo.imageLinks,
          language: item.volumeInfo.language,
          previewLink: item.volumeInfo.previewLink,
          country: item.saleInfo.country,
          forSaleOnGoogleBooks: item.saleInfo.saleability === "FOR_SALE",
          availibleAsGoogleEbook: item.saleInfo.isEbook,
          listPrice: item.saleInfo.listPrice,
          retailPrice: item.saleInfo.retailPrice,
          buyLink: item.saleInfo.buyLink,
          isbn: item.volumeInfo.industryIdentifiers,
        };
        booksData.push(data);
      }
      console.log("booksData", booksData);
      return booksData;
    } else {
      console.log("Fetch from google books failed", googleBooksResponse);
    }
  } catch (error) {
    console.warn(error);
  }
}
