import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameStatus } from './game-status';
import { NODE_HOST } from '../api-url';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(
    @Inject(NODE_HOST) private host: string,
    private httpClient: HttpClient
  ) {}

  getGameStatus() {
    return this.httpClient.get<{ status: GameStatus }>(
      `${this.host}/game-status`
    );
  }

  startGame() {
    return this.httpClient.get<{ status: GameStatus }>(
      `${this.host}/start-game`
    );
  }
}
