import { Flex } from "antd";
import React from "react";
import type { ChatMessage } from "@/types";
import AssitantChatMessage from "./AssitantChatMessage";
import UserChatMessage from "./UserChatMessage";

interface ChatMessageProps {
  message: ChatMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <Flex justify={message.role === "assistant" ? "flex-start" : "flex-end"}>
      {message.role === "assistant" ? (
        <AssitantChatMessage message={message} />
      ) : (
        <UserChatMessage message={message} />
      )}
    </Flex>
  );
}
