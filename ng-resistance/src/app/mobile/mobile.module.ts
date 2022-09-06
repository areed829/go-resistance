import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { JoinComponent } from './join/join.component';
import { NoActiveGameGuardService } from './no-active-game-guard.service';
import { NoActiveGameComponent } from './no-active-game/no-active-game.component';
import { ResistanceService } from './resistance.service';
import { WaitForGameComponent } from './wait-for-game/wait-for-game.component';

const routes: Routes = [
  { path: '', pathMatch: 'prefix', redirectTo: 'join' },
  {
    path: 'join',
    component: JoinComponent,
    canActivate: [NoActiveGameGuardService],
  },
  {
    path: 'no-active-game',
    component: NoActiveGameComponent,
  },
  {
    path: 'wait-for-game',
    component: WaitForGameComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  declarations: [JoinComponent, NoActiveGameComponent, WaitForGameComponent],
  providers: [NoActiveGameGuardService, ResistanceService],
})
export class MobileModule {}
