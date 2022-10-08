import { firstValueFrom, map } from 'rxjs';
import { Socket } from 'socket.io';
import {
  gameStateReducer,
  getFirstPlayer,
  playerNameExists,
  AddPlayer,
  ClearPlayers,
  getPlayers,
} from '../state';

export const addPlayerAsync = async (name: string, socket: Socket) => {
  if (!socket) throw new Error('socket is required');
  const nameExists = await firstValueFrom(playerNameExists(name));
  if (!nameExists) {
    gameStateReducer(new AddPlayer({ name, socket, isFirst: false }));
    return true;
  }
  return false;
};

export const clearPlayers = () => {
  gameStateReducer(new ClearPlayers());
};

export const getPlayersAsync = async () =>
  firstValueFrom(
    getPlayers().pipe(
      map((players) =>
        Object.values(players).map(({ name, isFirst }) => ({ name, isFirst }))
      )
    )
  );

export const isFirstPlayerAsync = async (
  id: string
): Promise<boolean | undefined> => {
  const firstPlayer = await firstValueFrom(getFirstPlayer());
  return firstPlayer?.socket.id === id;
};

export const playerExists = async (id: string) => {
  const playerIds = await firstValueFrom(
    getPlayers().pipe(map((players) => Object.keys(players)))
  );
  return playerIds.some((playerId) => playerId === id);
};

export const getPlayerByIdAsync = async (id: string) => {
  const players = await firstValueFrom(getPlayers());
  return players[id];
};
