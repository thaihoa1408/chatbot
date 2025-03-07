import { Avatar, Flex, theme, Typography } from "antd";
import React from "react";
import type { ChatMessage } from "@/types";
import { FaUser } from "react-icons/fa";

interface UserChatMessageProps {
  message: ChatMessage;
}

export default function UserChatMessage({ message }: UserChatMessageProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Flex
      align="flex-start"
      gap="8px"
      style={{
        marginBottom: "1rem",
        maxWidth: "calc(100% - 40px)",
      }}
    >
      <Flex
        vertical
        style={{
          flex: "1 1 auto",
          borderRadius: "1.5rem",
          overflow: "hidden",
        }}
      >
        {message.content && (
          <Typography.Text
            style={{
              flex: "1 1 auto",
              borderRadius: "1.5rem",
              padding: "0.5rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              lineHeight: "1.25rem",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              backgroundColor: colorBgContainer,
            }}
          >
            {message.content.toString()}
          </Typography.Text>
        )}
      </Flex>

      <Avatar
        style={{
          fontSize: "0.875rem",
        }}
        size={32}
        icon={<FaUser style={{ fontSize: "16px" }} />}
      />
    </Flex>
  );
}
