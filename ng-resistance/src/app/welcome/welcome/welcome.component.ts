import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  status = this.gameService.getGameStatus();
  constructor(private gameService: GameService, private router: Router) {}

  startGame() {
    this.gameService.startGame().subscribe();
    this.navigateToWaitingRoom();
  }

  navigateToWaitingRoom() {
    this.router.navigate(['main', 'waiting-room']);
  }
}
