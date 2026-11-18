# Agent skills by ALTR

## Marketplace

This repo (`chuan-khuna/altr-stack`) is a **Claude Code plugin marketplace** called `altr-stack`. It is defined in [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json).

Add the marketplace once:

```bash
claude plugin marketplace add chuan-khuna/altr-stack
```

Then install a plugin from it as `<plugin>@altr-stack`.

## Available plugins

Some skills are copied from other projects. [CREDITS.md](CREDITS.md) lists each one with its source and version.

### `altr-skills`

Version 0.1.0. Writing skills: resume, technical-writing and unslop. Manifest: [`.claude-plugin/plugin.json`](.claude-plugin/plugin.json).

- [resume](skills/writing/resume/SKILL.md) — Write and proofread resume content in British English, by the Harvard and Guardian CV rules.
- [technical-writing](skills/writing/technical-writing/SKILL.md) — Four-layer standard for docs, PRs and commits: Diátaxis, Google style, STE and Global English.
- [unslop](skills/writing/unslop/SKILL.md) — Cut AI tells from any writing.

The skills run with the plugin name in front, for example `/altr-skills:resume`. All three set `disable-model-invocation: true`, so they run only when you call them by name.

## How to install

### As a Claude Code plugin

For your user:

```bash
claude plugin marketplace add chuan-khuna/altr-stack
claude plugin install altr-skills@altr-stack
```

For a project:

```bash
claude plugin marketplace add chuan-khuna/altr-stack --scope project
claude plugin install altr-skills@altr-stack --scope project
```

`--scope project` writes both settings to `.claude/settings.json` in your project. Commit that file, and everyone who clones the project is offered the plugin.

From a local clone, install for this repo only:

```bash
mise run plugins
```

After you change a skill, refresh the marketplace with `claude plugin marketplace update altr-stack`.

### As plain skills

```bash
npx skills add https://github.com/chuan-khuna/altr-stack
bunx skills add https://github.com/chuan-khuna/altr-stack
```

## Install skills for this repository

Install the vendored skills that this repo uses while you work on it:

```bash
mise run skills
```
