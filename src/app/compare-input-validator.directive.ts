import { Directive, Input } from '@angular/core';
import { ValidatorFn, ValidationErrors, AbstractControl, NG_VALIDATORS } from '@angular/forms';

// Export function for reactive form
export function compareInputValidator(crossFields: Array<string>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const field1 = control.get(crossFields[0]);
    const field2 = control.get(crossFields[1]);
    return field1 && field2 && field1.value !== field2.value ? { compareValueError: true } : null;
  };
};

@Directive({
  selector: '[appCompareInputValidate]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CompareInputValidatorDirective, multi: true }]

})
export class CompareInputValidatorDirective {

  // Properties and functions for template-driven form
  @Input('appCompareInputValidate') crossFields?: Array<string>;

  validate(control: AbstractControl) {
    return this.crossFields ? compareInputValidator(this.crossFields)(control) : null;
  }
  constructor() { }

}
