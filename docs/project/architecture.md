# Architecture

## Overview

The Task Tracker application follows a modern API-first approach using a clean architecture pattern. The application is structured to maintain separation of concerns, making it more maintainable, testable, and scalable.

## Architecture Layers

### 1. Entry Point Layer

- `src/index.ts`: The main application entry point that initializes the server and sets up middleware.

### 2. Routes Layer

- `src/controllers/routes.ts`: Aggregates all route modules.
- Route modules (`auth/route.ts`, `task/route.ts`, `user/route.ts`): Define API endpoints.

### 3. Controller Layer

- Controllers (`auth.controller.ts`, `task.controller.ts`, `user.controller.ts`): Handle HTTP requests and responses.
- They orchestrate the business logic by calling appropriate services and returning formatted responses.

### 4. Service Layer

- `src/services/`: Contains business logic and interacts with models.
- Encapsulates the core functionality of the application.

### 5. Model Layer

- `src/models/`: Defines data structures and handles database interactions.
- Uses Mongoose schemas to define the structure of documents in MongoDB.

### 6. Middleware Layer

- `src/middlewares/`: Contains middleware functions for handling authentication, validation, and error handling.

### 7. Utility Layer

- `src/utils/`: Contains utility functions and custom error classes.

### 8. Configuration Layer

- `src/config/`: Manages environment variables and application configuration.

## Request Flow

1. A client sends an HTTP request to the server.
2. The request is processed through global middleware (CORS, logging, security headers).
3. The request is routed to the appropriate controller based on the URL path.
4. Route-specific middleware (authentication, validation) processes the request.
5. The controller handles the request, calling services as needed.
6. Services interact with models to perform database operations.
7. The controller formats the response and sends it back to the client.
8. Any errors are caught by the error handler middleware and appropriate responses are sent.

## Directory Structure

```
src/
├── index.ts                   # Application entry point
├── config/                    # Configuration files
├── controllers/               # Route controllers
│   ├── routes.ts              # Main routes aggregation
│   ├── auth/                  # Authentication routes and controllers
│   ├── task/                  # Task routes and controllers
│   └── user/                  # User routes and controllers
├── middlewares/               # Middleware functions
├── models/                    # Database models
├── services/                  # Business logic
└── utils/                     # Utility functions and helpers
```

## Architecture Patterns

- **MVC Pattern**: The application follows a Model-View-Controller pattern, though without traditional views since it's an API.
- **Repository Pattern**: Models encapsulate database access logic.
- **Middleware Pattern**: Uses a chain of middleware for request processing.
- **Error Handling Pattern**: Centralized error handling through custom error classes and middleware.
