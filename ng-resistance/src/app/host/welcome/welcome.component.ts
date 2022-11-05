import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HostEvents } from 'src/app/models/host-events';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  constructor(
    private webSocketService: WebSocketService,
    private router: Router,
  ) {}

  startGame() {
    this.webSocketService.sendHostMessage(HostEvents.openGame, '');
    this.router.navigate(['./waiting-room']);
  }
}
