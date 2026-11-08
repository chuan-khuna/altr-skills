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

- Theme: Rosé Pine Moon (dark) and Dawn (light) only, with an icon theme switcher: Auto (monitor), Moon (moon), Dawn (sun). Each name is the icon's tooltip and aria-label.
- Code blocks: highlight with Shiki; one code-theme icon button cycles Rosé Pine, Catppuccin and Everforest.
- Diagrams: write them in Mermaid and render with Pele (pele.run/api). Make them expandable, zoomable and pannable, with expand, close and zoom icon controls.
- Styling: small border radius (about 3–6px), and thin scrollbars styled to match the theme.
- Include a table of contents.
- Colour: write every colour in `oklch()` (derive with
  `color-mix(in oklch, …)`); no hex, `rgb()` or `hsl()`.
- Thai body text: use a looped Thai font (e.g. Noto Sans Thai Looped).

### Records

Discussion records live at `docs/records/yyyy-mm-dd-<slug>.md`, dated the day the discussion took place. Each record captures one discussion: what was discussed, what was decided, and any open questions.

## References

Consult these when creating or improving skills:

- https://skills.md/docs — skills documentation.
- `.references/The-Complete-Guide-to-Building-Skill-for-Claude.pdf` — authoritative guide covering skill structure, `SKILL.md` authoring, triggers, prompts, and best practices. Local skill-building resources are stored in `.references/`.
