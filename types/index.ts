export interface ChatSettings {
  model: string;
  temperature: number;
  prompt?: string;
}

export interface ChatMessage {
  role: string;
  content: string;
}

export interface Conversation {
  uuid: string;
  name: string;
  settings: ChatSettings;
  messages: ChatMessage[];
  createdAt: string;
}

export interface LLM {
  modelId: string;
  modelName: string;
  provider: string;
  hostedId: string;
  platformLink: string;
  imageInput: boolean;
  pricing?: {
    currency: string;
    unit: string;
    inputCost: number;
    outputCost?: number;
  };
}
