import { FormBuilder } from '@angular/forms';
import { CompareInputValidatorDirective, compareInputValidator } from './compare-input-validator.directive';

describe('CompareInputValidatorDirective', () => {

  it('should create an instance', () => {
    const directive = new CompareInputValidatorDirective();
    expect(directive).toBeTruthy();
  });

  const formBuilder: FormBuilder = new FormBuilder();

  it("Should return 'compareValueError' if the two compared input values do not match", () => {
    let mockForm = formBuilder.group({
      Email: 'unit.test.co.uk',
      confirmEmail: 'unit.test.com'
    });

    let result = compareInputValidator(['Email', 'confirmEmail'])(mockForm);
    expect(result?.compareValueError).toBe(true);
  });

  it("Should return 'compareValueError' if one of the two compared input values is empty", () => {
    let mockForm = formBuilder.group({
      Email: 'unit.test.co.uk',
      confirmEmail: ''
    });

    let result = compareInputValidator(['Email', 'confirmEmail'])(mockForm);
    expect(result?.compareValueError).toBe(true);
  });

  it("Should return 'compareValueError' if both of the compared input values are empty", () => {
    let mockForm = formBuilder.group({
      Email: '',
      confirmEmail: ''
    });

    let result = compareInputValidator(['Email', 'confirmEmail'])(mockForm);
    expect(result?.compareValueError).toBe(true);
  });

  it("Should return 'null' if the two compared input values are a match", () => {
    let mockForm = formBuilder.group({
      Email: 'unit.test.com',
      confirmEmail: 'unit.test.com'
    });

    let result = compareInputValidator(['Email', 'confirmEmail'])(mockForm);
    expect(result).toBeNull();
  });
});