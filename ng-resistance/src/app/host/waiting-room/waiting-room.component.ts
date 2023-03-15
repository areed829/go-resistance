import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, merge, Observable, take } from 'rxjs';
import { GameStatus } from '@app/models';
import { HostWebSocketService } from '../host-web-socket.service';
import { HostService } from '../host.service';
import { HostEvents } from '../host-events';

@Component({
  templateUrl: 'waiting-room.component.html',
  styleUrls: ['waiting-room.component.scss'],
})
export class WaitingRoomComponent implements OnInit {
  players$: Observable<string[]> = merge(
    this.hostService
      .getPlayers()
      .pipe(map((players) => players.map((player) => player.name))),
    this.hostSocket.getHostMessages().pipe(
      filter((message) => message.event === HostEvents.playerJoined),
      map((message) => message.payload as string[]),
    ),
  );

  constructor(
    private hostSocket: HostWebSocketService,
    private hostService: HostService,
    private route: Router,
  ) {}

  ngOnInit() {
    this.hostSocket.sendHostMessage(HostEvents.rejoinGame, '');
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
