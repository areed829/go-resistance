import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KillGameService } from './kill-game.service';

@Component({
  selector: 'selector-name',
  template: ``,
})
export class KillGameComponent implements OnInit {
  constructor(
    private killGameService: KillGameService,
    private route: Router
  ) {}

  ngOnInit() {
    this.killGameService.killGame().subscribe();
    this.route.navigate(['/welcome']);
  }
}
