---
title: "2025-01-15 - POST /auth/sign-in"
date: 2025-01-15
status: current
superseded_by: ~
adr: "adr/2025-01-10-jwt-strategy.md"
type: endpoint
layer: auth
file: "apps/auth/views.py"
entry_point: "TokenObtainPairView"
related_files:
  - "apps/auth/serializers.py"
  - "apps/auth/urls.py"
  - "apps/users/models.py"
tags: [auth, jwt, simple-jwt]
authors: [@dev1]
---

# POST /auth/sign-in

## Overview

Authenticates a user with email and password, returning a JWT access/refresh token pair
for use in subsequent requests. Covers credential-based login only.

Out of scope: OAuth and SSO flows — see `code-documentation/2025-03-01-post-auth-google.md`.

## Contract

### Request

| Field      | Type     | Required | Notes                                 |
| ---------- | -------- | -------- | ------------------------------------- |
| `email`    | `string` | ✓        | Normalized to lowercase before lookup |
| `password` | `string` | ✓        | Min 8 chars — never logged            |

```http
POST /auth/sign-in
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "s3cr3tpassword"
}
```

### Response

**Success — 200 OK:**

| Field           | Type | Expires | Notes               |
| --------------- | ---- | ------- | ------------------- |
| `access_token`  | JWT  | 15 min  | Signed RS256        |
| `refresh_token` | JWT  | 7 days  | Rotated on each use |

### Errors

| Code  | Trigger                      | Body                                        |
| ----- | ---------------------------- | ------------------------------------------- |
| `400` | Missing or malformed fields  | `{ "detail": "..." }`                       |
| `401` | Wrong credentials            | `{ "detail": "No active account found …" }` |
| `429` | Rate limit: 5 req/min per IP | `{ "detail": "Request was throttled." }`    |

> ⚠️ 400 and 401 must have near-identical response times to prevent user enumeration.

## Flow

```
Request
  │
  ▼
urls.py
  └─ path("auth/sign-in") → TokenObtainPairView.as_view()
  │
  ▼
DRF middleware
  ├─ AnonRateThrottle    →  429 if over 5 req/min
  └─ JSONParser          →  400 if body is not valid JSON
  │
  ▼
TokenObtainPairView.post()                        [django-simple-jwt]
  └─ delegate → TokenObtainPairSerializer.validate()
  │
  ▼
TokenObtainPairSerializer.validate()
  ├─ authenticate(email=..., password=...)         [Django built-in]
  │   └─ CustomUserManager.get_by_natural_key()
  │       ├─ SELECT FROM users WHERE email = lower(%s)
  │       └─ check_password(raw, hashed)           [bcrypt]
  ├─ user not found or wrong password             →  AuthenticationFailed (→ 401)
  └─ user.is_active = False                       →  AuthenticationFailed (→ 401)
  │
  ▼
RefreshToken.for_user(user)                       [django-simple-jwt]
  ├─ create and sign token pair (RS256)
  └─ INSERT INTO token_blacklist_outstandingtoken
  │
  ▼
Response 200  →  { access_token, refresh_token }
```

## Design Decisions

### DDN-001 — Email normalized to lowercase before query

**Context:** Django's `authenticate()` is case-sensitive by default.  
**Decision:** Override `CustomUserManager.get_by_natural_key()` to call `.lower()` before querying.  
**Why not `iexact`?** `iexact` bypasses B-tree indexes on PostgreSQL. Normalizing at write-time lets the index work normally.  
**Impact:** If this changes, the registration serializer must also be updated — it normalizes on save.

---

### DDN-002 — Refresh token persisted in DB, not stateless

**Context:** SimpleJWT supports stateless refresh tokens with no DB write.  
**Decision:** Enable `ROTATE_REFRESH_TOKENS = True` and `BLACKLIST_APP`.  
**Why not stateless?** Tokens must be revocable immediately on password change or account compromise. See full rationale in the ADR.  
**Impact:** Every refresh request writes one row to `OutstandingToken`. Revisit if the table exceeds 1M rows.

## Gotchas

- **Timing attack:** Do not add an early-return before the password check without a constant-time guard — response time leaks whether the email exists.
- **Token table bloat:** `OutstandingToken` rows are not deleted automatically. The `flushexpiredtokens` command must run on a cron schedule — see the ops runbook.

## Testing Checklist

- [ ] Valid credentials → 200 with both tokens present
- [ ] Wrong password → 401
- [ ] Non-existent email → 401 with response time comparable to wrong password
- [ ] Inactive user → 401
- [ ] Missing field → 400
- [ ] Sixth request within one minute → 429
- [ ] Refresh token accepted by `POST /auth/refresh`

## Links

- ADR: `adr/2025-01-10-jwt-strategy.md`
- RFC: `rfc/2024-12-01-auth-redesign.md`
- Ticket: PROJ-512
- PR: #134
