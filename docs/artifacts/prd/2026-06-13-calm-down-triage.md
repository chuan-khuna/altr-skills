/grill-with-docs

Want to write a skill called calm-down: skills/work/calm-down

- Study examples of well-written skills in .references/mattpocock-skills (e.g. grill me, grill with docs, hand off)
- Study how skills accept a **keyword** `/skill-name <keyword> <prompt>` e.g. `/impeccable critique` in .references/impeccable

## Background

**Use case 1 — Handoff under context-switch pressure**
Engineers who need to context-switch and hand off work often write rushed, incomplete briefs. Teammates end up asking repeated small questions that the original developer doesn't want to keep answering. The skill should help produce a document that is **sufficient** for the assignee to investigate and resolve issues on their own — not exhaustive, just complete enough.

**Use case 2 — Receiving urgent last-minute requests (triage)**
When an engineer receives urgent work, they need help slowing down, organizing the big picture, and producing a high-level step-by-step task breakdown so they can work through it calmly. That breakdown is then handed to an agent for detailed planning and implementation.

This mode applies the **"slow down to speed up"** principle — also known as **triage** (from emergency medicine, adopted in engineering): assess and prioritize the situation before acting. The pattern is: **Stop → Think → Act**. Decompose under pressure before you build under pressure.

Example: given a command at 11:00 that a landing page must be done by 18:00 —
Time is tight, but quality matters regardless of AI or not. Before the user panics, help them organize their thinking:

"landing page — assigned 11:00, due 18:00"

- What already exists?
- What are the major tasks? What information is needed? (design, data, data format)
- What is the landing page about?
- Suggest tools and frameworks briefly
