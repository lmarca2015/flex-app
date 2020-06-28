import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appChange]'
})
export class ChangeDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
