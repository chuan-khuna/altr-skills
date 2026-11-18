# Awesome Skills

## mise.toml

```toml
[tools]
bun = "1.4.4"

[tasks.skills]
description = "Install the vendored agent skills"
run = [
  "bunx skills add mattpocock/skills#v1.3.2  --agent 'universal' --agent 'claude-code' -y -p",
  "bunx skills add thananon/9arm-skills --agent 'universal' --agent 'claude-code' -y -p",
]
```

## Coding

- [mattpocock/skills](https://github.com/mattpocock/skills) — Workflow skills such as grill-me, grill-with-docs and handoff.
- [thananon/9arm-skills](https://github.com/thananon/9arm-skills) — Engineering skills for debugging, post-mortems, code review and delegating simple tasks.
- [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) — A CLAUDE.md with four coding rules: think first, keep it simple, make surgical changes, work to a goal.
- [github/awesome-copilot](https://github.com/github/awesome-copilot) — Community collection of agent instructions and skills, including git-commit.
- [cursor/plugins — pstack](https://github.com/cursor/plugins/tree/main/pstack) — Playbooks for bug fixes, features, refactors and performance work, started with `/poteto-mode`.

## Documentation

- [anthropics/skills](https://github.com/anthropics/skills) — Anthropic's official skills, including doc-coauthoring and frontend-design.
- [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) — Skills for working with Obsidian vaults, notes and formats.

## Frontend & Design

- [pbakaus/impeccable](https://github.com/pbakaus/impeccable) · [site](https://impeccable.style/) — Design vocabulary and commands that improve the look of frontend output.
- [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) — Builds polished websites with a consistent design system, real images and browser checks.
- [nutlope/hallmark](https://github.com/nutlope/hallmark) · [site](https://www.usehallmark.com/) — Builds web pages with a non-generic look and lints them for common AI design patterns.
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) — Vercel skills, including react-best-practices and web-design-guidelines.
- [vercel/components.build](https://github.com/vercel/components.build) — Guidelines for building reusable UI components.
- [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) — Browser automation for agents.
- [Vercel agent skills docs](https://vercel.com/docs/agent-resources/skills) — Vercel's documentation for its agent skills.
- [Müller-Brockmann grid systems](https://github.com/alex-hyperagent/hyperagent-public-skills/blob/main/skill-muller-brockmann-grid-systems.json) — Builds editorial pages on a Müller-Brockmann modular grid and checks the alignment.
- [nexu-io/open-design](https://github.com/nexu-io/open-design) — Local-first workspace where people and agents make prototypes, sites, decks, images and videos.

### Visual explainers

- [MrBongoC/ai-iso-skill](https://github.com/MrBongoC/ai-iso-skill) — Draws an object as an interactive isometric line drawing in a single HTML file, with parts you can press.
- [iso-glow](https://isoglow.dev/) — Builds on ai-iso-skill: draws an object, device or building as an isometric line drawing whose switched-on parts glow.
- [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy) · [site](https://skills.wheresryan.sh/anatomy) — Turns a one-line idea into an interactive isometric machine that shows how the idea works.
- [tinycharts](https://april-zhu.com/tinycharts) — Turns a plain-language description into a hand-drawn, clickable chart whose buttons follow the rules of the real process. Free tier with 9 chart types; Pro is paid.
- [kevintngo/statechart-art](https://github.com/kevintngo/statechart-art) — Example project, not a skill: four statecharts about a boba shop, checked in TLA+ and drawn as code-made art with a `/statechart` skill.

## Other

- [different-ai/openwork](https://github.com/different-ai/openwork) — Open-source desktop app, built on OpenCode, that lets agents work on your local files.
- [virattt/dexter](https://github.com/virattt/dexter) — AI agent that does multi-step financial research with live market data.
- [himself65/finance-skills](https://github.com/himself65/finance-skills) — Skills for financial analysis and trading, such as stock valuation and earnings analysis.
