import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { HostService } from './host.service';

const routes: Routes = [
  { path: '', redirectTo: 'waiting-room', pathMatch: 'full' },
  {
    path: 'waiting-room',
    component: WaitingRoomComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [WaitingRoomComponent],
  providers: [HostService],
})
export class MainScreenModule {}
