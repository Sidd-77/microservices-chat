import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import Redis from "ioredis";
import MessageQueue from "./messageQueue";

interface OnlineUser {
  userId: string;
  socketId: string;
}

const CHANNELS = {
  MESSAGE: "message",
  TYPING: "typing",
};

const RedisURL = process.env.REDIS_URL || "redis://localhost:6379";

export class SocketService {
  private io: Server;
  private publisher: Redis;
  private subscriber: Redis;
  private onlineUsers: OnlineUser[] = [];
  private messageQueue: MessageQueue;

  constructor(httpServer: HttpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true
      },
      path: "/api/socket",
      transports: ['websocket', 'polling'], // Try WebSocket first, fallback to polling
      allowUpgrades: true,
      upgradeTimeout: 10000,
      pingInterval: 10000,
      pingTimeout: 5000
    });


    this.publisher = new Redis(RedisURL);
    this.subscriber = new Redis(RedisURL);

    this.setupRedisSubscribers();
    this.setupSocketHandlers();

    this.messageQueue = new MessageQueue();
  }

  private setupRedisSubscribers(): void {
    this.subscriber.subscribe(CHANNELS.MESSAGE, (err) => {
      if (err) {
        console.error("Failed to subscribe to message channel:", err);
        return;
      }
      console.log("Subscribed to message channel");
    });

    this.subscriber.subscribe(CHANNELS.TYPING, (err) => {
      if (err) {
        console.error("Failed to subscribe to typing channel:", err);
        return;
      }
      console.log("Subscribed to typing channel");
    });

    this.subscriber.on("message", (channel, message) => {
      try {
        const data = JSON.parse(message);

        switch (channel) {
          case CHANNELS.MESSAGE:
            this.handleRedisMessage(data);
            break;
          case CHANNELS.TYPING:
            this.handleRedisTyping(data);
            break;
          default:
            console.warn("Unknown channel:", channel);
        }
      } catch (error) {
        console.error("Error processing Redis message:", error);
      }
    });
  }

  private setupSocketHandlers(): void {
    this.io.engine.on('connection', (socket) => {
      console.log('New raw connection with transport:', socket.transport.name);
    });
  
    this.io.on("connection", (socket) => {
      console.log("New client connected");
      console.log('Socket connected with id:', socket.id);
      console.log('Transport:', socket.conn.transport.name);

      socket.on("user:connect", (userId: string) => {
        this.handleUserConnect(socket.id, userId);
        console.log("User connected:", userId);
      });

      socket.on("disconnect", () => {
        this.handleUserDisconnect(socket.id);
      });

      socket.on(
        "message:new",
        async (data: {
          chatId: string;
          content: string;
          sender: string;
          receiver: string;
          _id: string;
          isfile: boolean;
          createdAt: Date;
        }) => {
          console.log("New message:", data);
          await this.handleNewMessage(data);
        }
      );

      socket.on(
        "typing:start",
        async (data: { chatId: string; userId: string }) => {
          await this.handleTypingStatus(data, true);
        }
      );

      socket.on(
        "typing:stop",
        async (data: { chatId: string; userId: string }) => {
          await this.handleTypingStatus(data, false);
        }
      );
    });
  }

  private handleUserConnect(socketId: string, userId: string): void {
    this.onlineUsers = this.onlineUsers.filter(
      (user) => user.userId !== userId
    );

    this.onlineUsers.push({ userId, socketId });

    this.io.emit("user:status", {
      userId,
      status: "online",
    });

    const onlineUserIds = this.onlineUsers.map((user) => user.userId);
    this.io.to(socketId).emit("users:online", onlineUserIds);
  }

  private handleUserDisconnect(socketId: string): void {
    const disconnectedUser = this.onlineUsers.find(
      (user) => user.socketId === socketId
    );

    if (disconnectedUser) {
      this.onlineUsers = this.onlineUsers.filter(
        (user) => user.socketId !== socketId
      );

      this.io.emit("user:status", {
        userId: disconnectedUser.userId,
        status: "offline",
      });
    }
  }

  private async handleNewMessage(data: {
    chatId: string;
    content: string;
    sender: string;
    receiver: string;
    _id: string;
    isfile: boolean;
    createdAt: Date;
  }): Promise<void> {
    try {
      await this.publisher.publish(CHANNELS.MESSAGE, JSON.stringify(data));
      await this.messageQueue.pushMessage(data);
    } catch (error) {
      console.error("Error publishing message to Redis:", error);
    }
  }

  private handleRedisMessage(data: {
    chatId: string;
    content: string;
    sender: string;
    receiver: string;
    _id: string;
    isfile: boolean;
    createdAt: Date;
  }): void {
    const relevantUsers = this.onlineUsers.filter(
      (user) => user.userId === data.sender || user.userId === data.receiver
    );

    if (relevantUsers.length > 0) {
      relevantUsers.forEach((user) => {
        this.io.to(user.socketId).emit("message", {
          message: data,
          chatId: data.chatId,
        });
      });
    }

    const isReceiverOffline = !this.onlineUsers.some(
      (user) => user.userId === data.receiver
    );
    if (isReceiverOffline) {
      console.log("Receiver is offline, sending notification");
      this.messageQueue.pushNotification(data);
    }
  }

  private async handleTypingStatus(
    data: { chatId: string; userId: string },
    isTyping: boolean
  ): Promise<void> {
    try {
      await this.publisher.publish(
        CHANNELS.TYPING,
        JSON.stringify({ ...data, isTyping })
      );
    } catch (error) {
      console.error("Error publishing typing status to Redis:", error);
    }
  }

  private handleRedisTyping(data: {
    chatId: string;
    userId: string;
    isTyping: boolean;
  }): void {
    this.io.emit("typing:status", {
      chatId: data.chatId,
      userId: data.userId,
      isTyping: data.isTyping,
    });
  }

  public getUserStatus(userId: string): "online" | "offline" {
    return this.onlineUsers.some((user) => user.userId === userId)
      ? "online"
      : "offline";
  }

  public getOnlineUsers(): string[] {
    return this.onlineUsers.map((user) => user.userId);
  }

  public emitToUser(userId: string, event: string, data: any): void {
    const userSocket = this.onlineUsers.find((user) => user.userId === userId);
    if (userSocket) {
      this.io.to(userSocket.socketId).emit(event, data);
    }
  }
}
