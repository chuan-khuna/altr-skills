// Context Weather: the status line's figures as a weather band above the prompt.
//
// session.start: a first reading, history cleared.
// turn.complete: a reading after each main-loop turn (subagent turns skipped),
//   its context tokens appended to the history the chart draws.
// session.measure: refreshes the figures (rate limits move between turns)
//   without adding to the history.
// ui.render (AbovePrompt): a hairline in the forecast's color, then two rows.
//
// No timer: the band changes only when one of these events fires.

import { atom, read, update } from 'claude-code'
import type { Hook, Register } from 'claude-code'

import type { Limit, Snapshot } from '../types'
import { layout, modelName } from './layout'

const HISTORY = 12

type Api = Parameters<Hook<'session.start'>>[0]

const snapshot = atom({ plugin: 'context-weather', key: 'snapshot' } as const, null)

type Usage = {
  context: { tokens?: number; window: number; percent?: number }
  rateLimits: Limit[]
  cost?: { usd: number }
  startedAt?: number
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    await take($, { reset: true, append: false })
    return result
  })

  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    if (!e.agentId) await take($, { reset: false, append: true })
    return result
  })

  on('session.measure', async ($, e, next) => {
    const result = await next(e)
    await take($, { reset: false, append: false }, e)
    return result
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const snap = await read($, snapshot)
    if (e.props.hasSurvey || snap === null) {
      return next(e)
    }
    const { Box, Text } = $.ui.resolve(e)
    const columns = Math.max(20, e.props.bodyColumns)
    const band = layout(snap, columns - 2, await $.clock.now())
    return (
      <Box flexDirection="column">
        <Text color={band.lineColor} wrap="truncate">
          {'─'.repeat(columns)}
        </Text>
        {band.rows.map(row => (
          <Box flexDirection="row" paddingX={1}>
            {row.map(s => (
              <Text color={s.color} dimColor={s.dim} bold={s.bold} wrap="truncate">
                {s.text}
              </Text>
            ))}
          </Box>
        ))}
      </Box>
    )
  })
}

async function take(
  $: Api,
  opts: { reset: boolean; append: boolean },
  pushed?: Usage,
) {
  try {
    const usage: Usage = pushed ? { ...(await $.session.usage()), ...pushed } : await $.session.usage()
    const model = modelName(await $.session.model())
    const now: number = await $.clock.now()
    const ctx = usage.context
    if (!ctx || !ctx.window) return
    const tokens = ctx.tokens ?? 0
    const percent = Math.round(ctx.percent ?? (tokens / ctx.window) * 100)
    await update($, snapshot, prev => {
      let history = opts.reset || !prev ? [] : prev.history
      if (opts.append && tokens > 0) history = [...history, tokens].slice(-HISTORY)
      const next: Snapshot = {
        model,
        tokens,
        window: ctx.window,
        percent,
        rateLimits: usage.rateLimits ?? [],
        costUsd: usage.cost ? usage.cost.usd : null,
        startedAt: usage.startedAt ?? prev?.startedAt ?? now,
        measuredAt: now,
        history,
      }
      return next
    })
  } catch {
    // No reading this time; the band keeps the last one.
  }
}
