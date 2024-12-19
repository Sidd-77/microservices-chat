import { User } from "./auth";

export interface ChatMessage {
  _id?: string;
  content: string;
  sender: string;
  createdAt: Date;
  chat: string;
  receiver: string;
}

export interface Chat {
  _id: string;
  users: User[];
  messages: ChatMessage[];
}