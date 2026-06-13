# Assign — Handoff document format

Output file: `docs/yyyy-mm-dd-topic.{md,html}`

<assign-template>
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
</assign-template>

## Rules

- Background and Current State: 2–5 sentences each
- Input and Output: concrete — paths, formats, states, commands — not abstract descriptions
- Checklist items: specific and verifiable, not "make sure it works"
- Out of scope: required — state at least one thing per task that should NOT be done
- Gotchas: required — at least one per task; surface failure modes, non-obvious constraints, common mistakes
- Suggested Assignee: name access requirements and skills needed, even if "unknown"
