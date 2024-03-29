import { Routes } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';

export const routes: Routes = [
  {
    path: 'reactive-form', component: ReactiveFormComponent,
    data: { title: 'Angular - Reactive form input value cross-validation' }
  },
  {
    path: 'template-driven-form', component: TemplateDrivenFormComponent,
    data: { title: 'Angular - Template-driven form input value cross-validation' }
  },
  { path: '**', redirectTo: '/reactive-form', pathMatch: 'full' },
  { path: '', redirectTo: '/reactive-form', pathMatch: 'full' },
];