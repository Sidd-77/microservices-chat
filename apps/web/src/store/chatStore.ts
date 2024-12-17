import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChatMessage } from "../types/chat";

interface ChatState {
  messages: ChatMessage[];
  sendMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      sendMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "chat-storage",
    }
  )
);