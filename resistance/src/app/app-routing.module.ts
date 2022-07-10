import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KillGameComponent } from './kill-game/kill-game.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mobile',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./main-screen/main-screen.module').then(
        (m) => m.MainScreenModule
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
})
export class AppRoutingModule {}
