# Enterprise Issue Tracking System

## Business Overview

### What is the business idea?

Enterprise Issue Tracker is an internal operations tool used by engineering, QA, and product teams to track work items, defects, and operational issues in a structured and auditable way.

This is not meant to compete with Jira. It represents the kind of lightweight internal tools companies build when they need tighter control, customization, or simpler workflows than off-the-shelf products.

### Which industry is this for?

This fits multiple enterprise-heavy industries, which is exactly why it works well for enterprise delivery:

- **Financial services**
- **Enterprise software**
- **Telecom**
- **Healthcare IT**
- **Consulting and delivery organizations**

Any industry where:
- Work is regulated
- Changes must be tracked
- Ownership and status matter
- Teams collaborate across functions

### What problem are you solving?

**The real problem:**

In large organizations, teams often struggle with:
- Losing track of ownership
- Poor visibility into issue status
- Manual follow-ups over email or chat
- No clear audit trail for changes
- Tools that are too complex for small internal workflows

This causes:
- Delays in delivery
- Miscommunication between teams
- Repeated status meetings
- Poor accountability

**What does your product solve specifically?**

This system solves four core business problems:

**1) Visibility**
Everyone can see:
- What issues exist
- Who owns them
- What stage they are in
- What changed recently

This reduces "status check" meetings and follow-ups.

**2) Accountability**
Each issue has:
- A clear assignee
- A priority
- A lifecycle

This prevents work from silently stalling.

**3) Standardization**
Instead of ad-hoc tracking via emails, spreadsheets, or chat messages, teams use a single, consistent workflow: **Open → In Progress → Done**

This matters a lot in enterprise delivery.

**4) Auditability**
Every important change is recorded:
- Status changes
- Reassignments
- Priority updates

This is critical in:
- Regulated industries
- Client-facing delivery
- Post-incident reviews

### Why is this a good full stack engineering project?

Because it reflects real enterprise constraints, not toy problems.

From a technical perspective, you are solving:
- Data modeling (issues, statuses, priorities)
- Backend API design
- Frontend consumption of APIs
- State synchronization between UI and backend
- Business rule enforcement (workflow rules)
- UI feedback and usability

That is exactly what full stack engineers do day to day.

### Why skip login and authentication?

This is intentional. In many internal tools:
- Authentication is handled upstream
- Apps assume a trusted internal user
- Focus is on workflow, not identity

For this project:
- A default user context is assumed
- Roles are simulated
- The focus stays on business logic and UI behavior

This makes the project faster to build, easier to explain, and more realistic for internal enterprise tools.

### How you should explain this in one sentence

**"This is a lightweight internal issue tracking system designed for enterprise teams to manage work, ownership, and status in a simple, auditable way, similar to tools used inside consulting and financial services organizations."**

### What this project is NOT

- Not a startup SaaS
- Not a consumer product
- Not an AI platform
- Not a research demo

**It's an internal enterprise delivery tool, and that's a good thing.**

## Stack

**Backend:**
- Java 17
- Spring Boot 3.2.0
- Spring Web (REST APIs)
- Spring Data JPA
- SQLite (database file created automatically)

**Frontend:**
- Angular 17
- HttpClient
- Simple routing

## How to run locally?

### Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 18+ and npm

### Backend Setup

1. No database setup required! SQLite database file (`issue_tracker.db`) will be created automatically.

2. Navigate to backend directory:
```bash
cd backend
```

4. Build and run:
```bash
mvn clean install
mvn spring-boot:run
```

Backend will run on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm start
```

Frontend will run on `http://localhost:4200`

## Features

### Core Functionality
- **Issue Management**: Create, view, update, and track issues
- **Status Tracking**: Open → In Progress → Done workflow
- **Priority Management**: P0 (Critical) to P3 (Low) priority levels
- **Category Classification**: Bug, Feature, Task, Incident
- **Assignment**: Assign issues to team members
- **Search & Filter**: Search by title/key/assignee, filter by status and priority
- **Pagination**: Efficient data loading with pagination
- **Real-time Updates**: Toast notifications for all actions

### User Interface
- **Enterprise Layout**: Top navigation, sidebar, and content area
- **Issue List View**: Table with filters, search, and pagination
- **Issue Detail View**: Complete issue information with tabs
- **Issue Form**: Create and edit issues with validation
- **Reports Dashboard**: Metrics and statistics
- **Responsive Design**: Works on desktop and tablet

