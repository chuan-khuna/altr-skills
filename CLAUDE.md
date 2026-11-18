# altr-skills conventions

## Structure

Skills live under `skills/<group>/`, where each group represents a purpose (e.g. `productivity/`, `engineering/`). Each group folder has a `README.md` that briefly describes the group and lists its skills.

Every group must appear in the top-level `README.md` with a short description. Skills within a group README must each have an entry linking to their `SKILL.md`.

Use markdown bullets for both groups and skills — not tables:

```
- [name](path/) — description
```

Each skill must also have an entry in `.claude-plugin/plugin.json`.

## Agent skills

### Issue tracker

Issues and specs live as local markdown files under `.scratch/<feature-slug>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Project docs

### Documents

Documents about this project, including how it is implemented, live in `docs/documents/<slug>.md` (or `.html`). `docs/documents/INDEX.md` is the entry point: it lists every document as one bullet, `- Title — one-line summary`.

- Read the index before working on an area, and open the documents relevant to it.
- When you add, rename or remove a document, update `INDEX.md` in the same change.
- Keep documents in step with the code they describe: if a change makes a document wrong, fix the document in the same change.

### HTML documents

When a document is generated as HTML:

- Shared assets: CSS and JS used across HTML documents live in `docs/shared/` (e.g. `docs/shared/globals.css`). Link them with relative paths instead of inlining or duplicating them per page; add new shared code there.

- Theme: choose from a dropdown with "Auto (system)" first, then options grouped by Light and Dark. Light: Rosé Pine Dawn, Catppuccin Latte, Everforest Light, Kanagawa Lotus. Dark: Rosé Pine Moon, Catppuccin Macchiato, Everforest Dark, Kanagawa Wave. Auto follows the system setting with Rosé Pine.
- Code blocks: highlight with Shiki, using the Shiki theme that matches the selected page theme.
- Diagrams: write them in Mermaid and render with Pele (pele.run/api). Make them expandable, zoomable and pannable, with expand, close and zoom icon controls.
- Styling: small border radius (about 3–6px), and thin scrollbars styled to match the theme.
- Include a table of contents.
- Highlights: for a truly important passage, wrap it in `<mark>`; `doc.js` draws it with [marker-highlight](https://solarise.dev/libs/marker-highlight/) in the theme colour (default gold; `mark-love`, `mark-iris`, `mark-foam` for others). Use it rarely — at most one or two per document — and **ask the user before adding any highlight**, naming the exact passage.
- Colour: write every colour in `oklch()` (derive with
  `color-mix(in oklch, …)`); no hex, `rgb()` or `hsl()`.
- Thai body text: use a looped Thai font (e.g. Noto Sans Thai Looped).

### Skill documents

Every skill in `skills/` has a technical document at `docs/documents/skills/<skill-name>.html`. `docs/documents/skills/INDEX.html` is the index page: one card per skill, grouped like `skills/<group>/`, linking to each document.

- When you add, rename, remove or change a skill, add or update its document and its card in `INDEX.html` (and the bullet in `docs/documents/INDEX.md`) in the same change.
- Copy the structure of an existing skill document (e.g. `calm-down.html`): same `<head>`, top bar, header, auto table of contents, and no page-level `<style>` or `<script>` — use `docs/shared/globals.css` and `docs/shared/doc.js`.
- Sections, in order: What it does · When to use it (situation → skill table, pointing to neighbouring skills) · Prerequisites (only if needed) · How it works (one Mermaid diagram, then numbered steps) · What it writes · Common questions · It’s working if · Where it fits (skill chain and a link to the source `SKILL.md`).
- Describe only what the skill's files say. Do not invent features, flags or paths.
- Jargon: definitions live in `docs/shared/glossary-data.js` (one entry per term: `id`, `term`, `group`, `match`, `short`, optional `more`). `doc.js` links the first use of each term on a page to a definition pop-up, and `docs/documents/glossary.html` lists every entry. When a document uses a new term a reader may not know, add an entry; don't write definitions inline. To link a specific spot by hand, use `<a class="term" data-term="<id>">`.
- Style reference: [aihero.dev — grill-with-docs](https://www.aihero.dev/skills-grill-with-docs). Direct, second person, candid, examples in the prose.
- Language: ASD-STE100 Simplified Technical English at about 50%, with natural wording. Use short sentences (up to about 20 words for instructions, 25 for descriptions), one instruction per sentence, active voice, present tense, common verbs, and one term for one meaning. Keep a human voice; don't make it robotic.

### Records

Discussion records live at `docs/records/yyyy-mm-dd-<slug>.md`, dated the day the discussion took place. Each record captures one discussion: what was discussed, what was decided, and any open questions.

## References

Consult these when creating or improving skills:

- https://skills.md/docs — skills documentation.
- `.references/The-Complete-Guide-to-Building-Skill-for-Claude.pdf` — authoritative guide covering skill structure, `SKILL.md` authoring, triggers, prompts, and best practices. Local skill-building resources are stored in `.references/`.
