import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="top-nav">
      <div class="nav-content">
        <div class="nav-left">
          <h1 class="app-title">Enterprise Issue Tracker</h1>
        </div>
        <div class="nav-center">
          <input type="text" class="search-input" placeholder="Search issues..." />
        </div>
        <div class="nav-right">
          <div class="user-menu">
            <span class="user-name">Admin User</span>
            <div class="user-avatar">AU</div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .top-nav {
      background-color: #ffffff;
      border-bottom: 1px solid #e0e0e0;
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }
    .nav-left {
      flex: 0 0 auto;
    }
    .app-title {
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0;
    }
    .nav-center {
      flex: 1;
      max-width: 400px;
      margin: 0 24px;
    }
    .search-input {
      width: 100%;
      padding: 8px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
    }
    .search-input:focus {
      outline: none;
      border-color: #2196F3;
    }
    .nav-right {
      flex: 0 0 auto;
    }
    .user-menu {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .user-name {
      font-size: 14px;
      color: #666;
    }
    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #2196F3;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }
  `]
})
export class TopNavComponent {
}
