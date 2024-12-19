import { Server } from "socket.io";
import { Server as HttpServer } from "http";

interface OnlineUser {
  userId: string;
  socketId: string;
}

export class SocketService {
  private io: Server;
  private onlineUsers: OnlineUser[] = [];

  constructor(httpServer: HttpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
      },
    });

    this.setupSocketHandlers();
  }

  private setupSocketHandlers(): void {
    this.io.on("connection", (socket) => {
      console.log("New client connected");

      // Handle user connection
      socket.on("user:connect", (userId: string) => {
        this.handleUserConnect(socket.id, userId);
        console.log("User connected:", userId);
      });

      // Handle user disconnection
      socket.on("disconnect", () => {
        this.handleUserDisconnect(socket.id);
      });

      // Handle new message
      socket.on(
        "message:new",
        async (data: {
          chatId: string;
          content: string;
          sender: string;
          receiver: string;
          createdAt: Date;
        }) => {
          console.log("New message:", data);
          await this.handleNewMessage(data);
        }
      );

      // Handle typing status
      socket.on("typing:start", (data: { chatId: string; userId: string }) => {
        this.handleTypingStatus(data, true);
      });

      socket.on("typing:stop", (data: { chatId: string; userId: string }) => {
        this.handleTypingStatus(data, false);
      });
    });
  }

  private handleUserConnect(socketId: string, userId: string): void {
    // Remove any existing socket connections for this user
    this.onlineUsers = this.onlineUsers.filter(
      (user) => user.userId !== userId
    );

    // Add new connection
    this.onlineUsers.push({ userId, socketId });

    // Broadcast user online status
    this.io.emit("user:status", {
      userId,
      status: "online",
    });

    // Send initial online users list to the connected user
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

      // Broadcast user offline status
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
    createdAt: Date;
  }): Promise<void> {
    try {
      // Create new message in database
      // const newMessage = await Message.create({
      //   chat: data.chatId,
      //   user: data.userId,
      //   content: data.content,
      // });

      // Update chat with latest message
      // await Chat.findByIdAndUpdate(data.chatId, {
      //   $push: { messages: newMessage._id },
      //   latest_message: newMessage._id,
      // });

      // Get receiver's socket
      const receiverSocket = this.onlineUsers.find(
        (user) => user.userId === data.receiver
      );

      console.log(this.onlineUsers);

      // Emit message to sender and receiver
      if (receiverSocket) {
        this.io.to(receiverSocket.socketId).emit("message:receive", {
          message: data,
          chatId: data.chatId,
        });
      }

      const senderSocket = this.onlineUsers.find(
        (user) => user.userId === data.sender
      );

      if (senderSocket) {
        this.io.to(senderSocket.socketId).emit("message:sent", {
          message: data,
          chatId: data.chatId,
        });
      }
    } catch (error) {
      console.error("Error handling new message:", error);
    }
  }

  private handleTypingStatus(
    data: { chatId: string; userId: string },
    isTyping: boolean
  ): void {
    // Broadcast typing status to all users in the chat
    this.io.emit("typing:status", {
      chatId: data.chatId,
      userId: data.userId,
      isTyping,
    });
  }

  // Public methods that can be used by other services
  public getUserStatus(userId: string): "online" | "offline" {
    return this.onlineUsers.some((user) => user.userId === userId)
      ? "online"
      : "offline";
  }

  public getOnlineUsers(): string[] {
    return this.onlineUsers.map((user) => user.userId);
  }

  // Method to emit custom events
  public emitToUser(userId: string, event: string, data: any): void {
    const userSocket = this.onlineUsers.find((user) => user.userId === userId);
    if (userSocket) {
      this.io.to(userSocket.socketId).emit(event, data);
    }
  }
}
