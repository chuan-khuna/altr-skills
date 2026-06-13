# Assign / Triage Document Formats

---

## `assign` — Handoff document

Output file: `docs/yyyy-mm-dd-topic.{md,html}`

```
# {Topic}

## Background

{Why this work exists and what triggered it. 2–5 sentences.}

## Current State

{What is in progress, what has been done, and what is NOT yet done. 2–5 sentences.}

## Suggested Assignee

{Who or what kind of person/agent should pick this up. Name the access, tools, or skills required — e.g. "needs physical access to the HDD and flash drive", "requires someone who can run the build pipeline", "suitable for an AFK agent given full file access". If unknown, say so.}

## Tasks

### Task 1: {name}

**Input:** {Concrete artifacts, paths, systems, or states the assignee needs to start — specific, not abstract}
**Output:** {Specific artifact, file, state, or verifiable outcome when done}

**Checklist:**
- [ ] {Specific, verifiable criterion}
- [ ] {Specific, verifiable criterion}

**Out of scope:** {What this task should NOT touch — prevents gold-plating and wrong assumptions}

**Gotchas:**
- {Thing that is easy to get wrong, likely to block, or non-obvious}

### Task 2: {name}

**Input:** {…}
**Output:** {…}

**Checklist:**
- [ ] {…}

**Out of scope:** {…}

**Gotchas:**
- {…}
```

### Rules (assign)

- Background and Current State: 2–5 sentences each
- Input and Output: concrete — paths, formats, states, commands — not abstract descriptions
- Checklist items: specific and verifiable, not "make sure it works"
- Out of scope: required — state at least one thing per task that should NOT be done
- Gotchas: required — at least one per task; surface failure modes, non-obvious constraints, common mistakes
- Suggested Assignee: name access requirements and skills needed, even if "unknown"

---

## `triage` — Battle plan

Output file: `docs/yyyy-mm-dd-topic-triage.{md,html}`

```
# {Topic}

**Assigned:** {time} | **Due:** {deadline} | **Remaining:** {X hours}

## Situation

{What this is, why it's urgent, and what success looks like. 2–3 sentences.}

## What We Have

{What already exists — code, designs, data, partial work. "Nothing yet" is valid.}

## What's Still Missing

{Blockers: information, approvals, or assets not yet in hand. Be specific — vague blockers can't be resolved.}

## Tasks

### Task 1: {name} — ~{estimated time}

**Need to start:** {concrete prerequisite — what must be true or in hand before this task begins}
**Done when:** {specific, verifiable outcome}
**Approach:** {Opinionated tool/framework/method recommendation in 1–2 sentences}

**Steps:**
- [ ] {Concrete step}
- [ ] {Concrete step}

**Gotchas:**
- {Non-obvious thing that will cost time if missed}

### Task 2: {name} — ~{estimated time}

**Need to start:** {…}
**Done when:** {…}
**Approach:** {…}

**Steps:**
- [ ] {…}

**Gotchas:**
- {…}
```

### Rules (triage)

- Remaining time header: always show assigned time, deadline, and hours remaining
- Situation: 2–3 sentences only — orient, don't elaborate
- What We Have / What's Still Missing: concrete, not "TBD" — missing info that can't be named isn't a useful blocker
- Estimated time per task: required — even a rough estimate helps prioritize
- Approach: one opinionated recommendation per task, not a list of options
- Gotchas: required — at least one per task
- Steps: actionable and ordered, not high-level categories
