import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import router from "./authRoutes";
import { connectDB } from "./db";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/auth/health", (req, res) => {
  const healthStatus = {
    service: "auth-service",
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
  res.send(healthStatus);
});

app.use("/api/auth", router);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
