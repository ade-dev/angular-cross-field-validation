import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';

const routes: Routes = [
  {
    path: 'reactive-form', component: ReactiveFormComponent,
    data: { title: 'Angular - Reactive form input value cross-validation' }
  },
  {
    path: 'template-driven-form', component: TemplateDrivenFormComponent,
    data: { title: 'Angular – Template-driven form input value cross-validation' }
  },
  { path: '', redirectTo: '/reactive-form', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
