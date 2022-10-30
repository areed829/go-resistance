import { filter, firstValueFrom, map } from 'rxjs';
import { Socket } from 'socket.io';
import { gameStateReducer } from '../state/state';
import * as actions from '../state/actions';
import {
  playerNameExists,
  getPlayers,
  getFirstPlayer,
} from '../state/selectors';
import { Player } from '../models';

export const addPlayerAsync = async (name: string, socket: Socket) => {
  if (!socket) throw new Error('socket is required');
  const nameExists = await firstValueFrom(playerNameExists(name));
  if (!nameExists) {
    gameStateReducer(new actions.AddPlayer({ name, socket, isFirst: false }));
    return true;
  }
  return false;
};

export const removePlayer = (socketId: string) => {
  gameStateReducer(new actions.RemovePlayer(socketId));
};

export const clearPlayers = () => {
  gameStateReducer(new actions.ClearPlayers());
};

export const playerConnected = (socket: Socket) => {
  gameStateReducer(new actions.PlayerConnected(socket));
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

export const playerListUpdated = () =>
  getPlayers().pipe(
    map((players) => Object.values(players).map(({ name }) => name)),
    filterPlayersWithNoName
  );

const filterPlayersWithNoName = map<string[], string[]>((players) =>
  players.filter((player) => player)
);
