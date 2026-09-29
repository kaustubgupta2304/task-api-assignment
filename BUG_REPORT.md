# Bug Report

I found two issues while going through the existing task API.

## 1. Pagination skipped the first page

**Location:** `src/services/taskService.js`

The page offset was calculated as:

```js
const start = page * limit;
```

For page 1, this starts at `limit`, so the first set of tasks is skipped.

For example, with a limit of 10, page 1 starts at item 11 instead of item 1.

**Fix:**

The offset should be based on the number of pages before the requested page:

```js
const start = (page - 1) * limit;
```

I also added a test to make sure the first page starts with the first task.

## 2. Completing a task changed its priority

**Location:** `src/services/taskService.js`

The completion logic was also setting the task priority to `medium`.

That means a task with a priority such as `high` would lose its original priority just because it was marked complete.

**Fix:**

Completing a task now only changes the completion status and leaves the existing priority unchanged.

I added a test for this case as well.
