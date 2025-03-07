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
          style={{ border: "none", fontSize: "16px" }}
          autoSize={{ minRows: 3, maxRows: 5 }}
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
          style={{ border: "none" }}
          styles={{
            body: {
              padding: "8px 12px",
            },
          }}
        >
          <Flex justify="space-between" align="center" gap={12}>
            <ModelSelection />
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
      </Flex>
    </Card>
  );
}
