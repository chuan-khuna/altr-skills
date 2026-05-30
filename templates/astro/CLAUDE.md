# CLAUDE.md

> **How to use this template**
> Search for every `<placeholder>` and fill it in, or delete the section if it doesn't apply to the project.
> Remove this instruction block before committing.

## Project

<project-description-paragraph-1: what is this project and who is it for?>

<project-description-paragraph-2: what makes it unique — design direction, technical constraints?>

## Tech stack

- **Astro** — <astro-use-case>
- **Tailwind CSS** — <tailwind-use-case>
- **shadcn/ui** — <shadcn-use-case>
- **TypeScript (strict)** — <typescript-use-case>
- **@tailwindcss/typography** — prose styles for rich-text / markdown content _(delete if unused)_
- <additional-dependency: e.g. "**Framer Motion** — page and scroll animations"> _(delete if unused)_

---

## Commands

Use `bun` as the package manager (preferred). `npm` and `npx` are acceptable alternatives. Dev server runs at `localhost:<port>`.

<project-specific-scripts: list only non-obvious scripts here, e.g.:

- `bun run generate:og` — regenerates Open Graph images
- `bunx skills@1.5.0 add ./project-skills -y -p` — installs local skills
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

**Documentation rule:** Whenever you change `src/collection-definitions/**` or `src/data/**`, update the matching reference doc in `project-skills/manage-content/references/<topic>.md`. A task is not complete until the reference docs are in sync.

## Fonts

**Font loading:** Astro Font API (`astro.config.mjs` → `fonts[]` with `fontProviders.google()`) + `FontLoader.astro` injected in `Layout.astro` `<head>`. CSS variables follow the `--font-<kebab-name>` convention (e.g. `--font-lato`).

Do **not** add Google Fonts `@import` to CSS — configure new fonts in `astro.config.mjs` and add a `<Font cssVariable="..." />` entry in `src/components/FontLoader.astro`.

## Styling

- Use **Tailwind** for all styling. Do not write custom CSS unless Tailwind cannot cover it.
- Define brand colours in `tailwind.config.*` (or as CSS variables for Tailwind v4) rather than hardcoding hex values in class names.
- Use `cn()` from `@/lib/utils` for conditional or overridden class names.
- <additional-styling-notes: e.g. "Use oklch CSS variables per theme" — or delete this line>

## Troubleshooting display and animation issues

When animations, visual effects, or interactive behavior don't work, the cause is often Astro's default static rendering — React components render to HTML on the server and ship no JS unless a `client:*` directive is present.

| Directive             | When JS loads                  | Use for                                  |
| --------------------- | ------------------------------ | ---------------------------------------- |
| `client:load`         | Immediately on page load       | Above-the-fold interactive components    |
| `client:idle`         | When browser is idle           | Non-critical UI                          |
| `client:visible`      | When component enters viewport | Below-the-fold animations / effects      |
| `client:only="react"` | Immediately, skips SSR         | Components using `window`, WebGL, canvas |

If an animation works in isolation but breaks on the site, first check whether the component has the right `client:*` directive.

## Content management skill for LLM agent

```yaml
---
name: manage-content
description: >
  Guide for adding or editing site content. Use this skill when the user asks to:
  - Add or edit <content-type: e.g. "a quote entry", "a blog post">
  - Configure the site (title, description, social links)
  - Know the correct frontmatter format for any content type
---
```

Before adding, editing, or restructuring any content (collection definitions, data files, static config), read the skill file first:

```
project-skills/manage-content/SKILL.md
```

That file is the single source of truth for collection schemas, content formats, and doc-sync rules. It also acts as a routing table — pointing the agent to the correct reference doc for each collection or config.

Reference docs live alongside the skill at `project-skills/manage-content/references/<topic>.md` — where `<topic>` matches the collection or config it describes (e.g. `books.md`, `site-config.md`). Whenever you change `src/collection-definitions/**` or `src/data/**`, update the matching reference doc. A task touching content is not complete until the skill and its reference docs are in sync.

## Special directories

###

`project-skills/` is a living, in-repo skill folder. Skills here are the authoritative version for this project and are updated alongside the codebase.

To install or re-install the latest skill versions into Claude Code:

```bash
bunx skills@1.5.0 add ./project-skills -a 'universal' -a 'claude-code' -y -p
```

Run this after pulling changes that touched `project-skills/` so the agent uses the latest skill definitions.

###

Artifacts produced during AI-assisted sessions are stored under:

```
docs/<type>/yyyy-mm-dd-<topic>.md
```

The `<type>` folder is not limited to a fixed list — use whatever noun best describes the artifact. Common types include `prd`, `plan`, `research`, and `design`, but create new type folders as needed. Do not place artifacts directly in `docs/`.

## Deployment

Cloudflare: https://docs.astro.build/en/guides/integrations-guide/cloudflare/

<deployment-notes: e.g. "Cloudflare Workers via @astrojs/cloudflare" | "Vercel — push to main triggers deploy" — or delete this section>

## Project-specific notes

<project-specific: any conventions, gotchas, or decisions unique to this project — or delete this section>
