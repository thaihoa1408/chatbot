import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatSettings } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { chatSettings, messages } = json as {
      chatSettings: ChatSettings;
      messages: any[];
    };

    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_GEMINI_API_KEY || ""
    );
    const googleModel = genAI.getGenerativeModel({ model: chatSettings.model });

    const lastMessage = messages.pop();

    const chat = googleModel.startChat({
      history: messages,
      generationConfig: {
        temperature: chatSettings.temperature,
      },
    });

    const response = await chat.sendMessageStream(lastMessage.parts);

    // Set up Server-Sent Events stream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response.stream) {
            const chunkText = chunk.text();
            controller.enqueue(new TextEncoder().encode(chunkText));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred";
    const errorCode = error.status || 500;

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "Google Gemini API Key not found. Please set it in your environment variables.";
    } else if (errorMessage.toLowerCase().includes("api key not valid")) {
      errorMessage =
        "Google Gemini API Key is incorrect. Please check your environment variables.";
    }

    return NextResponse.json({ message: errorMessage }, { status: errorCode });
  }
}
