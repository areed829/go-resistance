import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { firstValueFrom } from 'rxjs';

import {
  addPlayerAsync,
  clearPlayers,
  isFirstPlayerAsync,
  playerServerOnConnection,
} from './player';
import { hostServerOnConnection, killGame } from './host';
import {
  gameStateReducer,
  getGameStatus,
  getHost,
  getPlayers,
  OpenGame,
} from './state';

const app = express();
app.use(express.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:4200' },
});

app.use(cors());

const playerServer = io.of('/player');
const hostServer = io.of('/host');

hostServer.on('connection', hostServerOnConnection);
playerServer.on('connection', playerServerOnConnection);

app.get('/open-game', (req, res) => {
  gameStateReducer(new OpenGame());
  res.status(204).send();
});

app.get('/game-status', async (req, res) => {
  const status = await firstValueFrom(getGameStatus());
  const host = await firstValueFrom(getHost());
  res.status(200).send({ status, hostExists: !!host });
});

app.get('/players', (req, res) => {
  res.status(200).send(getPlayers());
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

app.post('/join-game', async (req, res) => {
  const { name, id } = req.body;
  const errors = [];
  if (!name) {
    errors.push('name is required');
  }
  if (!id) {
    errors.push('id is required');
  }
  const playerSocket = playerServer.sockets.get(id);
  if (!playerSocket) {
    errors.push('player not found');
  }
  const added = await addPlayerAsync(name, playerSocket);
  if (!added) {
    errors.push('name already exists');
  }
  if (errors.length) {
    res.status(400).send({ errors });
    return;
  }
  res.status(204).send();
});

app.get('/is-first-player', async (req, res) => {
  const { id } = req.query;
  const isFirst = await isFirstPlayerAsync(id as string);
  if (isFirst === undefined) {
    res.status(400).send({ error: 'player not found' });
    return;
  }
  res.status(200).send(isFirst);
});

app.get('/test', async (req, res) => {
  const test = await firstValueFrom(getPlayers());
  res.status(200).send(test);
});

httpServer.listen(4444, () => {
  console.log('Listening on port 4444');
});
