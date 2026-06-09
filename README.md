# Project Management Platform

## Tech Stack

Frontend:

- React
- Vite
- Tailwind

Backend:

- Node.js
- Express
- Knex
- PostgreSQL

## Database Choice

PostgreSQL was used instead of MySQL. Since Knex.js provides database abstraction, the overall architecture and implementation remain consistent with the assessment requirements.

## Architecture

Controller
→ Service
→ Repository
→ Database


## Authentication Module

### Features Implemented

* JWT-based Authentication
* Access Token Authentication Middleware
* Refresh Token Support
* User Profile Endpoint (`/auth/me`)
* Logout Endpoint
* Role-Based Access Control (RBAC)
* Protected Routes
* Axios Request/Response Interceptors
* Zustand Authentication Store
* Login Page UI
* Client-side Form Validation

### Authentication Endpoints

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| POST   | /api/v1/auth/login   | Authenticate user              |
| POST   | /api/v1/auth/logout  | Logout current user            |
| POST   | /api/v1/auth/refresh | Generate new access token      |
| GET    | /api/v1/auth/me      | Get current authenticated user |

### Roles

* Admin
* Manager
* Member
* Viewer

### Permissions

* projects:create
* projects:read
* projects:update
* projects:delete
* tasks:create
* tasks:update
* tasks:delete
* users:manage
* reports:view

### Seeded Users

| Role    | Email                                             | Password  |
| ------- | ------------------------------------------------- | --------- |
| Admin   | [admin@example.com](mailto:admin@example.com)     | Admin@123 |
| Manager | [manager@example.com](mailto:manager@example.com) | Admin@123 |
| Member  | [member@example.com](mailto:member@example.com)   | Admin@123 |
| Viewer  | [viewer@example.com](mailto:viewer@example.com)   | Admin@123 |

### Frontend Authentication

* Zustand for state management
* Axios interceptors for token handling
* Protected routes with permission checks
* Responsive login page using React + Tailwind CSS

### Security

* Password hashing using bcrypt
* JWT Access Tokens
* Refresh Token workflow
* Role-Based Access Control (RBAC)
* Authorization middleware
