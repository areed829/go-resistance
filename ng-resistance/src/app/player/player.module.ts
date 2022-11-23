import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { JoinComponent } from './join/join.component';
import { NoActiveGameGuardService } from './no-active-game-guard.service';
import { NoActiveGameComponent } from './no-active-game/no-active-game.component';
import { PlayerService } from './player.service';
import { WaitForGameComponent } from './wait-for-game/wait-for-game.component';
import { SharedModule } from '../shared/shared.module';
import { PlayerWebSocketService } from './player-web-socket.service';

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
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [JoinComponent, NoActiveGameComponent, WaitForGameComponent],
  providers: [NoActiveGameGuardService, PlayerService, PlayerWebSocketService],
})
export class PlayerModule {}
