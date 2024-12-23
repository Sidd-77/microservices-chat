import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import fileRoutes from "./fileRoutes";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/files", fileRoutes);

app.get("/health", (req, res) => {
  res.send("File service is running...");
});

const PORT = process.env.PORT || 4300;
app.listen(PORT, () => {
  console.log(`File service running on port ${PORT}`);
});
