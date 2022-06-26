import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { JoinComponent } from './join/join.component';

const routes: Routes = [
  { path: '', pathMatch: 'prefix', redirectTo: 'join' },
  { path: 'join', component: JoinComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  declarations: [JoinComponent],
  providers: [JoinComponent],
})
export class MobileModule {}
