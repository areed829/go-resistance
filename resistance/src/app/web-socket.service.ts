import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket: Socket;
  private messages: Observable<any>;
  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.messages = new Observable((obs: Observer<any>) => {
      this.socket.onAny((event, payload) => obs.next({ event, payload }));
      obs.error.bind(obs);
      obs.complete.bind(obs);
    });
  }

  public getMessages(): Observable<any> {
    return this.messages;
  }

  public sendMessage(event: string, payload: string) {
    this.socket.emit(event, payload);
  }
}
