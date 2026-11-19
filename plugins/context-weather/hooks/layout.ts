// Pure layout for the context-weather band: no `$`, so tests call it directly.
//
// layout(snapshot, columns, now) returns the hairline color and two rows of
// spans. The render hook maps each span to a Text.

import type { Limit, Snapshot } from '../types'

export type Span = { text: string; color?: string; dim?: boolean; bold?: boolean }
export type Band = { lineColor: string; rows: Span[][] }

const BARS = '▁▂▃▄▅▆▇█'

// Context forecast, by percent of the window used.
export const FORECAST = [
  { upTo: 25, icon: '☀', word: 'Clear', color: 'cyan' },
  { upTo: 50, icon: '☁', word: 'Cloudy', color: 'blue' },
  { upTo: 75, icon: '☂', word: 'Showers', color: 'yellow' },
  { upTo: 90, icon: '☇', word: 'Storm', color: 'magenta' },
  { upTo: Infinity, icon: '↯', word: 'Compact soon', color: 'red' },
] as const

export type Forecast = (typeof FORECAST)[number]

export function forecastFor(percent: number): Forecast {
  return FORECAST.find(f => percent < f.upTo) ?? FORECAST[4]
}

// Rate-limit weather: calm / warm / hot.
export type Level = 'calm' | 'warm' | 'hot'
export const LEVEL = {
  calm: { icon: '☀', color: 'cyan' },
  warm: { icon: '☂', color: 'yellow' },
  hot: { icon: '☇', color: 'red' },
} as const

export function fiveHourLevel(percent: number): Level {
  if (percent >= 80) return 'hot'
  if (percent >= 50) return 'warm'
  return 'calm'
}

export type Pace = { use: number | null; left: number | null; level: Level }

// 7d burn: use = %/h spent since the window opened, left = %/h budget to reach
// the reset at 100%. Level by use ÷ left: > 1.2 hot, 0.8–1.2 warm, else calm.
export function sevenDayPace(percent: number, resetsAtMs: number, now: number): Pace {
  const leftH = Math.max(0, (resetsAtMs - now) / 3_600_000)
  const elapsedH = 168 - leftH
  const use = elapsedH >= 1 ? percent / elapsedH : null
  const left = leftH > 0 ? (100 - percent) / leftH : null
  let level: Level = 'calm'
  if (use !== null && left !== null && left > 0) {
    const ratio = use / left
    if (ratio > 1.2) level = 'hot'
    else if (ratio >= 0.8) level = 'warm'
  } else if (left === null && percent >= 100) {
    level = 'hot'
  }
  return { use, left, level }
}

// ▓ per full 10%, ▒ for a remainder of 5% or more, ░ for the rest.
export function bar(percent: number, width = 10): string {
  const pct = Math.max(0, Math.min(100, Math.round(percent)))
  let filled = Math.min(width, Math.floor(pct / 10))
  let out = '▓'.repeat(filled)
  if (pct - filled * 10 >= 5 && filled < width) {
    out += '▒'
    filled += 1
  }
  return out + '░'.repeat(width - filled)
}

// "52k" / "1.2M" / "1M".
export function short(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000
    return `${Number.isInteger(m) ? m : m.toFixed(1)}M`
  }
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`
  return String(n)
}

// "mm:ss" under an hour, "hh:mm:ss" past it.
export function duration(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const two = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${two(h)}:${two(m)}:${two(s)}` : `${two(m)}:${two(s)}`
}

// Time until a reset: "3d02h" / "2h30m" / "45m" / "now".
export function until(resetsAtMs: number, now: number): string {
  const diff = Math.floor((resetsAtMs - now) / 1000)
  if (diff <= 0) return 'now'
  const d = Math.floor(diff / 86400)
  const h = Math.floor((diff % 86400) / 3600)
  const m = Math.floor((diff % 3600) / 60)
  const two = (n: number) => String(n).padStart(2, '0')
  if (d > 0) return `${d}d${two(h)}h`
  if (h > 0) return `${h}h${two(m)}m`
  return `${m}m`
}

// "claude-opus-5-5[1m]" → "Opus 5.5". A name that already reads as one is kept.
export function modelName(raw: string): string {
  const s = raw.trim()
  if (!s.startsWith('claude-')) return s
  const parts = s
    .replace(/^claude-/, '')
    .replace(/\[.*?\]$/, '')
    .replace(/-\d{8}$/, '')
    .split('-')
  const words: string[] = []
  let digits: string[] = []
  const flush = () => {
    if (digits.length) words.push(digits.join('.'))
    digits = []
  }
  for (const p of parts) {
    if (/^\d+$/.test(p)) digits.push(p)
    else {
      flush()
      words.push(p.charAt(0).toUpperCase() + p.slice(1))
    }
  }
  flush()
  return words.join(' ')
}

