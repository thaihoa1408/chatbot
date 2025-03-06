import { Flex } from "antd";
import React from "react";
import type { ChatMessage } from "@/types";
import AssitantChatMessage from "./AssitantChatMessage";
import UserChatMessage from "./UserChatMessage";

interface ChatMessageProps {
  message: ChatMessage;
  messageIndex: number;
}

export default function ChatMessage({
  message,
  messageIndex,
}: ChatMessageProps) {
  return (
    <Flex justify={message.role === "assistant" ? "flex-start" : "flex-end"}>
      {message.role === "assistant" ? (
        <AssitantChatMessage message={message} messageIndex={messageIndex} />
      ) : (
        <UserChatMessage message={message} />
      )}
    </Flex>
  );
}
