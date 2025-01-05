import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import fileRoutes from "./fileRoutes";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.get("/api/files/health", (req, res) => {
  const healthStatus = {
    service: "file-service",
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
  res.send(healthStatus);
});

app.use("/api/files", fileRoutes);

const PORT = process.env.PORT || 4300;
app.listen(PORT, () => {
  console.log(`File service running on port ${PORT}`);
});
