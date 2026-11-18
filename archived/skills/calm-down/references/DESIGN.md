---
version: alpha
name: Calm-Down Assignment Paper
description: A quiet, paper-like document theme for calm-down assignment hand-offs. A cool off-white canvas holds slate-ink Inter prose with Inconsolata for labels and navigation. Structure comes from clear 1px hairline borders and fully square (0px) corners rather than shadow or color. A single blue accent (the primary colour) marks interaction and the active table-of-contents entry; green and red are reserved for specific situations — green for done/success states (checked items, success callouts), red for warnings (heads-up callouts). The page reads as a two-column broadsheet — content left, a sticky table of contents right — collapsing to a single column with a foldable Contents block on narrow screens.

colors:
  # Neutrals — tuned to the primary blue hue (246) so everything harmonises
  canvas: "oklch(0.984 0.003 246)"
  surface: "oklch(1 0 0)"
  surface-alt: "oklch(0.967 0.006 246)"
  ink: "oklch(0.23 0.03 246)"
  body: "oklch(0.45 0.03 246)"
  muted: "oklch(0.56 0.028 246)"
  border: "oklch(0.928 0.012 246)"
  border-strong: "oklch(0.865 0.022 246)"
  # Primary — blue. All structural accents.
  accent: "oklch(0.6276 0.0839 246.04)"
  accent-strong: "oklch(0.52 0.092 246.04)"
  accent-soft: "oklch(0.955 0.022 246.04)"
  on-accent: "oklch(1 0 0)"
  # Semantic — specific situations only. Green = done/success, red = warning.
  success: "oklch(0.7188 0.1184 147.57)"
  success-strong: "oklch(0.55 0.11 147.57)"
  success-soft: "oklch(0.955 0.04 147.57)"
  danger: "oklch(0.5923 0.1677 21.57)"
  danger-strong: "oklch(0.52 0.16 21.57)"
  danger-soft: "oklch(0.955 0.035 21.57)"

typography:
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 1.75rem
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.01em
  section:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.4
  task:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.4
  body-md:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Inconsolata', ui-monospace, monospace"
    fontSize: 0.6875rem
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.08em
  toc-link:
    fontFamily: "'Inconsolata', ui-monospace, monospace"
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.5
  meta:
    fontFamily: "'Inconsolata', ui-monospace, monospace"
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.02em
  code:
    fontFamily: "'Inconsolata', ui-monospace, monospace"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6

rounded:
  none: 0px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  gutter: 48px
  content-max: 720px
  toc-width: 220px
  shell-max: 1040px

components:
  page-header:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: 0 0 24px 0
  doc-meta:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.meta}"
  toc-nav:
    backgroundColor: transparent
    textColor: "{colors.body}"
    typography: "{typography.toc-link}"
  toc-heading:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  toc-link:
    backgroundColor: transparent
    textColor: "{colors.body}"
    typography: "{typography.toc-link}"
    padding: 4px 0 4px 12px
  toc-link-active:
    backgroundColor: transparent
    textColor: "{colors.accent}"
  content-section:
    backgroundColor: transparent
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
  section-heading:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.section}"
  task-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 24px
  task-num:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-strong}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    size: 24px
  io-block:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: 12px 16px
  io-label:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  checklist-heading:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  checklist-item:
    backgroundColor: transparent
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
  checkbox:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.none}"
    size: 16px
  checkbox-checked:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.none}"
  callout-warn:
    backgroundColor: "{colors.danger-soft}"
    textColor: "{colors.body}"
    borderColor: "{colors.danger}"
    rounded: "{rounded.none}"
    padding: 12px 16px
  callout-done:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.body}"
    borderColor: "{colors.success-strong}"
    rounded: "{rounded.none}"
    padding: 12px 16px
  code-block:
    backgroundColor: "#1e1e2e"
    textColor: "#cdd6f4"
    typography: "{typography.code}"
    rounded: "{rounded.none}"
    padding: 20px 24px
  diagram-wrapper:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: 24px
---

## Overview

This is a **quiet, paper-like** document theme for calm-down assignment hand-offs. The personality is calm, legible, and structural — a teammate should be able to pick the document up cold and read it like a printed memo. The page floor is a cool off-white (`{colors.canvas}`) rather than pure white, giving the surface a soft "paper" quality. There is no decoration, no gradient, and no atmospheric depth — **structure is carried entirely by clear 1px hairline borders and square (0px) corners**, never by shadow.

