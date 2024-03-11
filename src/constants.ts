import dotenv from "dotenv";
dotenv.config();

export const googleOcrCredentials = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY!.replace(/\\n/g, "\n"),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

export const chatGptApiKey = process.env.CHAT_GPT_API_KEY;

// export const gptPromt = `Please parse the following text from googles OCR of an image of books. I need the likely book titles in json format. You are
// an API and your response is going to another API so you must be very exact about the format that you return the json string. Return
// this exact format:
// [
// {
//   "title": “EXAMPLE BOOK TITLE”,
//   "subtitle": “example subtitle”
// },
// {
//   "title": "EXAMPLE BOOK TITLE”,
//   "author": “example author”,
//   "subtitle": "example subtitle"
// }
// ]
// which means do not include excluding ANY explanatory text, I repeat, no text other than the formatted books in JSON! -
// The following is the text that needs parsing: `;
export const gptPromt = `Please parse the following text from googles OCR of an image of books. I need the likely book titles in json format. You are
        an API and your response is going to another API so you must be very exact about the format that you return the json string. Return
        this exact format - which means excluding ANY explanatory text, I repeat, no text other than the formatted books in JSON! -   
        [{
          "title": “EXAMPLE BOOK TITLE”,
          "subtitle": “example subtitle”
        },
        {
          "title": "EXAMPLE BOOK TITLE”,
          "author": “example author”,
          "subtitle": "example subtitle"
        }]  - The following is the text that needs parsing:`;

export const apiKEYGoogleBooks = process.env.GOOGLE_API_KEY;
