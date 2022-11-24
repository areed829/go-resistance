import { Component, OnInit } from '@angular/core';
import { filter, map, startWith } from 'rxjs';
import { PlayerEvents } from '../player-events';
import { PlayerWebSocketService } from '../player-web-socket.service';
import { PlayerService } from '../player.service';

@Component({
  templateUrl: 'wait-for-game.component.html',
})
export class WaitForGameComponent implements OnInit {
  isFirst$ = this.mobileService.isFirstPlayer();
  gameCanStart$ = this.playerWebSocketService.getPlayerMessages().pipe(
    filter((message) => message.event === PlayerEvents.gameCanStart),
    map(() => 2),
    startWith(1),
  );

  constructor(
    private mobileService: PlayerService,
    private playerWebSocketService: PlayerWebSocketService,
  ) {}

  ngOnInit() {}
}
