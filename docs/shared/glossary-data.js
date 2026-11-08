/* Glossary for HTML documents in docs/.
   One entry per term. doc.js links the first match of `match` on each page
   and shows `short` in a pop-up; docs/documents/glossary.html lists every entry.
   - id:    anchor on the glossary page (kebab-case, stable)
   - group: section on the glossary page
   - match: case-insensitive pattern for the term in page text (no flags)
   - short: one or two plain sentences (ASD-STE100 style)
   - more:  optional extra sentences for the glossary page only */

window.DOC_GLOSSARY = [
  // ---------- Work and planning ----------
  {
    id: "brief",
    term: "Brief",
    group: "Work and planning",
    match: "\\bbriefs?\\b",
    short: "A short description of the work you want done. A skill starts from it and asks questions to fill the gaps.",
  },
  {
    id: "handoff-document",
    term: "Handoff document",
    group: "Work and planning",
    match: "\\bhandoff documents?\\b",
    short: "A document that lets another person or an agent start a task with no other context. It gives the input, output, checks and limits of each task.",
    more: "calm-down assign writes one. The test: a fresh agent can start work and ask you nothing.",
  },
  {
    id: "triage-call",
    term: "Triage call",
    group: "Work and planning",
    match: "\\btriage call\\b",
    short: "The decision that puts every task into P0 (must ship), P1 (should ship) or the cut list.",
    more: "If every task is P0, the triage has not happened yet.",
  },
  {
    id: "cut-list",
    term: "Cut list",
    group: "Work and planning",
    match: "\\bcut list\\b",
    short: "The tasks you decide not to do in this run. You name them so that you can stop thinking about them.",
  },
  {
    id: "battle-plan",
    term: "Battle plan",
    group: "Work and planning",
    match: "\\bbattle plan\\b",
    short: "The output of calm-down triage: the situation, the triage call, and the P0 and P1 tasks with time estimates.",
  },
  {
    id: "grilling",
    term: "Grilling",
    group: "Work and planning",
    match: "\\bgrill(?:ing|s|ed)?\\b",
    short: "A session where the agent asks you one question at a time, each with a recommended answer, until you both agree on the plan.",
  },
  {
    id: "spec",
    term: "Spec",
    group: "Work and planning",
    match: "\\bspecs?\\b",
    short: "A document that says what is being built and why, but not how each step is done. It is usually split into tickets.",
  },
  {
    id: "ticket",
    term: "Ticket",
    group: "Work and planning",
    match: "\\btickets?\\b",
    short: "One unit of work in an issue tracker, small enough for one person or agent to finish.",
  },
  {
    id: "standup",
    term: "Standup",
    group: "Work and planning",
    match: "\\bstand-?ups?\\b",
    short: "A short daily team meeting. Each person says what they did, what they will do, and what blocks them.",
  },
  {
    id: "sprint",
    term: "Sprint",
    group: "Work and planning",
    match: "\\bsprints?\\b",
    short: "A fixed period of work, often one or two weeks, with a set of tickets the team plans to finish.",
  },

  // ---------- Writing and notes ----------
  {
    id: "evergreen-note",
    term: "Evergreen note",
    group: "Writing and notes",
    match: "\\bevergreen notes?\\b",
    short: "A note written to stay useful for a long time. It holds one idea, in your own words, and links to related notes.",
  },
  {
    id: "atomic-note",
    term: "Atomic note",
    group: "Writing and notes",
    match: "\\batomic\\b",
    short: "A note that holds exactly one idea. You can link it and reuse it without the context it came from.",
  },
  {
    id: "wikilink",
    term: "Wikilink",
    group: "Writing and notes",
    match: "\\bwikilinks?\\b",
    short: "A link to another note written as [[Note title]]. Tools such as Obsidian turn it into a link.",
  },
  {
    id: "frontmatter",
    term: "Frontmatter",
    group: "Writing and notes",
    match: "\\bfrontmatter\\b",
    short: "A block of YAML between two --- lines at the top of a Markdown file. It holds metadata such as title, tags or date.",
  },
  {
    id: "editors-notes",
    term: "Editor's Notes",
    group: "Writing and notes",
    match: "\\bEditor['’]s Notes\\b",
    short: "The short list quill-edit adds after an edit. It says what changed and why.",
  },
  {
    id: "adr",
    term: "ADR",
    group: "Writing and notes",
    match: "\\bADRs?\\b",
    short: "Architecture Decision Record. A short document that records one decision, its context, and its consequences.",
  },

  // ---------- Tools and integrations ----------
  {
    id: "mcp",
    term: "MCP",
    group: "Tools and integrations",
    match: "\\bMCP\\b",
    short: "Model Context Protocol. A standard way to connect an AI agent to an outside tool or service, such as Jira.",
  },
  {
    id: "jql",
    term: "JQL",
    group: "Tools and integrations",
    match: "\\bJQL\\b",
    short: "Jira Query Language. The search language Jira uses to find issues, for example by assignee, sprint or status.",
  },
  {
    id: "puppeteer",
    term: "Puppeteer",
    group: "Tools and integrations",
    match: "\\bPuppeteer\\b",
    short: "A Node library that controls a headless Chrome browser. Scripts use it to load a page and measure it.",
  },

  // ---------- Dependencies and security ----------
  {
    id: "install-cooldown",
    term: "Install cooldown",
    group: "Dependencies and security",
    match: "\\binstall cooldown\\b",
    short: "A rule that blocks package versions until they have been public for a set time, for example 7 days.",
    more: "Most malicious versions are found and removed within hours, so a short wait stops most of them.",
  },
  {
    id: "supply-chain-attack",
    term: "Supply-chain attack",
    group: "Dependencies and security",
    match: "\\bsupply-chain\\b",
    short: "An attack that puts malicious code into a package you depend on, so it runs when you install or use it.",
  },
  {
    id: "lockfile",
    term: "Lockfile",
    group: "Dependencies and security",
    match: "\\blockfiles?\\b",
    short: "A file that records the exact version of every installed package, so every install gets the same versions.",
  },

  // ---------- Layout and typography ----------
  {
    id: "modular-grid",
    term: "Modular grid",
    group: "Layout and typography",
    match: "\\bmodular grid\\b",
    short: "A grid with both columns and rows. Every element aligns to its lines, as in Josef Müller-Brockmann's work.",
  },
  {
    id: "baseline",
    term: "Baseline",
    group: "Layout and typography",
    match: "\\bbaselines?\\b",
    short: "The line that letters sit on. A baseline grid spaces all text on one fixed vertical rhythm.",
  },
  {
    id: "band",
    term: "Band",
    group: "Layout and typography",
    match: "\\bbands?\\b",
    short: "A full-width row of the layout. It spans all columns and gives them again to its children as a subgrid.",
  },
  {
    id: "subgrid",
    term: "Subgrid",
    group: "Layout and typography",
    match: "\\bsubgrid\\b",
    short: "A CSS Grid feature. A child grid uses the column lines of its parent, so nested elements align to the same grid.",
  },
  {
    id: "gutter",
    term: "Gutter",
    group: "Layout and typography",
    match: "\\bgutters?\\b",
    short: "The empty space between two columns.",
  },
  {
    id: "optical-alignment",
    term: "Optical alignment",
    group: "Layout and typography",
    match: "\\boptical alignment\\b",
    short: "A small shift that makes the visible ink of a letter line up, not its invisible box.",
  },
  {
    id: "side-bearing",
    term: "Side-bearing",
    group: "Layout and typography",
    match: "\\bside-bearings?\\b",
    short: "The empty space between a letter's box and its ink. Large type makes this gap visible at the column edge.",
  },
];
