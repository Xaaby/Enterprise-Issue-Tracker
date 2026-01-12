# Frontend - Enterprise Issue Tracker

## Stack
- Angular 17
- HttpClient
- Simple routing

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

Application runs on `http://localhost:4200`

## Project Structure

```
src/app/
├── components/
│   ├── issue-list/      # Table view of all issues
│   └── issue-form/      # Create/edit form
├── services/
│   └── issue.service.ts # API service
└── models/
    └── issue.model.ts   # TypeScript interfaces
```

## Features

- View all issues in a table
- Create new issues
- Edit existing issues
- Change issue status
- Assign issues to users

## Configuration

Update `src/app/services/issue.service.ts` if backend URL differs from `http://localhost:8080`.
