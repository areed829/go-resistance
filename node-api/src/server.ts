import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GameStatus } from './game-status';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:4200' },
});

app.use(cors({ origin: 'http://localhost:4200' }));

let gameStatus = { status: GameStatus.Closed };

app.get('/game-status', (req, res) => {
  res.send(gameStatus);
});

app.get('/start-game', (req, res) => {
  gameStatus = { status: GameStatus.Open };
  res.send(gameStatus);
});

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} has connected`);

  socket.on('disconnect', () =>
    console.log(`Socket ${socket.id} has disconnected`)
  );
});

httpServer.listen(4444, () => {
  console.log('Listening on port 4444');
});
