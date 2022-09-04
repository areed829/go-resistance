import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DebugService {
  private readonly baseUrl = 'http://localhost:4444';
  constructor(private httpClient: HttpClient) {}

  getPlayers() {
    return this.httpClient.get<{ players: string[] }>(
      `${this.baseUrl}/players`,
    );
  }

  getGameStatus() {
    return this.httpClient.get<{ status: string }>(
      `${this.baseUrl}/game-status`,
    );
  }

  clearPlayers() {
    return this.httpClient.get<{ status: string }>(
      `${this.baseUrl}/clear-players`,
    );
  }

  openGame() {
    return this.httpClient.get(`${this.baseUrl}/open-game`);
  }

  killGame() {
    return this.httpClient.get(`${this.baseUrl}/kill-game`);
  }
}
