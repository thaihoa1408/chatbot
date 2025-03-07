import { GoogleOutlined } from "@ant-design/icons";
import { Avatar, Flex, theme, Typography } from "antd";
import React from "react";

import type { ChatMessage } from "@/types";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useChatbotContext } from "@/context/ChatbotContext";
import { FaRobot } from "react-icons/fa";

interface AssistantChatMessageProps {
  message: ChatMessage;
  messageIndex: number;
}

export default function AssistantChatMessage({
  message,
  messageIndex,
}: AssistantChatMessageProps) {
  const {
    state: { selectedConversation, messageIsStreaming },
  } = useChatbotContext();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Flex
      align="flex-start"
      gap="8px"
      style={{ marginBottom: "16px", maxWidth: "calc(100% - 40px)" }}
    >
      <Avatar
        style={{
          flexShrink: 0,
          border: "none",
        }}
        size={32}
        icon={<FaRobot style={{ fontSize: "16px" }} />}
      />
      <Flex
        vertical
        flex="1"
        style={{
          borderRadius: "20px",
          backgroundColor: colorBgContainer,
          lineHeight: "20px",
          maxWidth: "calc(100% - 40px)",
        }}
      >
        <Typography.Text
          style={{
            borderRadius: "20px",
            backgroundColor: colorBgContainer,
            padding: "8px 16px",
          }}
        >
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    style={oneDark as any}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).trim()}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              table(props) {
                return (
                  <table
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid black",
                      padding: "0.75rem",
                    }}
                    {...props}
                  />
                );
              },
              th(props) {
                return (
                  <th
                    style={{
                      wordBreak: "break-word",
                      border: "1px solid black",
                      backgroundColor: "#6b7280",
                      padding: "0.75rem",
                      color: "white",
                    }}
                    {...props}
                  />
                );
              },
              td(props) {
                return (
                  <td
                    style={{
                      wordBreak: "break-word",
                      border: "1px solid black",
                      padding: "0.75rem",
                    }}
                    {...props}
                  />
                );
              },
            }}
          >
            {`${message.content}${
              messageIsStreaming &&
              selectedConversation &&
              messageIndex === selectedConversation?.messages.length - 1
                ? "`▍`"
                : ""
            }`}
          </ReactMarkdown>
        </Typography.Text>
        {/* <MessageActions
        isLastMessage={messageIndex === selectedConversationLength - 1}
        isRegenerateDisabled={messageIsStreaming}
        onCopy={handleCopy}
        onRegenerate={onRegenerate}
      /> */}
      </Flex>
    </Flex>
  );
}
