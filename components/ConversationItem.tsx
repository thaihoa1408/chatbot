import React from "react";
import { Conversation } from "@/types";
import { useChatbotContext } from "@context/ChatbotContext";
import { Typography } from "antd";
interface ConversationItemProps {
  conversation: Conversation;
}

export default function ConversationItem({
  conversation,
}: ConversationItemProps) {
  const {
    state: { selectedConversation },
    handleSelectConversation,
  } = useChatbotContext();

  const isSelected = selectedConversation?.uuid === conversation.uuid;

  return (
    <div
      style={{
        borderRadius: "0.5rem",
        height: "2.25rem",
        fontSize: "0.875rem",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={() => handleSelectConversation(conversation)}
    >
      <div
        style={{
          padding: "0.5rem",
          borderRadius: "0.5rem",
          backgroundColor: isSelected ? "#32436c" : undefined,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#32436c";
        }}
        onMouseOut={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = "";
          }
        }}
      >
        <Typography.Text
          style={{
            position: "relative",
            flexGrow: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {conversation.name}
        </Typography.Text>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          top: 0,
          alignItems: "center",
          gap: "0.375rem",
          paddingRight: "0.5rem",
          right: 0,
          display: "none",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.display = "flex";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.display = "none";
        }}
      >
        ...
      </div>
    </div>
  );
}
