import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="container">
      <h1>Enterprise Issue Tracker</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    h1 {
      color: #333;
      margin-bottom: 20px;
    }
  `]
})
export class AppComponent {
  title = 'Issue Tracker';
}
