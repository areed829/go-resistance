import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, Observable, take, tap } from 'rxjs';
import { GameStatus } from 'src/app/models/game-status';
import { HostEvents } from 'src/app/models/host-events';
import { WebSocketService } from 'src/app/web-socket.service';
import { HostService } from '../host.service';

@Component({
  templateUrl: 'waiting-room.component.html',
  styleUrls: ['waiting-room.component.scss'],
})
export class WaitingRoomComponent implements OnInit {
  players$: Observable<string> | undefined;

  constructor(
    private webSocketService: WebSocketService,
    private hostService: HostService,
    private route: Router,
  ) {}

  ngOnInit() {
    this.webSocketService.sendHostMessage(HostEvents.rejoinGame, '');
    this.hostService
      .getGameStatus()
      .pipe(
        take(1),
        filter(({ status }) => status !== GameStatus.Open),
      )
      .subscribe(() => {
        this.route.navigate(['/welcome']);
      });
  }
}
