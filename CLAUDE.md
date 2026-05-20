# altr-skills conventions

## Structure

Skills live under `skills/<group>/`, where each group represents a purpose (e.g. `productivity/`, `engineering/`). Each group folder has a `README.md` that briefly describes the group and lists its skills.

Every group must appear in the top-level `README.md` with a short description. Skills within a group README must each have an entry linking to their `SKILL.md`.

Use markdown bullets for both groups and skills — not tables:

```
- [name](path/) — description
```

Each skill must also have an entry in `.claude-plugin/plugin.json`.

## Reference guide to create skills

- [The Complete Guide to Building Skills for Claude](references/The-Complete-Guide-to-Building-Skill-for-Claude.pdf)
