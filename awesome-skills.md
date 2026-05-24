# Awesome Skills

A personal curation of agent skills I use across projects. These are skills from various authors that I've found useful and install regularly. Organized by category for quick reference.

## Installation

Use either `npx` or `bunx` to install skills:

```bash
npx skills@latest add <repo> --skill <skill-name>
bunx skills@latest add <repo> --skill <skill-name>
```

To install at the project level (saves to `.agents/` and symlinks to `.claude/`), append these flags to any install command:

```bash
--agent 'universal claude-code' -y -p
```

## Coding Skills

Sources:

- https://github.com/mattpocock/skills
- https://github.com/thananon/9arm-skills
- https://github.com/multica-ai/andrej-karpathy-skills

```bash
bunx skills@1.5.0 add github/awesome-copilot --skill git-commit --agent 'universal claude-code' -y -p
bunx skills@1.5.0 add mattpocock/skills --skill grill-me --agent 'universal claude-code' -y -p
bunx skills@1.5.0 add mattpocock/skills --skill handoff --agent 'universal claude-code' -y -p
bunx skills@1.5.0 add thananon/9arm-skills --skill scrutinize --agent 'universal claude-code' -y -p

bunx skills@1.5.0 add multica-ai/andrej-karpathy-skills --agent 'universal claude-code' -y -p
```

## Documentation Skills

```bash
bunx skills@1.5.0 add anthropics/skills --skill doc-coauthoring --agent 'universal claude-code' -y -p
```

## Obsidian Skills

```bash
# Installs all skills from the repo
bunx skills@1.5.0 add kepano/obsidian-skills --agent 'universal claude-code' -y -p
```

## Frontend Skills

Sources:

- https://vercel.com/docs/agent-resources/skills
- https://www.usehallmark.com/
- https://impeccable.style/

```bash
# Design taste skills
bunx skills@1.5.0 add pbakaus/impeccable --agent 'universal claude-code' -y -p
bunx skills@1.5.0 add Leonxlnx/taste-skill --agent 'universal claude-code' -y -p
bunx skills@1.5.0 add nutlope/hallmark --agent 'universal claude-code' -y -p

# Vercel skills
bunx skills@1.5.0 add vercel-labs/agent-skills --skill vercel-react-best-practices --agent 'universal claude-code' -y -p
bunx skills@1.5.0 add vercel-labs/agent-skills --skill web-design-guidelines --agent 'universal claude-code' -y -p
bunx skills@1.5.0 add vercel/components.build --skill building-components --agent 'universal claude-code' -y -p
bunx skills@1.5.0 add vercel-labs/agent-browser --agent 'universal claude-code' -y -p

bunx skills@1.5.0 add anthropics/skills --skill frontend-design --agent 'universal claude-code' -y -p
```

## Other Tools & Skills Worth Exploring

- https://github.com/nexu-io/open-design
- https://github.com/different-ai/openwork
- https://github.com/virattt/dexter
- https://github.com/himself65/finance-skills
