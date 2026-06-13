# Bug Report Standard

Captures root cause and reasoning alongside the code — not process tracking.
Use Jira/Linear for assignee, status, and priority.

---

## File Naming

```
docs/artifacts/bug-report/yyyy-mm-dd-short-kebab-case-title.md
```

---

## Frontmatter

```yaml
---
title: "2024-03-15 - Short description of the bug"
commit_fixed: d4e82cf
related_adr: ~
---
```

### Field Reference

| Field          | Required | Description                                                            |
| -------------- | -------- | ---------------------------------------------------------------------- |
| `title`        | ✅       | Format `yyyy-mm-dd - description`                                      |
| `commit_fixed` | ✅       | Short hash of the commit that fixed the bug. Use `~` if not yet fixed. |
| `related_adr`  | ✅       | ADR ID if the fix led to a design change. Use `~` if none.             |

---

## Body Structure

| Section                   | Required | Notes                                                                        |
| ------------------------- | -------- | ---------------------------------------------------------------------------- |
| `## Symptom`              | ✅       | Observable behavior from the outside                                         |
| `## Root Cause`           | ✅       | Actual cause with code snippet and the commit that introduced it             |
| `## Why It Wasn't Caught` | ✅       | Why tests or review missed it — most important section for future prevention |
| `## Fix`                  | ✅       | How it was fixed with code after the change                                  |
| `## Prevention`           | ✅       | Checklist of follow-up actions to prevent the same class of bug              |

---

## Full Example

````markdown
---
title: "2024-03-15 - Order confirmation sent before payment verified"
commit_fixed: d4e82cf
related_adr: ~
---

# Order Confirmation Sent Before Payment Verified

## Symptom

User receives a confirmation email while payment is still pending.
Occurs only when the payment gateway response exceeds 3s.

## Root Cause

`confirm_order()` and `verify_payment()` run async without a lock.
Race condition occurs when confirm completes before verify.

```python
# commit 3f9a1bc — bug introduced here
async def process_order(order_id):
    await confirm_order(order_id)    # sends email immediately
    await verify_payment(order_id)   # verifies after
```
````

## Why It Wasn't Caught

- Unit tests mock the payment service to return instantly with no delay
- Staging uses a simulated payment gateway faster than production

## Fix

Block confirm until payment is verified.

```python
# commit d4e82cf
async def process_order(order_id):
    await verify_payment(order_id)
    await confirm_order(order_id)
```

## Prevention

- [ ] Add integration test simulating payment delay > 3s
- [ ] Adjust staging config to closer match production latency

```

```
