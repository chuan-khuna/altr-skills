# Documentation & Writing Skills Comparison

> Comparing all writing/documentation skills across `.agents/skills` (installed) and `.references` (reference collections).

---

## Summary Table

| Skill                  | Source                              | Lines | ~Tokens | Main Focus                      | When to Use                           |
| ---------------------- | ----------------------------------- | ----- | ------- | ------------------------------- | ------------------------------------- |
| `documentation`        | anthropics/knowledge-work-plugins   | 50    | ~400    | Quick technical docs            | "write docs for", "create a README"   |
| `documentation-writer` | github/awesome-copilot              | 46    | ~500    | Diátaxis framework docs         | Structured, theory-driven docs        |
| `doc-coauthoring`      | anthropics/skills                   | 376   | ~4,500  | Collaborative 3-stage workflow  | PRDs, specs, decision docs            |
| `edit-article`         | mattpocock/skills (.references)     | 15    | ~150    | Article editing/restructuring   | Improving existing article drafts     |
| `writing-shape`        | mattpocock/skills (.references)     | 64    | ~800    | Shaping raw material → article  | Notes/fragments → publishable article |
| `writing-beats`        | mattpocock/skills (.references)     | 53    | ~650    | Beat-by-beat narrative assembly | Narrative writing from raw material   |
| `writing-fragments`    | mattpocock/skills (.references)     | 76    | ~900    | Fragment mining / ideation      | Pre-writing / idea development        |
| `to-prd`               | mattpocock/skills (.references)     | 77    | ~900    | Context → PRD synthesis         | Create PRD from existing conversation |

---

## Similarities Across All Skills

- All produce written output as the end goal
- All use Markdown as the working format
- All expect user collaboration at some stage
- All are triggered by writing-adjacent language in the prompt
- Most handle both creation and refinement phases (except `to-prd` and `edit-article`)
- Most emphasise iteration — draft → feedback → refine

## Differences at a Glance

- **Audience**: `documentation` / `documentation-writer` target software users and developers; mattpocock skills target writers and authors
- **Phase**: `writing-fragments` is pure pre-writing; `writing-shape` / `writing-beats` are mid-writing; `edit-article` is post-writing; all others are full-pipeline
- **Interactivity**: `doc-coauthoring` is the most interactive (3 stages + reader testing); `to-prd` is the least (no interview, synthesis only)
- **Length of skill file**: ranges from 15 lines (`edit-article`) to 376 lines (`doc-coauthoring`)
- **Context dependency**: `to-prd` requires prior conversation context; others start fresh
- **Domain**: altr-skills are engineering/technical; mattpocock skills span technical + narrative/editorial

---

# `documentation`

**Source**: `anthropics/knowledge-work-plugins` · `.agents/skills/documentation/SKILL.md`
**Lines**: 50 | **~Tokens**: ~400

## Main Focus

- Write and maintain technical documentation for software projects
- Covers 5 document types: README, API docs, Runbook, Architecture Doc, Onboarding Guide

## Strengths

- Extremely lightweight — fast to load, minimal overhead
- Covers the most commonly needed engineering doc types in one skill
- 5 clear writing principles as guardrails
- Easy to understand and extend mentally

## Purpose

- Act as a template library + principle guide for technical writing
- Kick-start any standard engineering doc without workflow overhead

## When to Use

- Trigger phrases: `"write docs for"`, `"document this"`, `"create a README"`, `"write a runbook"`, `"onboarding guide"`
- When the user needs a well-structured doc fast, without co-authoring ceremony
- When the doc type is known and unambiguous

## Uniqueness

- Only skill that lists **5 specific engineering doc types** as first-class citizens (README, API, Runbook, Architecture, Onboarding)
- No workflow or clarification step — just dive in
- Most "drop-in" friendly for IDE/CLI use cases

## Weaknesses / Limitations

- No clarification step — may produce misaligned output for ambiguous requests
- No framework anchoring (no Diátaxis, no specific methodology)
- No iterative refinement loop
- Does not handle non-technical writing

---

# `documentation-writer`

**Source**: `github/awesome-copilot` · `.agents/skills/documentation-writer/SKILL.md`
**Lines**: 46 | **~Tokens**: ~500

