import express from 'express';
import { firstValueFrom } from 'rxjs';
import {
  openUpGame,
  currentGameStatusAsync,
  killGame,
  getHostAsync,
} from './host';
import {
  clearPlayers,
  addPlayerAsync,
  isFirstPlayerAsync,
  getPlayerByIdAsync,
  getPlayersAsync,
} from './player';

export const setupRestServer = (app: express.Express) => {
  app.get('/open-game', (req, res) => {
    openUpGame();
    res.status(204).send();
  });

  app.get('/game-status', async (req, res) => {
    const status = await currentGameStatusAsync();
    const host = await getHostAsync();
    res.status(200).send({ status, hostExists: !!host });
  });

  app.get('/players', async (req, res) => {
    res.status(200).send(await getPlayersAsync());
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
      const added = await addPlayerAsync(name, id);
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
};
