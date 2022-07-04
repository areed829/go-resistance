import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StartGameComponent } from './start-game/start-game.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';

const routes: Routes = [
  { path: '', redirectTo: 'waiting-room', pathMatch: 'full' },
  { path: 'waiting-room', component: WaitingRoomComponent },
  { path: 'start', component: StartGameComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [StartGameComponent, WaitingRoomComponent],
  providers: [],
})
export class MainScreenModule {}
