import { distinctUntilChanged, tap } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { addHost, openUpGame, removeHost } from './host';
import { HostEvents } from './host/host-events';
import { playerConnected, playerListUpdated, removePlayer } from './player';

export const setupSocketServer = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  const playerServer = io.of('/player');
  const hostServer = io.of('/host');

  const hostServerOnConnection = (socket: Socket) => {
    socket.on('disconnect', () => {
      removeHost();
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
    if (socket.handshake.headers.id) {
      playerConnected(socket, socket.handshake.headers.id as string);
    }
    socket.on('disconnect', () => {
      // removePlayer(socket.id);
    });
  };

  playerListUpdated()
    .pipe(
      distinctUntilChanged(
        (a, b) =>
          a.length === b.length && a.every((value, index) => value === b[index])
      ),
      tap((playerAdded) => console.log('playerAdded', playerAdded)),
      tap((players) => playerServer.emit('playerListUpdated', players)),
      tap((players) => hostServer.emit('playerListUpdated', players))
    )
    .subscribe();

  hostServer.on('connection', hostServerOnConnection);
  playerServer.on('connection', playerServerOnConnection);
};
