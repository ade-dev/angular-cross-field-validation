import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ReactiveFormComponent } from './reactive-form.component';
import { UserR, mockValidRuser, mockInvalidRuser } from '../user';

import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ReactiveForm', () => {
  let component: ReactiveFormComponent;
  let app: ComponentFixture<ReactiveFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveFormComponent],
      providers: [FormBuilder],
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    app = TestBed.createComponent(ReactiveFormComponent);
    component = app.componentInstance;
    app.detectChanges();
  });

  function updateForm(user: UserR) {
    component.name?.setValue(user.emailGroup.name);
    component.email?.setValue(user.emailGroup.email);
    component.confirmEmail?.setValue(user.emailGroup.confirmEmail);
    component.password?.setValue(user.passwordGroup.password);
    component.confirmPassword?.setValue(user.passwordGroup.confirmPassword);
  }

  describe('Form', () => {
    it('Should be created', () => {
      expect(component).toBeTruthy();
    });

    it('Should be invalid at start', () => {
      component.name?.setValue('');
      expect(component.reactiveForm.valid).toBeFalsy();
    });

    it('Should be valid if all fields have valid values', () => {
      updateForm(mockValidRuser);
      expect(component.reactiveForm.valid).toBeTruthy();
    });

    it('Should be invalid if any field has an invalid value', () => {
      updateForm(mockInvalidRuser);
      expect(component.reactiveForm.valid).toBeFalsy();
    });

    it("Should be submitted with valid values", () => {
      updateForm(mockValidRuser);
      spyOn(window, "alert");
      app.nativeElement.querySelector("button[type='submit']").click();
      const submitted = component.reactiveForm.value;
      expect(submitted).toEqual(mockValidRuser);
    });
  });

  describe('Cross validate values', () => {
    it("Should be invalid if 'password' and 'confirmPassword' values do not match", () => {
      component.password?.setValue('red');
      component.confirmPassword?.setValue('ready');
      expect(component.passwordGroup?.valid).toBeFalsy();
    });

    it("Should be valid if 'password' and 'confirmPassword' values match", () => {
      component.password?.setValue('ready');
      component.confirmPassword?.setValue('ready');
      expect(component.passwordGroup?.valid).toBeTruthy();
    });

    it("Should be invalid if 'password' field is empty", () => {
      component.password?.setValue('');
      component.confirmPassword?.setValue('ready');
      expect(component.passwordGroup?.valid).toBeFalsy();
    });

    it("Should be invalid if 'confirmPassword' field is empty", () => {
      component.password?.setValue('ready');
      component.confirmPassword?.setValue('');
      expect(component.passwordGroup?.valid).toBeFalsy();
    });

    it("Should be invalid if both 'password' and 'confirmPassword' fields are empty", () => {
      component.password?.setValue('');
      component.confirmPassword?.setValue('');
      expect(component.passwordGroup?.valid).toBeFalsy();
    });

    it("Should be invalid if 'email' and 'confirmEmail' values do not match", () => {
      component.email?.setValue('reda@red.com');
      component.confirmEmail?.setValue('red@ready.com');
      expect(component.emailGroup?.valid).toBeFalsy();
    });

    it("Should be valid if 'email' and 'confirmEmail' values match", () => {
      component.email?.setValue('red@ready.com');
      component.confirmEmail?.setValue('red@ready.com');
      expect(component.emailGroup?.valid).toBeTruthy();
    });

    it("Should be invalid if 'email' field is empty", () => {
      component.email?.setValue('');
      component.confirmEmail?.setValue('red@ready.com');
      expect(component.emailGroup?.valid).toBeFalsy();
    });

    it("Should be invalid if 'confirmEmail' field is empty", () => {
      component.email?.setValue('red@ready.com');
      component.confirmEmail?.setValue('');
      expect(component.emailGroup?.valid).toBeFalsy();
    });

    it("Should be invalid if both 'email' and 'confirmEmail' fields are empty", () => {
      component.email?.setValue('');
      component.confirmEmail?.setValue('');
      expect(component.emailGroup?.valid).toBeFalsy();
    });
  });

  describe('Email values', () => {
    it("'a@b.com' should be valid", () => {
      component.email?.setValue('a@b.com');
      expect(component.email?.valid).toBeTruthy();
    });

    it("Empty value should be invalid", () => {
      component.email?.setValue('');
      expect(component.email?.valid).toBeFalsy();
    });

    it("'abc' should be invalid", () => {
      component.email?.setValue('abc');
      expect(component.email?.valid).toBeFalsy();
    });

    it("ab.com' should be invalid", () => {
      component.email?.setValue('ab.com');
      expect(component.email?.valid).toBeFalsy();
    });

    it("'@bcom' should be invalid", () => {
      component.email?.setValue('@bcom');
      expect(component.email?.valid).toBeFalsy();
    });
  });

  describe('Confirm email values', () => {
    it("'a@b.com' should be valid", () => {
      component.confirmEmail?.setValue('a@b.com');
      expect(component.confirmEmail?.valid).toBeTruthy();
    });

    it("Empty value should be invalid", () => {
      component.confirmEmail?.setValue('');
      expect(component.confirmEmail?.valid).toBeFalsy();
    });
  });

  describe('Password values', () => {
    it("'red' should be valid", () => {
      component.password?.setValue('red');
      expect(component.password?.valid).toBeTruthy();
    });

    it("Empty value should be invalid", () => {
      component.password?.setValue('');
      expect(component.password?.valid).toBeFalsy();
    });
  });

  describe('Confirm password values', () => {
    it("'red' should be valid", () => {
      component.confirmPassword?.setValue('red');
      expect(component.confirmPassword?.valid).toBeTruthy();
    });

    it("Empty value should be invalid", () => {
      component.confirmPassword?.setValue('');
      expect(component.confirmPassword?.valid).toBeFalsy();
    });
  });

  describe('toggleView method', () => {

    it("Password and Confirm password characters should be hidden behind asterisks on init", () => {
      expect(component.pwordHidden).toBe(true);
      expect(component.cPwordHidden).toBe(true);
    });

    it("Password or Confirm password characters should be revealed at first call", () => {
      component.toggleView('password');
      expect(component.pwordHidden).toBe(false);
      component.toggleView('confirmPassword');
      expect(component.cPwordHidden).toBe(false);
    });

    it("Password or Confirm password characters should be hidden if revealed", () => {
      component.pwordHidden = true;
      component.cPwordHidden = true;
      component.toggleView('password');
      expect(component.pwordHidden).toBe(false);
      component.toggleView('confirmPassword');
      expect(component.cPwordHidden).toBe(false);
    });

    it("Password or Confirm password characters should be revealed if hidden", () => {
      component.pwordHidden = false;
      component.cPwordHidden = false;
      component.toggleView('password');
      expect(component.pwordHidden).toBe(true);
      component.toggleView('confirmPassword');
      expect(component.cPwordHidden).toBe(true);
    });
  });

  describe('Form onSubmit', () => {

    it("Should alert 'Reactive form has been submitted' if valid and no errors", () => {
      updateForm(mockValidRuser);
      spyOn(window, "alert");
      component.onSubmit();
      expect(component.validationMessage).toContain('submitted');
    });

    it("Should alert 'Reactive form has errors' if invalid with errors", () => {
      updateForm(mockInvalidRuser);
      spyOn(window, "alert");
      component.onSubmit();
      expect(component.validationMessage).toContain('errors');
    });
  });
});
