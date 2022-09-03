import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NODE_HOST } from '../api-url';

@Injectable({ providedIn: 'root' })
export class KillGameService {
  constructor(
    @Inject(NODE_HOST) private host: string,
    private httpClient: HttpClient
  ) {}

  killGame() {
    return this.httpClient.post(`${this.host}/kill-game`, {});
  }
}
