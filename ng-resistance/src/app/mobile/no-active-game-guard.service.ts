import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { GameStatus } from '../models/game-status';
import { NODE_HOST } from '../api-url';

@Injectable()
export class NoActiveGameGuardService implements CanActivate {
  constructor(
    @Inject(NODE_HOST) private host: string,
    private http: HttpClient,
    private router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.http
      .get<{ status: GameStatus }>(`${this.host}/game-status`)
      .pipe(
        map(({ status }) =>
          status === GameStatus.Open
            ? true
            : this.router.parseUrl('/mobile/no-active-game'),
        ),
      );
  }
}