One **blue accent** (`{colors.accent}`) is the system's primary voltage — it marks the structure the reader's eye should follow: the active table-of-contents entry, the task number badge, IO bullets. Two **semantic** colours sit beside it for specific situations only: **green** (`{colors.success}`) for a done/success state — a checked task, a done callout — and **red** (`{colors.danger}`) for a warning heads-up callout. Everything else is slate ink on paper.

The document is a **two-column broadsheet**: wide content on the left, a narrow **sticky table of contents** on the right, with equal gutters outside both. On narrow screens the layout collapses to a single column and the TOC folds into a "Contents" disclosure at the top.

**Key Characteristics:**

- Cool paper canvas (`{colors.canvas}`) with slate ink (`{colors.ink}`) — never pure white, never pure black.
- Clear, visible 1px hairline borders (`{colors.border}` / `{colors.border-strong}`) do all the structural work. No drop shadows anywhere.
- Square corners: every element uses `{rounded.none}` (0px). There is no rounding anywhere — `{rounded.full}` is reserved and unused.
- One blue accent (`{colors.accent}`) for all structure — interaction, active TOC state, task-number badge, IO bullets. Green (`{colors.success}`) and red (`{colors.danger}`) are semantic-only: green for done/success (checked items, done callouts), red for warnings.
- **Inter** for headings and body; **Inconsolata** for labels, the table of contents, the date, and IO tags — the mono gives a "technical document" voice.
- Two-column layout (content + sticky TOC) with outer gutters, collapsing to one column with a foldable Contents block below `{spacing.shell-max}`-class breakpoints.

## Colors

The palette is a cool-paper neutral ramp anchored by one blue primary accent, with green and red reserved for semantic states only. All values are authored in `oklch()` for perceptual uniformity; the listed sRGB hex are for reference only.

### Surface

