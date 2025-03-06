import { SendOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Input } from "antd";
import { useChatbotContext } from "context/ChatbotContext";
import React, { useState } from "react";
import ModelSelection from "./ModelSelection";

export default function ChatInput() {
  const {
    state: { messageIsStreaming },
    handleSend,
  } = useChatbotContext();
  const [value, setValue] = useState("");
  const handleSendMessage = () => {
    if (messageIsStreaming) return;
    handleSend({
      role: "user",
      content: value.trim(),
    });
    setValue("");
  };
  return (
    <Card
      style={{ width: "100%", borderRadius: "1.5rem", overflow: "hidden" }}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <Flex vertical>
        <Input.TextArea
          style={{ border: "none", fontSize: "14px" }}
          autoSize={{ minRows: 1, maxRows: 5 }}
          placeholder="Ask me anything!"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && value.trim()) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Card
          // className="border-none"
          styles={{
            body: {
              padding: 0,
            },
          }}
          style={{
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
          }}
        >
          <Flex
            gap={12}
            vertical={false}
            justify="end"
            style={{ padding: "0.75rem", cursor: "text" }}
          >
            <Button
              size="middle"
              type="primary"
              shape="circle"
              icon={<SendOutlined />}
              disabled={!value.trim()}
              onClick={handleSendMessage}
            />
          </Flex>
        </Card>
        <Card
          style={{ border: "none" }}
          styles={{
            body: {
              padding: 8,
            },
          }}
        >
          <ModelSelection />
        </Card>
      </Flex>
    </Card>
  );
}
