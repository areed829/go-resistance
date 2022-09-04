import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HostEvents } from 'src/app/models/host-events';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  templateUrl: 'waiting-room.component.html',
  styleUrls: ['waiting-room.component.scss'],
})
export class WaitingRoomComponent implements OnInit {
  players$: Observable<string> | undefined;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.sendHostMessage(HostEvents.rejoinGame, '');
  }
}
