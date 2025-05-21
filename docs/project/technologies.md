# Technologies

## Core Technologies

### Programming Language

- **TypeScript**
  - Version: ^5.8.3
  - Used for: All server-side code

### Runtime Environment

- **Node.js**
  - Used for: Server runtime

### Web Framework

- **Hono**: Ultrafast web framework for the Edges.
  - Used with: `@hono/node-server` (^1.14.1)
  - Features used:
    - Routing
    - Middleware support
    - JWT authentication
    - CORS handling
    - Secure headers
    - Logging

### Database

- **MongoDB**: NoSQL document database
  - Accessed via: Mongoose (^8.15.0)
  - Used for: Storing user data and tasks

## Libraries and Dependencies

### Production Dependencies

- **@hono/node-server (^1.14.1)**: Server adapter for Hono framework
- **bcrypt (^6.0.0)**: Password hashing library
- **dotenv (^16.5.0)**: Environment variable management
- **http-status-codes (^2.3.0)**: HTTP status code constants
- **mongodb (^6.16.0)**: MongoDB driver for Node.js
- **mongoose (^8.15.0)**: MongoDB object modeling tool
- **zod (^3.25.7)**: TypeScript-first schema validation

### Development Dependencies

- **@types/bcrypt (^5.0.2)**: Type definitions for bcrypt
- **@types/node (^20.11.17)**: Type definitions for Node.js
- **tsx (^4.7.1)**: TypeScript execution environment with ESM support
- **typescript (^5.8.3)**: TypeScript language

## Development Tools

- **tsx watch**: Used for development with hot reload
- **TypeScript compiler**: Used for building production code
- **ESM (ECMAScript Modules)**: Modern JavaScript module system

## Authentication

- **JWT (JSON Web Tokens)**: Used for stateless authentication
- **Hono JWT Middleware**: For JWT verification and management

## Validation

- **Zod**: Schema validation library used for request validation
- **Custom Validators**: Middleware for validating requests

## Error Handling

- **Custom Error Classes**: For consistent error responses
- **Global Error Handler Middleware**: For centralized error handling

## Configuration

- **Environment Variables**: Managed with dotenv
- **TypeScript Path Aliases**: For cleaner imports using `@/*` syntax
