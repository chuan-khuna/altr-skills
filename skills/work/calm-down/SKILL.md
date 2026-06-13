---
name: calm-down
description: Two-mode work structuring skill. "calm-down assign" produces a handoff document a teammate or agent can pick up cold. "calm-down triage" helps someone under pressure decompose urgent work into a battle plan. Use when the user says "calm-down assign" or "calm-down triage".
---

<what-to-do>

Two modes, one principle: **Stop → Think → Act**.

- **`calm-down assign <brief>`** — handoff document a teammate or AI agent can pick up cold. See [ASSIGN.md](references/ASSIGN.md).
- **`calm-down triage <brief>`** — battle plan for urgent work you are about to execute. See [TRIAGE.md](references/TRIAGE.md).

Both modes share this loop:

1. Propose task breakdown immediately using `AskUserQuestion`. Confirm before proceeding.
2. Grill one question at a time. Provide your recommended answer with each. Probe ambiguous answers. Stop when the document would be self-sufficient for a fresh assignee or agent.
3. Ask output format using `AskUserQuestion` — Markdown or HTML.
4. Generate immediately. No preview. Save to `docs/yyyy-mm-dd-{topic}.{ext}` by default. Tell the user the exact path.

</what-to-do>
