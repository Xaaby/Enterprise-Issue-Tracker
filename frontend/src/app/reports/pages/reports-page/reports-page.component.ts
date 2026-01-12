import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueService } from '../../../services/issue.service';
import { Issue, IssueStatus, Priority } from '../../../models/issue.model';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reports-page">
      <h1 class="page-title">Reports</h1>
      
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-value">{{ openCount }}</div>
          <div class="metric-label">Open Issues</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">{{ inProgressCount }}</div>
          <div class="metric-label">In Progress</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">{{ doneCount }}</div>
          <div class="metric-label">Done</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">{{ p0Count }}</div>
          <div class="metric-label">P0 Issues</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reports-page {
      max-width: 1200px;
      margin: 0 auto;
    }
    .page-title {
      font-size: 28px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0 0 24px 0;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    .metric-card {
      background-color: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      text-align: center;
    }
    .metric-value {
      font-size: 48px;
      font-weight: 700;
      color: #2196F3;
      margin-bottom: 8px;
    }
    .metric-label {
      font-size: 14px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  `]
})
export class ReportsPageComponent implements OnInit {
  openCount = 0;
  inProgressCount = 0;
  doneCount = 0;
  p0Count = 0;

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.loadMetrics();
  }

  loadMetrics(): void {
    this.issueService.getIssues().subscribe({
      next: (issues) => {
        this.openCount = issues.filter(i => i.status === IssueStatus.OPEN).length;
        this.inProgressCount = issues.filter(i => i.status === IssueStatus.IN_PROGRESS).length;
        this.doneCount = issues.filter(i => i.status === IssueStatus.DONE).length;
        this.p0Count = issues.filter(i => i.priority === Priority.P0).length;
      },
      error: (error) => {
        console.error('Error loading metrics:', error);
      }
    });
  }
}
