import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NODE_HOST } from './api-url';
import { DebugComponent } from './debug/debug.component';
import { KillGameComponent } from './kill-game/kill-game.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full',
  },
  {
    path: 'debug',
    component: DebugComponent,
  },
  {
    path: 'host',
    loadChildren: () => import('./host/host.module').then((m) => m.HostModule),
  },
  {
    path: 'player',
    loadChildren: () =>
      import('./player/player.module').then((m) => m.PlayerModule),
  },
  {
    path: 'kill',
    component: KillGameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: NODE_HOST, useValue: 'http://localhost:4444' }],
})
export class AppRoutingModule {}
