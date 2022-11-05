import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { HostWebSocketService } from './host-web-socket.service';
import { HostService } from './host.service';

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
  providers: [HostWebSocketService, HostService],
})
export class HostModule {}
