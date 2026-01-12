import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IssueStatus, Priority } from '../../../models/issue.model';

@Component({
  selector: 'app-issue-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filters-container">
      <div class="filters-row">
        <input 
          type="text" 
          class="filter-input"
          placeholder="Search issues..."
          [(ngModel)]="search"
          (input)="onFilterChange()" />
        
        <div class="filter-group">
          <label>Status:</label>
          <div class="status-chips">
            <span 
              *ngFor="let status of statuses"
              [class]="'status-chip' + (statusFilter === status ? ' active' : '')"
              (click)="toggleStatus(status)">
              {{ status.replace('_', ' ') }}
            </span>
          </div>
        </div>
        
        <div class="filter-group">
          <label>Priority:</label>
          <select class="filter-select" [(ngModel)]="priorityFilter" (change)="onFilterChange()">
            <option [value]="null">All</option>
            <option *ngFor="let priority of priorities" [value]="priority">{{ priority }}</option>
          </select>
        </div>
        
        <button class="btn-clear" (click)="clearFilters()">Clear</button>
      </div>
    </div>
  `,
  styles: [`
    .filters-container {
      background-color: white;
      padding: 16px;
      border-radius: 12px;
      margin-bottom: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .filters-row {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .filter-input {
      flex: 1;
      min-width: 200px;
      padding: 8px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
    }
    .filter-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    label {
      font-size: 14px;
      font-weight: 500;
      color: #666;
    }
    .status-chips {
      display: flex;
      gap: 8px;
    }
    .status-chip {
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 12px;
      cursor: pointer;
      background-color: #f5f5f5;
      transition: all 0.2s;
    }
    .status-chip:hover {
      background-color: #e0e0e0;
    }
    .status-chip.active {
      background-color: #2196F3;
      color: white;
    }
    .filter-select {
      padding: 8px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
    }
    .btn-clear {
      padding: 8px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      background-color: white;
      cursor: pointer;
      font-size: 14px;
    }
    .btn-clear:hover {
      background-color: #f5f5f5;
    }
  `]
})
export class IssueFiltersComponent {
  @Input() search = '';
  @Input() statusFilter: IssueStatus | null = null;
  @Input() priorityFilter: Priority | null = null;
  @Input() assigneeFilter = '';
  
  @Output() filtersChange = new EventEmitter<any>();
  @Output() clearFiltersEvent = new EventEmitter<void>();

  statuses: IssueStatus[] = [IssueStatus.OPEN, IssueStatus.IN_PROGRESS, IssueStatus.DONE];
  priorities: Priority[] = [Priority.P0, Priority.P1, Priority.P2, Priority.P3];

  toggleStatus(status: IssueStatus): void {
    this.statusFilter = this.statusFilter === status ? null : status;
    this.onFilterChange();
  }

  onFilterChange(): void {
    this.filtersChange.emit({
      search: this.search,
      status: this.statusFilter,
      priority: this.priorityFilter,
      assignee: this.assigneeFilter
    });
  }

  clearFilters(): void {
    this.search = '';
    this.statusFilter = null;
    this.priorityFilter = null;
    this.assigneeFilter = '';
    this.clearFiltersEvent.emit();
    this.onFilterChange();
  }
}
