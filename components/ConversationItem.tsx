import React from "react";
import { Conversation } from "@/types";
import { useChatbotContext } from "@context/ChatbotContext";
import { Typography } from "antd";
import ActionDropdown from "./ActionDropdown";

interface ConversationItemProps {
  conversation: Conversation;
  onCollapse?: () => void;
}

export default function ConversationItem({
  conversation,
  onCollapse,
}: ConversationItemProps) {
  const {
    state: { selectedConversation },
    handleSelectConversation,
    handleDeleteConversation,
  } = useChatbotContext();

  const isSelected = selectedConversation?.uuid === conversation.uuid;

  const handleClick = () => {
    handleSelectConversation(conversation);
    if (window.innerWidth <= 768) {
      onCollapse?.();
    }
  };

  return (
    <div
      style={{
        borderRadius: "0.5rem",
        height: "2.25rem",
        fontSize: "0.875rem",
        // position: "relative",
        cursor: "pointer",
        marginBottom: "0.2rem",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          padding: "0.5rem",
          borderRadius: "0.5rem",
          backgroundColor: isSelected ? "#32436c" : undefined,
          display: "flex",
          alignItems: "center",
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
        <div
          style={{
            display:
              selectedConversation?.uuid === conversation.uuid
                ? "flex"
                : "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <ActionDropdown
            items={[
              {
                key: "delete",
                label: "Delete",
                danger: true,
                onClick: () => {
                  handleDeleteConversation(conversation);
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
