---
name: jira-daily-standup-meeting
description: Query Jira for a start-of-day summary of your tasks. Use when the user says "start of day", "morning standup", "what are my tasks today", "what's on my plate", "daily summary", or asks for a Jira task overview.
---

# Jira Daily Standup Skill

Produce a structured morning summary of the user's Jira tasks, followed by automatic recommendations for the day, using the **Atlassian Rovo MCP Server**.

## Prerequisites

The Atlassian Rovo MCP Server must be configured and authenticated via OAuth 2.1 (`https://mcp.atlassian.com/v1/mcp`). If tools from this MCP server are not available, let the user know and stop.

## Workflow

### Step 1 — Ask for the Jira username

Before querying anything, ask the user:

> "What's your Jira username or email address?"

Wait for the answer. Use it in the next step.

### Step 2 — Resolve account ID and query Jira

First, look up the user's Jira account ID using `lookupJiraAccountId` with the provided username/email. Use the returned `accountId` (not the display name) in all JQL queries — this ensures precise filtering.

Then run the following two JQL queries **in parallel** using `searchJiraIssuesUsingJql`:

1. **Active sprint issues:**
   ```
   assignee = "{accountId}" AND project = "Tech Team" AND sprint in openSprints() ORDER BY status ASC
   ```
2. **Recently updated (last 7 days):**
   ```
   assignee = "{accountId}" AND project = "Tech Team" AND updated >= -7d ORDER BY updated DESC
   ```

Request these fields on every issue:
`summary`, `status`, `priority`, `description`, `updated`, `customfield_10020`, `customfield_10014`, `parent`

> `customfield_10020` is the sprint array — it contains all sprints an issue has been in, plus each sprint's `endDate` and `state`.
> `customfield_10014` is the Epic Link (classic projects). For next-gen projects, the epic is the `parent` field. Use whichever is populated to resolve the epic name — this is displayed as the **project name** for each issue.

### Step 3 — Deduplicate

Merge the two result sets using the Jira issue key as the unique identifier. Sprint issues take precedence — the Recently Updated section only shows issues **not** already captured in the sprint list.

### Step 4 — Derive signals

Before generating any output, compute the following from the raw data. These signals drive the recommendations in Step 6.

| Signal                  | How to detect                                                                                                                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Sprint end date**     | Find the sprint object in `customfield_10020` where `state = "active"` → read its `endDate`. Calculate days remaining from today. |
| **Review bottleneck**   | Count issues with status `"Ready to Review"`.                                                                                     |
| **Carry-over items**    | Issues where `customfield_10020` array length ≥ 3 (has been in 3 or more sprints).                                                |
| **Stalled In Progress** | Issues with status `"In Progress"` whose `updated` field is more than 3 days ago.                                                 |
| **Blocker signal**      | Issues whose `summary` or `description` contains the word "blocked" or "block".                                                   |

### Step 5 — Present the task summary

Output a Markdown summary with these sections, omitting any that have no issues:

```
## 🗓️ My Jira Tasks — [Today's date]

### 🔴 In Progress
- **[KEY-123]** Summary · *Priority* · `Epic Name` · [link]

### 🟠 Ready to Review
- **[KEY-456]** Summary · *Priority* · `Epic Name` · [link]

### 🟡 To Do
- **[KEY-789]** Summary · *Priority* · `Epic Name` · [link]

### ✅ Done
- **[KEY-000]** Summary · *Priority* · `Epic Name` · [link]

### 🔵 Recently Updated (outside sprint)
- **[KEY-999]** Summary · *Priority* · `Epic Name` · [link]
```

- Link each issue key to its Jira URL
- Show priority in italics
- Show the epic name (resolved from `customfield_10014` or `parent`) as a `code span` label — this serves as the project name for each issue. Omit if no epic is set.
- If no issues are found in any section, say so clearly

### Step 6 — Recommendations

Immediately after the task summary, generate a `## 📋 Recommendations` section. This is **automatic** — do not wait for the user to ask.

Use the signals from Step 4. Omit any sub-section that has no relevant findings.

```
---

## 📋 Recommendations

### ⚠️ Sprint health
- Sprint ends in N days (DATE) — X items are not yet Done
- N items in Ready to Review — consider pinging reviewers today

### 🔁 Carry-overs to address
- **KEY-XXX** has been carried across N sprints — start, re-scope, or defer before the sprint closes
- **KEY-YYY** has no description — fill it in or remove it from the sprint

### 🔵 Stalled items
- **KEY-XXX** has been In Progress for N days without an update — is it blocked?

### 🎯 Suggested focus for today
1. [highest-urgency action]
2. ...
3. ...
```

**Rules for generating the focus order:**

1. If Ready to Review count ≥ 3 and sprint ends in ≤ 5 days → "Chase reviews: ping reviewers for KEY-X, KEY-Y, …" is item 1
2. Any In Progress items → "Wrap up and move to Ready to Review" comes next
3. Carry-over To Do items with no description → "Add description or defer KEY-X before sprint closes"
4. Carry-over To Do items with a description → "Start KEY-X (carried N sprints — now or never)"
5. Remaining To Do items → list in order of apparent urgency from their summaries

### Step 7 — Optional follow-up

After the recommendations, briefly offer:

> "Want me to look into any of these in more detail, or update a status?"

Do not write anything to any file unless the user explicitly asks.
