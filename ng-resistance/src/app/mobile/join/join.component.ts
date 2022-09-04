import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PlayerEvents } from 'src/app/models/player-events';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  templateUrl: 'join.component.html',
})
export class JoinComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  subscription$ = new Subscription();

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.subscription$.add(
      this.webSocketService
        .getPlayerMessages()
        .subscribe((message) => console.log('player message', message)),
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  join() {
    this.sendMessage(this.form.value.name as string);
  }

  private sendMessage(message: string) {
    this.webSocketService.sendPlayerMessage(PlayerEvents.joinGame, message);
  }
}
