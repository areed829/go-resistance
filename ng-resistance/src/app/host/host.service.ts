import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Player } from '@app/models';
import { NODE_HOST } from '../api-url';
import { GameStatus } from '../models/game-status';

@Injectable()
export class HostService {
  constructor(
    @Inject(NODE_HOST) private host: string,
    private http: HttpClient,
  ) {}

  getGameStatus() {
    return this.http.get<{ status: GameStatus; hostExists: boolean }>(
      `${this.host}/game-status`,
    );
  }

  getPlayers() {
    return this.http.get<Player[]>(this.host + '/players');
  }
}
