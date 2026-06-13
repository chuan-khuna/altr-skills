---
name: calm-down
description: Interview the user to produce a structured work-assignment document — background, current state, and per-task breakdown with input/output/checklist. Use when the user says "calm-down assign", wants to hand off work, delegate a task, or needs to write an assignment document for a teammate.
---

# calm-down

Help the user turn a rough idea into a structured assignment document a teammate can pick up without prior context.

## Invocation

```
calm-down assign <brief>
```

`<brief>` is the task description — e.g. `calm-down assign copy video files and rebuild the app`.

## Flow

### Step 1 — Propose task breakdown

Read the `<brief>` and immediately propose a task list:

> Based on your brief, I'm guessing there are N tasks:
> 1. {Task name}
> 2. {Task name}
> 3. {Task name}
>
> Does that look right? Anything to add or change?

Wait for confirmation before proceeding.

### Step 2 — Phase 1: Overview interview (≤ 10 questions total across both phases)

Ask one question at a time. Cover only what the brief doesn't already make clear:

- What triggered this work?
- What has already been done, if anything?
- Any constraints, deadlines, or dependencies the assignee must know?

Skip questions that are already obvious from the brief.

### Step 3 — Phase 2: Per-task interview (≤ 4 questions per task)

For each confirmed task, ask one at a time:

1. What does the assignee need as input to start?
2. What is produced when this task is done?
3. How does the assignee know it's complete?
4. Any gotchas or things that are easy to get wrong? *(ask only if needed)*

Keep total question count across Phase 1 and Phase 2 within 10.

### Step 4 — Format and path

Ask:

> Should I output this as **md** or **html**?

Then generate immediately. Save to `docs/yyyy-mm-dd-{topic}.{md,html}` by default.
Tell the user the exact path after saving. If they want a different location, they can say so.

### Step 5 — Generate

Write the document using the format in `references/assign-format.md`. Do not preview or ask for approval — generate and save immediately.

## Rules

- Propose tasks first — do not ask the user to list tasks from scratch
- Ask one question at a time
- Total questions (Phase 1 + Phase 2 combined) must not exceed 10
- Do not ask about things the brief already answers
- Generate immediately after Phase 2; no preview step
