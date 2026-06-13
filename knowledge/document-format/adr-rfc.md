# ADR & RFC Document Standard

- **RFC (Request for Comments)** — captures options and trade-offs before a decision is made
- **ADR (Architecture Decision Record)** — records the decision, rationale, and consequences after alignment

Use RFC when discussion is still open. Convert to ADR once decided.

---

## File Naming

```
docs/artifacts/rfc/yyyy-mm-dd-short-kebab-case-title.md
docs/artifacts/adr/yyyy-mm-dd-short-kebab-case-title.md
```

Cross-reference by relative path, not by ID.

---

## RFC

### Frontmatter

```yaml
---
title: "2024-03-15 - Order Notification Channel Selection"
date: 2024-03-15
status: open
expires: 2024-03-29
converted_to: ~
tags: [messaging, order-service]
deciders: [@somchai, @nattaporn, @wanchai]
---
```

### Field Reference

| Field          | Required | Description                                                        |
| -------------- | -------- | ------------------------------------------------------------------ |
| `title`        | ✅       | Format `yyyy-mm-dd - Title`                                        |
| `date`         | ✅       | Date the RFC was opened `YYYY-MM-DD`                               |
| `status`       | ✅       | See Status Values below                                            |
| `expires`      | ✅       | Deadline for discussion. Prevents RFCs from stalling indefinitely. |
| `converted_to` | ✅       | Filename of the resulting ADR. Use `~` if not yet converted.       |
| `tags`         | ✅       | Keywords for filtering                                             |
| `deciders`     | ✅       | Participants in the discussion                                     |

### Status Values

| Value       | Meaning                                     |
| ----------- | ------------------------------------------- |
| `open`      | Under discussion, awaiting decision         |
| `decided`   | Decision reached, pending conversion to ADR |
| `converted` | ADR exists — see `converted_to`             |
| `abandoned` | Will not proceed. Document reason in body.  |

### Body Structure

| Section             | Required | Notes                                      |
| ------------------- | -------- | ------------------------------------------ |
| `## Context`        | ✅       | Problem, Constraints, Assumptions          |
| `## Choices`        | ✅       | All options under consideration            |
| `## Detail`         | ✅       | Pros/Cons/Tradeoff/Concerns per choice     |
| `## Open Questions` | ✅       | Unresolved questions blocking the decision |

---

## ADR

### Frontmatter

```yaml
---
title: "2024-03-15 - Use Transactional Outbox for Order Notifications"
date: 2024-03-15
status: accepted
commit: a3f8c2d
supersedes: ~
superseded_by: ~
rfc: 2024-03-10-order-notification-channel-selection.md
tags: [database, messaging, order-service]
deciders: [@somchai, @nattaporn, @wanchai]
---
```

### Field Reference

| Field           | Required | Description                                                     |
| --------------- | -------- | --------------------------------------------------------------- |
| `title`         | ✅       | Format `yyyy-mm-dd - Title`                                     |
| `date`          | ✅       | Date the decision was made `YYYY-MM-DD`                         |
| `status`        | ✅       | See Status Values below                                         |
| `commit`        | ✅       | Short hash of the commit that merged this ADR                   |
| `supersedes`    | ✅       | Filename of the ADR this replaces. Use `~` if none.             |
| `superseded_by` | ✅       | Filename of the ADR that replaces this one. Use `~` if none.    |
| `rfc`           | ✅       | Filename of the originating RFC. Use `~` if no RFC preceded it. |
| `tags`          | ✅       | Keywords for filtering                                          |
| `deciders`      | ✅       | People who made the decision                                    |

### Status Values

| Value        | Meaning                                                 |
| ------------ | ------------------------------------------------------- |
| `accepted`   | Decision made and in effect                             |
| `deprecated` | Still in use but no longer recommended                  |
| `superseded` | Replaced by another ADR — see `superseded_by`           |
| `rejected`   | Considered but not adopted. Kept to avoid re-proposing. |

### Body Structure

| Section           | Required | Notes                                                 |
| ----------------- | -------- | ----------------------------------------------------- |
| `## Context`      | ✅       | Problem, Constraints, Assumptions                     |
| `## Choices`      | ✅       | All options considered                                |
| `## Decision`     | ✅       | Chosen option and primary reason                      |
| `## Detail`       | ✅       | Pros/Cons/Tradeoff/Concerns per choice                |
| `## Consequences` | ✅       | Fill in after 2–4 weeks in production. Use checklist. |
| `## Links`        | ✅       | Ticket, PR, related ADRs                              |

### Context Sub-sections

- **Problem** — what triggered this decision
- **Constraints** — what cannot be done (infra, time, team)
- **Assumptions** — what is assumed true at decision time; if these change, revisit the ADR

### Detail Sub-sections

Each choice uses the same format:

- **Pros** — benefits of this choice
- **Cons** — drawbacks
- **Tradeoff** — what is gained vs. what is sacrificed
- **Concerns** — risks; write as scenarios where possible

---

## Lifecycle

```
RFC (open) ──→ RFC (decided) ──→ ADR (accepted) ──→ ADR (deprecated) ──→ ADR (superseded)
           ↘                  ↗
            RFC (abandoned)
```

