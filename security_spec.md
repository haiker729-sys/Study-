# Security Specification - Study Time Table Planner

## 1. Data Invariants
- A task must always have a `userId` that matches the authenticated user.
- A user can only read/write their own profile and data.
- Task times must be valid strings.
- Status must be one of: pending, completed, skipped.

## 2. Dirty Dozen Payloads
- P1: Create a task for another user.
- P2: Update another user's streak.
- P3: Read all users' profiles.
- P4: Inject a huge string (1MB) into `taskName`.
- P5: Create a task with `endTime` before `startTime` (logical bypass).
- P6: Delete a task owned by another user.
- P7: Update `userId` of an existing task.
- P8: Create a user profile without being signed in.
- P9: Set `points` to 999999 manually.
- P10: Add 1000 items to the `badges` array.
- P11: Query all tasks without a `userId` filter.
- P12: Spoof `lastActive` date to bypass streak logic.

## 3. Implementation Plan
- `isValidId()` for path segments.
- `isValidUser()` for profile.
- `isValidTask()` for tasks.
- `isValidTemplate()` for templates.
- Strict `affectedKeys()` on updates.
