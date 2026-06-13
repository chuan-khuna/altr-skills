# Code Documentation Standard

Code documentation captures how a unit of code works — its inputs, outputs, internal flow, and the reasoning behind non-obvious decisions. It is written for developers who need to understand, debug, or modify the code.

Use code documentation when a unit has non-trivial flow, design decisions that are not obvious from reading the code, or behavior that is likely to cause bugs if misunderstood.

---

## File Naming

```
docs/artifacts/code-documentation/yyyy-mm-dd-short-kebab-case-title.md
```

Cross-reference by relative path, not by ID.

---

## Frontmatter

```yaml
---
title: "yyyy-mm-dd - Short Human-Readable Title"
date: yyyy-mm-dd
status: current
superseded_by: ~
adr: ~
type: endpoint
layer: auth
file: "apps/module/file.py"
entry_point: "ClassName or function_name"
related_files:
  - "apps/module/serializers.py"
  - "apps/module/urls.py"
tags: [tag-one, tag-two]
authors: [@username]
---
```

### Field Reference

| Field           | Required | Description                                                          |
| --------------- | -------- | -------------------------------------------------------------------- |
| `title`         | ✅       | Format `yyyy-mm-dd - Title`                                          |
| `date`          | ✅       | Date the document was created `YYYY-MM-DD`                           |
| `status`        | ✅       | See Status Values below                                              |
| `superseded_by` | ✅       | Filename of the doc that replaces this one. Use `~` if none.         |
| `adr`           | ✅       | Filename of the ADR that drove this unit's design. Use `~` if none.  |
| `type`          | ✅       | `endpoint` \| `module` \| `service` \| `class` \| `background-job`   |
| `layer`         | ✅       | Domain this unit belongs to — e.g. `auth`, `payment`, `notification` |
| `file`          | ✅       | Primary file path relative to project root                           |
| `entry_point`   | ✅       | Class or function name that is the entry point                       |
| `related_files` | ✅       | Other files involved in this unit's logic                            |
| `tags`          | ✅       | Keywords for filtering                                               |
| `authors`       | ✅       | People who wrote this document                                       |

### Status Values

| Value        | Meaning                                              |
| ------------ | ---------------------------------------------------- |
| `current`    | In use and the document reflects the code            |
| `draft`      | Being written — code or document is not yet complete |
| `deprecated` | Unit still exists but is being phased out            |
| `superseded` | Replaced by another document — see `superseded_by`   |

---

## Body Structure

| Section                | Required | Notes                                                              |
| ---------------------- | -------- | ------------------------------------------------------------------ |
| `## Overview`          | ✅       | What this unit does, why it exists, and what it does NOT cover     |
| `## Contract`          | ✅       | Inputs and outputs — shape, types, constraints, errors             |
| `## Flow`              | ✅       | Step-by-step: which code runs, in what order, where errors branch  |
| `## Design Decisions`  | ✅       | Non-obvious decisions and their rationale. Omit section if none.   |
| `## Gotchas`           | ✅       | Correct but non-obvious behavior likely to cause bugs when editing |
| `## Testing Checklist` | ✅       | Cases that must be covered any time this unit is modified          |
| `## Links`             | ✅       | ADR, RFC, tickets, PRs                                             |

### Overview

Write 2–4 sentences: what the unit does, why it exists, and what it explicitly does not cover. A reader should be able to decide in 5 seconds whether this is the document they need.

### Contract

Adapt sub-sections to the unit type. Use the HTTP pattern for endpoints. For other types:

- **Function** — Parameters / Return / Raises
- **Background job** — Trigger / Side Effects / Failure Behavior
- **Event consumer** — Event Schema / Guarantees / Dead-letter Handling

### Flow

Use an ASCII tree to show which file or component runs at each step, what it passes along, and where the error path branches. Annotate third-party components with square brackets.

```
Request
  │
  ▼
[Step 1: component / file.py]
  └─ brief description
  │
  ▼
[Step 2: component / file.py]
  ├─ happy path      →  what happens
  └─ error case      →  what is returned
  │
  ▼
Response
```

### Design Decisions

Each decision uses the DDN (Design Decision Note) format. Number sequentially within the document. If a decision was large enough to require team alignment, create an ADR and link it here instead of writing a DDN.

```
### DDN-001 — Decision Name

**Context:** Why a decision was needed here.
**Decision:** What was chosen.
**Why not X?** Why the obvious alternative was rejected.
**Impact:** What a future developer must know before changing this.
```

### Gotchas

A gotcha is behavior that is correct but non-obvious, and likely to cause a bug when someone edits the unit without knowing about it. Do not list things that are already clear from the code or covered by a DDN.

### Testing Checklist

List the cases that must pass any time this unit is modified. Write each item as a condition and its expected result.

---

## Lifecycle

```
current ──→ deprecated ──→ superseded
```

- When superseding: update `superseded_by` in the old document and create the new one
- Never delete a document — keep it regardless of status

---

## Code Comment Convention

At the entry point of a documented unit, add a comment pointing to the document:

```python
# see: docs/artifacts/code-documentation/2025-01-15-post-auth-sign-in.md
class TokenObtainPairView(BaseTokenObtainPairView):
```

---

## Full Example

See `doc-signin-example.md`.
