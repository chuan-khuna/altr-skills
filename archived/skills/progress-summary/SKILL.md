---
name: progress-summary
description: Turn raw notes, git log, or conversation context into a concise "what I did" update shaped for a specific channel — JIRA comment or Discord post. Use when the user says "update the JIRA card", "post to Discord", "summarise what I did", "write a progress update", "log my work", "write a standup note", or asks to share completed work with teammates or a channel.
---

# Progress Summary

Take raw notes, a git log, pasted text, or the current conversation and produce a clear, factual summary of work done — shaped for where it's going.

The audience is your teammates: people who know the project, share the same board, or are in your Discord team channel. They don't need hand-holding, but they do need clarity. Keep it honest and direct.

If the channel isn't stated, ask one short question — *"JIRA or Discord?"* — and stop.

## Input

Accept any of the following:

1. **Pasted notes** — use directly
2. **Git log** — extract the meaningful changes, drop noise commits (merges, version bumps, fixups)
3. **JIRA key** (e.g. `PROJ-123`) — fetch via the Atlassian MCP if available; focus on recent activity and current state
4. **Conversation context** — if work was just done or described in this conversation, reuse it directly

If the source is ambiguous, ask one question and stop.

## What to keep, what to strip

**Keep:** Task names, feature names, PR numbers, JIRA keys, component and service names, tool names. These are the shared vocabulary — stripping them breaks context.

**Strip:** Function names, file paths, variable names, internal struct or config details, commit SHAs. These don't communicate state to teammates; they communicate noise.

**Translate:** Implementation mechanics into one plain sentence of cause-and-effect. Not *"fixed the null dereference in `auth/session.ts:142`"* but *"fixed a crash in the session handler that was dropping users on login."* Keep the impact, drop the address.

Don't over-strip. Teammates can handle technical vocabulary — *race condition, timeout, regression, cache miss, retry* are all fine. The line is between *what happened and why it matters* (keep) and *how it's wired internally* (strip).

## Tone

Peer-level. Direct, factual, no fluff. Active voice. First person where natural (*"I fixed"*, *"we shipped"*). Don't pad with context the team already has.

## Channel shapes

### JIRA comment

A structured update on the ticket. Easy to scan.

```
**Status:** [one-line state — "Done", "In progress", "Blocked on X"]

**What I did:**
- [completed work, with PR/branch ref where relevant]
- ...

**What's next:**
- [immediate next steps]
- ...

**Blockers:** [only if something is actively blocking — one sentence. Omit if none.]
```

Drop any section that doesn't apply. Keep bullets short — the reader is scanning five tickets.

### Discord post

One message. No headers. Brief.

- One sentence TL;DR as the first line
- 2–3 bullets: what shipped, what's next, any blockers
- Inline refs (`PR #123`, `PROJ-456`) — not a link wall
- No greeting, no signoff

Length target: under 60 words.

## Worked example — same work, two channels

**Source:**
> Fixed the auth session bug causing logout loops on mobile. PR up. Also unblocked the registration flow by updating token expiry config. Still need to write tests for the session handler.

### As a JIRA comment

**Status:** In progress

**What I did:**
- Fixed auth session bug causing logout loops on mobile — PR #312 up for review
- Updated token expiry config — unblocked registration flow

**What's next:**
- Write tests for the session handler
- Merge PR #312 once reviewed

---

### As a Discord post

Fixed the auth session bug causing logout loops on mobile — PR #312 up for review. Also unblocked registration by updating token expiry config. Tests for the session handler are next.

---

## Output

Produce the draft as a single block, formatted as the channel would render it. Print-only — the user copies and pastes it. Do not post to JIRA or Discord automatically.

## Rules

- Don't invent facts. If the source is vague, write what you know and mark gaps clearly (*"details TBC"*) rather than filling in with assumptions.
- Don't strip JIRA keys, PR numbers, or feature names — they're the thread that ties the update back to trackable work.
- Don't invent owners. If the source doesn't name one, leave it out or ask.
