set windows-shell := ["pwsh", "-NoLogo", "-Command"]

# install agent skills for project
# installs to .agents/ (universal) and .claude/ (claude-code); symlink .claude → .agents to share one location
install-skills:
  bunx skills@1.7.6 add mattpocock/skills#v1.3.1 --agent 'universal' --agent 'claude-code' -y -p
