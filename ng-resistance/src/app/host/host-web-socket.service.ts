import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Message } from '../models';
import { HostEvents } from './host-events';

const messages = (socket: Socket) =>
  new Observable((observer: Observer<Message<any>>) => {
    socket.onAny((event, payload) => observer.next({ event, payload }));
    observer.error.bind(observer);
    observer.complete.bind(observer);
  });

@Injectable()
export class HostWebSocketService {
  private readonly socketUrl = environment.SOCKET_ENDPOINT;
  private readonly hostUrl = `${this.socketUrl}/host`;

  private hostSocket: Socket;
  private hostMessages: Observable<Message<unknown>>;

  constructor() {
    this.hostSocket = io(this.hostUrl);

    this.hostMessages = messages(this.hostSocket);
  }

  public getHostId() {
    return this.hostSocket.id;
  }

  public getHostMessages() {
    return this.hostMessages;
  }

  public sendHostMessage(event: HostEvents, payload: string) {
    this.hostSocket.emit(event, payload);
  }
}
