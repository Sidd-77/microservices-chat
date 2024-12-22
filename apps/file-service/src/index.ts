
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import fileRoutes from "./fileRoutes";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`File service running on port ${PORT}`);
});