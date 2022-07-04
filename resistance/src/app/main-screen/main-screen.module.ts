import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { StartGameComponent } from './start-game/start-game.component';

const routes: Routes = [
  { path: '', redirectTo: 'main-screen', pathMatch: 'full' },
  {
    path: 'main-screen',
    component: MainScreenComponent,
    children: [
      { path: '', redirectTo: 'start', pathMatch: 'full' },
      { path: 'start', component: StartGameComponent },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [MainScreenComponent, StartGameComponent],
  providers: [],
})
export class MainScreenModule {}
