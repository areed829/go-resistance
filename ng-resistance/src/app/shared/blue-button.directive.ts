import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[blue-button]' })
export class BlueButtonDirective {
  @HostBinding('class') class =
    'bg-blue-600 text-gray-100 rounded hover:bg-blue-500 disabled:bg-blue-400 px-4 py-2 focus:outline-none';
  constructor() {}
}
