import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { compareInputValidator } from '../compare-input-validator.directive';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})

export class ReactiveFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { };

  public pwordHidden: Boolean = true;
  public cPwordHidden: Boolean = true;
  public validationMessage: string = '';

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

  get emailGroup() { return this.reactiveForm.get('emailGroup'); };
  get passwordGroup() { return this.reactiveForm.get('passwordGroup'); };
  get name() { return this.reactiveForm.get('emailGroup.name'); };
  get email() { return this.reactiveForm.get('emailGroup.email'); };
  get confirmEmail() { return this.reactiveForm.get('emailGroup.confirmEmail'); };
  get password() { return this.reactiveForm.get('passwordGroup.password'); };
  get confirmPassword() { return this.reactiveForm.get('passwordGroup.confirmPassword'); };

  public toggleView(field: string) {
    field === 'password' ? this.pwordHidden = !this.pwordHidden : this.cPwordHidden = !this.cPwordHidden;
  };

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
  };

  ngOnInit(): void {
  }
}
