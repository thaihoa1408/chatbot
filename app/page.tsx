"use client";
import ChatContainer from "@components/ChatContainer";
import ChatbotLayout from "@components/Layout";
import ChatbotContext from "@context/ChatbotContext";
import {
  ChatbotInitialState,
  initialState,
} from "@context/ChatbotContext/chatbot.state";
import useApiService from "@hooks/useApiService";
import { useCreateReducer } from "@hooks/useCreateReducer";
import React, { useCallback, useEffect, useRef } from "react";
import { ChatMessage, Conversation } from "@/types";
import {
  saveConversation,
  saveConversations,
  updateConversation,
} from "@/utils";
import { v4 as uuidv4 } from "uuid";
import { ConfigProvider, theme } from "antd";

export default function Chatbot() {
  const contextValue = useCreateReducer<ChatbotInitialState>({
    initialState,
  });

  const {
    state: { conversations, selectedConversation },
    dispatch,
  } = contextValue;

  const handleSelectConversation = (conversation: Conversation) => {
    dispatch({
      field: "selectedConversation",
      value: conversation,
    });

    saveConversation(conversation);
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      uuid: uuidv4(),
      name: "New Conversation",
      messages: [],
      settings: {
        model: "gemini-1.5-pro-latest",
        prompt: "You are a friendly, helpful AI assistant.",
        temperature: 0.5,
      },
      createdAt: new Date().toISOString(),
    };

    const updatedConversations = [...conversations, newConversation];

    dispatch({ field: "selectedConversation", value: newConversation });
    dispatch({ field: "conversations", value: updatedConversations });

    saveConversation(newConversation);
    saveConversations(updatedConversations);

    dispatch({ field: "loading", value: false });
  };

  const handleUpdateConversation = (
    conversation: Conversation,
    data: {
      key: string;
      value: any;
    }
  ) => {
    const updatedConversation = {
      ...conversation,
      [data.key]: data.value,
    };

    const { single, all } = updateConversation(
      updatedConversation,
      conversations
    );

    dispatch({ field: "selectedConversation", value: single });
    dispatch({ field: "conversations", value: all });
  };

  useEffect(() => {
    const conversationHistory = localStorage.getItem("conversationHistory");
    if (conversationHistory) {
      const parsedConversationHistory: Conversation[] =
        JSON.parse(conversationHistory);
      dispatch({ field: "conversations", value: parsedConversationHistory });
    }

    const selectedConversation = localStorage.getItem("selectedConversation");
    if (selectedConversation) {
      const parsedSelectedConversation: Conversation =
        JSON.parse(selectedConversation);

      dispatch({
        field: "selectedConversation",
        value: parsedSelectedConversation,
      });
    } else {
      handleNewConversation();
    }
  }, [dispatch]);

  const apiService = useApiService();

  const stopConversationRef = useRef<boolean>(false);

  const handleSend = useCallback(
    async (message: ChatMessage, deleteCount = 0) => {
      if (selectedConversation) {
        let updatedConversation: Conversation;
        if (deleteCount) {
          const updatedMessages = [...selectedConversation.messages];
          for (let i = 0; i < deleteCount; i++) {
            updatedMessages.pop();
          }
          updatedConversation = {
            ...selectedConversation,
            messages: [...updatedMessages, message],
          };
        } else {
          updatedConversation = {
            ...selectedConversation,
            messages: [...selectedConversation.messages, message],
          };
        }
        dispatch({
          field: "selectedConversation",
          value: updatedConversation,
        });
        dispatch({ field: "loading", value: true });
        dispatch({ field: "messageIsStreaming", value: true });
        const chatBody = {
          chatSettings: updatedConversation.settings,
          messages: updatedConversation.messages.map((item) => {
            return {
              role: item.role === "user" ? "user" : "model",
              parts: [{ text: item.content }],
            };
          }),
        };

        const controller = new AbortController();
        const response = await apiService.sendMessage(
          "/api/chat/google",
          chatBody,
          controller.signal
        );
        if (!response.ok) {
          dispatch({ field: "loading", value: false });
          dispatch({ field: "messageIsStreaming", value: false });
          // toast.error(response.statusText);
          return;
        }
        const data = response.body;
        if (!data) {
          dispatch({ field: "loading", value: false });
          dispatch({ field: "messageIsStreaming", value: false });
          return;
        }
        if (updatedConversation.messages.length === 1) {
          const { content } = message;
          if (typeof content === "string") {
            const customName =
              content.length > 30 ? content.substring(0, 30) + "..." : content;
            updatedConversation = {
              ...updatedConversation,
              name: customName,
            };
          }
        }
        dispatch({ field: "loading", value: false });
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let isFirst = true;
        let text = "";
        while (!done) {
          if (stopConversationRef.current === true) {
            controller.abort();
            done = true;
            break;
          }
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          text += chunkValue;
          if (isFirst) {
            isFirst = false;
            const updatedMessages: ChatMessage[] = [
              ...updatedConversation.messages,
              { role: "assistant", content: chunkValue },
            ];
            updatedConversation = {
              ...updatedConversation,
              messages: updatedMessages,
            };
            dispatch({
              field: "selectedConversation",
              value: updatedConversation,
            });
          } else {
            const updatedMessages: ChatMessage[] =
              updatedConversation.messages.map((message, index) => {
                if (index === updatedConversation.messages.length - 1) {
                  return {
                    ...message,
                    content: text,
                  };
                }
                return message;
              });
            updatedConversation = {
              ...updatedConversation,
              messages: updatedMessages,
            };
            dispatch({
              field: "selectedConversation",
              value: updatedConversation,
            });
          }
        }
        saveConversation(updatedConversation);
        const updatedConversations: Conversation[] = conversations.map(
          (conversation) => {
            if (conversation.uuid === selectedConversation.uuid) {
              return updatedConversation;
            }
            return conversation;
          }
        );
        if (updatedConversations.length === 0) {
          updatedConversations.push(updatedConversation);
        }
        dispatch({
          field: "conversations",
          value: updatedConversations,
        });
        saveConversations(updatedConversations);
        dispatch({ field: "messageIsStreaming", value: false });
      }
    },
    [conversations, selectedConversation]
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#19BFEC",
          colorBgLayout: "#0F172A",
          colorBgContainer: "#1a2338",
        },
      }}
    >
      <ChatbotContext.Provider
        value={{
          ...contextValue,
          handleNewConversation,
          handleSelectConversation,
          handleUpdateConversation,
          handleSend,
          stopConversationRef,
        }}
      >
        <ChatbotLayout>
          <ChatContainer />
        </ChatbotLayout>
      </ChatbotContext.Provider>
    </ConfigProvider>
  );
}
