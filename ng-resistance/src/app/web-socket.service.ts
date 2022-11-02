import { Inject, Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { BROWSER_STORAGE } from './local-storage';
import { Message } from './models';
import { HostEvents } from './models/host-events';
import { PlayerEvents } from './models/player-events';
import { UserService } from './user.service';

const messages = (socket: Socket) =>
  new Observable((observer: Observer<Message<any>>) => {
    socket.onAny((event, payload) => observer.next({ event, payload }));
    observer.error.bind(observer);
    observer.complete.bind(observer);
  });

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private readonly socketUrl = environment.SOCKET_ENDPOINT;
  private readonly playerUrl = `${this.socketUrl}/player`;
  private readonly hostUrl = `${this.socketUrl}/host`;

  private playerSocket: Socket;
  private playerMessages: Observable<Message<unknown>>;

  private hostSocket: Socket;
  private hostMessages: Observable<Message<unknown>>;

  constructor(private userService: UserService) {
    this.playerSocket = io(this.playerUrl, {
      extraHeaders: {
        id: this.userService.getUserId(),
      },
    });
    this.hostSocket = io(this.hostUrl);

    this.playerMessages = messages(this.playerSocket);
    this.hostMessages = messages(this.hostSocket);
  }

  public getHostId() {
    return this.hostSocket.id;
  }

  public getPlayerId() {
    return this.playerSocket.id;
  }

  public getPlayerMessages() {
    return this.playerMessages;
  }

  public getHostMessages() {
    return this.hostMessages;
  }

  public sendPlayerMessage(event: PlayerEvents, payload: string) {
    this.playerSocket.emit(event, payload);
  }

  public sendHostMessage(event: HostEvents, payload: string) {
    this.hostSocket.emit(event, payload);
  }
}
