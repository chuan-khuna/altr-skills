# altr-skills conventions

## Structure

Skills live under `skills/<group>/`, where each group represents a purpose (e.g. `productivity/`, `engineering/`). Each group folder has a `README.md` that briefly describes the group and lists its skills.

Every group must appear in the top-level `README.md` with a short description. Skills within a group README must each have an entry linking to their `SKILL.md`.

Use markdown bullets for both groups and skills — not tables:

```
- [name](path/) — description
```

Each skill must also have an entry in `.claude-plugin/plugin.json`.

## Artifacts

LLM-generated artifacts (PRDs, issues, specs, etc.) are stored under `docs/artifacts/<category>/` using the naming convention:

```
docs/artifacts/<category>/yyyy-mm-dd-topic.md
```

Examples:
- `docs/artifacts/prd/2026-05-23-skill-creator.md`
- `docs/artifacts/issues/2026-05-23-add-git-commit-skill.md`

## References

Resources for building skills are stored in `references/`. Consult these when creating or improving skills:

- `references/The-Complete-Guide-to-Building-Skill-for-Claude.pdf` — authoritative guide covering skill structure, `SKILL.md` authoring, triggers, prompts, and best practices.
