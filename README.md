# Project Management Platform

A full-stack Project Management Platform built with React.js, Node.js, Express.js, PostgreSQL, Knex.js, and Zustand.

## Features

### Authentication & Authorization

- JWT Authentication
- Access Token & Refresh Token
- Refresh Token Rotation
- Role-Based Access Control (RBAC)
- Protected Routes
- Session Management

### User Management

- Invite Users
- Update User Information
- Assign Multiple Roles
- Deactivate Users
- User Listing with Pagination and Search

### Project Management

- Create Projects
- Update Projects
- Archive Projects
- Project Status Tracking
- Project Ownership Management

### Task Management

- Create Tasks
- Update Tasks
- Delete Tasks
- Task Assignment
- Priority Management
- Status Tracking
- Due Date Management

### Dashboard

- Project Statistics
- Task Statistics
- Project Progress Overview
- Overdue Task Tracking
- Team Contribution Insights

### Validation

- Zod Request Validation
- Backend API Validation
- Frontend Form Validation

---

# Technology Stack

## Frontend

- React.js
- React Router
- Zustand
- Axios
- Tailwind CSS
- Lucide React

## Backend

- Node.js
- Express.js
- PostgreSQL
- Knex.js
- JWT
- bcryptjs
- Zod

---

# Architecture

Backend follows a layered architecture:

```text
Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Database
```

Frontend follows feature-based architecture:

```text
src/
├── components/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── store/
└── utils/
```

---

# Security

- Password Hashing using bcryptjs
- JWT Authentication
- Refresh Token Rotation
- Role-Based Authorization
- Protected API Routes
- Request Validation using Zod

---

# Authentication Flow

## Login

1. User submits credentials
2. Credentials are validated
3. Access Token is generated
4. Refresh Token is generated
5. Refresh Token is stored in database
6. Tokens returned to client

## Refresh Token Rotation

1. Client sends refresh token
2. Refresh token is verified
3. Stored token is validated
4. New access token generated
5. New refresh token generated
6. Previous refresh token replaced
7. Updated token pair returned

## Logout

1. Refresh token removed from database
2. Session invalidated

---

# RBAC Roles

| Role    | Access                           |
| ------- | -------------------------------- |
| Admin   | Full System Access               |
| Manager | Manage Projects, Tasks and Users |
| Member  | Assigned Project & Task Access   |
| Viewer  | Read Only Access                 |

---

# Project Structure

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── validations/
│   └── utils/
│
├── migrations/
├── seeds/
└── knexfile.js

frontend/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── store/
│   └── utils/
```

---

# Environment Variables

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=project_management
DB_USER=postgres
DB_PASSWORD=password

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

# Installation

## Backend

Install dependencies:

```bash
npm install
```

Run migrations:

```bash
npm run migrate
```

Run seed data:

```bash
npm run seed
```

Start server:

```bash
npm run dev
```

---

## Frontend

Install dependencies:

```bash
npm install
```

Start application:

```bash
npm run dev
```

---

# Seed Credentials

## Admin

```text
Email: admin@example.com
Password: Admin@123
```

## Manager

```text
Email: manager@example.com
Password: User@1234
```

## Member

```text
Email: member@example.com
Password: User@1234
```

## Viewer

```text
Email: viewer@example.com
Password: User@1234
```

---

# API Endpoints

## Authentication

```text
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET  /auth/me
```

## Users

```text
GET    /users
GET    /users/:id
POST   /users/invite
PUT    /users/:id
PUT    /users/:id/roles
DELETE /users/:id
```

## Projects

```text
GET    /projects
GET    /projects/:id
POST   /projects
PUT    /projects/:id
DELETE /projects/:id
```

## Tasks

```text
GET    /tasks
GET    /tasks/:id
POST   /tasks
PUT    /tasks/:id
DELETE /tasks/:id
```

## Dashboard

```text
GET /dashboard/stats
GET /dashboard/project-progress
GET /dashboard/overdue-tasks
GET /dashboard/top-contributors
GET /dashboard/recent-activities
```

---

# API Testing

A Postman collection is included in the repository:

```text
postman/project-management-platform.postman_collection.json
```

Recommended Postman environment variables:

```text
baseUrl
accessToken
refreshToken
projectId
taskId
userId
```

---

# Assumptions

- PostgreSQL is used as the primary database.
- JWT-based authentication is used.
- Single active refresh token is maintained per user.
- Soft deactivation is used for users.
- RBAC permissions are role-driven.

---

# Known Limitations

- Email invitation service is mocked.
- Audit logs are not yet implemented.
- Automated testing coverage is pending.
- Docker deployment is not configured.
- File attachment support is not available.

---

# Future Enhancements

## User & Security

- Change Password Module
- Forgot Password Flow
- Email Invitation Service
- User Profile Management
- User Settings Module

## Monitoring

- Audit Logging
- Activity Tracking
- System Logs

## Project & Task Management

- Kanban Board with Drag & Drop
- Task Comments
- Task Attachments
- Task Labels & Tags
- Project Members Management

## Collaboration

- Notifications
- Real-time Updates using WebSockets
- Team Mentions

## Quality

- Unit Testing
- Integration Testing
- E2E Testing

---

# Author

Dhinesh Kumar

Frontend Developer | React.js | Node.js | PostgreSQL