## Main Focus

- Create high-quality software documentation anchored to the **Diátaxis framework**
- 4 document types: Tutorial, How-to Guide, Reference, Explanation

## Strengths

- Framework-driven — every doc has a clear epistemic purpose
- Clarify-first workflow: determines doc type, audience, user goal, and scope before writing
- Propose-outline-then-write approach avoids wasted effort
- Contextual awareness: uses existing docs for tone/style without copying them

## Purpose

- Produce theoretically sound, user-centric documentation
- Enforce the discipline of choosing the _right_ doc type before writing

## When to Use

- When documentation quality matters beyond utility (e.g., open-source projects, public docs)
- When the user isn't sure what _type_ of doc they need
- When writing for a specific audience with specific learning goals
- When existing doc quality standards need to be matched

## Uniqueness

- **Only skill** anchored to the Diátaxis framework (Tutorial / How-to / Reference / Explanation)
- Forces deliberate doc-type selection — prevents mixed-purpose docs
- Explicitly prohibits consulting external sources without instruction
- Strong theoretical foundation compared to all other skills in this set

## Weaknesses / Limitations

- Narrowly scoped to software documentation
- No iterative refinement beyond propose → draft
- Less practical for quick-turnaround docs
- Does not handle narrative or editorial writing

---

# `doc-coauthoring`

**Source**: `anthropics/skills` · `.agents/skills/doc-coauthoring/SKILL.md`
**Lines**: 376 | **~Tokens**: ~4,500

## Main Focus

- Structured **3-stage co-authoring workflow**: Context Gathering → Refinement & Structure → Reader Testing
- Produces any type of document collaboratively: PRD, design doc, decision doc, RFC, proposal

## Strengths

- Most comprehensive workflow of any skill in this set
- Brainstorm-curate-draft loop per section ensures user ownership
- **Reader Testing with fresh Claude instance** — catches blind spots before others read the doc
- Integration-aware: supports Slack, Drive, SharePoint, MCP connectors for context import
- Handles both artifact mode (Claude.ai) and file mode (Claude Code)
- Handles user who provides messy info dumps gracefully
- Quality check: after 3 stale iterations, asks "what can be cut?"

## Purpose

- Guide users through the full lifecycle of document co-creation
- Ensure the final document works for readers who weren't part of the writing process

## When to Use

- When the doc is high-stakes: PRDs, decision docs, RFCs, team proposals
- When the user has context they struggle to articulate
- When you want the final doc to be tested against fresh readers
- When the user wants to learn as they write (understands their own document better)

## Uniqueness

- **Only skill** with a **Reader Testing stage** using sub-agents
- **Only skill** that explicitly tests whether the document works for _cold readers_
- Section-by-section brainstorming (5–20 options) is unique to this skill
- Offers to work freeform if the user declines the structured workflow
- Most explicit about artifact vs. file mode distinctions

## Weaknesses / Limitations

- Very heavyweight at 376 lines / ~4,500 tokens — loads full skill every session
- Overkill for simple README or quick how-to
- 3-stage structure can feel rigid for exploratory writing
- Reader Testing adds latency (multiple sub-agent invocations)

---

# `edit-article`

**Source**: `.references/mattpocock-skills/skills/personal/edit-article/SKILL.md`
**Lines**: 15 | **~Tokens**: ~150

## Main Focus

- Edit and restructure an existing article draft
- Enforce information dependency ordering across sections

## Strengths

- Ultra-lightweight — 15 lines, lowest token cost of any skill here
- DAG metaphor for section ordering is intellectually precise
- 240-character paragraph limit enforces scannable prose
- Confirms section structure with user before rewriting

## Purpose

- Improve an already-drafted article: restructure, clarify, tighten
- Not a first-draft tool — strictly for revision

## When to Use

- User has a rough article draft and wants it improved
- When prose is too long, badly ordered, or unclear
- Trigger: "edit", "revise", "improve this article"

## Uniqueness

- **Only skill** framing information order as a **directed acyclic graph**
- **Shortest skill** in the entire set — extreme minimalism
- The 240-char paragraph cap is a hard, unusual constraint not found elsewhere
- Personal/editorial focus (not software docs)

## Weaknesses / Limitations

