import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Observable, take, tap } from 'rxjs';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  templateUrl: 'no-active-game.component.html',
})
export class NoActiveGameComponent implements OnInit {
  constructor(private socketService: WebSocketService, private route: Router) {}

  ngOnInit() {
    this.socketService
      .getMessages()
      .pipe(
        filter((message) => message.event === 'game-started'),
        take(1),
        tap(() => this.route.navigate(['/mobile', 'join']))
      )
      .subscribe();
  }
}
