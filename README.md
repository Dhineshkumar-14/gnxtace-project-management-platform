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
- Assign Roles
- Deactivate Users
- User Listing with Pagination and Search

### Project Management

- Create Projects
- Update Projects
- Project Status Tracking
- Project Member Management

### Task Management

- Create Tasks
- Update Tasks
- Task Assignment
- Priority Management
- Status Tracking
- Due Date Management

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

## Backend

- Node.js
- Express.js
- Knex.js
- PostgreSQL
- JWT Authentication
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

Frontend follows feature-based organization:

```text
pages/
components/
hooks/
services/
layouts/
routes/
utils/
```

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
2. Refresh token signature is verified
3. Refresh token is validated against database
4. New access token generated
5. New refresh token generated
6. Stored refresh token is replaced
7. New token pair returned

## Logout

1. Stored refresh token is removed
2. Session becomes invalid

---

# RBAC Permissions

| Role    | Permissions               |
| ------- | ------------------------- |
| Admin   | Full Access               |
| Manager | Project & Task Management |
| Member  | Assigned Task Access      |
| Viewer  | Read Only Access          |

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

```bash
npm install
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

---

# Assumptions

- PostgreSQL was used instead of MySQL for familiarity and faster development.
- Single refresh token per user is maintained.
- Soft deactivation is used for users.
- Authentication is token-based using JWT.

---

# Future Improvements

- Audit Logging
- Email Invitations
- Activity Tracking
- File Attachments
- Notifications
- WebSocket Updates
- Unit & Integration Tests
- Docker Deployment

---

# Author

Dhinesh Kumar

Frontend Developer | React.js | Node.js | PostgreSQL
