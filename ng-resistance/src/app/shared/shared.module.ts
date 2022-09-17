import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallOrangeButtonDirective } from './small-orange-button.directive';
import { BlueButtonDirective } from './blue-button.directive';

const exports = [SmallOrangeButtonDirective, BlueButtonDirective];

@NgModule({
  imports: [CommonModule],
  exports: [...exports],
  declarations: [...exports],
  providers: [],
})
export class SharedModule {}
