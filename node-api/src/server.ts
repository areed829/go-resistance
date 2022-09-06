import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {
  addPlayer,
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
app.use(express.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:4200' },
});

// app.use(cors({ origin: 'http://localhost:4200' }));
app.use(cors());

const playerServer = io.of('/player');
const hostServer = io.of('/host');

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

app.post('/join-game', (req, res) => {
  console.log(req.body);
  res.json(req.body);
  // const { name, id } = req.body;
  // const errors = [];
  // if (!name) {
  //   errors.push('name is required');
  // }
  // if (!id) {
  //   errors.push('id is required');
  // }
  // if (errors.length) {
  //   res.status(400).send({ errors });
  //   return;
  // }
  // const playerSocket = playerServer.sockets.get(id);
  // if (!playerSocket) {
  //   res.status(400).send({ errors: ['player not found'] });
  //   return;
  // }
  // const added = addPlayer(name, playerSocket);
  // if (!added) {
  //   res.status(400).send({ errors: ['Name is already used'] });
  //   return;
  // }
  // res.status(204).send();
});

httpServer.listen(4444, () => {
  console.log('Listening on port 4444');
});
