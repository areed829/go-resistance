import { firstValueFrom, map } from 'rxjs';
import { Socket } from 'socket.io';
import {
  gameStateReducer,
  getFirstPlayer,
  RemovePlayer,
  playerNameExists,
  AddPlayer,
  ClearPlayers,
  getPlayers,
} from '../state';

export const playerServerOnConnection = (socket: Socket) => {
  socket.on('disconnect', () => {
    gameStateReducer(new RemovePlayer(socket.id));
  });
};

export const addPlayerAsync = async (name: string, socket: Socket) => {
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
