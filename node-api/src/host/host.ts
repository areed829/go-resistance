import { Socket } from 'socket.io';
import { GameStatus } from '../game-status';
import { HostEvents } from './host-events';

export interface Host {
  status: GameStatus;
  socket: Socket;
}

let host: Host = { status: GameStatus.Closed, socket: null };

export const hostServerOnConnection = (socket: Socket) => {
  console.log(`Host Socket ${socket.id} has connected`);
  socket.on('disconnect', () =>
    console.log(`Host Socket ${socket.id} has disconnected`)
  );

  socket.on(HostEvents.openGame, () => {
    host = { ...host, socket, status: GameStatus.Open };
  });
};

export const setGameStatus = (socket: Socket, status: GameStatus) =>
  (host = { ...host, socket, status });

export const getGame = () => host;
export const getGameStatus = () => host.status;
export const getGameSocket = () => host.socket;
