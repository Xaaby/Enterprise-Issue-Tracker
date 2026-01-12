import { Routes } from '@angular/router';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { IssueFormComponent } from './components/issue-form/issue-form.component';

export const routes: Routes = [
  { path: '', component: IssueListComponent },
  { path: 'issues/new', component: IssueFormComponent },
  { path: 'issues/edit/:id', component: IssueFormComponent }
];
