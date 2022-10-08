import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { addHost, openUpGame, removeHost } from './host';
import { HostEvents } from './host/host-events';
import { removePlayer } from './player';

export const setupSocketServer = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  const playerServer = io.of('/player');
  const hostServer = io.of('/host');

  const hostServerOnConnection = (socket: Socket) => {
    socket.on('disconnect', () => {
      removeHost;
    });

    socket.on(HostEvents.rejoinGame, () => {
      addHost(socket);
    });

    socket.on(HostEvents.openGame, () => {
      openUpGame();
      socket.broadcast.emit(HostEvents.gameOpened);
    });
  };

  const playerServerOnConnection = (socket: Socket) => {
    socket.on('disconnect', () => {
      removePlayer(socket.id);
    });
  };

  hostServer.on('connection', hostServerOnConnection);
  playerServer.on('connection', playerServerOnConnection);
};
