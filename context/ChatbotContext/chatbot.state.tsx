import { Conversation } from "@/types";

export interface ChatbotInitialState {
  loading: boolean;
  messageIsStreaming: boolean;
  conversations: Conversation[];
  selectedConversation: Conversation | undefined;
}

export const initialState: ChatbotInitialState = {
  loading: false,
  messageIsStreaming: false,
  conversations: [],
  selectedConversation: undefined,
};
