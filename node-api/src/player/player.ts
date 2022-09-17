import { Socket } from 'socket.io';

export interface Player {
  name: string;
  socket: Socket;
  isFirst: boolean;
}

export let players: { [socketId: string]: Player } = {};

export const playerServerOnConnection = (socket: Socket) => {
  socket.on('disconnect', () => {
    const { [socket.id]: removedPlayer, ...filteredPlayers } = players;
    players = filteredPlayers;
  });
};

export const addPlayer = (name: string, socket: Socket) => {
  if (!playerExists(name)) {
    players = {
      ...players,
      [socket.id]: { name, socket, isFirst: !Object.keys(players).length },
    };
    return true;
  }
  return false;
};

export const clearPlayers = () => {
  players = {};
};

export const getPlayers = () =>
  Object.values(players).map(({ name, isFirst }) => ({ name, isFirst }));

const playerExists = (name: string) =>
  Object.keys(players).some(
    (socketId) =>
      players[socketId].name.localeCompare(name, undefined, {
        sensitivity: 'accent',
      }) === 0
  );

export const isFirstPlayer = (id: string): boolean | undefined =>
  players[id]?.isFirst;
