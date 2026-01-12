import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueStatus } from '../../models/issue.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="'status-badge status-' + status.toLowerCase().replace('_', '-')">
      {{ status.replace('_', ' ') }}
    </span>
  `,
  styles: [`
    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      text-transform: capitalize;
    }
    .status-open {
      background-color: #fff3cd;
      color: #856404;
    }
    .status-in-progress {
      background-color: #cfe2ff;
      color: #084298;
    }
    .status-done {
      background-color: #d1e7dd;
      color: #0f5132;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status!: IssueStatus;
}
