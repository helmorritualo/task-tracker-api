# Task Tracker API Documentation

Welcome to the Task Tracker API documentation. This guide provides detailed information about the available endpoints, how to use them, and what responses to expect.

## Table of Contents

1. [Authentication](./auth.md)

   - [Register User](./auth.md#register-user)
   - [Login User](./auth.md#login-user)

2. [User Management](./user.md)

   - [Get User by ID](./user.md#get-user-by-id)
   - [Update User](./user.md#update-user)
   - [Update User Password](./user.md#update-user-password)

3. [Task Management](./task.md)
   - [Get All Tasks](./task.md#get-all-tasks)
   - [Get Tasks by Category](./task.md#get-tasks-by-category)
   - [Get Tasks by Status](./task.md#get-tasks-by-status)
   - [Get Tasks by Priority](./task.md#get-tasks-by-priority)
   - [Get Task by ID](./task.md#get-task-by-id)
   - [Create Task](./task.md#create-task)
   - [Update Task](./task.md#update-task)
   - [Delete Task](./task.md#delete-task)

## Authentication

Most endpoints in the API require authentication. To authenticate, you must include a JWT token in the Authorization header of your requests:

```
Authorization: Bearer <your_token>
```

You can obtain a token by registering a new account and then logging in with your credentials.

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request. In case of an error, the response body will include a detailed error message.

### Common HTTP Status Codes

- `200 OK`: The request was successful
- `201 Created`: The resource was successfully created
- `400 Bad Request`: The request could not be understood due to invalid parameters
- `401 Unauthorized`: Authentication is required and has failed or not been provided
- `404 Not Found`: The requested resource could not be found
- `500 Internal Server Error`: An unexpected error occurred on the server

### Error Response Format

```json
{
  "success": false,
  "message": "Detailed error message"
}
```

## Rate Limiting

To prevent abuse, the API implements rate limiting. If you exceed the rate limit, you will receive a 429 Too Many Requests response.

## API Versioning

The current version of the API does not use an explicit version prefix. Future versions will use prefixes like `/v2/` in the URL path.
