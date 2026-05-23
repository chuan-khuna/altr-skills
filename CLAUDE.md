# altr-skills conventions

## Structure

Skills live under `skills/<group>/`, where each group represents a purpose (e.g. `productivity/`, `engineering/`). Each group folder has a `README.md` that briefly describes the group and lists its skills.

Every group must appear in the top-level `README.md` with a short description. Each skill entry must link the skill name to its `SKILL.md`.

Each skill must also have an entry in `.claude-plugin/plugin.json`.

## References

Resources for building skills are stored in `.references/`. Consult these when creating or improving skills:

- `.references/The-Complete-Guide-to-Building-Skill-for-Claude.pdf` — authoritative guide covering skill structure, `SKILL.md` authoring, triggers, prompts, and best practices.
