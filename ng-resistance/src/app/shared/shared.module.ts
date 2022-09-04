import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallOrangeButtonDirective } from './small-orange-button.directive';

const exports = [SmallOrangeButtonDirective];

@NgModule({
  imports: [CommonModule],
  exports: [...exports],
  declarations: [...exports],
  providers: [],
})
export class SharedModule {}
