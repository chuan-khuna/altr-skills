# Tailwind v4 Theming — LLM Reference

## How It Works

The theming system has two layers. First, plain CSS custom properties (e.g. `--primary`, `--background`) hold the actual token values — defined in `:root` as defaults, then overridden per theme inside `[data-theme="name"]` selectors. Second, `@theme inline` bridges those vars into Tailwind by mapping `--color-primary: var(--primary)`, which generates utility classes like `bg-primary` and `text-primary`. The critical rule: `@theme inline` must only contain `var(--)` references, never raw values — that indirection is what makes runtime switching possible.

Switching a theme is a single DOM attribute change: `document.documentElement.setAttribute('data-theme', 'rose-pine')`. The browser matches the `[data-theme="rose-pine"]` selector, re-declares the CSS vars with new values, and the cascade re-resolves every utility on the page instantly — no JS touching individual elements, no style injection, no rebuild.

Presets are just CSS files. Each one declares a `[data-theme="name"]` block and lists only the tokens that differ from `:root`. Tokens not listed in a preset fall through to the `:root` defaults automatically via cascade. A preset can be three lines or thirty — only what changes needs to be declared.

---

## File Structure

```
styles/
├── globals.css              ← single entry: @import tailwindcss + presets + @theme inline bridge
└── preset/
    ├── rose-pine.css        ← [data-theme="rose-pine"] { ... }
    ├── catppuccin.css       ← [data-theme="catppuccin-latte"] + [data-theme="catppuccin-mocha"] { ... }
    └── nord.css             ← [data-theme="nord"] { ... }
```

Default values live directly in `globals.css` under `:root`. No separate base file needed unless the project is large enough to warrant it.

---

## globals.css

```css
@import "tailwindcss";
@import "./preset/rose-pine.css";
@import "./preset/catppuccin.css";
@import "./preset/nord.css";

/* ── Default token values (light theme) ── */
:root {
  --background: oklch(0.99 0.005 250);
  --foreground: oklch(0.15 0.02 250);
  --primary: oklch(0.5 0.22 250);
  --primary-foreground: oklch(1 0 0);
  --border: oklch(0.87 0.02 250);
  /* ...remaining tokens */
}

/* ── Bridge: Tailwind utility ↔ runtime CSS var ── */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-border: var(--border);
  /* ...mirror every token above */
}
```

> Never put raw values inside `@theme inline`. It must only contain `var(--)` references — that's what makes runtime switching work.

---

## preset/\<name\>.css

A preset only declares the tokens that differ from `:root`. Anything not listed falls through to the default.

```css
/* styles/preset/rose-pine.css */
[data-theme="rose-pine"] {
  --background: oklch(0.22 0.03 280);
  --foreground: oklch(0.89 0.02 280);
  --primary: oklch(0.72 0.16 349); /* rose */
  --primary-foreground: oklch(0.22 0.03 280);
  --border: oklch(0.35 0.04 280);
  /* no need to redeclare --font-sans, --radius-md, etc. if unchanged */
}

[data-theme="rose-pine-dawn"] {
  --background: oklch(0.96 0.01 90);
  --foreground: oklch(0.3 0.04 280);
  --primary: oklch(0.58 0.18 349);
  --primary-foreground: oklch(0.96 0.01 90);
  --border: oklch(0.82 0.03 90);
}
```

---

## Conventions

| Rule                        | Detail                                                             |
| --------------------------- | ------------------------------------------------------------------ |
| Selector                    | Always `[data-theme="name"]`, never a bare class                   |
| Scope                       | Set on `<html>` — presets cascade down to all children             |
| Token names in presets      | Semantic only: `--primary`, not `--blue-600`                       |
| Color format                | OKLCH: `oklch(L C H)` — L: 0–1, C: 0–0.37, H: 0–360                |
| Utility usage in components | `bg-primary`, `text-foreground`, `border-border` — always semantic |

---

## Adding a Preset

1. Create `styles/preset/<name>.css`, declare `[data-theme="<name>"] { }`, add only the tokens that change
2. `@import "./preset/<name>.css"` in `globals.css`
3. Activate at runtime: `document.documentElement.setAttribute('data-theme', 'rose-pine')`
