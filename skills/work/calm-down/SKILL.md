---
name: calm-down
description: Two-mode work structuring skill. "calm-down assign" interviews the user to produce a handoff document a teammate or AI agent can pick up cold. "calm-down triage" helps someone under pressure slow down, decompose an urgent task, and produce a battle plan before acting. Use when the user says "calm-down assign" or "calm-down triage".
---

# calm-down

Two modes, one principle: **Stop → Think → Act**.

---

## Mode 1: `assign` — Handoff document

Help the user turn a rough idea into a structured assignment document a teammate or AI agent can pick up without prior context.

### Invocation

```
calm-down assign <brief>
```

### Flow

#### Step 1 — Propose task breakdown

Read the `<brief>` and immediately propose a task list using `AskUserQuestion` with one option per proposed task plus an "Other / adjust" option. For example:

```
Question: "Based on your brief, I'm guessing these are the tasks — does this look right?"
Options:
  - "Yes, these tasks look right"
  - "Add / remove a task" (Other)
```

If the user selects "Other" or provides corrections, adjust and confirm once more before proceeding.

#### Step 2 — Grill until shared understanding

Ask one question at a time. For each question, provide your recommended answer so the user can confirm, correct, or build on it.

**Grilling order:**

1. **Context and trigger** — cover only what the brief doesn't already make clear:
   - What triggered this work?
   - What has already been done, if anything?
   - Any hard constraints, deadlines, or dependencies the assignee must know?

2. **Per-task specifics** — for each confirmed task:
   - What does the assignee need as *concrete* input to start? (paths, systems, access, prior outputs)
   - What is produced when this task is done? (specific artifact, state, or verifiable outcome)
   - How does the assignee know it's complete? (a command to run, a state to observe, a file to check)
   - What is easy to get wrong or likely to block? (probe this even if the user doesn't volunteer it)

3. **Scope boundary** — before finishing, confirm what is explicitly *out of scope* for each task.

**Probe ambiguous answers.** If the user says something vague ("just rebuild it", "the usual folder"), ask one follow-up that resolves it. Don't move on while there's an unresolved ambiguity that would make the assignee guess.

**Stop when the document would be self-sufficient.** The test: could you hand this to another AI or a teammate who has zero context, and they would know exactly what to do, how to verify it, and what to avoid? When the answer is yes, stop grilling.

Aim for 6–12 questions total. Fewer is better — skip anything the brief already answers clearly.

#### Step 3 — Format and path

Use `AskUserQuestion` to ask:

```
Question: "Which output format?"
Options:
  - "Markdown (.md)" — plain text, easy to read in any editor
  - "HTML" — styled document with task cards and table of contents
```

Generate immediately after the user answers. Save to `docs/yyyy-mm-dd-{topic}.{md,html}` by default.
Tell the user the exact path after saving. If they want a different location, they can say so.

#### Step 4 — Generate

For **md**, write the document using the `assign` section of `references/assign-format.md`.

For **html**, do **not** write the file from scratch. Copy the template and fill it in:

1. Copy `references/html_boilerplate.html` to `docs/yyyy-mm-dd-{topic}.html`.
2. Edit the copy in place:
   - Replace `{Topic}` (in `<title>` and `<h1>`) and `{YYYY-MM-DD}`.
   - Fill the Background and Current State `<p>` placeholders.
   - Replace the single example `<article class="task-card">` with one per task. Give each a unique `id` (`task-1`, `task-2`, …) and keep the `spy-target` class.
   - Mirror every task in the TOC `<ul class="toc-sub">`, with each `href` matching its article `id`.
   - Add `<pre><code class="language-*">` code blocks or `<div class="diagram-wrapper"><pre class="mermaid">` diagrams inside task cards only where needed. Uncomment the mermaid `<script>` block at the bottom only if a diagram is present.
   - For a real gotcha, add a red heads-up callout inside the task card: `<div class="callout warn"><span class="callout-label">Heads up</span><p>…</p></div>`. Use the green `.callout.done` variant only to flag an already-completed state. Blue is the primary colour for all other accents — do not repurpose red/green decoratively.
   - Leave the `<style>` block and the shiki / scroll-spy scripts untouched.

The boilerplate already implements the full design system in `references/DESIGN.md`; `references/DESIGN.md` is the spec and `references/DESIGN.html` is the rendered reference. Do not re-derive the CSS.

Do not preview or ask for approval — generate and save immediately.

### Rules (assign)

- Propose tasks first — do not ask the user to list tasks from scratch
- Ask one question at a time; provide your recommended answer with each question
- Probe ambiguous answers with one follow-up before moving on
- Stop grilling when the document would be self-sufficient for a fresh assignee or AI agent
- Aim for 6–12 questions total; never ask about things the brief already answers
- Generate immediately after grilling; no preview step

---

## Mode 2: `triage` — Battle plan

Help the user slow down when they receive urgent work, decompose it clearly, then act from a position of clarity instead of panic. Applies the **"slow down to speed up"** principle: **Stop → Think → Act**.

### Invocation

```
calm-down triage <brief>
```

`<brief>` should include what the work is and when it's due — e.g. `calm-down triage landing page assigned 11:00 due 18:00`.

### Flow

#### Step 1 — Acknowledge and orient

Open with one sentence that names the task and time remaining:

> You've got {X hours} to {task}. Let's take 5 minutes to think so the next {X-0.5} go faster.

Then immediately propose a task breakdown using `AskUserQuestion`, same as `assign` Step 1.

Wait for confirmation before proceeding.

#### Step 2 — Quick grill (≤ 6 questions)

The user is under pressure — keep this short. Ask one question at a time, provide your recommended answer with each.

Cover in order:
1. What already exists? (code, designs, data, partial work — "nothing yet" is a valid answer)
2. What information or assets are you still missing that you'll need to gather? (this is a blocker list)
3. Is there anyone whose approval or input is required, and when do they need to be involved?
4. Any hard technical constraints? (must use X stack, must match Y system, no access to Z)

Skip any question the brief already answers. Stop as soon as you have enough to write the battle plan — don't fill the quota.

#### Step 3 — Suggest approach

Before generating, briefly suggest tools, frameworks, or method for each task in 1–2 sentences. Make it opinionated — pick one direction, don't list options. Let the user push back.

#### Step 4 — Generate

Use `AskUserQuestion` to ask:

```
Question: "Which output format?"
Options:
  - "Markdown (.md)" — plain text, easy to read in any editor
  - "HTML" — styled document with task cards and table of contents
```

Write the battle plan using the `triage` section of `references/assign-format.md`. Save to `docs/yyyy-mm-dd-{topic}-triage.{md,html}` by default. Tell the user the exact path after saving.

For **html**, follow the same html generation process as `assign` Step 4 — copy the boilerplate, fill in placeholders, use `.callout.warn` for blockers and missing info.

Do not preview or ask for approval — generate and save immediately.

### Rules (triage)

- Always acknowledge urgency and reframe it as "think first, then act fast"
- Propose tasks first — do not ask the user to list tasks from scratch
- Ask one question at a time; provide your recommended answer with each question
- Keep to ≤ 6 questions — the user is under pressure, don't add to it
- Make tool/framework suggestions opinionated — one recommendation, not a menu
- Generate immediately after the approach is agreed; no preview step
