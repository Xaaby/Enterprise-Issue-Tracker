# Backend - Enterprise Issue Tracker

## Stack
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Web** (REST APIs)
- **Spring Data JPA** (Database abstraction)
- **SQLite** (Local development - database file created automatically)
- **PostgreSQL** (Production deployment)

## Setup

### Local Development (SQLite)

1. **No database setup required!** SQLite database file (`issue_tracker.db`) will be created automatically in the backend directory when you first run the application.

2. **Build:**
```bash
mvn clean install
```

3. **Run:**
```bash
mvn spring-boot:run
```

Server runs on `http://localhost:8080`

### Production (PostgreSQL)

See [README-DEPLOYMENT.md](README-DEPLOYMENT.md) for Render deployment instructions.

## Project Structure

```
src/main/java/com/enterprise/issuetracker/
├── controller/
│   └── IssueController.java      # REST API endpoints
├── service/
│   └── IssueService.java         # Business logic layer
├── repository/
│   └── IssueRepository.java      # Data access (JPA)
├── entity/
│   ├── Issue.java                # Main entity
│   ├── IssueStatus.java          # Status enum
│   ├── Priority.java             # Priority enum
│   ├── Category.java             # Category enum
│   ├── Comment.java              # Comments entity
│   └── Activity.java             # Activity log entity
└── config/
    └── CorsConfig.java           # CORS configuration
```

## API Contract

All endpoints are under `/api/issues`

### Get All Issues (with filters and pagination)
```
GET /api/issues?search=&status=&priority=&assignee=&page=0&size=10

Query Parameters:
- search: Search in title, key, or assignee
- status: Filter by status (OPEN, IN_PROGRESS, DONE)
- priority: Filter by priority (P0, P1, P2, P3)
- assignee: Filter by assignee name
- page: Page number (default: 0)
- size: Page size (default: 10)

Response: Array of Issue objects
```

### Create Issue
```
POST /api/issues
Content-Type: application/json

Body:
{
  "title": "Fix login bug",
  "description": "Users cannot login",
  "status": "OPEN",
  "priority": "P1",
  "category": "BUG",
  "assignedTo": "john.doe",
  "dueDate": "2026-01-20"
}

Response: Created Issue object (201 Created)
```

### Get Issue by ID
```
GET /api/issues/{id}

Response: Issue object (200 OK) or 404 Not Found
```

### Update Issue
```
PUT /api/issues/{id}
Content-Type: application/json

Body: Same as Create Issue

Response: Updated Issue object (200 OK) or 404 Not Found
```

### Change Status
```
PUT /api/issues/{id}/status
Content-Type: application/json

Body: { "status": "IN_PROGRESS" }

Response: Updated Issue object (200 OK) or 404 Not Found
```

### Assign Issue
```
PUT /api/issues/{id}/assign
Content-Type: application/json

Body: { "assignedTo": "username" }

Response: Updated Issue object (200 OK) or 404 Not Found
```

## Data Model

### Issue Entity Fields
- `id` - Auto-generated primary key
- `key` - Unique issue key (auto-generated: "EIT-{timestamp}")
- `title` - Required, minimum 5 characters
- `description` - Optional text field
- `status` - Enum: OPEN, IN_PROGRESS, DONE
- `priority` - Enum: P0, P1, P2, P3 (default: P2)
- `category` - Enum: BUG, FEATURE, TASK, INCIDENT (default: TASK)
- `assignedTo` - String (optional)
- `dueDate` - LocalDate (optional)
- `createdAt` - Auto-set on creation
- `updatedAt` - Auto-updated on modification

## Database

### Local Development (SQLite)
- Database file: `issue_tracker.db` (created automatically)
- Location: Backend directory
- Schema: Auto-created by JPA (`ddl-auto=update`)

### Production (PostgreSQL)
- Configure via environment variables
- See `application-prod.properties` for configuration
- SSL required for Neon PostgreSQL

## Configuration

### Application Properties
- `application.properties` - Local development (SQLite)
- `application-prod.properties` - Production (PostgreSQL)

### Environment Variables (Production)
- `SPRING_PROFILES_ACTIVE=prod`
- `SPRING_DATASOURCE_URL` - PostgreSQL connection string
- `SPRING_DATASOURCE_USERNAME` - Database username
- `SPRING_DATASOURCE_PASSWORD` - Database password
- `CORS_ALLOWED_ORIGINS` - Frontend URL(s)
- `PORT` - Server port (default: 8080)

## Docker Deployment

Build Docker image:
```bash
docker build -t issue-tracker-backend .
```

Run container:
```bash
docker run -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://... \
  issue-tracker-backend
```

See [README-DEPLOYMENT.md](README-DEPLOYMENT.md) for Render deployment.
