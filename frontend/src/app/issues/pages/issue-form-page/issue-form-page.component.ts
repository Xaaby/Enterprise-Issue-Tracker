import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../../services/issue.service';
import { Issue, IssueStatus, Priority, Category } from '../../../models/issue.model';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-issue-form-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="issue-form-page">
      <h1 class="page-title">{{ isEditMode ? 'Edit Issue' : 'Create New Issue' }}</h1>
      
      <form [formGroup]="issueForm" (ngSubmit)="onSubmit()" class="issue-form">
        <div class="form-group">
          <label for="title">Title *</label>
          <input type="text" id="title" formControlName="title" class="form-input" />
          <div *ngIf="issueForm.get('title')?.invalid && issueForm.get('title')?.touched" class="error">
            Title is required (minimum 5 characters)
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" formControlName="description" class="form-textarea" rows="5"></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="category">Category</label>
            <select id="category" formControlName="category" class="form-select">
              <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="priority">Priority</label>
            <select id="priority" formControlName="priority" class="form-select">
              <option *ngFor="let pri of priorities" [value]="pri">{{ pri }}</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" formControlName="status" class="form-select">
              <option *ngFor="let stat of statuses" [value]="stat">{{ stat.replace('_', ' ') }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="assignedTo">Assigned To</label>
            <input type="text" id="assignedTo" formControlName="assignedTo" class="form-input" />
          </div>
        </div>

        <div class="form-group">
          <label for="dueDate">Due Date</label>
          <input type="date" id="dueDate" formControlName="dueDate" class="form-input" />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary" [disabled]="issueForm.invalid">
            {{ isEditMode ? 'Update' : 'Create' }}
          </button>
          <button type="button" class="btn-secondary" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .issue-form-page {
      max-width: 800px;
      margin: 0 auto;
    }
    .page-title {
      font-size: 28px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0 0 24px 0;
    }
    .issue-form {
      background-color: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      color: #333;
      font-size: 14px;
    }
    .form-input,
    .form-select,
    .form-textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
    }
    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
      outline: none;
      border-color: #2196F3;
    }
    .form-textarea {
      resize: vertical;
    }
    .error {
      color: #d32f2f;
      font-size: 12px;
      margin-top: 4px;
    }
    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }
    .btn-primary {
      padding: 10px 20px;
      background-color: #2196F3;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }
    .btn-primary:hover:not(:disabled) {
      background-color: #1976D2;
    }
    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn-secondary {
      padding: 10px 20px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      background-color: white;
      font-size: 14px;
      cursor: pointer;
    }
    .btn-secondary:hover {
      background-color: #f5f5f5;
    }
  `]
})
export class IssueFormPageComponent implements OnInit {
  issueForm!: FormGroup;
  isEditMode = false;
  issueId?: number;
  
  statuses = Object.values(IssueStatus);
  priorities = Object.values(Priority);
  categories = Object.values(Category);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private issueService: IssueService,
    private toastService: ToastService
  ) {
    this.issueForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: [''],
      category: [Category.TASK],
      priority: [Priority.P2],
      status: [IssueStatus.OPEN],
      assignedTo: [''],
      dueDate: ['']
    });
  }

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
      next: (issue) => {
        this.issueForm.patchValue({
          title: issue.title,
          description: issue.description,
          category: issue.category,
          priority: issue.priority,
          status: issue.status,
          assignedTo: issue.assignedTo,
          dueDate: issue.dueDate
        });
      },
      error: (error) => {
        console.error('Error loading issue:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.issueForm.valid) {
      const issueData = this.issueForm.value;
      if (this.isEditMode && this.issueId) {
        this.issueService.updateIssue(this.issueId, issueData).subscribe({
          next: () => {
            this.toastService.success('Issue updated successfully!');
            this.router.navigate(['/issues', this.issueId]).then(() => {
              setTimeout(() => {
                window.dispatchEvent(new Event('issueUpdated'));
              }, 500);
            });
          },
          error: (error) => {
            console.error('Error updating issue:', error);
            const errorMessage = error?.error?.message || error?.message || 'Failed to update issue. Please try again.';
            this.toastService.error(errorMessage);
          }
        });
      } else {
        this.issueService.createIssue(issueData).subscribe({
          next: (issue) => {
            this.toastService.success('Issue created successfully!');
            this.router.navigate(['/issues', issue.id]).then(() => {
              // Refresh the list page if user navigates back
              setTimeout(() => {
                window.dispatchEvent(new Event('issueCreated'));
              }, 500);
            });
          },
          error: (error) => {
            console.error('Error creating issue:', error);
            const errorMessage = error?.error?.message || error?.message || 'Failed to create issue. Please try again.';
            this.toastService.error(errorMessage);
          }
        });
      }
    }
  }

  cancel(): void {
    if (this.isEditMode && this.issueId) {
      this.router.navigate(['/issues', this.issueId]);
    } else {
      this.router.navigate(['/issues']);
    }
  }
}
