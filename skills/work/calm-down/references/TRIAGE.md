# Triage mode

Someone is under pressure with urgent work and a sense that there's too much to do. Your job is to get them to **stop**, **think**, then **act** from clarity instead of panic.

This is a grilling session in the spirit of grill-me and grill-with-docs — relentless enough to reach shared understanding — but shorter, and pointed at one outcome: replacing unsorted scope with a prioritized battle plan. The engineering principle of **triage** drives it: decide what gets treated now, what waits, and what you walk away from.

## Stop — interrupt the panic

Open by naming the task and the time remaining, and reframe the pause as a speed-up, not a delay:

> You've got {X hours} to {task}. Five minutes thinking now buys back the next {X−0.5}. Let's triage.

Then propose the task breakdown using `AskUserQuestion` and confirm it before going further.

## Think — grill, then make the triage call

Grill one question at a time, the way grill-me does: each question carries your recommended answer, and you probe a vague answer instead of accepting it. But the user is under pressure — keep it tight (≤ 6 questions) and stop the moment the plan is clear. Don't fill the quota.

Resolve, in order, skipping anything the brief already answers:

1. What already exists? (code, designs, data, partial work — "nothing yet" is valid)
2. What's still missing that you must gather or unblock?
3. Whose approval or input is needed, and when?
4. Any hard constraint? (stack, compatibility, access)

Then make the **triage call** — sort every task into:

- **P0 — must ship** for this to count as a success
- **P1 — should ship** if time allows, droppable without failing
- **Cut this run** — explicitly not doing it now

Challenge over-scoping directly. If everything is P0, push back: *"If you only had half the time, which one would you keep?"* Most panic is just unsorted scope — naming the cut list is what calms it, because it gives the user permission to stop carrying things.

## Act — hand them the plan

Suggest an opinionated approach (tool, framework, or method, 1–2 sentences) for each P0 and P1 task — one direction, not a menu. Let the user push back.

Then generate immediately using the `<triage-template>` in [triage-format.md](triage-format.md). Save to `docs/yyyy-mm-dd-{topic}-triage.{md,html}`. No preview.

For **html**, follow the same boilerplate process as [ASSIGN.md](ASSIGN.md) — copy `html_boilerplate.html`, fill the placeholders, and use `.callout.warn` for blockers, missing info, and the cut list.
