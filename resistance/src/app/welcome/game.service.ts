import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameStatus } from './game-status';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private httpClient: HttpClient) {}

  getGameStatus() {
    return this.httpClient.get<{ status: GameStatus }>(
      'http://localhost:4444/game-status'
    );
  }

  startGame() {
    return this.httpClient.get<{ status: GameStatus }>(
      'http://localhost:4444/start-game'
    );
  }
}