- **Canvas** (`{colors.canvas}` — ≈#F8FAFC): The paper floor of the whole document. Cool off-white, softer than pure white.
- **Surface** (`{colors.surface}` — #FFFFFF): Pure white for cards (task cards, diagram wrappers) that sit one step above the paper.
- **Surface Alt** (`{colors.surface-alt}` — ≈#F1F5F9): A faintly tinted fill for IO blocks nested inside cards — just enough separation without a border.

### Ink & Text

- **Ink** (`{colors.ink}` — ≈#0F172A): Slate-900. Title, section headings, task headings — all primary type.
- **Body** (`{colors.body}` — ≈#475569): Slate-600. Default running text and checklist items.
- **Muted** (`{colors.muted}` — ≈#64748B): Slate-500. The date, labels, IO captions, inactive TOC links.

### Borders

- **Border** (`{colors.border}` — ≈#E2E8F0): The default 1px hairline — card outlines, section dividers, the rule under the header. This is the system's primary structural line.
- **Border Strong** (`{colors.border-strong}` — ≈#CBD5E1): One step darker, for emphasis — the checkbox outline, focused input borders.

### Accent — Primary (Blue)

The one structural color. Marks what the eye should follow; never used decoratively.

- **Accent** (`{colors.accent}` — ≈#5B7FC4): The primary blue. Active TOC entry, IO bullets, links, focus.
- **Accent Strong** (`{colors.accent-strong}` — ≈#3F5C9E): Darker, for small text on light tints — the task-number digit — and hover/pressed states.
- **Accent Soft** (`{colors.accent-soft}` — ≈#ECF0FB): A pale blue tint used as the task-number badge fill.
- **On Accent** (`{colors.on-accent}` — #FFFFFF): The checkmark glyph on a filled checkbox.

### Semantic — Green & Red

Reserved for specific situations only — never decorative.

- **Success** (`{colors.success}` — green): The checked-checkbox fill and the `.callout.done` left rule — a done/finished state.
- **Success Strong** (`{colors.success-strong}`): The `.callout.done` label and bar, dark enough to read on the soft tint.
- **Success Soft** (`{colors.success-soft}`): The `.callout.done` background.
- **Danger** (`{colors.danger}` — red): The `.callout.warn` left rule — a warning / heads-up.
- **Danger Strong** (`{colors.danger-strong}`): The `.callout.warn` label, dark enough to read on the soft tint.
- **Danger Soft** (`{colors.danger-soft}`): The `.callout.warn` background.

## Typography

### Font Families

Two families, loaded from Google Fonts:

- **Inter** — headings, body, and all prose. Neutral, highly legible at small sizes.
- **Inconsolata** — labels (`IO`, `Checklist`), the table-of-contents links, the document date, and IO tags. The monospace gives metadata a "technical document" register and pairs naturally with the code blocks.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inconsolata:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

### Hierarchy

| Token                  | Family         | Size      | Weight | Tracking | Use                                  |
| ---------------------- | -------------- | --------- | ------ | -------- | ------------------------------------ |
| `{typography.title}`   | Inter          | 1.75rem   | 700    | -0.01em  | Document title (page header)         |
| `{typography.section}` | Inter          | 1.125rem  | 600    | 0        | Section headings (Background, Tasks) |
| `{typography.task}`    | Inter          | 1rem      | 600    | 0        | Task card headings                   |
| `{typography.body-md}` | Inter          | 0.9375rem | 400    | 0        | Default body, checklist items        |
| `{typography.body-sm}` | Inter          | 0.875rem  | 400    | 0        | IO block text                        |
| `{typography.label}`   | Inconsolata | 0.6875rem | 500    | 0.08em   | Uppercase labels (IO, Checklist)     |
| `{typography.toc-link}`| Inconsolata | 0.8125rem | 500    | 0        | Table-of-contents links              |
| `{typography.meta}`    | Inconsolata | 0.8125rem | 400    | 0.02em   | Document date in header              |
| `{typography.code}`    | Inconsolata | 0.875rem  | 400    | 0        | Code blocks (shiki inherits)         |

### Principles

Headings are Inter semibold/bold in slate ink; body is Inter regular in slate-600. All **labels and navigation are uppercase Inconsolata** with `0.08em` tracking — the mono + tracking is what signals "metadata, not prose." Never set body or headings in mono, and never set labels in Inter. The contrast between proportional prose and monospace chrome is the system's editorial signature.

## Layout

### Two-Column Broadsheet

The document is centered in a shell of `{spacing.shell-max}` (1040px) with equal outer gutters created by `margin: 0 auto` plus horizontal padding. Inside the shell:

```
[ gutter ][ content (≤720px) ][ 48px ][ TOC (220px, sticky) ][ gutter ]
```

- The **page header** (title + date) spans the full shell width above the two columns, closed by a 1px `{colors.border}` rule.
- The **content column** (`{spacing.content-max}` — 720px max) holds Background, Current State, and the Tasks list.
- The **TOC column** (`{spacing.toc-width}` — 220px) is `position: sticky; top: 2rem` and scroll-spies the content.
- The gap between columns is `{spacing.gutter}` (48px).

### Spacing System

- **Base unit:** 4px. Tokens: `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 40 · `{spacing.xxl}` 64.
- **Section spacing:** `{spacing.xl}` (40px) between major content sections.
- **Card padding:** `{spacing.lg}` (24px) inside task cards; `{spacing.sm}`/`{spacing.md}` inside IO blocks.
- **Card gap:** `{spacing.md}` (16px) between task cards.

### Whitespace Philosophy

The paper breathes through uniform vertical rhythm, not decoration. Empty space stays empty paper — no fills, no panels, no atmospheric backdrops. Borders, not gaps, separate structural regions.

## Elevation & Depth

This system is **flat**. There are no drop shadows anywhere.

| Level         | Treatment                                              | Use                                  |
| ------------- | ------------------------------------------------------ | ------------------------------------ |
| Paper         | `{colors.canvas}` background, no border                | Page floor                           |
| Hairline      | 1px `{colors.border}` border                           | Card outlines, header rule, dividers |
| Tinted fill   | `{colors.surface-alt}` background, no border           | IO blocks nested inside cards        |
| Accent rule   | 2px `{colors.accent}` left border                      | Active TOC entry                     |
| Semantic rule | 3px `{colors.danger}` / `{colors.success-strong}` left border | Callouts (`.warn` / `.done`)  |

Depth is conveyed by **borders and the accent/semantic rules**, never by shadow or layering. A task card is distinguished from the paper by its white `{colors.surface}` fill and 1px `{colors.border}` outline — nothing more.

## Shapes

### Border Radius Scale

| Token            | Value | Use                                                          |
| ---------------- | ----- | ------------------------------------------------------------ |
| `{rounded.none}` | 0px   | Everything — cards, IO blocks, checkboxes, code, diagrams    |
| `{rounded.full}` | 9999px| Reserved — unused in the assignment document                 |

The system has **no border radius**. Every element — task cards, IO blocks, the task-number badge, checkboxes, code blocks, diagram wrappers — uses square `{rounded.none}` (0px) corners. The sharp rectangles reinforce the clear-border, paper-document feel; nothing in the system is rounded.

## Components

The assignment document is assembled from the components below. The body of a generated document always follows the order: **page header → Background → Current State → Tasks**, with the sticky TOC mirroring that structure.

### Page Header (`page-header`)

Spans the full shell width. The document title in `{typography.title}` (slate ink), with the date directly beneath in `{typography.meta}` (`{colors.muted}`, monospace). Closed by a 1px `{colors.border}` bottom rule. **Date is the only metadata** — no author, status, or counts.

### Table of Contents (`toc-nav`)

A sticky `<aside>` in the right column. A `{typography.label}` "CONTENTS" heading, then links for **Background, Current State, Tasks**, with each individual **task name nested and indented** beneath Tasks. Inactive links are `{colors.body}`; the **active entry** (driven by scroll-spy) switches to `{colors.accent}` with a 2px accent left-border. On narrow screens the whole TOC becomes a foldable `<details>` "Contents" block above the content (see Responsive Behavior).

### Content Section (`content-section` + `section-heading`)

Background and Current State are prose sections. The `{typography.section}` heading is plain Inter 600 in slate ink — no marker or rule; body follows in `{typography.body-md}` (`{colors.body}`).

### Task Card (`task-card`)

White `{colors.surface}` card, 1px `{colors.border}`, `{rounded.none}` corners, `{spacing.lg}` padding. Header is a `{typography.task}` title preceded by a `{component.task-num}` badge — a 24px `{colors.accent-soft}` square (`{rounded.none}`) holding the index in `{colors.accent-strong}` mono. A task card may close with an optional `.callout.warn` heads-up.

### IO Block (`io-block`)

Inside each task card, Input and Output stacked as full-width rows. Each block is a `{colors.surface-alt}` tinted fill (no border), `{rounded.none}`, with a `{typography.label}` uppercase caption (`Input` / `Output`) and `{typography.body-sm}` text — written as a paragraph or a square-bulleted list (`{colors.accent}` bullets).

### Checklist (`checklist-item` + `checkbox`)

A `{typography.label}` "CHECKLIST" heading, then a list of items. Each `{component.checkbox}` is a 16px `{rounded.none}` box with a 1.5px `{colors.border-strong}` outline; when checked it fills `{colors.success}` (green — a done state) with a white checkmark and the label text goes `{colors.muted}` with a strike-through.

### Callout (`callout-warn` / `callout-done`)

A semantic block for specific situations only, with a `{typography.label}` uppercase tag over `{typography.body-sm}` text and a 3px left rule. `.warn` (red — `{colors.danger}` rule on `{colors.danger-soft}`) flags a gotcha or heads-up; `.done` (green — `{colors.success-strong}` rule on `{colors.success-soft}`) marks an already-finished state. Most commonly a single `.warn` heads-up at the foot of a task card. Never use the semantic colors decoratively.

### Code Block (`code-block`)

Inline `<pre><code class="language-*">` blocks, rendered by shiki **catppuccin-mocha** — a deliberate dark island on the paper. `{rounded.none}` corners. See "Code Blocks — Shiki".

### Diagram (`diagram-wrapper`)

`<pre class="mermaid">` wrapped in a white `{colors.surface}` card with 1px `{colors.border}` and `{rounded.none}`. Mermaid theme `neutral`. See "Diagrams — Mermaid".

## Do's and Don'ts

### Do

- Keep the canvas as paper (`{colors.canvas}`) and let 1px hairline borders carry all structure.
- Use the blue accent (`{colors.accent}`) for structure only — interaction, the active TOC entry, the task-number badge, IO bullets. Use green (`{colors.success}`) for done/success (checked items, done callouts) and red (`{colors.danger}`) for warnings.
- Set every label, the TOC, and the date in uppercase Inconsolata.
- Keep every corner square — `{rounded.none}` (0px), with no exceptions.
- Keep the header to title + date only.
- Mirror the content section order in the sticky TOC, with tasks nested under Tasks.

### Don't

- Don't add drop shadows — depth is borders and one accent rule, never shadow.
- Don't use pure white as the page floor; the paper canvas is `{colors.canvas}`.
- Don't introduce a fourth hue. Blue is primary; green and red are the only semantic colours, and only for done/warning states — never decorative.
- Don't set body or headings in monospace, or labels in Inter — the family split is the signature.
- Don't round any corner — the system is fully square.
- Don't let the code block adopt a light theme — the dark mocha island is intentional contrast on paper.

## Responsive Behavior

### Breakpoints

| Name    | Width    | Layout                                                                                  |
| ------- | -------- | --------------------------------------------------------------------------------------- |
| Desktop | ≥ 1024px | Two columns: content (≤720px) + sticky TOC (220px), 48px gap, outer gutters via auto margin |
| Narrow  | < 1024px | Single column; TOC becomes a foldable `<details>` "Contents" block above the content     |
| Mobile  | < 560px  | Reduced shell padding (IO blocks are always stacked rows at every width)                 |

### TOC Collapse

The TOC is authored once as an `<aside>` containing a `<details open>`. At desktop the `<summary>` is hidden and the aside is `position: sticky` in the right column. Below 1024px the column drops, the aside moves above the content in flow, and the `<summary>` ("▸ Contents") reappears so the reader can fold it. Scroll-spy still updates the active entry while expanded.

### Touch & Reflow

- Checkbox hit area pairs with its full label row for a comfortable tap target.
- Code blocks scroll horizontally (`overflow-x: auto`) rather than wrapping.
- Diagrams scroll within their wrapper; they never force the page wider.

---

## Code Blocks — Shiki (catppuccin-mocha)

Write code in standard `<pre><code class="language-{lang}">` blocks inline in the body. The script processes them at page load into dark catppuccin-mocha islands.

```html
<!-- In the content column wherever a code block is needed -->
<pre><code class="language-bash">npm install && npm run build</code></pre>
```

```html
<!-- Before </body> — always include -->
<script type="module">
  import { createHighlighter } from "https://esm.sh/shiki@1";
  const hl = await createHighlighter({
    themes: ["catppuccin-mocha"],
    langs: ["javascript","typescript","python","bash","shell","json","yaml","sql","text"],
  });
  document.querySelectorAll("pre code[class]").forEach((el) => {
    const lang = el.className.replace("language-", "") || "text";
    el.closest("pre").outerHTML = hl.codeToHtml(el.textContent.trimEnd(), {
      lang,
      theme: "catppuccin-mocha",
    });
  });
  hl.dispose();
</script>
```

```css
.shiki {
  border-radius: var(--rounded);
  overflow: hidden;
  margin: 1rem 0;
  font-family: "Inconsolata", ui-monospace, monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}
.shiki code { display: block; padding: 20px 24px; overflow-x: auto; }
```

Always load all listed languages — shiki bundles them lazily, so unused ones cost nothing.

---

## Diagrams — Mermaid

Use `<pre class="mermaid">` wrapped in `.diagram-wrapper`. Theme `neutral` reads cleanly on the paper canvas.

```html
<div class="diagram-wrapper">
  <pre class="mermaid">
graph LR
  A[Start] --> B[Step] --> C[End]
  </pre>
</div>
```

```html
<!-- Before </body> — only include when diagrams are present -->
<script type="module">
  import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
  mermaid.initialize({ startOnLoad: true, theme: "neutral" });
</script>
```

```css
.diagram-wrapper {
  margin: 1rem 0;
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--rounded);
  display: flex;
  justify-content: center;
  overflow: auto;
}
pre.mermaid { background: none; }
```

Include the mermaid script **only** when the document contains at least one diagram block.

---

## Table of Contents — Scroll-Spy

Each content section and task gets an `id`; the TOC links point at those ids. An `IntersectionObserver` toggles `.active` on the link whose section is in view.

```html
<!-- Before </body> — include whenever a TOC is present -->
<script>
  const links = [...document.querySelectorAll(".toc-nav a")];
  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          byId.get(e.target.id)?.classList.add("active");
        }
      });
    },
    { rootMargin: "0px 0px -70% 0px", threshold: 0 }
  );
  document.querySelectorAll("[id].spy-target").forEach((s) => spy.observe(s));
</script>
```

Give every section and task element the `spy-target` class plus a unique `id` matching its TOC link `href`.

---

## Full HTML Boilerplate

A complete, self-contained template. Replace `{placeholders}`; the CSS below is the full implementation — paste it verbatim.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{Topic}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inconsolata:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      :root {
        /* Neutrals — tuned to the primary blue hue (246) so everything harmonises */
        --canvas: oklch(0.984 0.003 246);
        --surface: oklch(1 0 0);
        --surface-alt: oklch(0.967 0.006 246);
        --ink: oklch(0.23 0.03 246);
        --body: oklch(0.45 0.03 246);
        --muted: oklch(0.56 0.028 246);
        --border: oklch(0.928 0.012 246);
        --border-strong: oklch(0.865 0.022 246);

        /* Primary — blue. Used for all structural accents (borders, links, active states). */
        --accent: oklch(0.6276 0.0839 246.04);
        --accent-strong: oklch(0.52 0.092 246.04);
        --accent-soft: oklch(0.955 0.022 246.04);
        --on-accent: oklch(1 0 0);

        /* Semantic — specific situations only. Green = done/success, red = warning/heads-up. */
        --success: oklch(0.7188 0.1184 147.57);
        --success-strong: oklch(0.55 0.11 147.57);
        --success-soft: oklch(0.955 0.04 147.57);
        --danger: oklch(0.5923 0.1677 21.57);
        --danger-strong: oklch(0.52 0.16 21.57);
        --danger-soft: oklch(0.955 0.035 21.57);

        --rounded: 0px;
        --mono: "Inconsolata", ui-monospace, monospace;
      }
      body {
        background: var(--canvas);
        color: var(--body);
        font-family: "Inter", system-ui, sans-serif;
        font-size: 16px;
        line-height: 1.6;
      }
      :not(pre) > code { font-family: var(--mono); font-size: 0.85em; background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--rounded); padding: 0.1em 0.35em; color: var(--ink); }

      /* ── Shell + two-column layout ── */
      .shell { max-width: 1040px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }
      .page-header { padding-bottom: 1.5rem; margin-bottom: 2.5rem; border-bottom: 1px solid var(--border); }
      .page-header h1 { font-size: 1.75rem; font-weight: 700; line-height: 1.25; letter-spacing: -0.01em; color: var(--ink); margin-bottom: 0.5rem; }
      .page-header .date { font-family: var(--mono); font-size: 0.8125rem; letter-spacing: 0.02em; color: var(--muted); }

      .layout { display: grid; grid-template-columns: minmax(0, 1fr) 220px; gap: 48px; align-items: start; }
      .content { max-width: 720px; min-width: 0; }

      /* ── Table of contents ── */
      .toc { position: sticky; top: 2rem; }
      .toc details { border: 0; }
      .toc summary { display: none; }
      .toc-heading { font-family: var(--mono); font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.75rem; }
      .toc-nav ul { list-style: none; display: flex; flex-direction: column; gap: 0.125rem; }
      .toc-nav a { display: block; font-family: var(--mono); font-size: 0.8125rem; font-weight: 500; color: var(--body); text-decoration: none; padding: 4px 0 4px 12px; border-left: 2px solid transparent; }
      .toc-nav a:hover { color: var(--ink); }
      .toc-nav a.active { color: var(--accent); border-left-color: var(--accent); }
      .toc-nav .toc-sub a { padding-left: 24px; color: var(--muted); }
      .toc-nav .toc-sub a.active { color: var(--accent); }

      /* ── Sections ── */
      .section { margin-bottom: 2.5rem; }
      .section > h2 { font-size: 1.125rem; font-weight: 600; color: var(--ink); margin-bottom: 0.875rem; line-height: 1.4; }
      .section > p { font-size: 0.9375rem; color: var(--body); margin-bottom: 0.5rem; }

      /* ── Task cards ── */
      .tasks { display: flex; flex-direction: column; gap: 1rem; }
      .task-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--rounded); padding: 24px; }
      .task-card h3 { font-size: 1rem; font-weight: 600; color: var(--ink); display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.125rem; line-height: 1.4; }
      .task-num { display: inline-flex; align-items: center; justify-content: center; width: 1.5rem; height: 1.5rem; background: var(--accent-soft); color: var(--accent-strong); border-radius: var(--rounded); font-family: var(--mono); font-size: 0.6875rem; font-weight: 500; flex-shrink: 0; line-height: 1; }

      .io-row { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem; }
      .io-block { background: var(--surface-alt); border-radius: var(--rounded); padding: 12px 16px; }
      .io-label { display: block; font-family: var(--mono); font-size: 0.6875rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 0.3rem; }
      .io-block p { font-size: 0.875rem; color: var(--body); line-height: 1.55; }
      .io-block ul { list-style: none; display: flex; flex-direction: column; gap: 0.25rem; }
      .io-block li { position: relative; padding-left: 0.875rem; font-size: 0.875rem; color: var(--body); line-height: 1.55; }
      .io-block li::before { content: ""; position: absolute; left: 0; top: 0.5em; width: 0.25rem; height: 0.25rem; background: var(--accent); }

      .checklist-heading { font-family: var(--mono); font-size: 0.6875rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 0.5rem; }
      .checklist ul { list-style: none; display: flex; flex-direction: column; gap: 0.375rem; }
      .checklist li label { display: flex; align-items: flex-start; gap: 0.625rem; font-size: 0.9375rem; color: var(--body); cursor: pointer; line-height: 1.5; }
      .checklist li input[type="checkbox"] {
        appearance: none; -webkit-appearance: none;
        width: 1rem; height: 1rem; border: 1.5px solid var(--border-strong);
        border-radius: var(--rounded); flex-shrink: 0; margin-top: 0.2rem; cursor: pointer;
        transition: background 0.15s, border-color 0.15s;
      }
      .checklist li input[type="checkbox"]:checked {
        background-color: var(--success); border-color: var(--success);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 6l3 3 5-5' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-size: 75%; background-position: center; background-repeat: no-repeat;
      }
      .checklist li input[type="checkbox"]:checked + span { color: var(--muted); text-decoration: line-through; }

      /* ── Callouts — semantic, optional. .warn = red (heads-up), .done = green (success). ── */
      .callout { border-left: 3px solid; border-radius: var(--rounded); padding: 12px 16px; margin-bottom: 1.25rem; }
      .callout-label { display: block; font-family: var(--mono); font-size: 0.6875rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.25rem; }
      .callout p { font-size: 0.875rem; color: var(--body); line-height: 1.55; }
      .callout.warn { background: var(--danger-soft); border-left-color: var(--danger); }
      .callout.warn .callout-label { color: var(--danger-strong); }
      .callout.done { background: var(--success-soft); border-left-color: var(--success-strong); }
      .callout.done .callout-label { color: var(--success-strong); }

      /* ── Code (shiki) ── */
      .shiki { border-radius: var(--rounded); overflow: hidden; margin: 1rem 0; font-family: var(--mono); font-size: 0.875rem; line-height: 1.6; }
      .shiki code { display: block; padding: 20px 24px; overflow-x: auto; }

      /* ── Diagrams (mermaid) ── */
      .diagram-wrapper { margin: 1rem 0; padding: 24px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--rounded); display: flex; justify-content: center; overflow: auto; }
      pre.mermaid { background: none; }

      /* ── Responsive ── */
      @media (max-width: 1023px) {
        .layout { grid-template-columns: 1fr; gap: 1.5rem; }
        .toc { position: static; margin-bottom: 1rem; border: 1px solid var(--border); border-radius: var(--rounded); }
        .toc details { padding: 0; }
        .toc summary { display: block; list-style: none; cursor: pointer; padding: 12px 16px; font-family: var(--mono); font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
        .toc summary::-webkit-details-marker { display: none; }
        .toc summary::before { content: "\25B8  "; }
        .toc details[open] summary::before { content: "\25BE  "; }
        .toc .toc-heading { display: none; }
        .toc-nav { padding: 0 16px 16px; }
      }
      @media (max-width: 559px) {
        .shell { padding: 2rem 1rem 4rem; }
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <header class="page-header">
        <h1>{Topic}</h1>
        <span class="date">{YYYY-MM-DD}</span>
      </header>

      <div class="layout">
        <main class="content">
          <section class="section spy-target" id="background">
            <h2>Background</h2>
            <p>{background — 2–5 sentences}</p>
          </section>

          <section class="section spy-target" id="current-state">
            <h2>Current State</h2>
            <p>{current state — 2–5 sentences}</p>
          </section>

          <section class="section" id="tasks">
            <h2>Tasks</h2>
            <div class="tasks">
              <!-- Repeat one <article> per task; give each a unique id (task-1, task-2, …). -->
              <article class="task-card spy-target" id="task-1">
                <h3><span class="task-num">1</span>{Task name}</h3>
                <div class="io-row">
                  <div class="io-block">
                    <span class="io-label">Input</span>
                    <p>{input}</p>
                  </div>
                  <div class="io-block">
                    <span class="io-label">Output</span>
                    <p>{output}</p>
                  </div>
                </div>
                <div class="checklist">
                  <p class="checklist-heading">Checklist</p>
                  <ul>
                    <li><label><input type="checkbox" /><span>{criterion}</span></label></li>
                  </ul>
                </div>
                <!-- Optional, only when there is a real gotcha:
                <div class="callout warn"><span class="callout-label">Heads up</span><p>{the one thing easy to get wrong}</p></div>
                -->
              </article>
            </div>
          </section>
        </main>

        <aside class="toc">
          <details open>
            <summary>Contents</summary>
            <p class="toc-heading">Contents</p>
            <nav class="toc-nav">
              <ul>
                <li><a href="#background">Background</a></li>
                <li><a href="#current-state">Current State</a></li>
                <li>
                  <a href="#tasks">Tasks</a>
                  <ul class="toc-sub">
                    <!-- One <li> per task, href matching the article id. -->
                    <li><a href="#task-1">1. {Task name}</a></li>
                  </ul>
                </li>
              </ul>
            </nav>
          </details>
        </aside>
      </div>
    </div>

    <script type="module">
      import { createHighlighter } from "https://esm.sh/shiki@1";
      const hl = await createHighlighter({
        themes: ["catppuccin-mocha"],
        langs: ["javascript","typescript","python","bash","shell","json","yaml","sql","text"],
      });
      document.querySelectorAll("pre code[class]").forEach((el) => {
        const lang = el.className.replace("language-", "") || "text";
        el.closest("pre").outerHTML = hl.codeToHtml(el.textContent.trimEnd(), { lang, theme: "catppuccin-mocha" });
      });
      hl.dispose();
    </script>

    <script>
      const links = [...document.querySelectorAll(".toc-nav a")];
      const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              links.forEach((l) => l.classList.remove("active"));
              byId.get(e.target.id)?.classList.add("active");
            }
          });
        },
        { rootMargin: "0px 0px -70% 0px", threshold: 0 }
      );
      document.querySelectorAll("[id].spy-target").forEach((s) => spy.observe(s));
    </script>

    <!-- mermaid — uncomment only if diagrams are present
    <script type="module">
      import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
      mermaid.initialize({ startOnLoad: true, theme: "neutral" });
    </script>
    -->
  </body>
</html>
```

---

## Generation Rules

1. Author all color tokens in `oklch()`; mirror them as CSS custom properties in `:root`.
2. Embed the full CSS inline in `<style>` — no external CSS CDN.
3. Always include the shiki script and the scroll-spy script.
4. Include the mermaid script only when the document has at least one `<pre class="mermaid">` block.
5. Give every section and task a unique `id`; add `spy-target` to the elements the TOC should track, and mirror those ids in the TOC `href`s.
6. Header carries the title and date only — no author, status, or counts.
7. Save output to `docs/yyyy-mm-dd-{topic}.html`.
8. Do not add HTML comments explaining sections, and do not add a footer or attribution unless asked.
