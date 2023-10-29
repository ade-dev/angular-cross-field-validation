import { Directive, Input } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[routerLink]'
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams = '';
    navigatedTo = null;

}