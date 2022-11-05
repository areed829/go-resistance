import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, take, tap } from 'rxjs';
import { GameStatus } from '@app/models';
import { MobileService } from '../mobile.service';
import { PlayerWebSocketService } from '../player-web-socket.service';

@Component({
  templateUrl: 'no-active-game.component.html',
})
export class NoActiveGameComponent implements OnInit {
  constructor(
    private socketService: PlayerWebSocketService,
    private resistanceService: MobileService,
    private route: Router,
  ) {}

  ngOnInit() {
    // this.socketService
    //   .getPlayerMessages()
    //   .pipe(
    //     filter((message) => message.event === HostEvents.gameOpened),
    //     take(1),
    //     tap(() => this.route.navigate(['/mobile', 'join'])),
    //   )
    //   .subscribe();

    this.resistanceService
      .getGameStatus()
      .subscribe(
        ({ status }) =>
          status === GameStatus.Open &&
          this.route.navigate(['/mobile', 'join']),
      );
  }
}
