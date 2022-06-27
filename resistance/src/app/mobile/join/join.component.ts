import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { WebSocketService } from 'src/app/websocket.service';

@Component({
  templateUrl: 'join.component.html',
})
export class JoinComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.messages.subscribe((message: any) => {
      console.log(message);
    });
  }

  join() {
    this.sendMessage(this.form.value.name as string);
  }

  private sendMessage(message: string) {
    this.webSocketService.messages.next({
      source: 'localhost',
      content: message,
    });
  }
}
