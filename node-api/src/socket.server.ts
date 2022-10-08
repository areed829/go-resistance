import { Socket } from 'socket.io';
import { HostEvents } from './host/host-events';
import { io } from './server';
// import {
//   gameStateReducer,
//   RemoveHost,
//   AddHost,
//   OpenGame,
//   RemovePlayer,
// } from './state';

const playerServer = io.of('/player');
const hostServer = io.of('/host');

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

export const playerServerOnConnection = (socket: Socket) => {
  socket.on('disconnect', () => {
    gameStateReducer(new RemovePlayer(socket.id));
  });
};

hostServer.on('connection', hostServerOnConnection);
playerServer.on('connection', playerServerOnConnection);
