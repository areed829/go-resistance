import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GameStatus } from './game-status';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:4200' },
});

let gameStatus = { status: GameStatus.Closed };

app.get('/game-status', (req, res) => {
  res.send(gameStatus);
});

app.get('/start-game', (req, res) => {
  gameStatus = { status: GameStatus.InProgress };
  res.send(gameStatus);
});

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} has connected`);
});

httpServer.listen(4444, () => {
  console.log('Listening on port 4444');
});
