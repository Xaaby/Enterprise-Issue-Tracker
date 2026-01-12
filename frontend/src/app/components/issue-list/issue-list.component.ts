import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { Issue, IssueStatus } from '../../models/issue.model';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <button (click)="createNewIssue()" class="secondary">Create New Issue</button>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let issue of issues">
            <td>{{ issue.id }}</td>
            <td>{{ issue.title }}</td>
            <td>
              <span [ngClass]="'status-' + issue.status.toLowerCase().replace('_', '-')">
                {{ issue.status }}
              </span>
            </td>
            <td>{{ issue.assignedTo || 'Unassigned' }}</td>
            <td>{{ formatDate(issue.createdAt) }}</td>
            <td>
              <button (click)="editIssue(issue.id!)" class="secondary">Edit</button>
              <button (click)="changeStatus(issue)" class="secondary">Change Status</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    button {
      margin-bottom: 20px;
    }
  `]
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];

  constructor(
    private issueService: IssueService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.issueService.getIssues().subscribe({
      next: (data) => {
        this.issues = data;
      },
      error: (error) => {
        console.error('Error loading issues:', error);
      }
    });
  }

  createNewIssue(): void {
    this.router.navigate(['/issues/new']);
  }

  editIssue(id: number): void {
    this.router.navigate(['/issues/edit', id]);
  }

  changeStatus(issue: Issue): void {
    const currentStatus = issue.status;
    let newStatus: IssueStatus;

    switch (currentStatus) {
      case IssueStatus.OPEN:
        newStatus = IssueStatus.IN_PROGRESS;
        break;
      case IssueStatus.IN_PROGRESS:
        newStatus = IssueStatus.DONE;
        break;
      case IssueStatus.DONE:
        newStatus = IssueStatus.OPEN;
        break;
      default:
        newStatus = IssueStatus.OPEN;
    }

    if (issue.id) {
      this.issueService.updateStatus(issue.id, newStatus).subscribe({
        next: () => {
          this.loadIssues();
        },
        error: (error) => {
          console.error('Error updating status:', error);
        }
      });
    }
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
}
