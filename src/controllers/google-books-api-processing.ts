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

// Sort Methods:

/**
 * Take in an array of BookData & place its elements into ascending order by insertion sort.
 * Precondition: `compare()` method for BookData objects must be implemented.
 * 
 * Postcondition: Provided BookData array is in ascending order.
 */
function insertionSort():void {}

/**
 * Take in an array of BookData & place its elements into ascending order by selection sort.
 * Precondition: `compare()` method for BookData objects must be implemented.
 * 
 * Postcondition: Provided BookData array is in ascending order.
 */
function selectionSort():void {}


// Search Methods:

/**
 * Implement a linear search, find an element in an array of BookData by provided BookData.
 * This could be thought of as the 'haystack' is a `BookData[]` 
 * and the needle is a `BookData`
 * 
 * Params should be the BookData array to search, and the BookData obj to find.
 * Optionally provide the number of elements as well -- How would we go about implementing
 * this with& without passing in the number of elements?
 * 
 * Precondition: `equals()` method must be implemented for type BookData.
 * 
 * Prompt: When would we use a linear search? What are its pros/cons
 */
function linearSearch():number {return -1}

/**
 * Implement a binary search, find an element in an array of BookData by provided BookData.
 * This could be thought of as the 'haystack' is a `BookData[]` 
 * and the needle is a `BookData`
 * 
 * Params should be the BookData array to search, and the BookData obj to find.
 * Optionally provide the number of elements as well -- How would we go about implementing
 * this with& without passing in the number of elements?
 * 
 * Precondition: `equals()` method must be implemented for type BookData.
 * 
 * Prompt: When would we use a binary search? What are its pros/cons
 */
function binarySearch():number {return -1}


// Probably cover this way later.
function binarySearchRecursive():number {return -1}





/**
 * "helpers" for searching & sorting algos. Comparable to overloaded operators.
 * E.G.
 *  `equals(someParam1:SomeType,someParam2: SomeType):boolean{...}` 
 *  would essentially be `bool operator ==(const SomeType &someParam1, const SomeType &someParam2);`
 */


/**
 * This function will be used to compare two BookData objects for equality.
 * We'll consider two BookData objects to be equal if their id property are the same.
 * 
 * It should take in two arguments, both of type BookData. The first
 * being considered the left hand value(LHV), and the second being the right hand value(RHV).
 * 
 * It should use the BookData.id property to see if the LHV's id
 * is the same as the RHV's id. 
 * If LHV.id is the same as RHV.id, we should return true.
 */
function equals():boolean {return false;}

/**
 * This function will be used to compare two BookData objects.
 * 
 * It should take in two arguments, both of type BookData. The first
 * being considered the left hand value(LHV), and the second being the right hand value(RHV).
 * 
 * It should use the BookData.id property to see if the LHV
 * is less than the RHV. 
 * If LHV is less than RHV, we should return true.
 */
function compare():boolean {return false;}
