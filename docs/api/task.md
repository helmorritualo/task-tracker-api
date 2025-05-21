# Task API Documentation

This document provides details about task management endpoints in the Task Tracker API.

## Table of Contents

- [Get All Tasks](#get-all-tasks)
- [Get Tasks by Category](#get-tasks-by-category)
- [Get Tasks by Status](#get-tasks-by-status)
- [Get Tasks by Priority](#get-tasks-by-priority)
- [Get Task by ID](#get-task-by-id)
- [Create Task](#create-task)
- [Update Task](#update-task)
- [Delete Task](#delete-task)

## Authentication

All endpoints in the Task API require authentication using a JWT token.

Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## Get All Tasks

Retrieves all tasks for the currently authenticated user.

**URL**: `/tasks`

**Method**: `GET`

**Authentication required**: Yes

### Success Response

**Code**: `200 OK`

```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "Complete Project",
      "description": "Finish the Node.js project",
      "status": "in-progress",
      "priority": "high",
      "category": "work",
      "due_date": "2023-12-31T00:00:00.000Z",
      "createdAt": "2023-06-01T00:00:00.000Z",
      "updatedAt": "2023-06-01T00:00:00.000Z"
    }
  ]
}
```

### Error Responses

**Condition**: If user ID is missing.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "User ID is required"
}
```

**Condition**: If failed to retrieve tasks for another reason.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "Failed to retrieve tasks"
}
```

## Get Tasks by Category

Retrieves tasks filtered by the specified category for the currently authenticated user.

**URL**: `/tasks/category?category=work`

**Method**: `GET`

**Authentication required**: Yes

### Query Parameters

| Parameter | Required | Description                 |
| --------- | -------- | --------------------------- |
| category  | Yes      | Category to filter tasks by |

### Success Response

**Code**: `200 OK`

```json
{
  "success": true,
  "message": "Tasks by Category retrieved successfully",
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "Complete Project",
      "description": "Finish the Node.js project",
      "status": "in-progress",
      "priority": "high",
      "category": "work",
      "due_date": "2023-12-31T00:00:00.000Z",
      "createdAt": "2023-06-01T00:00:00.000Z",
      "updatedAt": "2023-06-01T00:00:00.000Z"
    }
  ]
}
```

### Error Responses

**Condition**: If category is missing.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "Category is required"
}
```

## Get Tasks by Status

Retrieves tasks filtered by the specified status for the currently authenticated user.

**URL**: `/tasks/status?status=in-progress`

**Method**: `GET`

**Authentication required**: Yes

### Query Parameters

| Parameter | Required | Description               |
| --------- | -------- | ------------------------- |
| status    | Yes      | Status to filter tasks by |

### Success Response

**Code**: `200 OK`

```json
{
  "success": true,
  "message": "Tasks by Status retrieved successfully",
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "Complete Project",
      "description": "Finish the Node.js project",
      "status": "in-progress",
      "priority": "high",
      "category": "work",
      "due_date": "2023-12-31T00:00:00.000Z",
      "createdAt": "2023-06-01T00:00:00.000Z",
      "updatedAt": "2023-06-01T00:00:00.000Z"
    }
  ]
}
```

### Error Responses

**Condition**: If status is missing.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "Status is required"
}
```

## Get Tasks by Priority

Retrieves tasks filtered by the specified priority for the currently authenticated user.

**URL**: `/tasks/priority?priority=high`

**Method**: `GET`

**Authentication required**: Yes

### Query Parameters

| Parameter | Required | Description                 |
| --------- | -------- | --------------------------- |
| priority  | Yes      | Priority to filter tasks by |

### Success Response

**Code**: `200 OK`

```json
{
  "success": true,
  "message": "Tasks by Priority retrieved successfully",
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "Complete Project",
      "description": "Finish the Node.js project",
      "status": "in-progress",
      "priority": "high",
      "category": "work",
      "due_date": "2023-12-31T00:00:00.000Z",
      "createdAt": "2023-06-01T00:00:00.000Z",
      "updatedAt": "2023-06-01T00:00:00.000Z"
    }
  ]
}
```

### Error Responses

**Condition**: If priority is missing.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "Priority is required"
}
```

## Get Task by ID

Retrieves a specific task by ID for the currently authenticated user.

**URL**: `/tasks/:id`

**Method**: `GET`

**Authentication required**: Yes

### URL Parameters

| Parameter | Required | Description           |
| --------- | -------- | --------------------- |
| id        | Yes      | ID of the task to get |

### Success Response

**Code**: `200 OK`

```json
{
  "success": true,
  "message": "Task retrieved successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Complete Project",
    "description": "Finish the Node.js project",
    "status": "in-progress",
    "priority": "high",
    "category": "work",
    "due_date": "2023-12-31T00:00:00.000Z",
    "createdAt": "2023-06-01T00:00:00.000Z",
    "updatedAt": "2023-06-01T00:00:00.000Z"
  }
}
```

### Error Responses

**Condition**: If task ID is missing.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "Task ID is required"
}
```

**Condition**: If task is not found.

**Code**: `404 Not Found`

```json
{
  "success": false,
  "message": "Task not found"
}
```

## Create Task

Creates a new task for the currently authenticated user.

**URL**: `/tasks`

**Method**: `POST`

**Authentication required**: Yes

### Request Body

```json
{
  "title": "Complete Project",
  "description": "Finish the Node.js project",
  "status": "in-progress",
  "priority": "high",
  "category": "work",
  "due_date": "2023-12-31T00:00:00.000Z"
}
```

### Request Body Parameters

| Parameter   | Type   | Required | Description                                    |
| ----------- | ------ | -------- | ---------------------------------------------- |
| title       | string | Yes      | Title of the task                              |
| description | string | No       | Detailed description of the task               |
| status      | string | Yes      | Current status (e.g., "pending", "completed")  |
| priority    | string | Yes      | Priority level (e.g., "low", "medium", "high") |
| category    | string | Yes      | Category of task (e.g., "work", "personal")    |
| due_date    | string | No       | Due date in ISO format                         |

### Success Response

**Code**: `201 Created`

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Complete Project",
    "description": "Finish the Node.js project",
    "status": "in-progress",
    "priority": "high",
    "category": "work",
    "due_date": "2023-12-31T00:00:00.000Z",
    "createdAt": "2023-06-01T00:00:00.000Z",
    "updatedAt": "2023-06-01T00:00:00.000Z"
  }
}
```

### Error Responses

**Condition**: If validation fails for any field.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "Title is required"
}
```

