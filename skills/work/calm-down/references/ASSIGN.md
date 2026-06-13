# Assign mode

Produce a handoff document a teammate or AI agent can pick up without prior context.

## Grilling order

1. **Context and trigger** — cover only what the brief doesn't already make clear:
   - What triggered this work?
   - What has already been done, if anything?
   - Any hard constraints, deadlines, or dependencies?

2. **Per-task specifics** — for each confirmed task:
   - Concrete input to start (paths, systems, access, prior outputs)
   - Specific output when done (artifact, state, or verifiable outcome)
   - How the assignee knows it's complete (command to run, state to observe)
   - What is easy to get wrong or likely to block

3. **Scope boundary** — confirm what is explicitly out of scope for each task.

Aim for 6–12 questions. Stop when you could hand the document to a fresh agent and they would know exactly what to do, how to verify it, and what to avoid.

## Output

For **md**, use the `assign` section of [assign-format.md](assign-format.md).

For **html**, copy `html_boilerplate.html` to `docs/yyyy-mm-dd-{topic}.html`, then edit in place:

- Replace `{Topic}` (in `<title>` and `<h1>`) and `{YYYY-MM-DD}`.
- Fill the Background and Current State `<p>` placeholders.
- Replace the example `<article class="task-card">` with one per task (`id="task-1"`, etc., keep `spy-target`).
- Mirror each task in the TOC `<ul class="toc-sub">` with a matching `href`.
- Add `<pre><code class="language-*">` or `<div class="diagram-wrapper"><pre class="mermaid">` inside task cards only where needed. Uncomment the mermaid `<script>` block only if a diagram is present.
- Real gotcha → `<div class="callout warn"><span class="callout-label">Heads up</span><p>…</p></div>`. Already-done state → `.callout.done`. Blue for all other accents — do not repurpose red/green decoratively.
- Leave `<style>` and the shiki / scroll-spy scripts untouched.

The boilerplate implements the full design system in [DESIGN.md](DESIGN.md). Do not re-derive the CSS.
