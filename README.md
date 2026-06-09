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
| Manager | [manager@example.com](mailto:manager@example.com) | User@1234 |
| Member  | [member@example.com](mailto:member@example.com)   | User@1234 |
| Viewer  | [viewer@example.com](mailto:viewer@example.com)   | User@1234 |

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

## Projects Module

### Features Implemented

* Create Project
* Update Project
* Delete Project
* View Project Details
* List Projects with Pagination
* Search Projects
* Filter Projects by Status
* Project Start Date and Due Date Management
* Responsive Project Management UI
* Zustand State Management

### Project Endpoints

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | /api/v1/projects     | Create Project      |
| GET    | /api/v1/projects     | Get All Projects    |
| GET    | /api/v1/projects/:id | Get Project Details |
| PUT    | /api/v1/projects/:id | Update Project      |
| DELETE | /api/v1/projects/:id | Delete Project      |

### Project Statuses

| Status    | Description                |
| --------- | -------------------------- |
| active    | Active project             |
| on_hold   | Project temporarily paused |
| completed | Project completed          |
| archived  | Archived project           |

---

## Tasks Module

### Features Implemented

* Create Task
* Update Task
* Delete Task
* View Task Details
* Task Assignment
* Task Priority Management
* Task Status Tracking
* Search Tasks
* Filter Tasks
* Pagination
* Responsive Task Management UI
* Zustand State Management

### Task Endpoints

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | /api/v1/tasks     | Create Task      |
| GET    | /api/v1/tasks     | Get All Tasks    |
| GET    | /api/v1/tasks/:id | Get Task Details |
| PUT    | /api/v1/tasks/:id | Update Task      |
| DELETE | /api/v1/tasks/:id | Delete Task      |

### Task Statuses

| Status      | Description       |
| ----------- | ----------------- |
| todo        | Task not started  |
| in_progress | Task in progress  |
| in_review   | Task under review |
| done        | Task completed    |
| cancelled   | Task cancelled    |

### Task Priorities

| Priority | Description       |
| -------- | ----------------- |
| low      | Low priority      |
| medium   | Medium priority   |
| high     | High priority     |
| critical | Critical priority |

---

## Frontend Features

### Project Management

* Project Listing
* Project Filters
* Project Pagination
* Project Create/Edit Modal
* Loading Skeletons
* Empty States
* Responsive Design

### Task Management

* Task Listing
* Task Filters
* Task Pagination
* Task Create/Edit Modal
* Task Delete Action
* Loading Skeletons
* Empty States
* Responsive Design

---

## State Management

The frontend uses Zustand stores for:

* Authentication
* Projects
* Tasks

Benefits:

* Lightweight state management
* Simple API
* Minimal boilerplate
* Better maintainability
