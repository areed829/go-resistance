import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, take, tap } from 'rxjs';
import { GameStatus } from '@app/models';
import { PlayerService } from '../player.service';
import { PlayerWebSocketService } from '../player-web-socket.service';

@Component({
  templateUrl: 'no-active-game.component.html',
})
export class NoActiveGameComponent implements OnInit {
  constructor(
    private socketService: PlayerWebSocketService,
    private resistanceService: PlayerService,
    private route: Router,
  ) {}

  ngOnInit() {
    this.resistanceService
      .getGameStatus()
      .subscribe(
        ({ status }) =>
          status === GameStatus.Open &&
          this.route.navigate(['/player', 'join']),
      );
  }
}
