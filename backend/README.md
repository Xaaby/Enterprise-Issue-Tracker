# Backend - Enterprise Issue Tracker

## Stack
- Java 17
- Spring Boot 3.2.0
- Spring Web
- Spring Data JPA
- PostgreSQL

## Setup

1. Ensure PostgreSQL is running and create database:
```sql
CREATE DATABASE issue_tracker;
```

2. Update `src/main/resources/application.properties` with your database credentials.

3. Build:
```bash
mvn clean install
```

4. Run:
```bash
mvn spring-boot:run
```

Server runs on `http://localhost:8080`

## Project Structure

```
src/main/java/com/enterprise/issuetracker/
├── controller/     # REST endpoints
├── service/        # Business logic
├── repository/     # Data access
└── entity/         # JPA entities
```

## API Contract

All endpoints are under `/api/issues`

**Create Issue:**
```
POST /api/issues
Body: { "title": "...", "description": "...", "status": "OPEN", "assignedTo": "..." }
```

**Get All Issues:**
```
GET /api/issues
```

**Get Issue by ID:**
```
GET /api/issues/{id}
```

**Update Issue:**
```
PUT /api/issues/{id}
Body: { "title": "...", "description": "...", "status": "...", "assignedTo": "..." }
```

**Change Status:**
```
PUT /api/issues/{id}/status
Body: { "status": "IN_PROGRESS" }
```

**Assign Issue:**
```
PUT /api/issues/{id}/assign
Body: { "assignedTo": "username" }
```
