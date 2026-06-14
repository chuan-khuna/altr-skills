# CLAUDE.md

> **How to use this template**
> Search for every `<placeholder>` and fill it in, or delete the section if it doesn't apply to the project.
> Remove this instruction block before committing.

## Project

<project-description-paragraph-1: what is this project and who is it for?>

<project-description-paragraph-2: what makes it unique — design direction, technical constraints?>

## Tech stack

- **Astro** — <astro-use-case>
- **Tailwind CSS v4** — <tailwind-use-case>
- **shadcn/ui** — <shadcn-use-case>
- **TypeScript (strict)** — <typescript-use-case>
- **@tailwindcss/typography** — prose styles for rich-text / markdown content _(delete if unused)_
- <additional-dependency: e.g. "**Framer Motion** — page and scroll animations"> _(delete if unused)_

---

## Commands

Use `bun` as the package manager (preferred). `npm` and `npx` are acceptable alternatives. Dev server runs at `localhost:<port>`.

<project-specific-scripts: list only non-obvious scripts here, e.g.:

- `bun run generate:og` — regenerates Open Graph images
  Delete this block if there are no project-specific scripts.>

## Adding shadcn components

shadcn/ui requires the `@astrojs/react` integration and `tailwindcss`. Add components via:

```bash
bunx shadcn@latest add <component>
```

Components land in `src/components/ui/`. Import them in `.astro` files using the `client:load` (or `client:visible`) directive since they are React components.

## Import alias

Always use the `@/` alias instead of relative paths. The alias maps to `src/` and is configured in both `tsconfig.json` and `astro.config.mjs`.

```ts
// ✅ correct
import { MyComponent } from "@/components/MyComponent";
import { cn } from "@/lib/utils";

// ❌ avoid
import { MyComponent } from "../../../components/MyComponent";
```

This applies to `.astro`, `.tsx`, `.ts` — all source files.

## Architecture

```
src/
  pages/
    index.astro             # <pages-description>
  layouts/
    Layout.astro            # root HTML shell (<html>, <head>, global meta)
  components/
    <component-subfolders>  # e.g. sections/, ui/, shared/
  lib/
    utils.ts                # cn() and other shared utilities
  data/                     # static content / config
  <other-dirs>              # e.g. collection-definitions/, styles/, utils/
public/                     # static assets served at /
```

<architecture-notes: describe any non-obvious conventions, or delete this line>

## File & folder naming

| What                     | Format       | Examples                      |
| ------------------------ | ------------ | ----------------------------- |
| Astro / React components | `PascalCase` | `Hero.astro`, `MenuCard.tsx`  |
| Pages                    | `kebab-case` | `index.astro`, `[slug].astro` |
| Lib / utility files      | `kebab-case` | `utils.ts`, `format-date.ts`  |
| Data / config files      | `kebab-case` | `site.ts`, `menu-items.ts`    |
| <other-naming-rules>     | <format>     | <examples>                    |

## Content collections

https://docs.astro.build/en/guides/content-collections/

### Naming convention

Definition file is **singular**; exported variable and content folder are **plural** — all three are trivially derivable from each other:

```
book.ts   →  export const books    →  src/content/books/
author.ts →  export const authors  →  src/content/authors/
```

**Exception — uncountable nouns:** if the noun has no natural plural in English (e.g. "news"), use the singular for both the variable and content folder:

```
news.ts  →  export const news  →  src/content/news/
```

### Structure

```
src/
  collection-definitions/   # one .ts file per collection (singular name)
    book.ts
    author.ts
    news.ts
  content.config.ts         # imports all definitions, exports { collections }
  content/
    books/                  # .md / .mdx files (plural folder)
    authors/
    news/                   # uncountable — stays singular
```

`content.config.ts` is kept thin — only imports and re-exports:

```ts
import { books } from "@/collection-definitions/book";
import { authors } from "@/collection-definitions/author";
import { news } from "@/collection-definitions/news";

export const collections = { books, authors, news };
```

When adding a new collection: create the definition file, add the content folder, then register in `content.config.ts`.

**Documentation rule:** Whenever you change `src/collection-definitions/**` or `src/data/**`, update the matching reference doc in `docs/content/<topic>.md`. A task is not complete until the reference docs are in sync.

## Fonts

