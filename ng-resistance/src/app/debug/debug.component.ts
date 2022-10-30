import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { DebugService } from './debug.service';

@Component({
  template: ` <div class="flex">
      <a [href]="['/welcome']" link-button>Host Start Game</a>
      <a [href]="['/mobile']" link-button>Player Join Game</a>
    </div>
    <div class="flex">
      <button (click)="getPlayers()" small-orange-button>Get Players</button>
      <button (click)="getGameStatus()" small-orange-button>
        Get Game Status
      </button>
      <button (click)="clearPlayers()" small-orange-button>
        Clear Players
      </button>
    </div>
    <div class="flex">
      <button (click)="openGame()" small-orange-button>Open Game</button>
      <button (click)="killGame()" small-orange-button>Kill Game</button>
    </div>`,
  providers: [DebugService],
})
export class DebugComponent implements OnInit {
  constructor(
    private socketService: WebSocketService,
    private debugService: DebugService,
  ) {}

  ngOnInit() {}

  getPlayers() {
    this.debugService.getPlayers().subscribe((data) => {
      console.log(data);
    });
  }

  getGameStatus() {
    this.debugService.getGameStatus().subscribe((data) => {
      console.log(data);
    });
  }

  clearPlayers() {
    this.debugService.clearPlayers().subscribe();
  }

  openGame() {
    this.debugService.openGame().subscribe();
  }

  killGame() {
    this.debugService.killGame().subscribe();
  }
}
