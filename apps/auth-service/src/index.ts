import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import router from "./authRoutes";
import { connectDB } from "./db";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/auth", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
