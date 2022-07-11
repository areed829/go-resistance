import { Socket } from 'socket.io';

export interface Player {
  name: string;
  socket: Socket;
}

export let players: { [socketId: string]: Player } = {};

export const playerServerOnConnection = (socket: Socket) => {
  console.log(`Player Socket ${socket.id} has connected`);
  socket.on('disconnect', () =>
    console.log(`Player Socket ${socket.id} has disconnected`)
  );

  socket.on('join-game', (player) => {
    // if (gameStatus.status === GameStatus.Open) {
    const added = addPlayer(player, socket);
    if (added) {
      socket.emit('joined-game', player);
    } else {
      socket.emit('join-failed', `${player} already exists`);
    }
    // } else {
    //   socket.emit('join-game-failure', 'Game is not open');
    // }
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

const playerExists = (name: string) =>
  Object.keys(players).some(
    (socketId) =>
      players[socketId].name.localeCompare(name, undefined, {
        sensitivity: 'accent',
      }) === 0
  );
