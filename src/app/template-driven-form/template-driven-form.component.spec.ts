import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { TemplateDrivenFormComponent } from './template-driven-form.component';

import { FormsModule } from '@angular/forms';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { browser } from 'protractor';


describe('TemplateDrivenFormComponent', () => {
  let component: TemplateDrivenFormComponent;
  let app: ComponentFixture<TemplateDrivenFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TemplateDrivenFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    app = TestBed.createComponent(TemplateDrivenFormComponent);
    component = app.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
