import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { compareInputValidator } from '../compare-input-validator.directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})

export class ReactiveFormComponent {

  constructor(private formBuilder: FormBuilder) { }

  public pwordHidden = true;
  public cPwordHidden = true;
  public validationMessage = '';

  reactiveForm = this.formBuilder.group({
    emailGroup: this.formBuilder.group(
      {
        name: [""],
        email: ["", [Validators.required, Validators.email]],
        confirmEmail: ["", [Validators.required]]
      },
      { validators: [compareInputValidator(['email', 'confirmEmail'])] }
    ),
    passwordGroup: this.formBuilder.group(
      {
        password: ["", [Validators.required]],
        confirmPassword: ["", [Validators.required]]
      },
      { validators: [compareInputValidator(['password', 'confirmPassword'])] }
    )
  }, { updateOn: "blur" });

  get emailGroup() { return this.reactiveForm.get('emailGroup'); }
  get passwordGroup() { return this.reactiveForm.get('passwordGroup'); }
  get name() { return this.reactiveForm.get('emailGroup.name'); }
  get email() { return this.reactiveForm.get('emailGroup.email'); }
  get confirmEmail() { return this.reactiveForm.get('emailGroup.confirmEmail'); }
  get password() { return this.reactiveForm.get('passwordGroup.password'); }
  get confirmPassword() { return this.reactiveForm.get('passwordGroup.confirmPassword'); }

  public toggleView(field: string) {
    field === 'password' ? this.pwordHidden = !this.pwordHidden : this.cPwordHidden = !this.cPwordHidden;
  }

  onSubmit() {
    if (this.reactiveForm.errors || this.reactiveForm.invalid) {
      this.validationMessage = 'Reactive form has errors';
      alert(this.validationMessage);
      return;
    }
    else {
      this.validationMessage = 'Reactive form has been submitted';
      alert(this.validationMessage);
    }
  }
}
