# User API Documentation

This document provides details about user management endpoints in the Task Tracker API.

## Table of Contents

- [Get User by ID](#get-user-by-id)
- [Update User](#update-user)
- [Update User Password](#update-user-password)

## Authentication

All endpoints in the User API require authentication using a JWT token.

Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## Get User by ID

Retrieves the currently authenticated user's profile information.

**URL**: `/users`

**Method**: `GET`

**Authentication required**: Yes

### Success Response

**Code**: `200 OK`

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      "id": "60d21b4667d0d8992e610c85",
      "full_name": "John Doe",
      "email": "john.doe@example.com",
      "username": "johndoe",
      "gender": "male"
    }
  }
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

**Condition**: If user is not found.

**Code**: `404 Not Found`

```json
{
  "success": false,
  "message": "User not found"
}
```

**Condition**: If token is invalid or missing.

**Code**: `401 Unauthorized`

```json
{
  "success": false,
  "message": "Authentication required"
}
```

## Update User

Updates the currently authenticated user's profile information.

**URL**: `/users`

**Method**: `PUT`

**Authentication required**: Yes

### Request Body

```json
{
  "full_name": "John Smith",
  "email": "john.smith@example.com",
  "username": "johnsmith"
}
```

### Request Body Parameters

| Parameter | Type   | Required | Description           |
| --------- | ------ | -------- | --------------------- |
| full_name | string | No       | Updated full name     |
| email     | string | No       | Updated email address |
| username  | string | No       | Updated username      |
| gender    | string | No       | Updated gender        |

### Success Response

**Code**: `201 Created`

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "user": {
      "id": "60d21b4667d0d8992e610c85",
      "full_name": "John Smith",
      "email": "john.smith@example.com",
      "username": "johnsmith",
      "gender": "male"
    }
  }
}
```

### Error Responses

**Condition**: If validation fails for any field.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "Email format is invalid"
}
```

**Condition**: If user is not found.

**Code**: `404 Not Found`

```json
{
  "success": false,
  "message": "User not found"
}
```

## Update User Password

Updates the currently authenticated user's password.

**URL**: `/user/password`

**Method**: `PATCH`

**Authentication required**: Yes

### Request Body

```json
{
  "old_password": "securepassword",
  "new_password": "newsecurepassword"
}
```

### Request Body Parameters

| Parameter    | Type   | Required | Description      |
| ------------ | ------ | -------- | ---------------- |
| old_password | string | Yes      | Current password |
| new_password | string | Yes      | New password     |

### Success Response

**Code**: `200 OK`

```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

### Error Responses

**Condition**: If current password is incorrect.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

**Condition**: If new password is the same as the old password.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "New password cannot be the same as the old password"
}
```

**Condition**: If validation fails for new password.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "Password must be at least 6 characters long"
}
```
