import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
