import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Message } from '../models';
import { UserService } from '../user.service';
import { PlayerEvents } from './player-events';

const messages = (socket: Socket) =>
  new Observable((observer: Observer<Message<any>>) => {
    socket.onAny((event, payload) => observer.next({ event, payload }));
    observer.error.bind(observer);
    observer.complete.bind(observer);
  });

@Injectable()
export class PlayerWebSocketService {
  private readonly socketUrl = environment.SOCKET_ENDPOINT;
  private readonly playerUrl = `${this.socketUrl}/player`;

  private playerSocket: Socket;
  private playerMessages: Observable<Message<unknown>>;

  constructor(private userService: UserService) {
    this.playerSocket = io(this.playerUrl, {
      extraHeaders: {
        id: this.userService.getUserId(),
      },
    });

    this.playerMessages = messages(this.playerSocket);
  }

  public getPlayerId() {
    return this.playerSocket.id;
  }

  public getPlayerMessages() {
    return this.playerMessages;
  }

  public sendPlayerMessage(event: PlayerEvents, payload: string) {
    this.playerSocket.emit(event, payload);
  }
}
