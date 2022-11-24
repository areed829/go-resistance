import { firstValueFrom } from 'rxjs';
import { getGameCanStart, getGameStatus, getHost } from '../state/selectors';
import * as actions from '../state/actions';
import { gameStateReducer } from '../state/state';
import { Socket } from 'socket.io';

export const removeHost = () => {
  gameStateReducer(new actions.RemoveHost());
};

export const addHost = (socket: Socket) =>
  gameStateReducer(new actions.AddHost({ socket }));

export const getHostAsync = async () => firstValueFrom(getHost());

export const openUpGame = () => gameStateReducer(new actions.OpenGame());

export const currentGameStatusAsync = async () =>
  firstValueFrom(getGameStatus());

export const killGame = () => gameStateReducer(new actions.DebugKillGame());

export const gameCanStart = () => getGameCanStart();
