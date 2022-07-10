import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { NODE_HOST } from 'src/app/api-url';
import { GameStatus } from 'src/app/welcome/game-status';

@Injectable()
export class WaitingRoomGuardService implements CanActivate {
  constructor(
    @Inject(NODE_HOST) private host: string,
    private http: HttpClient,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.http
      .get<{ status: GameStatus }>(`${this.host}/game-status`)
      .pipe(
        map(({ status }) =>
          status === GameStatus.Open ? true : this.router.parseUrl('/welcome')
        )
      );
  }
}
