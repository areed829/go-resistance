import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NODE_HOST } from '../api-url';
import { GameStatus } from '../models/game-status';

@Injectable()
export class ResistanceService {
  constructor(
    @Inject(NODE_HOST) private host: string,
    private httpClient: HttpClient,
  ) {}

  getGameStatus() {
    return this.httpClient.get<{ status: GameStatus; hostExists: boolean }>(
      `${this.host}/game-status`,
    );
  }
}
