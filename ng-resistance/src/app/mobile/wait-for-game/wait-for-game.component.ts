import { Component, OnInit } from '@angular/core';
import { switchMap, timer } from 'rxjs';
import { MobileService } from '../mobile.service';

@Component({
  templateUrl: 'wait-for-game.component.html',
})
export class WaitForGameComponent implements OnInit {
  isFirst$ = timer(1000).pipe(
    switchMap((_) => this.mobileService.isFirstPlayer()),
  );

  constructor(private mobileService: MobileService) {}

  ngOnInit() {}
}
