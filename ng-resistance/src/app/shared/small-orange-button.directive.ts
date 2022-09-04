import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[small-orange-button]' })
export class SmallOrangeButtonDirective {
  @HostBinding('class') class =
    'rounded-md w-auto h-auto bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-gray-100 hover:text-gray-50 active:text-white py-1 px-1 m-1';
  constructor() {}
}
