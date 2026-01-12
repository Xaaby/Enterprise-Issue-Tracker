# Enterprise Issue Tracking System

A full-stack enterprise application demonstrating Java Spring Boot REST APIs, Angular frontend, and SQL database persistence. Built for internal operations teams to track work items, defects, and operational issues with structured workflows and auditability.

## 🎯 Project Overview

This is a production-ready internal tool designed for enterprise teams requiring structured issue tracking, ownership management, and status visibility. The application follows enterprise development patterns and demonstrates real-world full-stack engineering capabilities.

**One-Line Summary:**  
*"A lightweight internal issue tracking system for enterprise teams to manage work, ownership, and status in a simple, auditable way."*

## 🛠️ Technology Stack

### Backend
- **Java 17** - Modern Java development
- **Spring Boot 3.2.0** - Enterprise application framework
- **Spring Web** - RESTful API development
- **Spring Data JPA** - Database abstraction and ORM
- **SQLite** (Development) / **PostgreSQL** (Production)
- **Maven** - Dependency management and build automation

### Frontend
- **Angular 17** - Modern frontend framework with standalone components
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming patterns
- **Angular Router** - Client-side routing
- **Angular Forms** - Reactive forms with validation
- **HttpClient** - REST API integration

### DevOps & Deployment
- **Docker** - Containerization
- **Render** - Backend hosting (Spring Boot)
- **Netlify** - Frontend hosting (Angular)
- **Neon** - PostgreSQL database hosting

## ✨ Key Features

### Core Functionality
- ✅ **Issue Management**: Full CRUD operations with validation
- ✅ **Status Workflow**: Open → In Progress → Done lifecycle
- ✅ **Priority Management**: P0 (Critical) to P3 (Low) classification
- ✅ **Category System**: Bug, Feature, Task, Incident classification
- ✅ **Assignment Tracking**: Team member assignment and ownership
- ✅ **Search & Filtering**: Multi-criteria search and filtering
- ✅ **Pagination**: Efficient data loading and display
- ✅ **Real-time Feedback**: Toast notifications for user actions

### Enterprise UI/UX
- ✅ **Professional Layout**: Top navigation, sidebar, and content area
- ✅ **Data Tables**: Sortable, filterable issue tables
- ✅ **Form Validation**: Client-side validation with error messages
- ✅ **Responsive Design**: Desktop and tablet support
- ✅ **Loading States**: Visual feedback during API operations
- ✅ **Error Handling**: User-friendly error messages

## 📁 Project Architecture

```
enterprise-issue-tracker/
├── backend/                    # Spring Boot REST API
│   ├── controller/            # REST endpoints
│   ├── service/               # Business logic layer
│   ├── repository/            # Data access layer (JPA)
│   ├── entity/                # Domain models
│   └── config/                 # Configuration (CORS, etc.)
│
├── frontend/                   # Angular SPA
│   ├── core/layout/           # Application shell
│   ├── issues/                # Issue management module
│   ├── reports/               # Reporting module
│   ├── shared/                # Reusable components
│   └── services/              # API integration layer
│
└── Deployment configs          # Docker, Render, Netlify
```

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 18+ and npm

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend runs on `http://localhost:8080`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs on `http://localhost:4200`

**Note:** SQLite database is created automatically on first run. No additional setup required.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/issues` | Get all issues (supports search, filters, pagination) |
| `POST` | `/api/issues` | Create new issue |
| `GET` | `/api/issues/{id}` | Get issue by ID |
| `PUT` | `/api/issues/{id}` | Update issue |
| `PUT` | `/api/issues/{id}/status` | Change issue status |
| `PUT` | `/api/issues/{id}/assign` | Assign issue to user |

### Example API Request
```bash
POST /api/issues
Content-Type: application/json

{
  "title": "Implement user authentication",
  "description": "Add login and registration functionality",
  "status": "OPEN",
  "priority": "P1",
  "category": "FEATURE",
  "assignedTo": "john.doe",
  "dueDate": "2026-01-20"
}
```

## 🗄️ Data Model

**Issue Entity:**
- `id` - Auto-generated primary key
- `key` - Unique identifier (e.g., "EIT-1023")
- `title` - Issue title (required, min 5 chars)
- `description` - Detailed description
- `status` - OPEN, IN_PROGRESS, DONE
- `priority` - P0, P1, P2, P3
- `category` - BUG, FEATURE, TASK, INCIDENT
- `assignedTo` - Assigned team member
- `dueDate` - Optional due date
- `createdAt` / `updatedAt` - Audit timestamps

## 🏗️ Technical Highlights

### Backend Architecture
- **Layered Architecture**: Controller → Service → Repository pattern
- **RESTful Design**: Standard HTTP methods and status codes
- **JPA/Hibernate**: Object-relational mapping with automatic schema generation
- **Transaction Management**: `@Transactional` for data consistency
- **CORS Configuration**: Cross-origin resource sharing for frontend integration
- **Environment Configuration**: Separate configs for dev/prod

### Frontend Architecture
- **Component-Based**: Standalone Angular components
- **Reactive Forms**: Form validation and error handling
- **Service Layer**: Centralized API communication
- **Type Safety**: Full TypeScript with interfaces and enums
- **State Management**: Component-level state with event-driven updates
- **User Feedback**: Toast notifications for all operations

### Code Quality
- **Clean Code**: Separation of concerns, single responsibility
- **Error Handling**: Comprehensive error handling with user feedback
- **Validation**: Both client-side and server-side validation
- **Documentation**: Inline comments and comprehensive README files

## 📊 Business Value

This application solves real enterprise problems:

1. **Visibility**: Centralized view of all issues and their status
2. **Accountability**: Clear ownership and priority assignment
3. **Standardization**: Consistent workflow across teams
4. **Auditability**: Complete change history and timestamps

**Target Industries:**
- Financial services
- Enterprise software
- Healthcare IT
- Consulting and delivery organizations

## 🚢 Deployment

The application is configured for production deployment:

- **Backend**: Docker containerization, deployable to Render
- **Frontend**: Static build, deployable to Netlify
- **Database**: PostgreSQL (Neon) for production

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 📚 Documentation

- [Backend README](backend/README.md) - API documentation and backend details
- [Frontend README](frontend/README.md) - Frontend architecture and setup
- [Deployment Guide](DEPLOYMENT.md) - Production deployment steps
- [Quick Start Deployment](DEPLOYMENT-QUICK-START.md) - Fast deployment guide

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- **Backend Development**: RESTful API design, Spring Boot, JPA/Hibernate
- **Frontend Development**: Angular, TypeScript, reactive programming
- **Database Design**: Entity relationships, JPA annotations, migrations
- **Full-Stack Integration**: API consumption, error handling, state management
- **DevOps**: Docker, CI/CD, cloud deployment
- **Enterprise Patterns**: Layered architecture, separation of concerns

## 📝 License

This project is part of a portfolio demonstration.

---

**Built with:** Java 17 • Spring Boot • Angular 17 • SQLite/PostgreSQL
