import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../../services/issue.service';
import { Issue } from '../../../models/issue.model';
import { StatusBadgeComponent } from '../../../shared/status-badge/status-badge.component';
import { PriorityBadgeComponent } from '../../../shared/priority-badge/priority-badge.component';

@Component({
  selector: 'app-issue-detail-page',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, PriorityBadgeComponent],
  template: `
    <div class="issue-detail-page" *ngIf="issue">
      <div class="detail-header">
        <div class="header-left">
          <h1 class="issue-title">{{ issue.key || 'EIT-' + issue.id }}: {{ issue.title }}</h1>
          <div class="badges">
            <app-status-badge [status]="issue.status"></app-status-badge>
            <app-priority-badge [priority]="issue.priority"></app-priority-badge>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-secondary" (click)="editIssue()">Edit</button>
        </div>
      </div>
      
      <div class="detail-content">
        <div class="detail-section">
          <h2>Description</h2>
          <p>{{ issue.description || 'No description provided.' }}</p>
        </div>
        
        <div class="detail-section">
          <h2>Details</h2>
          <dl class="detail-list">
            <dt>Category:</dt>
            <dd>{{ issue.category }}</dd>
            <dt>Assignee:</dt>
            <dd>{{ issue.assignedTo || 'Unassigned' }}</dd>
            <dt>Due Date:</dt>
            <dd>{{ issue.dueDate || 'Not set' }}</dd>
            <dt>Created:</dt>
            <dd>{{ formatDate(issue.createdAt) }}</dd>
            <dt>Updated:</dt>
            <dd>{{ formatDate(issue.updatedAt) }}</dd>
          </dl>
        </div>
      </div>
    </div>
    <div *ngIf="loading" class="loading">Loading...</div>
  `,
  styles: [`
    .issue-detail-page {
      max-width: 1200px;
      margin: 0 auto;
    }
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e0e0e0;
    }
    .header-left {
      flex: 1;
    }
    .issue-title {
      font-size: 24px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0 0 12px 0;
    }
    .badges {
      display: flex;
      gap: 8px;
    }
    .header-actions {
      display: flex;
      gap: 8px;
    }
    .btn-secondary {
      padding: 8px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      background-color: white;
      cursor: pointer;
      font-size: 14px;
    }
    .btn-secondary:hover {
      background-color: #f5f5f5;
    }
    .detail-content {
      background-color: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .detail-section {
      margin-bottom: 24px;
    }
    .detail-section h2 {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0 0 12px 0;
    }
    .detail-list {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 12px;
    }
    dt {
      font-weight: 500;
      color: #666;
    }
    dd {
      margin: 0;
      color: #1a1a1a;
    }
    .loading {
      text-align: center;
      padding: 40px;
      color: #666;
    }
  `]
})
export class IssueDetailPageComponent implements OnInit {
  issue: Issue | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private issueService: IssueService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadIssue(+id);
    }
  }

  loadIssue(id: number): void {
    this.loading = true;
    this.issueService.getIssueById(id).subscribe({
      next: (data) => {
        this.issue = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading issue:', error);
        this.loading = false;
      }
    });
  }

  editIssue(): void {
    if (this.issue?.id) {
      this.router.navigate(['/issues', this.issue.id, 'edit']);
    }
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString();
  }
}
