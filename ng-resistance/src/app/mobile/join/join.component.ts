import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, Subscription, tap } from 'rxjs';
import { ResistanceService } from '../resistance.service';

@Component({
  templateUrl: 'join.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent implements OnInit {
  private existingNames: string[] = ['alex'];

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      forbiddenNameValidator(this.existingNames),
    ]),
  });

  subscription$ = new Subscription();

  constructor(
    private resistanceService: ResistanceService,
    private router: Router,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit() {}

  join() {
    this.resistanceService
      .joinGame(this.form.value.name as string)
      .pipe(
        tap(() => {
          this.router.navigate(['/mobile/wait-for-game']);
        }),
        catchError((_) => {
          this.existingNames.push(
            this.form.value.name?.trim().toLowerCase() as string,
          );
          this.form.controls.name.setErrors({
            nameExists: { value: this.existingNames },
          });
          this.ref.markForCheck();
          return EMPTY;
        }),
      )
      .subscribe();
  }
}

export function forbiddenNameValidator(existingNames: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return existingNames.includes(control.value.trim().toLowerCase())
      ? { nameExists: { value: existingNames } }
      : null;
  };
}
