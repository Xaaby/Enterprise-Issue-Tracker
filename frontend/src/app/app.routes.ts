import { Routes } from '@angular/router';
import { AppLayoutComponent } from './core/layout/app-layout/app-layout.component';
import { IssuesListPageComponent } from './issues/pages/issues-list-page/issues-list-page.component';
import { IssueDetailPageComponent } from './issues/pages/issue-detail-page/issue-detail-page.component';
import { IssueFormPageComponent } from './issues/pages/issue-form-page/issue-form-page.component';
import { ReportsPageComponent } from './reports/pages/reports-page/reports-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: '/issues', pathMatch: 'full' },
      { path: 'issues', component: IssuesListPageComponent },
      { path: 'issues/new', component: IssueFormPageComponent },
      { path: 'issues/:id', component: IssueDetailPageComponent },
      { path: 'issues/:id/edit', component: IssueFormPageComponent },
      { path: 'reports', component: ReportsPageComponent }
    ]
  },
  { path: '**', redirectTo: '/issues' }
];
