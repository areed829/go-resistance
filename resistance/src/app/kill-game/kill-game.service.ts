import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class KillGameService {
  constructor(private httpClient: HttpClient) {}

  killGame() {
    return this.httpClient.post('http://localhost:4444/kill-game', {});
  }
}
