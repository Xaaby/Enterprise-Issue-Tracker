import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <nav class="sidebar-nav">
        <a routerLink="/issues" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">📋</span>
          <span class="nav-label">Issues</span>
        </a>
        <a routerLink="/reports" routerLinkActive="active" class="nav-item">
          <span class="nav-icon">📊</span>
          <span class="nav-label">Reports</span>
        </a>
      </nav>
      <div class="sidebar-footer">
        <div class="quick-filters">
          <h3 class="filter-title">Quick Filters</h3>
          <div class="filter-chips">
            <span class="filter-chip">Open</span>
            <span class="filter-chip">In Progress</span>
            <span class="filter-chip">Done</span>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 240px;
      background-color: #ffffff;
      border-right: 1px solid #e0e0e0;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .sidebar-nav {
      padding: 16px 0;
    }
    .nav-item {
      display: flex;
      align-items: center;
      padding: 12px 24px;
      color: #666;
      text-decoration: none;
      transition: background-color 0.2s;
    }
    .nav-item:hover {
      background-color: #f5f5f5;
    }
    .nav-item.active {
      background-color: #e3f2fd;
      color: #2196F3;
      border-right: 3px solid #2196F3;
    }
    .nav-icon {
      margin-right: 12px;
      font-size: 18px;
    }
    .nav-label {
      font-size: 14px;
      font-weight: 500;
    }
    .sidebar-footer {
      margin-top: auto;
      padding: 16px;
      border-top: 1px solid #e0e0e0;
    }
    .filter-title {
      font-size: 12px;
      font-weight: 600;
      color: #999;
      text-transform: uppercase;
      margin: 0 0 12px 0;
    }
    .filter-chips {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .filter-chip {
      padding: 6px 12px;
      background-color: #f5f5f5;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .filter-chip:hover {
      background-color: #e0e0e0;
    }
  `]
})
export class SidebarComponent {
}
