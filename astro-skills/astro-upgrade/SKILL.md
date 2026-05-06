---
name: astro-upgrade
description: Migrate an Astro project to a newer version (v5 or v6) by reading the official migration guide and applying changes to the user's codebase. Use when the user wants to upgrade Astro, migrate to v5 or v6, or asks about breaking changes in a new Astro version.
---

# Astro Upgrade Skill

Help the user migrate their existing Astro project to a newer version. You will read the relevant migration reference, understand the user's current setup, and apply changes step by step.

## Step 1 — Gather context

Ask the user two questions (you can ask both at once):

1. **Target version** — Are you migrating to Astro v5 or v6?
2. **Package manager** — Which package manager are you using? (npm, pnpm, bun, yarn)

If the target version or package manager is already clear from context, skip the relevant question.

## Step 2 — Read the migration reference

Based on the target version, read the corresponding reference file:

- Migrating to **v5** → `references/upgrade-to-v5.md`
- Migrating to **v6** → `references/upgrade-to-v6.md`

Read the full file before proceeding. This is the authoritative guide — follow it closely.

## Step 3 — Understand the current project

Scan the project to understand what needs to change:

- Read `package.json` — note current Astro version and installed integrations
- Read `astro.config.*` — note adapters, integrations, and config options in use
- Check `src/` structure — note content collections, middleware, and any API routes

## Step 4 — Plan the migration

Before making any changes, present a migration plan to the user:

- List the Astro version bump and any integration version bumps needed
- List each breaking change from the reference that applies to this project
- Indicate which changes are automated (via `@astrojs/upgrade`) and which are manual

Ask the user to confirm before proceeding.

## Step 5 — Run the upgrade command

Run the official upgrade command first, using the user's package manager:

| Package manager | Command                     |
| --------------- | --------------------------- |
| npm             | `npx @astrojs/upgrade`      |
| pnpm            | `pnpm dlx @astrojs/upgrade` |
| bun             | `bunx @astrojs/upgrade`     |
| yarn            | `yarn dlx @astrojs/upgrade` |

Show the user the output and confirm the packages were updated correctly.

## Step 6 — Apply manual changes

Work through the applicable breaking changes from the migration reference one by one. For each change:

1. Explain what changed and why
2. Show the before/after diff
3. Apply the edit to the relevant file(s)

Group related changes together where it makes sense (e.g. all content collection changes in one pass).

## Step 7 — Verify

After all changes are applied:

- Run the dev server with the user's package manager (`npm run dev`, `pnpm dev`, `bun dev`, etc.) and report any errors
- If there are TypeScript errors, run `tsc --noEmit` and address them
- If build errors appear, run `npm run build` (or equivalent) and fix them

Report a summary of all changes made once the project is clean.

## Notes

- Never apply changes before the user confirms the migration plan in Step 4
- If a breaking change doesn't apply to this project, skip it silently
- If a change requires a decision from the user (e.g. choosing between migration paths), pause and ask
- Preserve the user's existing code style and formatting when editing files
