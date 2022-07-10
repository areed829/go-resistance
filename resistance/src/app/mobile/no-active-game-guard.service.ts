import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { GameStatus } from '../welcome/game-status';

@Injectable()
export class NoActiveGameGuardService implements CanActivate {
  constructor(private http: HttpClient, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.http
      .get<{ status: GameStatus }>('http://localhost:4444/game-status')
      .pipe(
        map(({ status }) =>
          status === GameStatus.Open
            ? true
            : this.router.parseUrl('/mobile/no-active-game')
        )
      );
  }
}
