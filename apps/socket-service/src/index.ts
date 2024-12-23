import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { createServer } from 'http';
import { SocketService } from './socket';

const PORT=process.env.PORT || 4200;

const app = express();
const httpServer = createServer(app);
const socketService = new SocketService(httpServer);

export { socketService };

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});