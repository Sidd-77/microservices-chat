import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from "./lib/db";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import MessageQueue from "./lib/messageQueue";
import { Message } from "@messagepunk/models";

const app = express();
app.use(cors(
  {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }
));

app.use(express.json());

const PORT = process.env.PORT || 4100;

const messageQueue = new MessageQueue();

async function processMessage(message: any) {
  try {
    const newMessage = new Message(message);
    await newMessage.save();
    console.log("Message saved successfully:");
  } catch (error) {
    console.error("Error in message processing:", error);
    throw error; 
  }
}

async function initializeServices() {
  try {
    await messageQueue.initialize();
    await messageQueue.consumeMessage(async (message: any) => {
      await processMessage(message);
    });

    console.log("Message consumer initialized successfully");
  } catch (error) {
    console.error("Failed to initialize services:", error);
    process.exit(1);
  }
}

app.get("/api/db/health", (req, res) => {
  const healthStatus = {
    service: "db-service",
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
  res.send(healthStatus);
});

app.use("/api/db/users", userRoutes);
app.use("/api/db/chats", chatRoutes);
app.use("/api/db/messages", messageRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      initializeServices().catch(console.error);
    });
  })
  .catch((err) => {
    console.log(err);
  });
