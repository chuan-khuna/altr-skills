# RFC: Style guides for the explainer skill

- Date: 2026-11-21
- Status: Proposed
- Area: `skills/writing/explainer/` (name not final)

## Summary

The plan is a new writing skill for articles that teach a topic. It combines **technical-writing** and **unslop** with a house style in `references/house-style.md`. This record covers the discussion so far and proposes the sources the house style draws on.

## Background

The writing group has three skills: `resume`, `technical-writing` and `unslop`. None of them covers a teaching article. `technical-writing` gives Diátaxis modes and sentence rules. `unslop` removes AI tells. Neither says how to teach: what to explain first, how to use examples, or how to check understanding.

## What was discussed

### Skill name

| Name | Verdict |
| --- | --- |
| `explainer` | Recommended. Matches the Diátaxis explanation mode. A short noun, like `resume`. |
| `teaching-article` | Clear but long. |
| `writing-article` | Too broad. The `writing-` prefix repeats the group name. |
| `lesson` | Suggests a course with exercises. |
| `tutorial` | Clashes with the Diátaxis tutorial mode. |

### House style draft

`skills/writing/explainer/references/house-style.md` exists. It covers the reader, voice, the shape of an article, examples, analogies, layout, English and Thai language, facts, and a final check. It names Craig Shrives' _Smashing Grammar_ for grammar and Gary Provost's _100 Ways to Improve Your Writing_ for prose habits.

### Problems found in the draft

1. The two books are cited by title only. A model applies a book it half remembers unevenly.
2. The Analogies section replaces unslop 32, but technical-writing also bans metaphors (Global English). The section must name both rules.
3. British spelling conflicts with the Google developer style default in technical-writing.
4. Several rules only work in English: "keep the and a", unslop 33, straight quotes, and word-count limits. Thai has no spaces between words.
5. End-of-article questions add length to short articles.

## Proposal: sources for the house style

Extract the rules into `house-style.md` as numbered lines. Keep each source as a citation, not as an instruction to "follow the book".

### Keep

| Source | What it gives |
| --- | --- |
| Craig Shrives, _Smashing Grammar_ | Grammar. Already used by `resume`. |
| Gary Provost, _100 Ways to Improve Your Writing_ | Sentence rhythm, specific detail, cutting qualifiers. Already used by `resume`. |

### Add: teaching prose

| Source | What it gives |
| --- | --- |
| Steven Pinker, _The Sense of Style_ | The curse of knowledge, and the "classic style" of showing the reader something. The main gap in the draft. |
| Joseph M. Williams and Joseph Bizup, _Style: Lessons in Clarity and Grace_ | Characters as subjects, actions as verbs, old information before new. Testable sentence rules. |
| Chip Heath and Dan Heath, _Made to Stick_ | Concrete before abstract, and the curse of knowledge from the reader's side. Supports "example first". |
| Peter C. Brown, Henry L. Roediger III and Mark A. McDaniel, _Make It Stick_ | Retrieval practice. Supports the end-of-article questions. |

### Add: usage

| Source | What it gives |
| --- | --- |
| Kay Sayce, _What Not to Write: A Guide to the Dos and Don'ts of Good English_ | Usage in British English: misused and confused words, clichés, and redundant phrases. Fills the gap between Shrives (grammar) and Provost (prose habits). |

### Add: reference style guides

| Source | What it gives |
| --- | --- |
| _New Hart's Rules_ (Oxford) | British spelling and punctuation. Settles "-ise" or "-ize". |
| GOV.UK style guide | Plain British English for readers who are not experts. |
| Microsoft Writing Style Guide | A second technical reference next to Google, for terms Google doesn't cover. |

### Add: Thai

| Source | What it gives |
| --- | --- |
| ราชบัณฑิตยสถาน, หลักเกณฑ์การเว้นวรรค | Spacing rules. Replaces the guessed spacing rule in the draft. |
| ราชบัณฑิตยสถาน, หลักเกณฑ์การใช้เครื่องหมายวรรคตอน | Punctuation in Thai text. |
| ราชบัณฑิตยสถาน, หลักเกณฑ์การทับศัพท์ภาษาอังกฤษ and ศัพท์คอมพิวเตอร์ | Thai spellings of English terms, such as "ฟังก์ชัน". |

### Verdict: the five English books

`house-style.md` names these five books. Each one owns one area, so no two books rule on the same point.

| # | Book | Area | Why it made the cut |
| --- | --- | --- | --- |
| 1 | Steven Pinker, _The Sense of Style_ | Teaching the reader | Targets the curse of knowledge, the main risk in a teaching article. |
| 2 | Joseph M. Williams and Joseph Bizup, _Style: Lessons in Clarity and Grace_ | Sentence clarity | Gives rules a reviewer can check sentence by sentence. |
| 3 | Craig Shrives, _Smashing Grammar_ | Grammar | Already used by `resume`. One grammar authority across the writing skills. |
| 4 | Kay Sayce, _What Not to Write_ | Usage | Misused words, clichés and redundant phrases in British English. No other pick covers usage. |
| 5 | Gary Provost, _100 Ways to Improve Your Writing_ | Prose habits | Already used by `resume`. Covers rhythm and specific detail. |

Cut from the shortlist:

- _Made to Stick_. Its main lesson, concrete before abstract, is already a house style rule ("Show a concrete example first").
- _Make It Stick_. It is about learning, not writing. Its one use, retrieval practice, only supports the end-of-article questions.
- _New Hart's Rules_. It would settle British spelling, but one line in the house style can do that without a sixth book.

The reference style guides (GOV.UK, Microsoft) and the Thai sources are not books in this sense, and stay as proposals.

### Exemplars, not rules

Writers to read for the target voice: Julia Evans (zines), Bartosz Ciechanowski (interactive explainers), and aihero.dev (already the style reference in `CLAUDE.md`). The house style can name them, but rules come only from the sources above.

### Rejected

- Strunk and White, _The Elements of Style_. Dated, and some rules are wrong. Provost and Williams cover the same ground better.

## Decided

- The skill combines technical-writing and unslop with a house style in `references/house-style.md`.
- The house style names five English books: Pinker, Williams and Bizup, Shrives, Sayce, and Provost. See the verdict above.
- House style rules win over technical-writing and unslop. Each override names the rule it replaces.
- `skills/writing/explainer/SKILL.md` exists under the working name `explainer`, with seven steps: read the rules, collect the inputs, check the mode, get the outline approved, draft, check, return. It is in `plugin.json` and both READMEs. Its HTML document in `docs/documents/skills/` is not written yet.

- The reader is not fixed. The user sets two things: background, which has no default and is asked for, and English level as an IELTS band, which defaults to 6.0 (CEFR B2). The house style has a table for IELTS 5.0, 6.0 and 7.0. The English level does not apply to Thai text.

## Open questions

1. Is the skill name `explainer`?
2. The English books are settled. Which of the other proposed sources go in: the reference style guides and the ราชบัณฑิตยสถาน rules?
3. Which rules from each book go into `house-style.md`? Someone must pick them, or review a proposed list.
4. British or American spelling? British matches `resume`. American matches the Google default in technical-writing.
5. Which technical-writing and unslop rules don't apply to Thai text, and what is the Thai sentence-length guide?
6. Are the per-level limits right? The sentence lengths and grammar limits in the IELTS table are proposals, not taken from a source. One possible source is the Cambridge English Vocabulary Profile, which lists words by CEFR level.
7. Is 6.0 the right default, or should the default follow the article's language and audience?
8. Above what length does an article get end-of-article questions? The suggestion is about 1,500 words.
