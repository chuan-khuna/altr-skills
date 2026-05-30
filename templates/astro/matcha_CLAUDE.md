# CLAUDE.md

## Project

**ALTR's Matcha** is a specialty matcha cafe website serving as a marketing and menu showcase destination. It's aimed at matcha enthusiasts and cafe-goers who want to explore the menu and discover the brand before visiting in person.

The site has a refined, product-forward aesthetic — think clean Japanese-influenced design with warm, organic tones. The primary goals are to make the menu look irresistible and communicate the brand's identity clearly.

## Tech stack

- **Astro** — static site framework; all pages are `.astro` files with SSG via `@astrojs/cloudflare`
- **Tailwind CSS** — all styling; no custom CSS unless Tailwind can't cover it
- **shadcn/ui** — interactive React components (dropdowns, dialogs, etc.) loaded with `client:load` or `client:visible`
- **TypeScript (strict)** — used across all `.astro`, `.tsx`, and `.ts` files

---

## Commands

Use `bun` as the package manager (preferred). Dev server runs at `localhost:4321`.

```bash
bun dev          # start dev server
bun build        # production build
bun preview      # preview production build locally
```

To add shadcn components:

```bash
bunx shadcn@latest add <component>
```

---

## Adding shadcn components

shadcn/ui requires the `@astrojs/react` integration and `tailwindcss`. Components land in `src/components/ui/`. Import them in `.astro` files using the `client:load` (or `client:visible`) directive since they are React components.

---

## Import alias

Always use the `@/` alias instead of relative paths. The alias maps to `src/` and is configured in both `tsconfig.json` and `astro.config.mjs`.

```ts
// ✅ correct
import { MenuCard } from "@/components/MenuCard";
import { cn } from "@/lib/utils";

// ❌ avoid
import { MenuCard } from "../../../components/MenuCard";
```

This applies to `.astro`, `.tsx`, `.ts` — all source files.

---

## Architecture

```
src/
  pages/
    index.astro             # homepage — hero, featured drinks, brand story
    menu.astro              # full menu listing page
    [slug].astro            # individual drink/item detail page (optional)
  layouts/
    Layout.astro            # root HTML shell (<html>, <head>, global meta)
  components/
    sections/               # page-level sections (Hero, MenuGrid, About, etc.)
    ui/                     # shadcn/ui components
    shared/                 # reusable smaller components (DrinkCard, Badge, etc.)
  lib/
    utils.ts                # cn() and other shared utilities
  data/                     # static config (site metadata, nav links, etc.)
  collection-definitions/
    menu-item.ts            # Zod schema + collection export for menu items
  content/
    menu-items/             # .md files for each drink/menu item
  content.config.ts         # imports all collection definitions and re-exports
public/                     # static assets served at / (images, icons, og images)
```

---

## File & folder naming

| What                     | Format       | Examples                             |
| ------------------------ | ------------ | ------------------------------------ |
| Astro / React components | `PascalCase` | `Hero.astro`, `DrinkCard.tsx`        |
| Pages                    | `kebab-case` | `index.astro`, `menu.astro`          |
| Lib / utility files      | `kebab-case` | `utils.ts`, `format-price.ts`        |
| Data / config files      | `kebab-case` | `site.ts`, `nav-links.ts`            |
| Content files            | `kebab-case` | `ceremonial-latte.md`, `houjicha.md` |

---

## Content collections

### Menu items

The site uses one content collection: **menu items** (drinks, food, specials).

```
src/
  collection-definitions/
    menu-item.ts            # singular file name
  content.config.ts
  content/
    menu-items/             # plural folder
      ceremonial-latte.md
      iced-matcha-milk.md
```

`content.config.ts` stays thin — only imports and re-exports:

```ts
import { menuItems } from "@/collection-definitions/menu-item";
export const collections = { menuItems };
```

**Schema fields to define in `menu-item.ts`:**

- `title` — string
- `description` — string
- `price` — number (in local currency)
- `category` — enum: `"drinks" | "food" | "specials"`
- `tags` — string[] (e.g. `["hot", "iced", "seasonal"]`)
- `image` — image() helper from Astro
- `featured` — boolean (controls homepage highlights)

**Documentation rule:** Whenever you change `src/collection-definitions/**` or `src/data/**`, update the matching reference doc in `project-skills/manage-content/references/<topic>.md`. A task is not complete until the reference docs are in sync.

---

## Fonts

**Font loading:** Astro Font API (`astro.config.mjs` → `fonts[]` with `fontProviders.google()`) + `FontLoader.astro` injected in `Layout.astro` `<head>`. CSS variables follow the `--font-<kebab-name>` convention.

Do **not** add Google Fonts `@import` to CSS — configure new fonts in `astro.config.mjs` and add a `<Font cssVariable="..." />` entry in `src/components/FontLoader.astro`.

> **Note:** Fonts are not yet decided. When chosen, add them to this table:

| Role    | Family | CSS variable     |
| ------- | ------ | ---------------- |
| Display | TBD    | `--font-display` |
| Body    | TBD    | `--font-body`    |

---

## Styling

- Use **Tailwind** for all styling. Do not write custom CSS unless Tailwind cannot cover it.
- Define brand colours in `tailwind.config.*` (or as CSS variables for Tailwind v4) rather than hardcoding hex values in class names.
- Use `cn()` from `@/lib/utils` for conditional or overridden class names.
- The palette should feel warm, earthy, and organic — think matcha greens, cream whites, and warm stone tones. Define these as named brand tokens (e.g. `matcha`, `cream`, `stone`) in the Tailwind config.

---

## Troubleshooting display and animation issues

When animations, visual effects, or interactive behavior don't work, the cause is often Astro's default static rendering — React components render to HTML on the server and ship no JS unless a `client:*` directive is present.

| Directive             | When JS loads                  | Use for                                  |
| --------------------- | ------------------------------ | ---------------------------------------- |
| `client:load`         | Immediately on page load       | Above-the-fold interactive components    |
| `client:idle`         | When browser is idle           | Non-critical UI                          |
| `client:visible`      | When component enters viewport | Below-the-fold animations / effects      |
| `client:only="react"` | Immediately, skips SSR         | Components using `window`, WebGL, canvas |

If an animation works in isolation but breaks on the site, first check whether the component has the right `client:*` directive.

---

## Deployment

Deployed to **Cloudflare Pages** via the `@astrojs/cloudflare` adapter.

- Push to `main` triggers a production deploy on Cloudflare Pages.
- The adapter is configured in `astro.config.mjs` with `output: 'static'` (or `'hybrid'` if any SSR routes are needed in future).
- Static assets in `public/` are served via Cloudflare's CDN automatically.

---

## Project-specific notes

- All prices should be stored as raw numbers in frontmatter and formatted at render time using a utility (e.g. `formatPrice()` in `src/lib/format-price.ts`).
- The `featured: true` flag on menu items is how the homepage highlights section is populated — do not hardcode item lists in page files.
- Keep image assets in `public/images/menu/` and reference them as `/images/menu/<filename>` in frontmatter, or use Astro's `image()` schema helper for optimised images.
