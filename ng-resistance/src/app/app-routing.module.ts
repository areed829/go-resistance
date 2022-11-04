import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NODE_HOST } from './api-url';
import { DebugComponent } from './debug/debug.component';
import { KillGameComponent } from './kill-game/kill-game.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mobile',
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
    path: 'main',
    loadChildren: () =>
      import('./main-screen/main-screen.module').then(
        (m) => m.MainScreenModule,
      ),
  },
  {
    path: 'mobile',
    loadChildren: () =>
      import('./mobile/mobile.module').then((m) => m.MobileModule),
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
