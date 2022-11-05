import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { HostService } from './host.service';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix',
  },
  {
    path: 'home',
    component: WelcomeComponent,
  },
  {
    path: 'waiting-room',
    component: WaitingRoomComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [WelcomeComponent, WaitingRoomComponent],
  providers: [HostService],
})
export class HostModule {}
