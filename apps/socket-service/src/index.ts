import express from 'express';
import { createServer } from 'http';
import { SocketService } from './socket';

const app = express();
const httpServer = createServer(app);
const socketService = new SocketService(httpServer);

export { socketService };

httpServer.listen(4001, () => {
  console.log('Socket.IO server running on port 4001');
});