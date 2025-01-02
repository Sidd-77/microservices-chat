import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import { SocketService } from "./socket";

const PORT = process.env.PORT || 4200;

const app = express();

app.get("/api/socket/health", (req, res) => {
  const healthStatus = {
    service: "socket-service",
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
  res.send(healthStatus);
});

const httpServer = createServer(app);
const socketService = new SocketService(httpServer);

export { socketService };

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