- When superseding: update `superseded_by` in the old ADR and `supersedes` in the new ADR
- When converting RFC to ADR: update `converted_to` in the RFC and `rfc` in the ADR
- Never delete RFC or ADR — keep for history regardless of status

---

## Code Comment Convention

Add a comment at the code location affected by the decision, pointing back to the ADR:

```python
# see: docs/artifacts/adr/2024-03-15-use-transactional-outbox.md
insert_outbox_event(session, "order.confirmed", payload)
```

---

## Full Example

### RFC

```markdown
---
title: "2024-03-10 - Order Notification Channel Selection"
date: 2024-03-10
status: converted
expires: 2024-03-17
converted_to: 2024-03-15-use-transactional-outbox-for-order-notifications.md
tags: [messaging, order-service]
deciders: [@somchai, @nattaporn, @wanchai]
---

# Order Notification Channel Selection

## Context

### Problem

Order service calls email/SMS/push synchronously inside the transaction.
A 30s SMS timeout blocks order confirmation for all users.

### Constraints

- Cannot introduce a new broker (infra team bandwidth)
- Notification must be guaranteed — silent failures unacceptable
- Order confirmation must stay under 500ms

### Assumptions

- Postgres is already primary DB
- Notification service will be made idempotent separately
- Volume stays under 10k events/day for 6 months

## Choices

1. Notification Facade — synchronous, all channels behind one wrapper
2. Message Queue (RabbitMQ) — async, decoupled via broker
3. Transactional Outbox — write intent to DB in same transaction

## Detail

### Choice 1: Notification Facade

**Pros** — minimal change; easy to trace  
**Cons** — order waits for all channels; one timeout blocks everything  
**Tradeoff** — simplicity over resilience  
**Concerns** — no retry; partial failures invisible to caller

### Choice 2: Message Queue (RabbitMQ)

**Pros** — fully decoupled; broker handles retry and dead-letter  
**Cons** — publish/commit gap; new infra; team has no RabbitMQ experience  
**Tradeoff** — best throughput ceiling, sacrifices correctness guarantee  
**Concerns** — gap risk increases under high load or rolling restarts

### Choice 3: Transactional Outbox

**Pros** — atomic with order write; no new broker; order response unaffected  
**Cons** — at-least-once delivery; outbox grows without cleanup job  
**Tradeoff** — implementation complexity in exchange for correctness guarantee  
**Concerns** — idempotency key design is prerequisite; migrate to CDC if volume exceeds ~50k/day

## Open Questions

- [ ] Can the notification service be made idempotent before go-live? (@nattaporn)
- [ ] Is there any plan to adopt a broker in the next 6 months? (@wanchai)
```

### ADR

```markdown
---
title: "2024-03-15 - Use Transactional Outbox for Order Notifications"
date: 2024-03-15
status: accepted
commit: a3f8c2d
supersedes: ~
superseded_by: ~
rfc: 2024-03-10-order-notification-channel-selection.md
tags: [database, messaging, order-service]
deciders: [@somchai, @nattaporn, @wanchai]
---

# Use Transactional Outbox for Order Notifications

## Context

### Problem

Order service calls email/SMS/push synchronously inside the order transaction.
A 30s SMS timeout blocks order confirmation for all users.

### Constraints

- Cannot introduce a new broker (infra team bandwidth)
- Notification must be guaranteed — silent failures unacceptable for shipped/delivered events
- Order confirmation must stay under 500ms

### Assumptions

- Postgres is already primary DB; outbox table is free to add
- Notification service will be made idempotent (tracked separately)
- Volume stays under 10k events/day for 6 months

## Choices

1. Notification Facade — synchronous, all channels behind one wrapper
2. Message Queue (RabbitMQ) — async, decoupled via broker
3. Transactional Outbox — write intent to DB in same transaction

## Decision

**Choice 3 — Transactional Outbox**

A queue alone leaves a gap between `db.commit()` and `queue.publish()`.
The outbox closes that gap without requiring a new broker.

## Detail

### Choice 1: Notification Facade

**Pros** — minimal change; easy to trace  
**Cons** — order waits for all channels; one timeout blocks everything  
**Tradeoff** — simplicity over resilience  
**Concerns** — no retry; partial failures invisible to caller

### Choice 2: Message Queue (RabbitMQ)

**Pros** — fully decoupled; broker handles retry and dead-letter  
**Cons** — publish/commit gap; new infra to operate; team has no RabbitMQ experience  
**Tradeoff** — best throughput ceiling, sacrifices correctness guarantee  
**Concerns** — gap risk increases under high load or rolling restarts

### Choice 3: Transactional Outbox ✓

**Pros** — atomic with order write; no new broker; order response unaffected  
**Cons** — at-least-once delivery; outbox grows without cleanup job  
**Tradeoff** — implementation complexity in exchange for correctness guarantee  
**Concerns** — idempotency key design is prerequisite (PROJ-1289); migrate to CDC if volume exceeds ~50k/day

## Consequences

> Fill after 2–4 weeks in production.

- [ ] Latency improvement vs. baseline
- [ ] Outbox rows stuck or never delivered
- [ ] Idempotency issues encountered
- [ ] Postgres load impact

## Links

- Ticket: PROJ-1234
- PR: #891
- RFC: docs/artifacts/rfc/2024-03-10-order-notification-channel-selection.md
- Cleanup job: PROJ-1290
```
