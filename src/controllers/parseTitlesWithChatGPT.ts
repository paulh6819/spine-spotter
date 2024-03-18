import OpenAI from "openai";
import { chatGptApiKey, gptPromt } from "../constants.js";

const openai = new OpenAI({
  apiKey: chatGptApiKey,
});

export async function parseTitlesWithChatGPT(ocrText: string) {
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

  let responseContent = "";
  for await (const part of stream) {
    responseContent += part.choices[0]?.delta?.content || "";
  }
  console.log("responseContent", responseContent);

  return responseContent;
}
