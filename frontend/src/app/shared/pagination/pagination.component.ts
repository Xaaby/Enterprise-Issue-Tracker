import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagination" *ngIf="totalPages > 1">
      <button 
        class="pagination-btn" 
        [disabled]="currentPage === 0"
        (click)="goToPage(currentPage - 1)">
        Previous
      </button>
      <span class="page-info">
        Page {{ currentPage + 1 }} of {{ totalPages }}
      </span>
      <button 
        class="pagination-btn"
        [disabled]="currentPage >= totalPages - 1"
        (click)="goToPage(currentPage + 1)">
        Next
      </button>
    </div>
  `,
  styles: [`
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-top: 24px;
    }
    .pagination-btn {
      padding: 8px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      background-color: white;
      cursor: pointer;
      font-size: 14px;
    }
    .pagination-btn:hover:not(:disabled) {
      background-color: #f5f5f5;
    }
    .pagination-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .page-info {
      font-size: 14px;
      color: #666;
    }
  `]
})
export class PaginationComponent {
  @Input() currentPage = 0;
  @Input() pageSize = 10;
  @Input() totalItems = 0;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
