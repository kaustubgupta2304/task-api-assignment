# Task API – Take-Home Assignment

This project is a small Express API for managing tasks. I started with the existing API, added tests around the current behaviour, fixed the issues I found, and added the requested task-assignment endpoint.

## What I worked on

- Added service-level tests for the main task operations.
- Added API tests with Supertest for the important success and error cases.
- Fixed the task-list pagination calculation.
- Fixed task completion so it doesn't accidentally change the task priority.
- Added `PATCH /tasks/:id/assign`.
- Added validation for the assignment request.
- Added a short bug report and notes explaining the design choices.

## Running the project

Install the dependencies:

```bash
npm install
```

Run the API:

```bash
npm start
```

Run the tests:

```bash
npm test
```

Run the tests with coverage:

```bash
npm run coverage
```

## Assign a task

Use:

```http
PATCH /tasks/:id/assign
Content-Type: application/json
```

Request body:

```json
{
  "assignee": "Alice"
}
```

The endpoint returns `400` for a missing/empty assignee, `404` when the task does not exist, and `409` when the task is already assigned.

## Notes

The project keeps the original in-memory data store. No external database is required to run the assignment.
