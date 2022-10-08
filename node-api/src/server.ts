import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

export const app = express();
app.use(express.json());
app.use(cors());

export const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:4200' },
});

httpServer.listen(4444, () => {
  console.log('Listening on port 4444');
});
