import OpenAI from "openai";
import { chatGptApiKey, gptPromt } from "../constants.js";

const openai = new OpenAI({
  apiKey: chatGptApiKey,
});

interface StreamPart {
  choices: Array<{
    delta: {
      content: string;
    };
  }>;
}

interface Stream extends AsyncIterable<StreamPart> {}

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

export async function parseTitlesWithChatGPTSEE(
  ocrText: string,
  onChunk: (chunk: string) => void
) {
  const stream = (await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: gptPromt + ocrText,
      },
    ],
    stream: true,
  })) as Stream;
  return await processStreamForTitles(stream, onChunk);
}

async function processStreamForTitles(
  stream: Stream,
  onChunk: (title: string) => void
) {
  let currentTitle: string = "";
  let accumulating: boolean = false;
  let fragment = "";
  let foundStart = false;
  let totalContent = "";

  for await (const part of stream) {
    const content: string = part.choices[0]?.delta?.content || "";
    // console.log("Streaming content", content);
    fragment += content;
    totalContent += content;
    // Start or stop accumulating when encountering title boundaries
    if (fragment.includes(`"title":`)) {
      foundStart = true;
      currentTitle = ""; // Start a new title
      fragment = "";
      continue;
    }
    if (foundStart && !accumulating && content.trim().includes('"')) {
      accumulating = true;
      continue;
    }

    if (accumulating && foundStart && !content.trim().includes('"')) {
      // Accumulate title content, appending a space for separation
      currentTitle = currentTitle + content;
      continue;
    }
    if (accumulating) {
      // If a closing quote and we're accumulating, it marks the end of the title
      onChunk(currentTitle.trim()); // Trim and send the accumulated title
      accumulating = false;
      foundStart = false; // Stop accumulating
      fragment = "";
    }
  }
  return totalContent;
}