- Almost no guidance — relies heavily on the LLM's judgment
- No output format, no template, no principle list
- Won't help generate new content, only edit existing
- Requires the user to already have a draft

---

# `writing-shape`

**Source**: `.references/mattpocock-skills/skills/in-progress/writing-shape/SKILL.md`
**Lines**: 64 | **~Tokens**: ~800

## Main Focus

- Transform a **pile of raw material** (notes, fragments, rough draft, transcript) into a publishable article
- Paragraph-by-paragraph construction with deliberate format decisions

## Strengths

- Opens with 2–3 candidate opening angles — forces the user to commit to a thesis
- Argues format choices _aloud_ with the user (prose vs list, callout vs inline, etc.)
- Treats raw material as a quarry: mines and recombines, doesn't transcribe
- Re-reads the article file before every write to preserve user edits
- Explicit about what belongs in each format (table, callout, quote, code block)

## Purpose

- Bridge the gap between "pile of notes" and "finished article"
- Help users who have thoughts but can't figure out structure or voice

## When to Use

- User has a pile of notes, fragments, or rough draft
- User wants help turning it into something publishable
- Trigger: "shape this", "help me write this up", "I have notes"

## Uniqueness

- **Only skill** that forces selection among **2–3 competing opening angles/theses**
- Explicit format-argument vocabulary (10+ named format decisions)
- Grilling-session inversion: "what is this article arguing?" vs "what are you noticing?"
- Keeps raw material file read-only — clear separation of input and output
- Out-of-scope section is unusually explicit (no platform formatting, no frontmatter unless asked)

## Weaknesses / Limitations

- Requires the user to already have raw material (pile)
- Will not generate content that isn't in the pile
- In-progress skill — may not be fully stable
- Less suited to technical documentation (engineering-flavoured reference is missing)

---

# `writing-beats`

**Source**: `.references/mattpocock-skills/skills/in-progress/writing-beats/SKILL.md`
**Lines**: 53 | **~Tokens**: ~650

## Main Focus

- Assemble an article **beat by beat**, choose-your-own-adventure style
- Narrative-first: each beat does one thing, then stops

## Strengths

- Highly interactive and exploratory — user steers direction at every step
- Sized-by-need beats: one sentence to several paragraphs, whatever the move requires
- Never writes ahead — strict incremental discipline
- Accepts user mid-session edits to previous beats and adapts trajectory

## Purpose

- Produce narrative writing from raw material
- Suited for storytelling, personal essays, anecdote-driven technical posts

## When to Use

- User wants to assemble raw material as a **narrative** rather than an argument
- When flow and journey matter more than logical structure
- Trigger: "write this as a story", "beat by beat", narrative framing

## Uniqueness

- **Only skill** with a choose-your-own-adventure beat selection mechanic
- Explicitly distinguishes **narrative** from **argument** (refers user to `writing-shape` for argument)
- Previews "a little way down the path" for each candidate beat — unique affordance
- Beat-sizing rule: if it needs 5+ paragraphs, it's two beats glued together — split it

## Weaknesses / Limitations

- Requires raw material file like `writing-shape`
- In-progress — not production-ready
- Slower to produce full articles (one beat at a time)
- Not suited for technical docs or structured reference material

---

# `writing-fragments`

**Source**: `.references/mattpocock-skills/skills/in-progress/writing-fragments/SKILL.md`
**Lines**: 76 | **~Tokens**: ~900

## Main Focus

- **Pre-writing ideation**: mine the user for fragments through relentless grilling
- Produces a raw material file (not an article) — fuel for `writing-shape` or `writing-beats`

## Strengths

- Zero structure imposed — pure ideation mode
- Captures fragments from the very first user message
- Explicit fragment taxonomy: claims, vignettes, sharp sentences, half-thoughts, quotes, lists, complaints
- Appends silently without interrupting conversation
- Re-reads file before every write to preserve user edits

## Purpose

- Help users develop ideas before imposing structure
- Feed the pile used by `writing-shape` and `writing-beats`

## When to Use

- User wants to brainstorm / develop ideas before writing
- Trigger: "fragments", "ideate", "raw material", "I want to write about X but don't know where to start"
- Best used _before_ `writing-shape` or `writing-beats`

