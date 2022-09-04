import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Observable, take, tap } from 'rxjs';
import { GameStatus } from 'src/app/models/game-status';
import { HostEvents } from 'src/app/models/host-events';
import { WebSocketService } from 'src/app/web-socket.service';
import { ResistanceService } from '../resistance.service';

@Component({
  templateUrl: 'no-active-game.component.html',
})
export class NoActiveGameComponent implements OnInit {
  constructor(
    private socketService: WebSocketService,
    private resistanceService: ResistanceService,
    private route: Router,
  ) {}

  ngOnInit() {
    this.socketService
      .getHostMessages()
      .pipe(
        filter((message) => message.event === HostEvents.gameOpened),
        take(1),
        tap(() => this.route.navigate(['/mobile', 'join'])),
      )
      .subscribe();

    this.resistanceService
      .getGameStatus()
      .subscribe(
        ({ status }) =>
          status === GameStatus.Open &&
          this.route.navigate(['/mobile', 'join']),
      );
  }
}
