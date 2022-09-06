import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ResistanceService } from '../resistance.service';

@Component({
  templateUrl: 'join.component.html',
})
export class JoinComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  subscription$ = new Subscription();

  constructor(private resistanceService: ResistanceService) {}

  ngOnInit() {}

  join() {
    this.resistanceService.joinGame(this.form.value.name as string).subscribe();
  }
}
