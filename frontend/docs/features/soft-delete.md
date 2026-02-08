# Feature Plan: Update Character `active` Status (Frontend)

## Goal
Replace localStorage-based character deletion with a backend-driven solution by updating the `active` boolean field through a GraphQL mutation.

- No hard delete
- No localStorage
- Backend is the source of truth
- Uses Apollo Client cache

---

## 1. Requirements Summary

- Add an `active: Boolean` field to character handling on frontend
- Replace “delete character” action with “deactivate character”
- Use GraphQL mutation to set `active = false`
- Remove deactivated characters from UI
- Keep Apollo cache in sync