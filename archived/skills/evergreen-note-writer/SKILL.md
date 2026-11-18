---
name: evergreen-note-writer
description: Synthesise one or more sources into evergreen note content and save to files. Use when the user asks to write, draft, or create evergreen notes from references, reading material, files, or pasted content.
---

# Evergreen Note Writer Skill

Help the user turn source material into well-formed evergreen notes — atomic, concept-focused notes where the title carries meaning on its own.

## What is an Evergreen Note?

An evergreen note captures **one idea** — a concept, claim, definition, or insight — in a form that can be refined over time and linked to other notes. Key properties:

- **Atomic** — one idea per note, not a summary of a whole source
- **Concept-first title** — the title is an assertion ("X causes Y"), a question ("What is X?"), or a scoped definition ("X is Y in the context of Z")
- **Interlinked** — connected to related ideas via links
- **Standalone** — readable without its source material

## Workflow

### Step 1 — Read all sources

Read every source the user provides: files, pasted content, web pages, MCP data, or references. Understand the material before proposing anything.

### Step 2 — Ask about granularity

Before generating content, ask the user:

> How many notes do you want, and at what level of granularity — one note per distinct idea, one per subtopic, or something else?

Default recommendation: one note per distinct claim or insight.

### Step 3 — Generate proposed note content

For each proposed note, generate:

- A **title** that is an assertion, question, or definition (not a vague label)
- A **body** that is concise, atomic, and written in the user's own words — synthesised from the sources, not copied
- Any **links** to related concepts (if you can infer them from context)
- **Frontmatter** if appropriate — ask the user or infer from the project context; do not assume a fixed schema

Present all proposed notes for the user to review before saving anything.

### Step 4 — Review and refine

Show proposed content. Invite the user to:

- Adjust the title or scope
- Merge or split notes
- Add or remove links

### Step 5 — Ask where to save

For each note the user approves, ask:

> Where should I save this note — what path and filename?

Do not assume any directory structure. Use whatever the user specifies.

### Step 6 — Create files

Create each file only after the user has confirmed the save location. Never overwrite an existing file without explicit permission.

## Content Guidelines

- **One idea per note** — if the body is covering two distinct claims, split into two notes
- **Titles carry meaning** — avoid generic titles like "Notes on X" or "Summary of Y"
- **Synthesise, don't copy** — rephrase ideas in clear, direct language; avoid reproducing source text verbatim
- **Link related concepts** — use whatever link format the project uses (e.g. `[[wikilinks]]` in Obsidian vaults)
- **Ask when uncertain** — if the scope, granularity, or save location is unclear, ask rather than assume

## Notes

- Do not assume any specific frontmatter schema, directory structure, or language convention unless the user specifies or the project context makes it clear.
- Always confirm with the user before creating or editing any file.
- If the user provides many sources, summarise what you found across all of them before proposing notes — do not process sources one at a time in isolation.