**Font loading:** Astro Font API (`astro.config.mjs` → `fonts[]` with `fontProviders.google()`) + `FontLoader.astro` injected in `Layout.astro` `<head>`. CSS variables follow the `--font-<kebab-name>` convention (e.g. `--font-lato`).

Do **not** add Google Fonts `@import` to CSS — configure new fonts in `astro.config.mjs` and add a `<Font cssVariable="..." />` entry in `src/components/FontLoader.astro`.

## Styling

- Use **Tailwind CSS v4** for all styling. Do not write custom CSS unless Tailwind cannot cover it.
- Tailwind v4 uses CSS-first configuration — there is no `tailwind.config.*` file. All theme tokens (colors, fonts, spacing, etc.) are defined as CSS custom properties inside `@theme { … }` in the global stylesheet.
- Define brand colours as **oklch** CSS variables inside `@theme`:

  ```css
  @import "tailwindcss";

  @theme {
    --color-brand: oklch(55% 0.2 250);
    --color-brand-light: oklch(75% 0.15 250);
  }
  ```

- Never hardcode hex or hsl colour values in class names or inline styles — always reference a theme variable.
- Use `cn()` from `@/lib/utils` for conditional or overridden class names.

## Troubleshooting display and animation issues

When animations, visual effects, or interactive behavior don't work, the cause is often Astro's default static rendering — React components render to HTML on the server and ship no JS unless a `client:*` directive is present.

| Directive             | When JS loads                  | Use for                                  |
| --------------------- | ------------------------------ | ---------------------------------------- |
| `client:load`         | Immediately on page load       | Above-the-fold interactive components    |
| `client:idle`         | When browser is idle           | Non-critical UI                          |
| `client:visible`      | When component enters viewport | Below-the-fold animations / effects      |
| `client:only="react"` | Immediately, skips SSR         | Components using `window`, WebGL, canvas |

If an animation works in isolation but breaks on the site, first check whether the component has the right `client:*` directive.

## Content

Content (collection schemas, content formats, frontmatter, static config) is governed by a `docs/` knowledge base — **not** scattered across source files. Before adding, editing, or restructuring any content, read the knowledge base first:

```
docs/content/                       # content knowledge base
  content-architecture.md           # start here — collections table, schemas, formats
  <topic>.md                        # one doc per collection or config (e.g. books.md, site-config.md)
```

`docs/content/content-architecture.md` is the single source of truth for collection schemas and content formats, and acts as a routing table — pointing to the correct reference doc for each collection or config.

**Static data files** (in `src/data/`, imported directly — not Astro collections):

- `src/data/<site-config>.ts` — site-wide config (display name, title, social links)
- `src/data/<other-data>.ts` — other static content imported by components

**Documentation rule:** whenever you change `src/collection-definitions/**` or `src/data/**`, update the matching doc in `docs/content/<topic>.md`. A task touching content is not complete until the docs are in sync.

## Project agents

_(Delete this section if the project does not use project agents.)_

Project agents live in `.claude/agents/` and read from the `docs/` knowledge base. Split responsibilities so each agent owns one area:

- **`developer`** — builds all Astro features: pages, components, schemas, and architecture. Owns data and collection definitions (the content *infrastructure*, not the entries themselves); reads `docs/content/` and `docs/architecture/`.
- **`web-master`** — themes, the visual layer, and site content. Use this agent whenever the user asks to create or update web content. Owns CSS presets, theme toggling, and layout; reads the visual architecture docs.

`docs/README.md` is the index for the knowledge base.

## LLM-generated artifacts

Artifacts produced during AI-assisted sessions are stored under:

```
docs/artifacts/<category>/yyyy-mm-dd-<topic>.<md|html>
```

Files may be **Markdown (`.md`)** or **HTML (`.html`)**. `<category>` is a free-form folder — use whatever noun best describes the artifact. Common categories:

- `prd` — product requirement documents and feature specs
- `plan` — implementation plans and architectural decisions
- `research` — research notes, reference analysis, tech comparisons
- `design` — design decisions, UX notes, visual direction

Add new category folders as needed; the list above is a starting set, not a closed set. Do not place artifacts directly in `docs/`.

## Deployment

Cloudflare: https://docs.astro.build/en/guides/integrations-guide/cloudflare/

<deployment-notes: e.g. "Cloudflare Workers via @astrojs/cloudflare" | "Vercel — push to main triggers deploy" — or delete this section>

## Project-specific notes

<project-specific: any conventions, gotchas, or decisions unique to this project — or delete this section>
