import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '../types/chat';

const SOCKET_URL = typeof process !== 'undefined' && process.env.SOCKET_URL ? process.env.SOCKET_URL : 'http://localhost:4001';

interface TypingStatus {
  chatId: string;
  userId: string;
  isTyping: boolean;
}

interface UserStatus {
  userId: string;
  status: 'online' | 'offline';
}

export class ChatSocketService {
  private socket: Socket;
  private messageHandlers: ((message: ChatMessage) => void)[] = [];
  private typingHandlers: ((status: TypingStatus) => void)[] = [];
  private userStatusHandlers: ((status: UserStatus) => void)[] = [];
  private onlineUsersHandlers: ((users: string[]) => void)[] = [];
  private processedMessages: Set<string> = new Set(); // Track processed messages

  constructor(baseURL: string = SOCKET_URL) {
    this.socket = io(baseURL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupSocketListeners();
  }

  private setupSocketListeners(): void {
    // Single message handler for both sent and received messages
    this.socket.on('message', (data: { message: ChatMessage, chatId: string }) => {
      // Check if we've already processed this message
      if (!this.processedMessages.has(data.message._id || "killlme")) {
        this.processedMessages.add(data.message._id || "killlme");
        this.messageHandlers.forEach(handler => handler(data.message));
        console.log("Message handled:", data);
        
        // Cleanup old processed messages (optional)
        if (this.processedMessages.size > 1000) {
          const oldest = Array.from(this.processedMessages).slice(0, 500);
          oldest.forEach(id => this.processedMessages.delete(id));
        }
      }
    });

    // Typing status listener
    this.socket.on('typing:status', (status: TypingStatus) => {
      this.typingHandlers.forEach(handler => handler(status));
    });

    // User status listener
    this.socket.on('user:status', (status: UserStatus) => {
      this.userStatusHandlers.forEach(handler => handler(status));
    });

    // Online users listener
    this.socket.on('users:online', (users: string[]) => {
      this.onlineUsersHandlers.forEach(handler => handler(users));
    });

    // Connection error handling
    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Cleanup processed messages on disconnect
    this.socket.on('disconnect', () => {
      this.processedMessages.clear();
    });
  }

  public connect(userId: string): void {
    if (!this.socket.connected) {
      this.socket.connect();
      this.socket.emit('user:connect', userId);
    }
  }

  public disconnect(): void {
    this.processedMessages.clear();
    this.socket.disconnect();
  }

  public sendMessage(data: {
    chatId: string;
    content: string;
    sender: string;
    receiver: string;
    _id: string;
    createdAt: Date;
  }): void {
    // Add message to processed set before sending
    this.processedMessages.add(data._id);
    this.socket.emit('message:new', data);
  }

  public onMessage(handler: (message: ChatMessage) => void): () => void {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  public sendTypingStatus(chatId: string, userId: string, isTyping: boolean): void {
    this.socket.emit(
      isTyping ? 'typing:start' : 'typing:stop',
      { chatId, userId }
    );
  }

  public onTypingStatus(handler: (status: TypingStatus) => void): () => void {
    this.typingHandlers.push(handler);
    return () => {
      this.typingHandlers = this.typingHandlers.filter(h => h !== handler);
    };
  }

  public onUserStatus(handler: (status: UserStatus) => void): () => void {
    this.userStatusHandlers.push(handler);
    return () => {
      this.userStatusHandlers = this.userStatusHandlers.filter(h => h !== handler);
    };
  }

  public onOnlineUsers(handler: (users: string[]) => void): () => void {
    this.onlineUsersHandlers.push(handler);
    return () => {
      this.onlineUsersHandlers = this.onlineUsersHandlers.filter(h => h !== handler);
    };
  }

  public isConnected(): boolean {
    return this.socket.connected;
  }
}