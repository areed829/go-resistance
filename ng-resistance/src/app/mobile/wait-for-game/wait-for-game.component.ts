import { Component, OnInit } from '@angular/core';
import { MobileService } from '../mobile.service';

@Component({
  templateUrl: 'wait-for-game.component.html',
})
export class WaitForGameComponent implements OnInit {
  isFirst$ = this.mobileService.isFirstPlayer();

  constructor(private mobileService: MobileService) {}

  ngOnInit() {}
}
