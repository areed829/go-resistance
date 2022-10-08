import { firstValueFrom } from 'rxjs';
import {
  OpenGame,
  gameStateReducer,
  DebugKillGame,
  getGameStatus,
  RemoveHost,
} from '../state';

export const removeHost = () => {
  gameStateReducer(new RemoveHost());
};

export const openUpGame = () => gameStateReducer(new OpenGame());

export const currentGameStatusAsync = async () =>
  firstValueFrom(getGameStatus());

export const killGame = () => gameStateReducer(new DebugKillGame());
