-- Create database (run this manually in PostgreSQL)
-- CREATE DATABASE issue_tracker;

-- The application will auto-create the table using JPA ddl-auto=update
-- But here's the schema for reference:

CREATE TABLE IF NOT EXISTS issues (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL,
    assigned_to VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
