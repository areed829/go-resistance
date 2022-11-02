import { Socket } from 'socket.io';

export interface Player {
  id: string;
  name: string;
  socket: Socket;
  isFirst: boolean;
}
