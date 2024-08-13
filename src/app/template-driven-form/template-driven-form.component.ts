import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { User } from '../user';
import { CompareInputValidatorDirective } from '../compare-input-validator.directive';

@Component({
  selector: 'app-template-driven-form',
  standalone: true,
  imports: [FormsModule, CompareInputValidatorDirective],
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent {

  public pwordHidden = true;
  public cPwordHidden = true;
  public model: User = { name: '', email: '', confirmEmail: '', password: '', confirmPassword: '' };
  public submitted = false;

  public toggleView(field: string) {
    if (field === 'password') {
      this.pwordHidden = !this.pwordHidden;
    }
    else {
      this.cPwordHidden = !this.cPwordHidden;
    }
  }

  onSubmit(thisForm: NgForm) {

    if (thisForm.errors || thisForm.invalid) {
      alert("Template-driven form has errors");
      return;
    }
    else {
      alert("Template-driven form submitted");
    }
  }
}
