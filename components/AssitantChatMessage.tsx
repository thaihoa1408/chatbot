import { GoogleOutlined } from "@ant-design/icons";
import { Avatar, Flex, theme, Typography } from "antd";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeMathjax from "rehype-mathjax";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import type { ChatMessage } from "@/types";

interface AssistantChatMessageProps {
  message: ChatMessage;
}

export default function AssistantChatMessage({
  message,
}: AssistantChatMessageProps) {
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
        icon={<GoogleOutlined style={{ fontSize: "16px" }} />}
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
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeMathjax]}
            components={{
              code({
                node,
                inline,
                className,
                children,
                ...props
              }: {
                node: any;
                inline?: boolean;
                className?: string;
                children: React.ReactNode;
              }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    // eslint-disable-next-line react/no-children-prop
                    children={String(children).replace(/\n$/, "")}
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                  />
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
              table({ children }: { children: React.ReactNode }) {
                return (
                  <table
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid black",
                      padding: "0.75rem",
                    }}
                  >
                    {children}
                  </table>
                );
              },
              th({ children }: { children: React.ReactNode }) {
                return (
                  <th
                    style={{
                      wordBreak: "break-word",
                      border: "1px solid black",
                      backgroundColor: "#6b7280",
                      padding: "0.75rem",
                      color: "white",
                    }}
                  >
                    {children}
                  </th>
                );
              },
              td({ children }: { children: React.ReactNode }) {
                return (
                  <td
                    style={{
                      wordBreak: "break-word",
                      border: "1px solid black",
                      padding: "0.75rem",
                    }}
                  >
                    {children}
                  </td>
                );
              },
            }}
          >
            {/* {`${message.content}${
            messageIsStreaming &&
            messageIndex === selectedConversationLength - 1
              ? '`▍`'
              : ''
          }`} */}
            {message.content}
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
