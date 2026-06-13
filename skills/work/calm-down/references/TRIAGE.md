# Triage mode

Help the user slow down, decompose urgent work, and act from clarity instead of panic.

## Opening

Name the task and time remaining in one sentence:

> You've got {X hours} to {task}. Let's take 5 minutes to think so the next {X−0.5} go faster.

Then propose the task breakdown using `AskUserQuestion`.

## Grilling order (≤ 6 questions)

The user is under pressure — keep it short. Provide your recommended answer with each question.

1. What already exists? (code, designs, data, partial work — "nothing yet" is valid)
2. What information or assets are still missing that you'll need to gather?
3. Is anyone's approval or input required, and when?
4. Any hard technical constraints? (stack, system compatibility, access restrictions)

Skip questions the brief already answers. Stop as soon as you have enough — don't fill the quota.

## Approach suggestion

Before generating, suggest tools, framework, or method for each task in 1–2 sentences. Be opinionated — one direction, not a list. Let the user push back.

## Output

Use the `triage` section of [assign-format.md](assign-format.md). Save to `docs/yyyy-mm-dd-{topic}-triage.{md,html}`.

For **html**, follow the same process as ASSIGN.md — copy the boilerplate, fill in placeholders, use `.callout.warn` for blockers and missing info.
