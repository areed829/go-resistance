import { Socket } from 'socket.io';

export interface Player {
  name: string;
  socket: Socket;
  isFirst: boolean;
}
