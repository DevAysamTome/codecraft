# API Documentation

## Overview

The Code Craft Technology API provides endpoints for managing services, projects, and service requests. The API is built with Next.js API routes and uses MongoDB for data persistence.

## Authentication

Admin endpoints require authentication using NextAuth.js. Include the session cookie in your requests.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Public Endpoints

### Services

#### Get All Services

```http
GET /api/services
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category
- `search` (optional): Search in title and description

**Response:**

```json
{
  "services": [
    {
      "_id": "string",
      "title": "string",
      "slug": "string",
      "summary": "string",
      "description": "string",
      "categories": ["string"],
      "tags": ["string"],
      "startingPrice": 1000,
      "deliverables": ["string"],
      "images": ["string"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### Get Service by Slug

```http
GET /api/services/[slug]
```

**Response:**

```json
{
  "_id": "string",
  "title": "string",
  "slug": "string",
  "summary": "string",
  "description": "string",
  "categories": ["string"],
  "tags": ["string"],
  "startingPrice": 1000,
  "deliverables": ["string"],
  "images": ["string"],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Projects

#### Get All Projects

```http
GET /api/projects
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category
- `search` (optional): Search in title and description
- `published` (optional): Filter by published status

**Response:**

```json
{
  "projects": [
    {
      "_id": "string",
      "title": "string",
      "slug": "string",
      "client": "string",
      "summary": "string",
      "description": "string",
      "techStack": ["string"],
      "role": "string",
      "images": ["string"],
      "projectUrl": "string",
      "categories": ["string"],
      "published": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "pages": 2
  }
}
```

#### Get Project by Slug

```http
GET /api/projects/[slug]
```

**Response:**

```json
{
  "_id": "string",
  "title": "string",
  "slug": "string",
  "client": "string",
  "summary": "string",
  "description": "string",
  "techStack": ["string"],
  "role": "string",
  "images": ["string"],
  "projectUrl": "string",
  "categories": ["string"],
  "published": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Service Requests

#### Submit Service Request

```http
POST /api/requests
```

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "serviceId": "string",
  "message": "string",
  "budgetRange": "string",
  "deadline": "2024-12-31",
  "attachments": ["string"]
}
```

**Response:**

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "serviceId": "string",
  "message": "string",
  "budgetRange": "string",
  "deadline": "2024-12-31T00:00:00.000Z",
  "attachments": ["string"],
  "status": "new",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Admin Endpoints

All admin endpoints require authentication.

### Service Requests (Admin)

#### Get All Service Requests

```http
GET /api/requests
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status

**Response:**

```json
{
  "requests": [
    {
      "_id": "string",
      "name": "string",
      "email": "string",
      "phone": "string",
      "company": "string",
      "serviceId": {
        "_id": "string",
        "title": "string",
        "slug": "string"
      },
      "message": "string",
      "budgetRange": "string",
      "deadline": "2024-12-31T00:00:00.000Z",
      "attachments": ["string"],
      "status": "new",
      "assignedTo": {
        "_id": "string",
        "name": "string",
        "email": "string"
      },
      "internalNotes": ["string"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### Get Service Request by ID

```http
GET /api/requests/[id]
```

#### Update Service Request

```http
PATCH /api/requests/[id]
```

**Request Body:**

```json
{
  "status": "in-review",
  "assignedTo": "string",
  "internalNotes": ["string"]
}
```

#### Delete Service Request

```http
DELETE /api/requests/[id]
```

### Services (Admin)

#### Create Service

```http
POST /api/services
```

**Request Body:**

```json
{
  "title": "string",
  "slug": "string",
  "summary": "string",
  "description": "string",
  "categories": ["string"],
  "tags": ["string"],
  "startingPrice": 1000,
  "deliverables": ["string"],
  "images": ["string"]
}
```

#### Update Service

```http
PUT /api/services/[slug]
```

#### Delete Service

```http
DELETE /api/services/[slug]
```

### Projects (Admin)

#### Create Project

```http
POST /api/projects
```

**Request Body:**

```json
{
  "title": "string",
  "slug": "string",
  "client": "string",
  "summary": "string",
  "description": "string",
  "techStack": ["string"],
  "role": "string",
  "images": ["string"],
  "projectUrl": "string",
  "categories": ["string"],
  "published": true
}
```

#### Update Project

```http
PUT /api/projects/[slug]
```

#### Delete Project

```http
DELETE /api/projects/[slug]
```

### File Uploads

#### Upload File

```http
POST /api/uploads
```

**Request Body:** `multipart/form-data`

- `file`: File to upload

**Response:**

```json
{
  "url": "https://res.cloudinary.com/...",
  "publicId": "codecraft/..."
}
```

#### Delete File

```http
DELETE /api/uploads?publicId=[publicId]
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "error": "Invalid request data"
}
```

### 401 Unauthorized

```json
{
  "error": "Unauthorized"
}
```

### 404 Not Found

```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

- Public endpoints: 100 requests per minute per IP
- Admin endpoints: 1000 requests per minute per authenticated user

## CORS

The API supports CORS for cross-origin requests from authorized domains.

## Webhooks

The API supports webhooks for the following events:

- Service request created
- Service request status updated
- File uploaded
- File deleted

Configure webhook URLs in the admin settings.
