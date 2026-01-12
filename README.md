# Enterprise Issue Tracking System

## What problem does this solve?

An internal enterprise tool for tracking and managing issues/tickets. Provides a simple REST API backend and Angular frontend for creating, viewing, updating, and assigning issues.

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

## API Endpoints

- `POST /api/issues` - Create new issue
- `GET /api/issues` - Get all issues
- `GET /api/issues/{id}` - Get issue by ID
- `PUT /api/issues/{id}` - Update issue
- `PUT /api/issues/{id}/status` - Change issue status
- `PUT /api/issues/{id}/assign` - Assign issue to user

## Data Model

**Issue Entity:**
- `id` (Long) - Primary key
- `title` (String) - Issue title
- `description` (String) - Issue description
- `status` (ENUM: OPEN, IN_PROGRESS, DONE)
- `assignedTo` (String) - Assigned user
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## Outcome

A functional full-stack application demonstrating:
- Java REST API development with Spring Boot
- Angular frontend consuming REST APIs
- SQL persistence with JPA
- Clean separation of concerns (Controller → Service → Repository)
- Enterprise-ready structure