## Uniqueness

- **Only purely pre-writing skill** — explicitly out of scope to impose structure
- Novelist's diary model: "years of unstructured noticings that later get mined"
- Grilling style without a framework or phase structure
- Works as the **first step** in a 3-skill pipeline: `writing-fragments` → `writing-shape` → `edit-article`

## Weaknesses / Limitations

- Produces raw material, not a finished document — must be followed by another skill
- In-progress — not production-ready
- No output format beyond horizontal-rule separated fragments
- Not useful when the user already knows what they want to write

---

# `to-prd`

**Source**: `.references/mattpocock-skills/skills/engineering/to-prd/SKILL.md`
**Lines**: 77 | **~Tokens**: ~900

## Main Focus

- Synthesise the **current conversation context and codebase** into a PRD
- Publishes to the project's issue tracker with a `ready-for-agent` label

## Strengths

- No-interview approach — fast, zero additional Q&A overhead
- Uses domain glossary and ADRs from the codebase
- Identifies deep modules (testable, encapsulated interfaces) explicitly
- Structured PRD template: Problem Statement, Solution, User Stories, Implementation Decisions, Testing Decisions, Out of Scope, Further Notes
- User stories expected to be "extremely extensive"

## Purpose

- Convert an existing conversation (design session, discussion) into a formal PRD artifact
- Bridge the gap between informal discussion and traceable project artifact

## When to Use

- After a design or planning conversation — not as a first-draft tool
- When user says "create a PRD from this", "write up what we discussed"
- Requires prior context: codebase setup, triage labels, issue tracker config (via `setup-matt-pocock-skills`)

## Uniqueness

- **Only skill** that explicitly says **"do NOT interview the user"**
- Only skill requiring setup prerequisites (`/setup-matt-pocock-skills`)
- Only skill that publishes to an external issue tracker
- Module identification (deep vs shallow) is unique engineering heuristic
- Distinguishes prototype snippets as valid implementation decision evidence

## Weaknesses / Limitations

- Depends on prior setup and conversation context — not a standalone skill
- Engineering-only — no editorial or narrative use case
- Template is quite prescriptive — less flexible for non-standard PRD formats
- Requires integration with an issue tracker (GitHub/GitLab/local)

---

## Cross-Cutting Observations

### By Pipeline Stage

```
[Ideation]        writing-fragments
[Shaping]         writing-shape, writing-beats
[Editing]         edit-article
[Full pipeline]   documentation, documentation-writer, doc-coauthoring, to-prd
```

### By Audience Type

| Audience                        | Skills                                                                |
| ------------------------------- | --------------------------------------------------------------------- |
| Software developers / engineers | `documentation`, `documentation-writer`, `doc-coauthoring`, `to-prd`  |
| Writers / authors / editors     | `edit-article`, `writing-shape`, `writing-beats`, `writing-fragments` |
| Product / team stakeholders     | `doc-coauthoring`, `to-prd`                                           |

### By Interactivity Level

| Level                         | Skills                                                                   |
| ----------------------------- | ------------------------------------------------------------------------ |
| High (multi-turn, structured) | `doc-coauthoring`, `writing-shape`, `writing-beats`, `writing-fragments` |
| Medium (clarify then write)   | `documentation-writer`, `edit-article`                                   |
| Low (generate and done)       | `documentation`, `to-prd`                                                |

### By Token Cost

| Tier                     | Skills                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| Very low (<500 tokens)   | `edit-article` (~150), `documentation` (~400), `documentation-writer` (~500)                |
| Medium (500–1000 tokens) | `writing-beats` (~650), `writing-shape` (~800), `writing-fragments` (~900), `to-prd` (~900) |
| Very high (>1000 tokens) | `doc-coauthoring` (~4,500)                                                                  |

### Skill Combinations That Work Well

- **`writing-fragments` → `writing-shape`**: Full pre-writing + shaping pipeline for articles
- **`writing-fragments` → `writing-beats`**: Pre-writing + narrative assembly
- **`writing-shape` → `edit-article`**: Draft an article then tighten prose
- **`doc-coauthoring`** is self-contained and replaces a combination
- **`to-prd`** follows any design conversation; pairs with `doc-coauthoring` for high-stakes PRDs
