import { Routes } from '@angular/router';
import { FormResponseComponent } from './pages/form-response/form-response.component';
import { FormListComponent } from './pages/form-list/form-list.component';

export const routes: Routes = [
  { path: 'forms/:id', component: FormResponseComponent },
];
