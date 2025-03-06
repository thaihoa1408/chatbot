import React from "react";
import { ActionType, useCreateReducer } from "@hooks/useCreateReducer";
import { Dispatch, createContext, useContext } from "react";
import type { ReactNode } from "react";
import { ChatbotInitialState, initialState } from "./chatbot.state";
import { ChatMessage, Conversation } from "@/types";

export interface ChatbotContextProps {
  state: ChatbotInitialState;
  dispatch: Dispatch<ActionType<ChatbotInitialState>>;
  handleNewConversation: () => void;
  handleSelectConversation: (conversation: Conversation) => void;
  handleUpdateConversation: (
    conversation: Conversation,
    data: {
      key: string;
      value: any;
    }
  ) => void;
  handleSend: (message: ChatMessage, deleteCount?: number) => Promise<void>;
  stopConversationRef: React.RefObject<boolean>;
  handleDeleteConversation: (conversation: Conversation) => void;
}
const ChatbotContext = createContext<ChatbotContextProps>(undefined!);

export const useChatbotContext = (): ChatbotContextProps => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error(
      "useChatbotContext must be used within a ChatbotContextProvider"
    );
  }
  return context;
};

export default ChatbotContext;
