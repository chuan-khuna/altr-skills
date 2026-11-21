# House style

The voice and shape of an article that teaches a topic. This file adds to the **technical-writing** and **unslop** skills. Where a rule here conflicts with one of them, this file wins, and the rule names the rule it replaces.

## Style guides

Follow these five books where the skills and this file don't cover a point. Each book owns one area:

- Teaching the reader: Steven Pinker, _The Sense of Style_. Write against the curse of knowledge, and show the reader the thing.
- Sentence clarity: Joseph M. Williams and Joseph Bizup, _Style: Lessons in Clarity and Grace_. Make the characters the subjects and the actions the verbs, and put old information before new.
- Grammar: Craig Shrives, _Smashing Grammar_.
- Usage: Kay Sayce, _What Not to Write: A Guide to the Dos and Don'ts of Good English_. Use it for misused and confused words, clichés and redundant phrases.
- Prose habits: Gary Provost, _100 Ways to Improve Your Writing_.

## The reader

The user sets the reader. Two settings describe them:

- **Background.** What the reader already knows, and what they can do after the article. It has no default. If the user doesn't give it, ask.
- **English level.** An IELTS band. The default is 6.0. See [English level](#english-level).

Write the two settings down before you draft. Keep these notes out of the article.

- Define every term this reader may not know at its first use, in one plain sentence. Then use that term everywhere (unslop 11).
- Add at most two new terms in one section. If a section needs more, split it.

## Voice

- Talk to the reader as "you", in the present tense.
- Be direct and candid. Say when a part is hard, when people often get it wrong, and which option you would pick and why.
- Keep a human voice. Contractions are fine. A short sentence after a long one is fine.
- Use "I" only for an experience the user gave you. Never invent an anecdote.
- No hype and no cheering. "This changes everything" and "powerful" teach nothing (unslop 27).

## The shape of an article

A teaching article is an explanation (Diátaxis). When the reader must build something step by step, write a tutorial and link to it. Keep how-to steps out of the article.

Use this order:

1. Open with the reader's problem or one concrete case, in two to four sentences. Don't open with history or a dictionary definition.
2. Say in one sentence what the reader will understand by the end.
3. Show a concrete example first. Then state the general rule that the example shows.
4. Build in small steps. Each section uses only what earlier sections taught.
5. Show where the idea stops working: its limits, the common mistakes, and when not to use it.
6. End with what to do next: an exercise, the next article, or the primary source. Don't restate the article (unslop 25).

## Examples

- Put an example next to every abstract claim. A claim with no example is a claim the reader can't check.
- Use one running example through the whole article when the topic allows it. A new example for every section makes the reader start again each time.
- Keep examples small and real. Code runs as written, and you show its output.
- When a mistake is common, show the wrong version beside the right one, and say what goes wrong.
- Use real numbers: "the query drops from 2.1 s to 40 ms", not "much faster" (unslop 30).

## Analogies

This section replaces unslop 32 for analogies. Unslop 32 still applies to every other figure of speech.

- Use at most one analogy for one concept.
- Give the literal explanation first. The analogy only supports it.
- Say that it is an analogy. Map each part of the analogy to the real thing.
- Say where the analogy breaks.

## Layout

- Make each heading the point of its section or the question it answers, in sentence case.
- Give each section one idea. Keep paragraphs to one to four sentences.
- Use a table when you compare several things on the same attributes.
- Use a diagram when the idea is a flow or a set of relations. Give it a caption that says what to look at.
- Add one to three questions at the end of a long article, with the answers after them. Each question tests one idea from the article, not a fact the reader can skim for.

## Language

### English level

The user can give an IELTS band or a CEFR level. Use the row for that level. For a band between two rows, use the lower row. The band-to-CEFR pairs follow the IELTS mapping: 4.0 to 5.0 is B1, 5.5 to 6.5 is B2, 7.0 to 8.0 is C1.

| IELTS | CEFR | Words | Sentences | Grammar |
| --- | --- | --- | --- | --- |
| 5.0 | B1 | Everyday words. Define every technical term, even common ones such as "API". Use a single verb, not a phrasal verb: "start", not "kick off". | Up to about 15 words. One clause where you can. | Present and past simple. Active voice only. "If" with the present only. |
| 6.0 (default) | B2 | Common words, plus field terms defined at first use. Prefer a single verb to a phrasal verb. | The technical-writing limits: about 20 words for instructions, 25 for other sentences. | Passive only when the actor is unknown or beside the point. Simple conditionals. |
| 7.0 | C1 | The field's normal vocabulary. Define only terms that belong to this topic. | The technical-writing limits. | Any grammar that stays plain. |

At every level, the Global English rules still apply. No idioms, no metaphors, and no word with two meanings.

### English spelling

- Use British spelling, as the **resume** skill does, unless the user names a publication with its own style.

### Thai

The English level setting does not apply to Thai text. The background setting still does.

- Write the prose in Thai. Keep a technical term in English when Thai developers say it in English, such as `commit`, `deploy` and `token`.
- For a term that has a common Thai spelling, such as "ฟังก์ชัน", pick one form and keep it everywhere.
- Give a short Thai explanation the first time an English term appears.
- Put a space between Thai text and English words or numbers: "ใช้ `git rebase` 2 ครั้ง".
- Use a polite, friendly register. Don't use slang, and don't use "ท่าน".
- Leave out "คุณ" when the sentence is clear without it.
- Write numbers in Arabic digits.

## Facts

- Every fact comes from the user's material or from a source you can name. Link the primary source.
- When behaviour depends on a version, state the version.
- When you can't check a fact, mark it and ask the user. Don't fill the gap with a plausible guess.

## Before you hand it over

- The first four sentences state the reader's problem or show a concrete case.
- Every new term has a definition at its first use.
- Every abstract claim has an example next to it.
- Every analogy is mapped and has its limit stated.
- The text passes every unslop rule by number, except where this file replaces a rule.
