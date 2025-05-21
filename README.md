# Task Tracker API

A robust RESTful API for task management built with TypeScript, Hono, and MongoDB.

## Features

- **User Management**: Register, login, update profile
- **Task Management**: Create, read, update, and delete tasks
- **Authentication**: JWT-based authentication system
- **Data Validation**: Request validation using Zod
- **Error Handling**: Comprehensive error handling with custom error classes
- **Security**: CORS protection, secure headers, password hashing

## Technology Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Web Framework**: Hono with Node.js adapter
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod schema validation
- **Error Handling**: Custom error classes

## Prerequisites

- Node.js v16 or higher
- MongoDB

## Getting Started

### Installation

1. Clone the repository:

   ```powershell
   git clone https://github.com/helmorritualo/task-tracker.git
   ```

2. Install dependencies:

   ```powershell
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=your_port
   MONGO_URL=mongodb://127.0.0.1:27017/task-tracker
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key
   ```


## API Documentation

### Authentication Endpoints

- `POST /api/v1/auth/register`: Register a new user
- `POST /api/v1/auth/login`: Authenticate a user and get JWT token

### Task Endpoints

- `GET /api/v1/tasks`: Get all tasks for the authenticated user
- `GET /api/v1/tasks/:id`: Get a specific task by ID
- `POST /api/v1/tasks`: Create a new task
- `PUT /api/v1/tasks/:id`: Update a specific task
- `DELETE /api/v1/tasks/:id`: Delete a specific task

For detailed API documentation, see the [API Documentation](docs/api/index.md).

## Project Structure

```
src/
├── index.ts                   # Application entry point
├── config/                    # Configuration files
├── controllers/               # Route controllers
├── middlewares/               # Middleware functions
├── models/                    # Database models
├── services/                  # Business logic
└── utils/                     # Utility functions and helpers
```

## Project Documentation

For comprehensive project documentation, see the [Project Documentation](docs/project/README.md).
