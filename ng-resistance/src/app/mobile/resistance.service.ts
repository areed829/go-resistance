import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NODE_HOST } from '../api-url';

@Injectable()
export class ResistanceService {
  constructor(
    @Inject(NODE_HOST) private host: string,
    private httpClient: HttpClient
  ) {}

  join(name: string) {
    return this.httpClient.post(`${this.host}/join`, { name });
  }
}
