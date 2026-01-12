-- SQLite Database Schema Reference
-- The application will auto-create the table using JPA ddl-auto=update
-- Database file: issue_tracker.db (created automatically in backend directory)

-- Schema reference (for SQLite):
CREATE TABLE IF NOT EXISTS issues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL,
    assigned_to VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
