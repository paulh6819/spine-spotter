import OpenAI from "openai";
import { chatGptApiKey, gptPromt } from "../constants.js";

const openai = new OpenAI({
  apiKey: chatGptApiKey,
});

// export async function parseTitlesWithChatGPT(ocrText: string) {
//   const stream = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [
//       {
//         role: "user",
//         content: gptPromt + ocrText,
//       },
//     ],
//     stream: true,
//   });

//   let responseContent = "";
//   for await (const part of stream) {
//     responseContent += part.choices[0]?.delta?.content || "";
//   }
//   console.log("responseContent", responseContent);

//   return responseContent;
// }

export async function parseTitlesWithChatGPT(
  ocrText: string,
  onChunk: (chunk: string) => void
): Promise<void> {
  const stream = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: gptPromt + ocrText,
      },
    ],
    stream: true,
  });

  for await (const part of stream) {
    const content = part.choices[0]?.delta?.content || "";
    console.log("Streaming content", content);
    onChunk(content); // Call the callback for each chunk
  }
}
