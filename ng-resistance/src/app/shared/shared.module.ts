import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallOrangeButtonDirective } from './small-orange-button.directive';
import { BlueButtonDirective } from './blue-button.directive';
import { LinkButtonDirective } from './link-button.directive';

const exports = [
  SmallOrangeButtonDirective,
  BlueButtonDirective,
  LinkButtonDirective,
];

@NgModule({
  imports: [CommonModule],
  exports: [...exports],
  declarations: [...exports],
  providers: [],
})
export class SharedModule {}
