import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Issue } from '../../../models/issue.model';
import { StatusBadgeComponent } from '../../../shared/status-badge/status-badge.component';
import { PriorityBadgeComponent } from '../../../shared/priority-badge/priority-badge.component';

@Component({
  selector: 'app-issue-table',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, PriorityBadgeComponent],
  template: `
    <div class="table-container">
      <table class="issue-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assignee</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let issue of issues" (click)="onRowClick(issue)" class="table-row">
            <td>{{ issue.key || 'EIT-' + issue.id }}</td>
            <td class="title-cell">{{ issue.title }}</td>
            <td><app-priority-badge [priority]="issue.priority"></app-priority-badge></td>
            <td><app-status-badge [status]="issue.status"></app-status-badge></td>
            <td>{{ issue.assignedTo || 'Unassigned' }}</td>
            <td>{{ formatDate(issue.updatedAt) }}</td>
            <td class="actions-cell" (click)="$event.stopPropagation()">
              <button class="btn-link" (click)="onEditClick(issue)">Edit</button>
            </td>
          </tr>
          <tr *ngIf="issues.length === 0 && !loading">
            <td colspan="7" class="empty-state">No issues found</td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="loading" class="loading-state">Loading...</div>
    </div>
  `,
  styles: [`
    .table-container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      overflow: hidden;
    }
    .issue-table {
      width: 100%;
      border-collapse: collapse;
    }
    thead {
      background-color: #f8f9fa;
    }
    th {
      padding: 12px 16px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
    }
    td {
      padding: 12px 16px;
      border-top: 1px solid #e0e0e0;
      font-size: 14px;
    }
    .table-row {
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .table-row:hover {
      background-color: #f5f5f5;
    }
    .title-cell {
      font-weight: 500;
      color: #1a1a1a;
    }
    .actions-cell {
      white-space: nowrap;
    }
    .btn-link {
      background: none;
      border: none;
      color: #2196F3;
      cursor: pointer;
      font-size: 14px;
      padding: 4px 8px;
    }
    .btn-link:hover {
      text-decoration: underline;
    }
    .empty-state {
      text-align: center;
      color: #999;
      padding: 40px;
    }
    .loading-state {
      padding: 40px;
      text-align: center;
      color: #666;
    }
  `]
})
export class IssueTableComponent {
  @Input() issues: Issue[] = [];
  @Input() loading = false;
  @Output() rowClick = new EventEmitter<Issue>();
  @Output() editClick = new EventEmitter<Issue>();

  onRowClick(issue: Issue): void {
    this.rowClick.emit(issue);
  }

  onEditClick(issue: Issue): void {
    this.editClick.emit(issue);
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }
}
