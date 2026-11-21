---
name: explainer
description: Write an article that teaches a topic to a reader who is new to it, in English or Thai, with technical-writing, unslop and a house style.
disable-model-invocation: true
---

# Explainer

Help the user write an article that teaches one topic to the reader the user sets. After one read, that reader understands the topic well enough to use it or to explain it back. The user gives a topic, notes, sources or a draft. You return the article, ready to publish.

The rules come from these sources, in this order of precedence:

1. The house style in [references/house-style.md](references/house-style.md). Where it replaces a rule from a skill below, it names that rule.
2. The **technical-writing** and **unslop** skills.

## Steps

1. Read the **technical-writing** and **unslop** skills and [references/house-style.md](references/house-style.md) in full.
2. Find out the topic, the reader's background, the language (English or Thai), the English level and the sources. Take what the user already gave. Ask only for what is missing, in one message. The English level defaults to IELTS 6.0. Say the default in the message so the user can change it.
3. Check the mode. If the reader must build something step by step, tell the user that this is a tutorial or a how-to, and stop. An explainer is an explanation.
4. Write an outline in the order of the house style's "The shape of an article". Give each section a heading, its one idea, and the example it uses. Show the outline to the user and wait for approval.
5. Write the article from the approved outline. Every fact comes from the user's material or from a source you can name. Where a fact is missing, keep a marked gap and add a question. Don't fill the gap with a guess.
6. Check the article against the house style's "Before you hand it over" list, and against every unslop rule by number. The step is done when no line fails a rule.
7. Return the article. After it, list the facts the user must check and the questions you have.

## When the user gives a draft

Skip step 4. Keep the user's structure unless it breaks the house style's order. If it does, say which part breaks it and propose a new order before you rewrite. After the article, list each change that altered a fact or dropped a claim. The user stays the author, so make each change easy to accept or reject.
