import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IssueService } from '../../../services/issue.service';
import { Issue, IssueStatus, Priority } from '../../../models/issue.model';
import { IssueTableComponent } from '../../components/issue-table/issue-table.component';
import { IssueFiltersComponent } from '../../components/issue-filters/issue-filters.component';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';

@Component({
  selector: 'app-issues-list-page',
  standalone: true,
  imports: [CommonModule, IssueTableComponent, IssueFiltersComponent, PaginationComponent],
  template: `
    <div class="issues-list-page">
      <div class="page-header">
        <h1 class="page-title">Issues</h1>
        <button class="btn-primary" (click)="createNewIssue()">New Issue</button>
      </div>
      
      <app-issue-filters 
        [search]="search"
        [statusFilter]="statusFilter"
        [priorityFilter]="priorityFilter"
        [assigneeFilter]="assigneeFilter"
        (filtersChange)="onFiltersChange($event)"
        (clearFiltersEvent)="clearFilters()">
      </app-issue-filters>
      
      <app-issue-table 
        [issues]="issues"
        [loading]="loading"
        (rowClick)="viewIssue($event)"
        (editClick)="editIssue($event)">
      </app-issue-table>
      
      <app-pagination
        [currentPage]="currentPage"
        [pageSize]="pageSize"
        [totalItems]="totalItems"
        (pageChange)="onPageChange($event)">
      </app-pagination>
    </div>
  `,
  styles: [`
    .issues-list-page {
      max-width: 1200px;
      margin: 0 auto;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .page-title {
      font-size: 28px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0;
    }
    .btn-primary {
      padding: 10px 20px;
      background-color: #2196F3;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .btn-primary:hover {
      background-color: #1976D2;
    }
  `]
})
export class IssuesListPageComponent implements OnInit {
  issues: Issue[] = [];
  loading = false;
  search = '';
  statusFilter: IssueStatus | null = null;
  priorityFilter: Priority | null = null;
  assigneeFilter: string = '';
  currentPage = 0;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private issueService: IssueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadIssues();
    
    // Listen for issue creation/update events to refresh the list
    window.addEventListener('issueCreated', () => this.loadIssues());
    window.addEventListener('issueUpdated', () => this.loadIssues());
  }

  loadIssues(): void {
    this.loading = true;
    this.issueService.getIssues(
      this.search,
      this.statusFilter || undefined,
      this.priorityFilter || undefined,
      this.assigneeFilter || undefined,
      this.currentPage,
      this.pageSize
    ).subscribe({
      next: (data) => {
        this.issues = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading issues:', error);
        this.loading = false;
      }
    });
  }

  onFiltersChange(filters: any): void {
    this.search = filters.search || '';
    this.statusFilter = filters.status || null;
    this.priorityFilter = filters.priority || null;
    this.assigneeFilter = filters.assignee || '';
    this.currentPage = 0;
    this.loadIssues();
  }

  clearFilters(): void {
    this.search = '';
    this.statusFilter = null;
    this.priorityFilter = null;
    this.assigneeFilter = '';
    this.currentPage = 0;
    this.loadIssues();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadIssues();
  }

  createNewIssue(): void {
    this.router.navigate(['/issues/new']);
  }

  viewIssue(issue: Issue): void {
    if (issue.id) {
      this.router.navigate(['/issues', issue.id]);
    }
  }

  editIssue(issue: Issue): void {
    if (issue.id) {
      this.router.navigate(['/issues', issue.id, 'edit']);
    }
  }
}
