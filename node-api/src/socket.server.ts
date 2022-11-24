import { distinctUntilChanged, from, switchMap, take, tap } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { addHost, gameCanStart, openUpGame, removeHost } from './host';
import { HostEvents } from './host/host-events';
import {
  getFirstPlayerSocketAsync,
  getPlayersAsync,
  playerConnected,
  playerListUpdated,
} from './player';
import { PlayerEvents } from './player/player-events';

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
  };

  playerListUpdated()
    .pipe(
      distinctUntilChanged(
        (a, b) =>
          a.length === b.length && a.every((value, index) => value === b[index])
      ),
      tap((players) => playerServer.emit(PlayerEvents.playerJoined, players)),
      tap((players) => hostServer.emit(HostEvents.playerJoined, players))
    )
    .subscribe();

  gameCanStart()
    .pipe(
      take(1),
      switchMap(() => from(getFirstPlayerSocketAsync())),
      tap(() => hostServer.emit(HostEvents.gameCanStart)),
      tap((socket) => socket?.emit(PlayerEvents.gameCanStart))
    )
    .subscribe();

  hostServer.on('connection', hostServerOnConnection);
  playerServer.on('connection', playerServerOnConnection);
};
