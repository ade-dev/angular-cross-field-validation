import { Directive, Input } from '@angular/core';
import { ValidatorFn, ValidationErrors, AbstractControl, NG_VALIDATORS } from '@angular/forms';

export function compareInputValidator(crossFields: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if ((control.get(crossFields[0])?.value && control.get(crossFields[1]))?.value &&
      control.get(crossFields[0])?.value === control.get(crossFields[1])?.value) {
      return null;
    }
    return { compareValueError: true };
  };
}
@Directive({
  selector: '[appCompareInputValidate]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: CompareInputValidatorDirective, multi: true }]
})
export class CompareInputValidatorDirective {

  @Input('appCompareInputValidate') crossFields?: string[];

  validate(control: AbstractControl) {
    return this.crossFields ? compareInputValidator(this.crossFields)(control) : null;
  }
}
