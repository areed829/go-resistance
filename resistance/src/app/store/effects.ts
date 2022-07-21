import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class AppEffectsService {
  constructor(private actions$: Actions) {}
}
