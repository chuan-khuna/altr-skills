# Triage — Battle plan format

Output file: `docs/yyyy-mm-dd-topic-triage.{md,html}`

<triage-template>
# {Topic}

**Started:** {time} | **Due:** {deadline} | **Remaining:** {X hours}

## Situation

{What this is, why it's urgent, and what success looks like. 2–3 sentences.}

## What We Have

{What already exists — code, designs, data, partial work. "Nothing yet" is valid.}

## What's Still Missing

{Blockers: information, approvals, or assets not yet in hand. Be specific — vague blockers can't be resolved.}

## The Triage Call

What survives the deadline and what does not. This is the decision that turns panic into a plan.

- **P0 — must ship:** {tasks that define success; if these slip, the whole thing fails}
- **P1 — should ship:** {real value, but droppable if time runs out without failing}
- **Cut this run:** {explicitly NOT doing — name each one so it stops occupying your head}

## Tasks

### Task 1: {name} — {P0/P1} — ~{estimated time}

**Need to start:** {concrete prerequisite — what must be true or in hand before this task begins}
**Done when:** {specific, verifiable outcome}
**Approach:** {Opinionated tool/framework/method recommendation in 1–2 sentences}

**Steps:**
- [ ] {Concrete step}
- [ ] {Concrete step}

**Gotchas:**
- {Non-obvious thing that will cost time if missed}

### Task 2: {name} — {P0/P1} — ~{estimated time}

**Need to start:** {…}
**Done when:** {…}
**Approach:** {…}

**Steps:**
- [ ] {…}

**Gotchas:**
- {…}
</triage-template>

## Rules

- Remaining time header: always show started time, deadline, and hours remaining
- Situation: 2–3 sentences only — orient, don't elaborate
- What We Have / What's Still Missing: concrete, not "TBD" — missing info that can't be named isn't a useful blocker
- The Triage Call: required — every task lands in P0, P1, or Cut; if everything is P0, the triage hasn't happened yet
- Cut this run: name at least one thing being dropped — the cut list is the calming move, it gives permission to stop carrying scope
- Tasks: list P0 first, then P1; do not write task cards for anything in the Cut list
- Estimated time per task: required — even a rough estimate helps prioritize
- Approach: one opinionated recommendation per task, not a list of options
- Gotchas: required — at least one per task
- Steps: actionable and ordered, not high-level categories
