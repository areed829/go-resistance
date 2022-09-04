import { Socket } from 'socket.io';
import { GameStatus } from '../game-status';
import { HostEvents } from './host-events';

export interface Host {
  status: GameStatus;
  socket: Socket;
}

let host: Host = { status: GameStatus.Closed, socket: null };

export const hostServerOnConnection = (socket: Socket) => {
  socket.on('disconnect', () => {
    host = { ...host, socket: null };
  });

  socket.on(HostEvents.rejoinGame, () => {
    host = { ...host, socket };
  });

  socket.on(HostEvents.openGame, () => {
    host = { ...host, socket, status: GameStatus.Open };
    socket.broadcast.emit(HostEvents.gameOpened);
  });
};

export const openGame = () => {
  host = { ...host, status: GameStatus.Open };
  host.socket?.emit(HostEvents.openGame, { status: GameStatus.Open });
};

export const killGame = () => {
  host = { ...host, status: GameStatus.Closed };
  host.socket?.emit(HostEvents.killGame, { status: GameStatus.Closed });
};

export const getGame = () => host;
export const getGameStatus = () => host.status;
export const getGameSocket = () => host.socket;
