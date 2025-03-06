import { Flex, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useChatbotContext } from "@context/ChatbotContext";
import { throttle } from "@/utils";
import { ChatLoader } from "./ChatLoader";

export default function ChatContainer() {
  const {
    state: { selectedConversation, messageIsStreaming, loading },
  } = useChatbotContext();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const bottomTolerance = 35;

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false);
      } else {
        setAutoScrollEnabled(true);
      }
    }
  };

  const scrollDown = () => {
    if (autoScrollEnabled && messageIsStreaming) {
      messagesEndRef.current?.scrollIntoView(true);
    }
  };
  const throttledScrollDown = throttle(scrollDown, 200);

  useEffect(() => {
    throttledScrollDown();
  }, [throttledScrollDown]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(true);
  }, [selectedConversation?.uuid]);

  return (
    <Flex vertical style={{ height: "100%" }}>
      <div
        style={{
          flex: "1",
          overflow: "auto",
        }}
        ref={chatContainerRef}
      >
        <div
          style={{
            margin: "auto",
            height: "100%",
            fontSize: "1rem",
            padding: "1rem 0.75rem",
            width: "100%",
            // "@media (min-width: 768px)": {
            //   padding: "1rem 1rem",
            // },
            // "@media (min-width: 1024px)": {
            //   padding: "1rem 1rem",
            // },
            // "@media (min-width: 1280px)": {
            //   padding: "1rem 1.25rem",
            // },
          }}
        >
          <Flex
            vertical
            gap={16}
            style={{
              margin: "0 auto",
              height: "100%",
              flex: "1",
              fontSize: "1rem",
              maxWidth: "48rem",
              // "@media (min-width: 768px)": {
              //   maxWidth: "48rem",
              // },
              // "@media (min-width: 1024px)": {
              //   maxWidth: "40rem",
              // },
              // "@media (min-width: 1280px)": {
              //   maxWidth: "48rem",
              // },
            }}
          >
            {selectedConversation &&
            selectedConversation.messages.length > 0 ? (
              <>
                {selectedConversation?.messages.map((item, index) => {
                  return (
                    <ChatMessage
                      key={index}
                      message={item}
                      messageIndex={index}
                    />
                  );
                })}
                {loading && <ChatLoader />}
                <div
                  style={{
                    height: "20px",
                  }}
                  ref={messagesEndRef}
                />
              </>
            ) : (
              <Flex align="center" justify="center" style={{ height: "100%" }}>
                <Typography.Title>What can I help with?</Typography.Title>
              </Flex>
            )}
          </Flex>
        </div>
      </div>
      <div>
        <div
          style={{
            margin: "auto",
            fontSize: "1rem",
            padding: "1rem 0.75rem",
            width: "100%",
            // "@media (min-width: 768px)": {
            //   padding: "1rem 1rem",
            // },
            // "@media (min-width: 1024px)": {
            //   padding: "1rem 1rem",
            // },
            // "@media (min-width: 1280px)": {
            //   padding: "1rem 1.25rem",
            // },
          }}
        >
          <Flex
            vertical
            gap={8}
            style={{
              margin: "0 auto",
              flex: "1",
              fontSize: "1rem",
              maxWidth: "48rem",
              // "@media (min-width: 768px)": {
              //   maxWidth: "48rem",
              // },
              // "@media (min-width: 1024px)": {
              //   maxWidth: "40rem",
              // },
              // "@media (min-width: 1280px)": {
              //   maxWidth: "48rem",
              // },
            }}
          >
            <ChatInput />
            <Typography.Text
              style={{ textAlign: "center", fontSize: "0.75rem" }}
            >
              Powered by the K.O Dev
            </Typography.Text>
          </Flex>
        </div>
      </div>
    </Flex>
  );
}
