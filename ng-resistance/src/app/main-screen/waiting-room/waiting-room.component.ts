import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  templateUrl: 'waiting-room.component.html',
  styleUrls: ['waiting-room.component.scss'],
})
export class WaitingRoomComponent implements OnInit {
  players$: Observable<string> | undefined;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.players$ = this.webSocketService.getMessages().pipe(
      tap((message) => console.log(message)),
      map((message) => 'player')
    );
  }
}
