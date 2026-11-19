import { expect, test } from 'claude-code/testing'

const NOW = Date.UTC(2026, 10, 5, 12)
const SNAP = {
  model: 'Opus 5.5',
  tokens: 134_400,
  window: 200_000,
  percent: 67,
  rateLimits: [{ kind: 'five_hour', percentUsed: 12, resetsAt: new Date(NOW + 9_000_000).toISOString() }],
  costUsd: 1.23,
  startedAt: NOW - 754_000,
  measuredAt: NOW,
  history: [36_100, 134_400],
}

const BAND = {
  plugin: 'context-weather',
  component: 'AbovePrompt',
  props: { hasSurvey: false, isWorking: false, maxRows: 20, bodyColumns: 100, scroll: { offset: 0, bodyRows: 20 }, view: {} },
} as const

test('the band draws the hairline and both rows', async ($, on) => {
  on('state.get', () => ({ value: { value: SNAP, version: 1 } }))
  on('clock.now', () => ({ value: NOW }))
  const ui = await $.ui.mount({ ...BAND, surface: 'terminal' })
  expect((await ui.find({ type: 'Text', text: /^─+$/ }))?.text.length).toBe(100)
  expect((await ui.find({ type: 'Text', text: /Showers/ }))?.text).toBe('☂ Showers ')
  expect((await ui.find({ type: 'Text', text: /\$1\.23/ }))?.text).toBe(' · $1.23')
  await ui.unmount()
})

test('with no reading yet the band is left to the engine', async ($, on) => {
  on('ui.render', ($, e) => {
    const { Text } = $.ui.resolve(e)
    return <Text>engine</Text>
  })
  const ui = await $.ui.mount({ ...BAND, surface: 'terminal' })
  expect((await ui.find({ type: 'Text', text: /engine/ }))?.text).toBe('engine')
  await ui.unmount()
})
