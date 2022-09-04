import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {
  clearPlayers,
  getPlayers,
  playerServerOnConnection,
} from './player/player';
import {
  getGameSocket,
  getGameStatus,
  hostServerOnConnection,
  killGame,
  openGame,
} from './host/host';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:4200' },
});

app.use(cors({ origin: 'http://localhost:4200' }));

const playerServer = io.of('/player');
const hostServer = io.of('/host');

io.on('connection', (socket) => {
  socket.on('disconnect', () =>
    console.log(`Socket ${socket.id} has disconnected`)
  );
});

hostServer.on('connection', hostServerOnConnection);
playerServer.on('connection', playerServerOnConnection);

app.get('/open-game', (req, res) => {
  openGame();
  res.status(204).send();
});

app.get('/game-status', (req, res) => {
  res
    .status(200)
    .send({ status: getGameStatus(), hostExists: !!getGameSocket() });
});

app.get('/players', (req, res) => {
  res.status(200).send({ players: getPlayers() });
});

app.get('/clear-players', (req, res) => {
  clearPlayers();
  res.status(204).send();
});

app.get('/kill-game', (req, res) => {
  killGame();
  clearPlayers();
  res.status(204).send();
});

httpServer.listen(4444, () => {
  console.log('Listening on port 4444');
});
