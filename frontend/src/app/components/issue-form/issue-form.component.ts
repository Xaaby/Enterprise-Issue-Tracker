import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { Issue, IssueStatus } from '../../models/issue.model';

@Component({
  selector: 'app-issue-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>{{ isEditMode ? 'Edit Issue' : 'Create New Issue' }}</h2>
      
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Title *</label>
          <input type="text" id="title" [(ngModel)]="issue.title" name="title" required>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" [(ngModel)]="issue.description" name="description"></textarea>
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" [(ngModel)]="issue.status" name="status">
            <option [value]="IssueStatus.OPEN">OPEN</option>
            <option [value]="IssueStatus.IN_PROGRESS">IN_PROGRESS</option>
            <option [value]="IssueStatus.DONE">DONE</option>
          </select>
        </div>

        <div class="form-group">
          <label for="assignedTo">Assigned To</label>
          <input type="text" id="assignedTo" [(ngModel)]="issue.assignedTo" name="assignedTo">
        </div>

        <button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
        <button type="button" (click)="cancel()" class="danger">Cancel</button>
      </form>
    </div>
  `
})
export class IssueFormComponent implements OnInit {
  issue: Issue = {
    title: '',
    description: '',
    status: IssueStatus.OPEN,
    assignedTo: ''
  };
  
  isEditMode = false;
  issueId?: number;
  IssueStatus = IssueStatus;

  constructor(
    private issueService: IssueService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.issueId = +id;
      this.loadIssue(this.issueId);
    }
  }

  loadIssue(id: number): void {
    this.issueService.getIssueById(id).subscribe({
      next: (data) => {
        this.issue = data;
      },
      error: (error) => {
        console.error('Error loading issue:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.issueId) {
      this.issueService.updateIssue(this.issueId, this.issue).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error updating issue:', error);
        }
      });
    } else {
      this.issueService.createIssue(this.issue).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error creating issue:', error);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
