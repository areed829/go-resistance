import { Socket } from 'socket.io';
import {
  OpenGame,
  gameStateReducer,
  RemoveHost,
  AddHost,
  DebugKillGame,
} from '../state';
import { HostEvents } from './host-events';

export const hostServerOnConnection = (socket: Socket) => {
  socket.on('disconnect', () => {
    gameStateReducer(new RemoveHost());
  });

  socket.on(HostEvents.rejoinGame, () => {
    gameStateReducer(new AddHost({ socket }));
  });

  socket.on(HostEvents.openGame, () => {
    gameStateReducer(new OpenGame());
    socket.broadcast.emit(HostEvents.gameOpened);
  });
};

export const killGame = () => gameStateReducer(new DebugKillGame());
