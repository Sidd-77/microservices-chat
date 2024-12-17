import { User } from "./auth";

export interface ChatMessage {
  id: string;
  content: string;
  sender: User;
  timestamp: string;
}