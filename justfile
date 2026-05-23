set windows-shell := ["pwsh", "-NoLogo", "-Command"]

# install agent skills for project
# installs to .agents/ (universal) and .claude/ (claude-code); symlink .claude → .agents to share one location
install-skills:
    bunx skills@1.5.0 add anthropics/skills --skill skill-creator --agent 'universal claude-code' -y -p
    bunx skills@1.5.0 add github/awesome-copilot --skill git-commit --agent 'universal claude-code' -y -p
    bunx skills@1.5.0 add mattpocock/skills --skill grill-me --agent 'universal claude-code' -y -p
