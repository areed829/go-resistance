import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { playerServerOnConnection } from './player/player';
import { hostServerOnConnection } from './host/host';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:4200' },
});

app.use(cors({ origin: 'http://localhost:4200' }));

const playerServer = io.of('/player');
const hostServer = io.of('/host');

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} has connected`);

  socket.on('disconnect', () =>
    console.log(`Socket ${socket.id} has disconnected`)
  );
});

hostServer.on('connection', hostServerOnConnection);
playerServer.on('connection', playerServerOnConnection);

httpServer.listen(4444, () => {
  console.log('Listening on port 4444');
});
