import { firstValueFrom } from 'rxjs';
import { openUpGame, currentGameStatusAsync, killGame } from './host';
import {
  clearPlayers,
  addPlayerAsync,
  isFirstPlayerAsync,
  getPlayerByIdAsync,
} from './player';
import { app } from './server';
import { getHost, getPlayers } from './state';

app.get('/open-game', (req, res) => {
  openUpGame();
  res.status(204).send();
});

app.get('/game-status', async (req, res) => {
  const status = await currentGameStatusAsync();
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
  const player = await getPlayerByIdAsync(id);
  if (!player) {
    errors.push('player not found');
  } else {
    const added = await addPlayerAsync(name, player?.socket);
    if (!added) {
      errors.push('name already exists');
    }
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
