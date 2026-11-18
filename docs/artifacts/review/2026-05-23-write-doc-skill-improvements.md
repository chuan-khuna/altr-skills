# write-doc Skill — Improvements & Critique

## What changed

Updates made to `skills/productivity/write-doc/SKILL.md` in this session:

### 1. Worked example replaced (Django REST + JWT)
Old example used NestJS/Passport token validation. Replaced with a Django REST + SimpleJWT sign-in flow covering:
- Sequence diagram: Browser → DRF → DB → token generation → protected request
- Request/response shapes (JSON, success + failure)
- Key files: `urls.py`, `views.py`, `serializers.py`, `settings.py`
- Caveats: stateless logout, refresh token rotation, custom claims

### 2. Output structure: rigid template → prose + mandatory/conditional
Old: code block template (`## Overview`, `## How It Works`, etc.) with "Drop any section that doesn't apply."

New: each section described with its purpose and marked **mandatory** or **conditional** — pattern from 9arm-skills `post-mortem`. Added `Request / Response` as a named conditional section for API docs. LLM now gets *why* a section exists, not just its name.

### 3. File naming unified
Old: two inconsistent schemes (`yyyy-mm-dd-topic.md` for conversation docs, `how-<feature>-works.md` for feature docs).

New: single convention matching `CLAUDE.md`:
```
docs/artifacts/<category>/yyyy-mm-dd-topic.md
```
Categories spelled out with full names: `prd` (Product Requirements Document), `adr` (Architecture Decision Record), `issues`, plus domain-specific (`auth`, `api`, `architecture`).

### 4. Obsidian delegated to obsidian-markdown skill
Removed the "Markdown flavour" section that duplicated Obsidian-specific rules. Now a single line: hand off to `obsidian-markdown` skill when a vault is detected.

---

## Critique findings

Compared against: 9arm-skills (`post-mortem`, `management-talk`, `debug-mantra`), mattpocock-skills (`write-a-skill`, `handoff`, `zoom-out`, `grill-with-docs`), and `.agents/skills` (`documentation`, `documentation-writer`, `doc-coauthoring`).

### Key issues

| Priority | Issue |
|---|---|
| 🔴 High | 248 lines — `write-a-skill` guide targets <100; worked example alone is ~80 lines |
| 🔴 High | Duplicate rules: "synthesise don't transcribe" ×2, diagram guidance ×2, one-revision rule ×2 |
| 🔴 High | Description too broad — overlaps with `documentation`, `doc-coauthoring`, `post-mortem` |
| 🟡 Medium | Mode 1 (conversation to doc) overlaps heavily with `doc-coauthoring` |
| 🟡 Medium | No doc type taxonomy (README, runbook, API doc, architecture) — `documentation` has this |
| 🟡 Medium | Mode 2 never asks about audience — `documentation-writer` does |
| 🟢 Low | No "minimum inputs" gate for Mode 2 — `post-mortem` refuses to draft without verified facts |

### write-doc's unique value
**Mode 2 (codebase exploration)** — none of the other doc skills do this. That's the identity worth protecting.

### Recommended next steps

1. **Split into files** — `SKILL.md` (~100 lines), `EXAMPLES.md` (worked example), optionally `REFERENCE.md` (doc types)
2. **Narrow description** to lead with Mode 2: *"Explore a codebase feature and write technical documentation…"*
3. **Clarify Mode 1** — either drop it (defer to `doc-coauthoring`) or explicitly scope it as "quick synthesis, no interactive workflow"
4. **Merge duplicate sections** — one diagram policy block, one revision policy block
