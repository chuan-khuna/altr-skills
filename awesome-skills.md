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
-a 'universal' -a 'claude-code' -y -p
```

## Coding Skills

Sources:

- https://github.com/mattpocock/skills
- https://github.com/thananon/9arm-skills
- https://github.com/multica-ai/andrej-karpathy-skills

```bash
npx skills add github/awesome-copilot --skill git-commit -a 'universal' -a 'claude-code' -y -p
npx skills add mattpocock/skills --skill grill-me -a 'universal' -a 'claude-code' -y -p
npx skills add mattpocock/skills --skill handoff -a 'universal' -a 'claude-code' -y -p
npx skills add thananon/9arm-skills --skill scrutinize -a 'universal' -a 'claude-code' -y -p

npx skills add multica-ai/andrej-karpathy-skills -a 'universal' -a 'claude-code' -y -p
```

Mattpocock's sets

```bash
npx skills add mattpocock/skills --skill 'handoff grill-me grill-with-docs to-prd to-issues' -a 'universal' -a 'claude-code' -y -p
```


## Documentation Skills

```bash
npx skills add anthropics/skills --skill doc-coauthoring -a 'universal' -a 'claude-code' -y -p
```

## Obsidian Skills

```bash
# Installs all skills from the repo
npx skills add kepano/obsidian-skills -a 'universal' -a 'claude-code' -y -p
```

## Frontend Skills

Sources:

- https://vercel.com/docs/agent-resources/skills
- https://www.usehallmark.com/
- https://impeccable.style/

```bash
# Design taste skills
npx skills add pbakaus/impeccable -a 'universal' -a 'claude-code' -y -p
npx skills add Leonxlnx/taste-skill -a 'universal' -a 'claude-code' -y -p
npx skills add nutlope/hallmark -a 'universal' -a 'claude-code' -y -p

# Vercel skills
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices -a 'universal' -a 'claude-code' -y -p
npx skills add vercel-labs/agent-skills --skill web-design-guidelines -a 'universal' -a 'claude-code' -y -p
npx skills add vercel/components.build --skill building-components -a 'universal' -a 'claude-code' -y -p
npx skills add vercel-labs/agent-browser -a 'universal' -a 'claude-code' -y -p

npx skills add anthropics/skills --skill frontend-design -a 'universal' -a 'claude-code' -y -p
```

## Other Tools & Skills Worth Exploring

- https://github.com/nexu-io/open-design
- https://github.com/different-ai/openwork
- https://github.com/virattt/dexter
- https://github.com/himself65/finance-skills
