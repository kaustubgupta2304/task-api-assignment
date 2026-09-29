# Design Notes

## Task assignment

I kept the assignment feature small and consistent with the existing API instead of introducing a separate user system, because the current project stores tasks in memory and does not have user management.

The new endpoint is:

```http
PATCH /tasks/:id/assign
```

It accepts an `assignee` in the request body.

Example:

```json
{
  "assignee": "Alice"
}
```

### Validation

- If `assignee` is missing or empty, the API returns `400`.
- If the task ID does not exist, it returns `404`.
- If the task already has an assignee, it returns `409` rather than silently replacing the existing assignment.
- A successful assignment returns the updated task.

### Why PATCH?

The endpoint only changes one part of an existing task, so `PATCH` fits better than replacing the whole task with `PUT`.

## Testing approach

I used Jest for the service-level tests and Supertest for API-level tests. The tests cover normal operations as well as invalid input and missing resources.

The main goal was to test the behaviour that matters to someone using the API, while also keeping the service tests focused on the underlying task logic.
