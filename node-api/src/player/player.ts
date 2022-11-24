import { firstValueFrom, map } from 'rxjs';
import { Socket } from 'socket.io';
import { gameStateReducer } from '../state/state';
import * as actions from '../state/actions';
import {
  playerNameExists,
  getPlayers,
  getFirstPlayer,
} from '../state/selectors';

export const addPlayerAsync = async (name: string, id: string) => {
  const nameExists = await firstValueFrom(playerNameExists(name));
  if (!nameExists) {
    gameStateReducer(new actions.UpdatePlayerName({ name, id }));
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

export const playerConnected = (socket: Socket, id: string) => {
  gameStateReducer(new actions.PlayerConnected({ socket, id }));
};

export const getPlayersAsync = async () =>
  firstValueFrom(
    getPlayers().pipe(
      map((players) =>
        Object.values(players).map(({ name, isFirst, id }) => ({
          name,
          isFirst,
          id,
        }))
      )
    )
  );

export const getFirstPlayerSocketAsync = async () =>
  firstValueFrom(getFirstPlayer().pipe(map((player) => player?.socket)));

export const isFirstPlayerAsync = async (
  id: string
): Promise<boolean | undefined> => {
  const firstPlayer = await firstValueFrom(getFirstPlayer());
  return firstPlayer?.id === id;
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