// Bars scale to the biggest reading shown, so growth shows at any fill.
export function chart(history: number[]): string {
  if (history.length === 0) return ''
  const top = Math.max(...history, 1)
  return history
    .map(t => BARS[Math.min(BARS.length - 1, Math.floor((t / top) * (BARS.length - 1)))])
    .join('')
}

export function delta(history: number[]): string {
  if (history.length < 2) return ''
  const d = (history[history.length - 1] ?? 0) - (history[history.length - 2] ?? 0)
  if (d > 0) return `▲+${short(d)}`
  if (d < 0) return `▼${short(-d)}`
  return '='
}

const width = (spans: Span[]) => spans.reduce((n, s) => n + [...s.text].length, 0)

function limitSpans(limits: Limit[], now: number, withPace: boolean): Span[] {
  const out: Span[] = []
  const five = limits.find(l => l.kind === 'five_hour')
  const seven = limits.find(l => l.kind === 'seven_day')
  if (five) {
    const lv = LEVEL[fiveHourLevel(five.percentUsed)]
    out.push({ text: `${lv.icon} `, color: lv.color }, { text: '5h ', dim: true })
    out.push({ text: `${Math.round(five.percentUsed)}%`, color: lv.color })
    if (five.resetsAt) out.push({ text: ` ⟳${until(Date.parse(five.resetsAt), now)}`, dim: true })
  }
  if (seven) {
    if (out.length) out.push({ text: '   ' })
    const resets = seven.resetsAt ? Date.parse(seven.resetsAt) : NaN
    const pace = Number.isNaN(resets) ? null : sevenDayPace(seven.percentUsed, resets, now)
    const lv = LEVEL[pace ? pace.level : fiveHourLevel(seven.percentUsed)]
    out.push({ text: `${lv.icon} `, color: lv.color }, { text: '7d ', dim: true })
    out.push({ text: `${Math.round(seven.percentUsed)}%`, color: lv.color })
    if (pace) {
      out.push({ text: ` ⟳${until(resets, now)}`, dim: true })
      if (withPace) {
        const f = (n: number | null) => (n === null ? '–' : n.toFixed(2))
        out.push({ text: ' · use ', dim: true }, { text: `${f(pace.use)}%/h`, color: lv.color })
        out.push({ text: ` · left ${f(pace.left)}%/h`, dim: true })
      }
    }
  }
  return out
}

// Narrow widths drop, in order: use/left, then the chart, then the delta.
export function layout(snap: Snapshot, columns: number, now: number): Band {
  const f = forecastFor(snap.percent)
  const model: Span[] = snap.model ? [{ text: snap.model, bold: true }, { text: '   ' }] : []
  const context: Span[] = [
    { text: `${f.icon} ${f.word} `, color: f.color, bold: true },
    { text: bar(snap.percent), color: f.color },
    { text: ` ${snap.percent}%`, color: f.color },
    { text: ` ${short(snap.tokens)}/${short(snap.window)}`, dim: true },
  ]
  const lastTurn = (withChart: boolean, withDelta: boolean): Span[] => {
    const c = withChart ? chart(snap.history) : ''
    const d = withDelta ? delta(snap.history) : ''
    if (!c && !d) return []
    const out: Span[] = [{ text: '   ' }]
    if (c) out.push({ text: c, color: f.color })
    if (c && d) out.push({ text: ' ' })
    if (d) out.push({ text: d }, { text: ' last turn', dim: true })
    return out
  }
  const right: Span[] = [{ text: duration(snap.measuredAt - snap.startedAt), dim: true }]
  if (snap.costUsd !== null) right.push({ text: ` · $${snap.costUsd.toFixed(2)}`, dim: true })

  const row2 = (withPace: boolean): Span[] => {
    const left = limitSpans(snap.rateLimits, now, withPace)
    const gap = Math.max(left.length ? 3 : 0, columns - width(left) - width(right))
    return [...left, { text: ' '.repeat(gap) }, ...right]
  }

  const steps: [boolean, boolean, boolean][] = [
    [true, true, true],
    [false, true, true],
    [false, false, true],
    [false, false, false],
  ]
  let rows: Span[][] = []
  for (const [withPace, withChart, withDelta] of steps) {
    rows = [[...model, ...context, ...lastTurn(withChart, withDelta)], row2(withPace)]
    if (rows.every(r => width(r) <= columns)) break
  }
  return { lineColor: f.color, rows }
}
