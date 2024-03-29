import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import { CompareInputValidatorDirective } from '../compare-input-validator.directive';

@Component({
  selector: 'app-template-driven-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CompareInputValidatorDirective],
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent {

  public pwordHidden = true;
  public cPwordHidden = true;
  public model: User = { name: '', email: '', confirmEmail: '', password: '', confirmPassword: '' };
  public submitted = false;

  public toggleView(field: string) {
    field === 'password' ? this.pwordHidden = !this.pwordHidden : this.cPwordHidden = !this.cPwordHidden;
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