## Update Task

Updates an existing task for the currently authenticated user.

**URL**: `/tasks/:id`

**Method**: `PUT`

**Authentication required**: Yes

### URL Parameters

| Parameter | Required | Description              |
| --------- | -------- | ------------------------ |
| id        | Yes      | ID of the task to update |

### Request Body

```json
{
  "title": "Updated Project Title",
  "description": "Updated project description",
  "status": "completed",
  "priority": "medium",
  "category": "work",
  "due_date": "2023-12-15T00:00:00.000Z"
}
```

### Request Body Parameters

| Parameter   | Type   | Required | Description                     |
| ----------- | ------ | -------- | ------------------------------- |
| title       | string | No       | Updated title of the task       |
| description | string | No       | Updated description of the task |
| status      | string | No       | Updated status                  |
| priority    | string | No       | Updated priority level          |
| category    | string | No       | Updated category                |
| due_date    | string | No       | Updated due date in ISO format  |

### Success Response

**Code**: `200 OK`

```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Updated Project Title",
    "description": "Updated project description",
    "status": "completed",
    "priority": "medium",
    "category": "work",
    "due_date": "2023-12-15T00:00:00.000Z",
    "createdAt": "2023-06-01T00:00:00.000Z",
    "updatedAt": "2023-06-02T00:00:00.000Z"
  }
}
```

### Error Responses

**Condition**: If task ID is missing.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "Task ID is required"
}
```

**Condition**: If task is not found.

**Code**: `404 Not Found`

```json
{
  "success": false,
  "message": "Task not found"
}
```

## Delete Task

Deletes a specific task by ID for the currently authenticated user.

**URL**: `/tasks/:id`

**Method**: `DELETE`

**Authentication required**: Yes

### URL Parameters

| Parameter | Required | Description              |
| --------- | -------- | ------------------------ |
| id        | Yes      | ID of the task to delete |

### Success Response

**Code**: `200 OK`

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Error Responses

**Condition**: If task ID is missing.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "Task ID is required"
}
```

**Condition**: If task is not found.

**Code**: `404 Not Found`

```json
{
  "success": false,
  "message": "Task not found"
}
```
