# Frontend - Enterprise Issue Tracker

## Stack
- **Angular 17** (Standalone components)
- **Angular Router** (Client-side routing)
- **Angular Forms** (Reactive forms with validation)
- **HttpClient** (API communication)
- **RxJS** (Reactive programming)
- **Plain CSS** (No UI framework dependencies)

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm start
```

Application runs on `http://localhost:4200`

3. **Build for production:**
```bash
npm run build
```

Output: `dist/issue-tracker/`

## Project Structure

```
src/app/
├── core/
│   └── layout/
│       ├── app-layout/          # Main layout wrapper
│       ├── top-nav/             # Top navigation bar
│       └── sidebar/             # Sidebar navigation
├── issues/
│   ├── pages/
│   │   ├── issues-list-page/    # Issues list with filters
│   │   ├── issue-detail-page/   # Issue detail view
│   │   └── issue-form-page/     # Create/edit form
│   └── components/
│       ├── issue-table/         # Issues table component
│       └── issue-filters/       # Filter bar component
├── reports/
│   └── pages/
│       └── reports-page/        # Reports dashboard
├── shared/
│   ├── toast/                   # Toast notifications
│   ├── status-badge/            # Status badge component
│   ├── priority-badge/           # Priority badge component
│   └── pagination/               # Pagination component
├── services/
│   └── issue.service.ts         # API service
└── models/
    └── issue.model.ts           # TypeScript interfaces
```

## Features

### Pages & Routes
- `/issues` - Issues list (default landing page)
- `/issues/new` - Create new issue
- `/issues/:id` - Issue detail view
- `/issues/:id/edit` - Edit issue
- `/reports` - Reports dashboard

### Issue Management
- **List View**: Table with search, filters, and pagination
- **Create/Edit**: Form with validation (title required, min 5 chars)
- **Detail View**: Complete issue information
- **Status Management**: Change status with visual badges
- **Priority Management**: P0-P3 priority levels
- **Category Classification**: Bug, Feature, Task, Incident
- **Assignment**: Assign to team members
- **Due Dates**: Optional due date tracking

### User Experience
- **Toast Notifications**: Success and error messages
- **Loading States**: Visual feedback during API calls
- **Form Validation**: Inline error messages
- **Auto-refresh**: List updates after create/update
- **Responsive Design**: Works on desktop and tablet

## Configuration

### Environment Files
- `src/environments/environment.ts` - Development (localhost:8080)
- `src/environments/environment.prod.ts` - Production (update with Render URL)

### API Configuration
The API URL is configured in environment files:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'  // Development
  // apiUrl: 'https://your-backend.onrender.com/api'  // Production
};
```

Update `environment.prod.ts` before deploying to production.

## Deployment

See [README-DEPLOYMENT.md](README-DEPLOYMENT.md) for Netlify deployment instructions.

### Netlify Configuration
- Build command: `npm ci && npm run build`
- Publish directory: `dist/issue-tracker`
- Environment variable: `API_BASE_URL` (optional, update environment.prod.ts instead)

## Development

### Running Tests
```bash
npm test
```

### Code Structure
- **Standalone Components**: All components are standalone (no NgModules)
- **Reactive Forms**: Form validation using FormBuilder
- **Service Layer**: Centralized API calls in IssueService
- **Type Safety**: Full TypeScript with interfaces and enums
- **Error Handling**: Try-catch with user-friendly error messages
