# Authentication API Documentation

This document provides details about the authentication endpoints in the Task Tracker API.

## Table of Contents

- [Register User](#register-user)
- [Login User](#login-user)

## Register User

Creates a new user account in the system.

**URL**: `/auth/register`

**Method**: `POST`

**Authentication required**: No

### Request Body

```json
{
  "full_name": "John Doe",
  "email": "john.doe@example.com",
  "username": "johndoe",
  "password": "securepassword",
  "gender": "male"
}
```

### Request Body Parameters

| Parameter | Type   | Required | Description                         |
| --------- | ------ | -------- | ----------------------------------- |
| full_name | string | Yes      | User's full name                    |
| email     | string | Yes      | User's email address                |
| username  | string | Yes      | Username (min 5 characters)         |
| password  | string | Yes      | Password (min 6 characters)         |
| gender    | string | Yes      | Gender (must be "male" or "female") |

### Success Response

**Code**: `201 Created`

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "full_name": "John Doe",
      "email": "john.doe@example.com",
      "username": "johndoe",
      "gender": "male"
    }
  }
}
```

### Error Responses

**Condition**: If user already exists with the same email.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "User already exists"
}
```

**Condition**: If validation fails for any field.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "Username must be at least 5 characters long"
}
```

## Login User

Authenticates a user and returns a JWT token.

**URL**: `/auth/login`

**Method**: `POST`

**Authentication required**: No

### Request Body

```json
{
  "username": "johndoe",
  "password": "securepassword"
}
```

### Request Body Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| username  | string | Yes      | User's username |
| password  | string | Yes      | User's password |

### Success Response

**Code**: `200 OK`

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "full_name": "John Doe",
      "email": "john.doe@example.com",
      "username": "johndoe",
      "gender": "male"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Error Responses

**Condition**: If username does not exist.

**Code**: `404 Not Found`

```json
{
  "success": false,
  "message": "User not found"
}
```

**Condition**: If password is incorrect.

**Code**: `400 Bad Request`

```json
{
  "success": false,
  "message": "Invalid password"
}
```
