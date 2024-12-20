import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./lib/db";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import MessageQueue from "./lib/messageQueue";
import { Message } from "@messagepunk/models";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const messageQueue = new MessageQueue();

async function processMessage(message: any) {
  try {
    const newMessage = new Message(message);
    await newMessage.save();
    console.log("Message saved successfully:");
  } catch (error) {
    console.error("Error in message processing:", error);
    throw error; // Rethrow to trigger message nack
  }
}

async function initializeServices() {
  try {
    await messageQueue.initialize();
    // Set up message consumer
    await messageQueue.consumeMessage(async (message: any) => {
      await processMessage(message);
    });

    console.log("Message consumer initialized successfully");
  } catch (error) {
    console.error("Failed to initialize services:", error);
    process.exit(1);
  }
}

app.use("/users", userRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Hello World from db-service");
});

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
