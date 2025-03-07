import { ChatSettings } from "@/types";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

export const runtime = "edge";
export async function POST(request: Request) {
  const json = await request.json();
  const { chatSettings, messages } = json as {
    chatSettings: ChatSettings;
    messages: any[];
  };

  try {
    // Groq is compatible with the OpenAI SDK
    const groq = new OpenAI({
      apiKey: "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",
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await groq.chat.completions.create({
      model: chatSettings.model,
      messages,
      max_tokens: 8192,
      stream: true,
    });

    // Convert the response into a friendly text-stream.
    const stream = OpenAIStream(response as any);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred";
    const errorCode = error.status || 500;

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "Groq API Key not found. Please set it in your profile settings.";
    } else if (errorCode === 401) {
      errorMessage =
        "Groq API Key is incorrect. Please fix it in your profile settings.";
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode,
    });
  }
}
