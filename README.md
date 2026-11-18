# Agent skills by ALTR

## Groups

- [writing](skills/writing/) — Writing standards and editors for resumes, docs and any prose.

Skills no longer in use live in `archived/skills/<skill>/`. The plugin does not ship them.

Copied skills, with their source and version, are listed in [CREDITS.md](CREDITS.md).

## Install skills for this repository

```
mise run skills
```

## How to install

### As a Claude Code plugin

```bash
claude plugin marketplace add chuan-khuna/altr-skills --scope project
claude plugin install altr-skills@altr-stack --scope project
```

`--scope project` writes both settings to `.claude/settings.json` in your project. Commit that file, and everyone who clones the project is offered the plugin. Leave the flag out to install for your user only.

From a local clone, install for this repo only:

```bash
mise run plugins
```

### As plain skills

```bash
npx skills add https://github.com/chuan-khuna/altr-skills
bunx skills add https://github.com/chuan-khuna/altr-skills
```
