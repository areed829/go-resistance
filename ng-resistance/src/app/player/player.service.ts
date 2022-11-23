import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NODE_HOST } from '@app/api-url';
import { GameStatus } from '@app/models';
import { UserService } from '@app/user.service';
import { PlayerWebSocketService } from './player-web-socket.service';

@Injectable()
export class PlayerService {
  constructor(
    @Inject(NODE_HOST) private host: string,
    private httpClient: HttpClient,
    private userService: UserService,
    private webSocketService: PlayerWebSocketService,
  ) {}

  getGameStatus() {
    return this.httpClient.get<{ status: GameStatus; hostExists: boolean }>(
      `${this.host}/game-status`,
    );
  }

  isFirstPlayer() {
    return this.httpClient.get<boolean>(
      `${this.host}/is-first-player?id=${this.webSocketService.getPlayerId()}`,
    );
  }

  joinGame(name: string) {
    const id = this.userService.getUserId();
    return this.httpClient.post(`${this.host}/join-game`, { name, id });
  }
}
