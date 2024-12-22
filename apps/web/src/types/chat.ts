import { User } from "./auth";

export interface ChatMessage {
  _id?: string;
  content: string;
  sender: string;
  createdAt: Date;
  chatId: string;
  isfile: boolean;
  receiver: string;
}

export interface Chat {
  _id: string;
  users: User[];
  messages: ChatMessage[];
}