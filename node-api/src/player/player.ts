import { Socket } from 'socket.io';

export interface Player {
  name: string;
  socket: Socket;
}

export let players: { [socketId: string]: Player } = {};

export const playerServerOnConnection = (socket: Socket) => {
  socket.on('disconnect', () => {
    const { [socket.id]: removedPlayer, ...filteredPlayers } = players;
    players = filteredPlayers;
  });

  socket.on('join-game', (player) => {
    const added = addPlayer(player, socket);
    if (added) {
      socket.emit('joined-game', player);
    } else {
      socket.emit('join-failed', `${player} already exists`);
    }
  });
};

export const addPlayer = (name: string, socket: Socket) => {
  if (!playerExists(name)) {
    players = { ...players, [socket.id]: { name, socket } };
    return true;
  }
  return false;
};

export const clearPlayers = () => {
  players = {};
};

export const getPlayers = () => players;

const playerExists = (name: string) =>
  Object.keys(players).some(
    (socketId) =>
      players[socketId].name.localeCompare(name, undefined, {
        sensitivity: 'accent',
      }) === 0
  );
