import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { GameStatus } from 'src/app/welcome/game-status';

@Injectable()
export class WaitingRoomGuardService implements CanActivate {
  constructor(private http: HttpClient, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.http
      .get<{ status: GameStatus }>('http://localhost:4444/game-status')
      .pipe(
        map(({ status }) =>
          status === GameStatus.Open ? true : this.router.parseUrl('/welcome')
        )
      );
  }
}
