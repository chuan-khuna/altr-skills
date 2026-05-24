# awesome-skills.justfile
# Reusable skill installer
# Usage: just -f awesome-skills.justfile [recipe]
#
# Override defaults:
#   just -f awesome-skills.justfile skills_version=1.6.0 agent='cursor' install-all
# Windows: use PowerShell Core (pwsh) or fall back to powershell.exe

set windows-shell := ["pwsh", "-NoLogo", "-Command"]

skills_version := "1.5.0"
agent := "universal claude-code"
runner := "bunx"
run_command := runner + " skills@" + skills_version

# justfile() - return the path to the current justfile
# Install a single skill: just install-a-skill repo=<repo> skill=<skill>

# skill is optional (omit to install all skills from the repo)
install-a-skill repo skill="":
    {{ run_command }} add {{ repo }} {{ if skill != "" { "--skill " + skill } else { "" } }} --agent '{{ agent }}' -y -p

# Install all skills
install-all: install-coding install-documentation install-obsidian install-frontend

# Install coding skills
install-coding:
    just --justfile {{ justfile() }} install-a-skill repo=github/awesome-copilot skill=git-commit
    just --justfile {{ justfile() }} install-a-skill repo=mattpocock/skills skill=grill-me
    just --justfile {{ justfile() }} install-a-skill repo=mattpocock/skills skill=handoff
    just --justfile {{ justfile() }} install-a-skill repo=thananon/9arm-skills skill=scrutinize

# Install documentation skills
install-documentation:
    just --justfile {{ justfile() }} install-a-skill repo=anthropics/skills skill=doc-coauthoring

# Install Obsidian skills (installs all skills from the repo)
install-obsidian:
    just --justfile {{ justfile() }} install-a-skill repo=kepano/obsidian-skills

# Install frontend skills
install-frontend:
    just --justfile {{ justfile() }} install-a-skill repo=pbakaus/impeccable
    just --justfile {{ justfile() }} install-a-skill repo=Leonxlnx/taste-skill
    just --justfile {{ justfile() }} install-a-skill repo=vercel-labs/agent-skills skill=vercel-react-best-practices
    just --justfile {{ justfile() }} install-a-skill repo=anthropics/skills skill=frontend-design
