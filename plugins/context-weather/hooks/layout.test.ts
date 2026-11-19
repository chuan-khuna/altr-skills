import { expect, test } from 'claude-code/testing'

import type { Snapshot } from '../types'
import {
  bar,
  chart,
  delta,
  duration,
  fiveHourLevel,
  forecastFor,
  layout,
  modelName,
  sevenDayPace,
  short,
  until,
} from './layout'

const H = 3_600_000
const NOW = Date.UTC(2026, 10, 5, 12)

const text = (row: { text: string }[] | undefined) => (row ?? []).map(s => s.text).join('')

function snap(over: Partial<Snapshot> = {}): Snapshot {
  return {
    model: 'Opus 5.5',
    tokens: 134_400,
    window: 200_000,
    percent: 67,
    rateLimits: [
      { kind: 'five_hour', percentUsed: 12, resetsAt: new Date(NOW + 2.5 * H).toISOString() },
      { kind: 'seven_day', percentUsed: 41, resetsAt: new Date(NOW + 74.5 * H).toISOString() },
    ],
    costUsd: 1.234,
    startedAt: NOW - 754_000,
    measuredAt: NOW,
    history: [10_000, 20_000, 36_100, 134_400],
    ...over,
  }
}

test('forecast bands cut at 25/50/75/90 with the agreed colors', async () => {
  expect(forecastFor(0).word).toBe('Clear')
  expect(forecastFor(0).color).toBe('cyan')
  expect(forecastFor(25).word).toBe('Cloudy')
  expect(forecastFor(25).color).toBe('blue')
  expect(forecastFor(74).word).toBe('Showers')
  expect(forecastFor(74).color).toBe('yellow')
  expect(forecastFor(75).color).toBe('magenta')
  expect(forecastFor(90).word).toBe('Compact soon')
  expect(forecastFor(90).color).toBe('red')
})

test('bar uses full, half and empty blocks', async () => {
  expect(bar(0)).toBe('░░░░░░░░░░')
  expect(bar(67)).toBe('▓▓▓▓▓▓▒░░░')
  expect(bar(64)).toBe('▓▓▓▓▓▓░░░░')
  expect(bar(100)).toBe('▓▓▓▓▓▓▓▓▓▓')
})

test('5h level by percent', async () => {
  expect(fiveHourLevel(49)).toBe('calm')
  expect(fiveHourLevel(50)).toBe('warm')
  expect(fiveHourLevel(80)).toBe('hot')
})

test('7d pace compares spend rate with the budget left', async () => {
  // 41% used, 74.5h to reset: elapsed 93.5h → use 0.44, left 0.79 → calm.
  const calm = sevenDayPace(41, NOW + 74.5 * H, NOW)
  expect(calm.level).toBe('calm')
  expect(calm.use?.toFixed(2)).toBe('0.44')
  expect(calm.left?.toFixed(2)).toBe('0.79')
  // 50% used at the halfway mark: ratio 1 → warm.
  expect(sevenDayPace(50, NOW + 84 * H, NOW).level).toBe('warm')
  // 80% used at the halfway mark: ratio 4 → hot.
  expect(sevenDayPace(80, NOW + 84 * H, NOW).level).toBe('hot')
  // Window reset already passed and fully used → hot.
  expect(sevenDayPace(100, NOW - H, NOW).level).toBe('hot')
})

test('number and time formats', async () => {
  expect(short(134_400)).toBe('134k')
  expect(short(200_000)).toBe('200k')
  expect(short(1_000_000)).toBe('1M')
  expect(short(1_250_000)).toBe('1.3M')
  expect(duration(754_000)).toBe('12:34')
  expect(duration(3_754_000)).toBe('01:02:34')
  expect(until(NOW + 2.5 * H, NOW)).toBe('2h30m')
  expect(until(NOW + 74.5 * H, NOW)).toBe('3d02h')
  expect(until(NOW + 45 * 60_000, NOW)).toBe('45m')
  expect(until(NOW - 1, NOW)).toBe('now')
})

test('model ids become short names', async () => {
  expect(modelName('claude-opus-5-5')).toBe('Opus 5.5')
  expect(modelName('claude-opus-5-5[1m]')).toBe('Opus 5.5')
  expect(modelName('claude-haiku-4-5-20251001')).toBe('Haiku 4.5')
  expect(modelName('Opus 5.5')).toBe('Opus 5.5')
})

test('chart and delta of the recent turns', async () => {
  expect(chart([50, 100])).toBe('▄█')
  expect(delta([36_100, 134_400])).toBe('▲+98k')
  expect(delta([134_400, 36_100])).toBe('▼98k')
  expect(delta([1])).toBe('')
})

test('wide band: model, context, last turn; then limits with time and cost at the right', async () => {
  const band = layout(snap(), 118, NOW)
  expect(band.lineColor).toBe('yellow')
  expect(band.rows.length).toBe(2)
  const r1 = text(band.rows[0])
  const r2 = text(band.rows[1])
  expect(r1).toBe('Opus 5.5   ☂ Showers ▓▓▓▓▓▓▒░░░ 67% 134k/200k   ▁▂▂█ ▲+98k last turn')
  expect(r2.startsWith('☀ 5h 12% ⟳2h30m   ☀ 7d 41% ⟳3d02h · use 0.44%/h · left 0.79%/h')).toBe(true)
  expect(r2.endsWith('12:34 · $1.23')).toBe(true)
  expect([...r2].length).toBe(118)
})

test('narrow widths drop use/left, then the chart, then the delta', async () => {
  const at = (cols: number) => {
    const rows = layout(snap(), cols, NOW).rows
    return [text(rows[0]), text(rows[1])] as const
  }
  const [r1a, r2a] = at(77)
  expect(r2a.includes('use')).toBe(false)
  expect(r1a.includes('▁▂▂█')).toBe(true)
  const [r1b] = at(64)
  expect(r1b.includes('▁▂▂█')).toBe(false)
  expect(r1b.includes('▲+98k')).toBe(true)
  const [r1c] = at(50)
  expect(r1c).toBe('Opus 5.5   ☂ Showers ▓▓▓▓▓▓▒░░░ 67% 134k/200k')
})

test('no rate limits: row 2 is only time and cost, at the right', async () => {
  const r2 = text(layout(snap({ rateLimits: [], costUsd: null }), 40, NOW).rows[1])
  expect(r2).toBe(' '.repeat(35) + '12:34')
})
