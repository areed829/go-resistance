import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  status = this.gameService.getGameStatus().subscribe((gameStatus) => {
    console.log(gameStatus);
  });
  constructor(private gameService: GameService, private router: Router) {}

  startGame() {
    this.gameService.startGame();
  }

  navigateToWaitingRoom() {
    this.router.navigate(['/waiting-room']);
  }
}
