import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { GameStatus } from '@app/models';
import { HostWebSocketService } from '../host-web-socket.service';
import { HostService } from '../host.service';
import { HostEvents } from '../host-events';

@Component({
  templateUrl: 'waiting-room.component.html',
  styleUrls: ['waiting-room.component.scss'],
})
export class WaitingRoomComponent implements OnInit {
  // players$ = this.webSocketService
  //   .getPlayerMessages()
  //   .pipe(map(({ payload }) => payload as string[]));

  constructor(
    private webSocketService: HostWebSocketService,
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
        this.route.navigate(['/host']);
      });
  }
}
