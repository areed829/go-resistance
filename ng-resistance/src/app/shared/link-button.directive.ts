import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[link-button]' })
export class LinkButtonDirective {
  @HostBinding('class') class =
    'text-orange-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150';
}
