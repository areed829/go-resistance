import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  templateUrl: 'join.component.html',
})
export class JoinComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.getMessages().subscribe((message) => {
      console.log(message);
    });
  }

  join() {
    this.sendMessage(this.form.value.name as string);
  }

  private sendMessage(message: string) {
    console.log(message);
    this.webSocketService.sendMessage('getDoc', message);
  }
}
