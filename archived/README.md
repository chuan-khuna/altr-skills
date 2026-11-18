# Archived skills

Skills that are no longer in use. The altr-skills plugin does not ship them.

The folder uses Claude's skill layout: `skills/<skill>/SKILL.md`, with no group folders. Claude Code loads a folder like this as a plugin with no manifest, under the name `archived`.

## Use an archived skill

To try every archived skill for one session:

```bash
claude --plugin-dir archived
```

To use one skill in another project, copy its folder into that project's `.claude/skills/`:

```bash
cp -r archived/skills/<skill> <project>/.claude/skills/
```

## Restore a skill

1. Move the folder back into a group: `git mv archived/skills/<skill> skills/<group>/<skill>`.
2. Add `./skills/<group>/<skill>` to `.claude-plugin/plugin.json`.
3. Add the skill to `skills/<group>/README.md`.
4. Move its document from `docs/documents/skills/archived/` back to `docs/documents/skills/`, and fix its relative links.
5. Add its card to `docs/documents/skills/INDEX.html` and its bullet to `docs/documents/INDEX.md`.
6. Remove it from this README.

## Skills

Each skill shows the group it was in before it moved here. Its old document is in [`docs/documents/skills/archived/`](../docs/documents/skills/archived/).

### work

- [calm-down](skills/calm-down/SKILL.md) — Two modes: `assign` writes a handoff document that a teammate or agent can pick up cold, and `triage` turns urgent work into a prioritised battle plan.
- [harden-js-dependencies](skills/harden-js-dependencies/SKILL.md) — Set an install cooldown so new npm versions wait before you can install them.
- [jira-standup-meeting](skills/jira-standup-meeting/SKILL.md) — Query Jira for a start-of-day summary of your tasks, with recommendations.
- [progress-summary](skills/progress-summary/SKILL.md) — Turn raw notes or a git log into a short update for Jira or Discord.

### productivity

- [evergreen-note-writer](skills/evergreen-note-writer/SKILL.md) — Make evergreen notes from one or more sources and save them to files.
- [quill-edit](skills/quill-edit/SKILL.md) — Rephrase and correct English text with British English conventions.
- [revise-prompt](skills/revise-prompt/SKILL.md) — Refine a rough idea into a clear, ready-to-use prompt.
- [write-doc](skills/write-doc/SKILL.md) — Write a Markdown document from a conversation or from a codebase feature.

### design

- [brockmann-grid-system](skills/brockmann-grid-system/SKILL.md) — Align an editorial page to a Müller-Brockmann modular grid, and prove 0px adherence with a Puppeteer harness.
