// index.ts
import express from "express";
import { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();
import subscriptionRouter from "./routes";
import mongoose from "mongoose";
import NotificationQueue from "./notificationQueue";
import { sendNotificationToUser } from "./subscriptionService";



const app: Express = express();
const notificationQueue = new NotificationQueue();
const PORT = process.env.PORT || 4400;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/db";
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

async function processNotification(notification: any) {
  try {
    // notification = JSON.parse(notification);
    const body = notification.content;
    const title = "New Message";
    const userId = notification.receiver;
    const image = "./vite.svg";
    const data = {
      type: "message",
      sender: notification.sender,
    };
    await sendNotificationToUser(userId, title, body, image, data);
    console.log("Notification sent to ", userId);
    return;
  } catch (error) {
    console.error("Error sending notifications:", error);
    return;
  }
}

async function initializeServices() {
  try {
    await notificationQueue.initialize();
    // Set up message consumer
    await notificationQueue.consumeNotifications(async (notification: any) => {
      console.log("Processing notification:", notification);
      await processNotification(notification);
    });

    console.log("Message consumer initialized successfully");
  } catch (error) {
    console.error("Failed to initialize services:", error);
    process.exit(1);
  }
}

app.get("/api/notify/health", (req, res) => {
  const healthStatus = {
    service: "notification-service",
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
  res.send(healthStatus);
});

app.use("/api/notify", subscriptionRouter);

app.listen(PORT, () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      console.log(`Server is running on port ${PORT}`);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });
  initializeServices().catch(console.error);
});

export default app;
