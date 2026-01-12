import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Priority } from '../../models/issue.model';

@Component({
  selector: 'app-priority-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="'priority-badge priority-' + priority.toLowerCase()">
      {{ priority }}
    </span>
  `,
  styles: [`
    .priority-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }
    .priority-p0 {
      background-color: #f8d7da;
      color: #721c24;
    }
    .priority-p1 {
      background-color: #fff3cd;
      color: #856404;
    }
    .priority-p2 {
      background-color: #cfe2ff;
      color: #084298;
    }
    .priority-p3 {
      background-color: #d1e7dd;
      color: #0f5132;
    }
  `]
})
export class PriorityBadgeComponent {
  @Input() priority!: Priority;
}
