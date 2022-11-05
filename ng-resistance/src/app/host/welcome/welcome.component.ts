import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostEvents } from '../host-events';
import { HostWebSocketService } from '../host-web-socket.service';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  constructor(
    private webSocketService: HostWebSocketService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  startGame() {
    this.webSocketService.sendHostMessage(HostEvents.openGame, '');
    this.router.navigate(['../waiting-room'], {
      relativeTo: this.route,
    });
  }
}