## API Endpoints

### Issues
- `GET /api/issues?search=&status=&priority=&assignee=&page=&size=` - Get all issues with filters and pagination
- `POST /api/issues` - Create new issue
- `GET /api/issues/{id}` - Get issue by ID
- `PUT /api/issues/{id}` - Update issue
- `PUT /api/issues/{id}/status` - Change issue status
- `PUT /api/issues/{id}/assign` - Assign issue to user

### Request/Response Examples

**Create Issue:**
```json
POST /api/issues
{
  "title": "Fix login bug",
  "description": "Users cannot login with special characters",
  "status": "OPEN",
  "priority": "P1",
  "category": "BUG",
  "assignedTo": "john.doe",
  "dueDate": "2026-01-20"
}
```

**Response:**
```json
{
  "id": 1,
  "key": "EIT-1768190725382",
  "title": "Fix login bug",
  "description": "Users cannot login with special characters",
  "status": "OPEN",
  "priority": "P1",
  "category": "BUG",
  "assignedTo": "john.doe",
  "dueDate": "2026-01-20",
  "createdAt": "2026-01-11T22:05:25",
  "updatedAt": "2026-01-11T22:05:25"
}
```

## Data Model

### Issue Entity
- `id` (Long) - Primary key, auto-generated
- `key` (String) - Unique issue key (e.g., "EIT-1023"), auto-generated
- `title` (String, required) - Issue title (min 5 characters)
- `description` (String) - Detailed description
- `status` (ENUM: OPEN, IN_PROGRESS, DONE) - Current status
- `priority` (ENUM: P0, P1, P2, P3) - Priority level
- `category` (ENUM: BUG, FEATURE, TASK, INCIDENT) - Issue category
- `assignedTo` (String) - Assigned user/team member
- `dueDate` (LocalDate) - Optional due date
- `createdAt` (LocalDateTime) - Creation timestamp
- `updatedAt` (LocalDateTime) - Last update timestamp

### Enums

**IssueStatus:**
- `OPEN` - Newly created issue
- `IN_PROGRESS` - Work in progress
- `DONE` - Completed

**Priority:**
- `P0` - Critical (highest)
- `P1` - High
- `P2` - Medium (default)
- `P3` - Low

**Category:**
- `BUG` - Software defect
- `FEATURE` - New functionality
- `TASK` - General task (default)
- `INCIDENT` - Production incident

## Project Structure

```
enterprise-issue-tracker/
├── backend/
│   ├── src/main/java/com/enterprise/issuetracker/
│   │   ├── controller/     # REST API endpoints
│   │   ├── service/         # Business logic
│   │   ├── repository/       # Data access layer
│   │   ├── entity/          # JPA entities
│   │   └── config/          # Configuration (CORS, etc.)
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── Dockerfile           # Docker configuration for deployment
│   ├── render.yaml          # Render deployment config
│   └── pom.xml
├── frontend/
│   ├── src/app/
│   │   ├── core/
│   │   │   └── layout/      # App layout components
│   │   ├── issues/
│   │   │   ├── pages/        # Issue pages (list, detail, form)
│   │   │   └── components/   # Issue-specific components
│   │   ├── reports/
│   │   │   └── pages/        # Reports page
│   │   ├── shared/           # Shared components (badges, toast, etc.)
│   │   ├── services/         # API services
│   │   └── models/           # TypeScript interfaces
│   ├── src/environments/    # Environment configurations
│   ├── netlify.toml         # Netlify deployment config
│   └── package.json
└── README.md
```

## Outcome

A functional full-stack enterprise application demonstrating:

**Backend:**
- Java 17 REST API development with Spring Boot 3.2
- Spring Data JPA for database operations
- SQLite (local) / PostgreSQL (production) support
- Clean architecture: Controller → Service → Repository
- Enterprise patterns and best practices

**Frontend:**
- Angular 17 standalone components
- Reactive forms with validation
- HTTP client for API consumption
- Enterprise UI/UX with proper feedback
- Toast notifications for user actions
- Responsive design

**DevOps:**
- Docker containerization
- Deployment configurations (Render, Netlify)
- Environment-based configuration
- Production-ready setup

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions to:
- Neon (PostgreSQL)
- Render (Spring Boot backend)
- Netlify (Angular frontend)

Quick start: [DEPLOYMENT-QUICK-START.md](DEPLOYMENT-QUICK-START.md)
