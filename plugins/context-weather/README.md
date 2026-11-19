# Context Weather

A Claude Code mod that draws your status line's figures as a weather band above the prompt. It sits beside your own status line, so you can keep both or turn either off.

```text
──────────────────────────────────────────────────────────────────────────────────── (forecast color)
 Opus 5.5   ☂ Showers ▓▓▓▓▓▓▒░░░ 67% 134k/200k   ▁▂▂▃▅▆█ ▲+98k last turn
 ☀ 5h 12% ⟳2h30m   ☀ 7d 41% ⟳3d02h · use 0.44%/h · left 0.79%/h          12:34 · $1.23
```

- **Hairline:** drawn the full width, in the color of the current forecast.
- **Row 1:** the model, then the context forecast with its bar, percent and tokens used of the window, then a chart of the last 12 turns and how much the last turn added.
- **Row 2:** the 5-hour and 7-day rate limits, each with its weather and time to reset, and the 7-day burn rate (`use` is %/h spent since the window opened; `left` is the %/h you can still spend before it resets). The session time and cost sit at the right.

## Forecasts

| Context used | Forecast | Color |
|---|---|---|
| under 25% | ☀ Clear | cyan |
| 25–49% | ☁ Cloudy | blue |
| 50–74% | ☂ Showers | yellow |
| 75–89% | ☇ Storm | magenta |
| 90% up | ↯ Compact soon | red |

| Rate limit | ☀ cyan | ☂ yellow | ☇ red |
|---|---|---|---|
| 5h, by percent used | under 50% | 50–79% | 80% up |
| 7d, by pace (use ÷ left) | under 0.8 | 0.8–1.2 | over 1.2 |

When the band is narrow, it drops `use/left` first, then the chart, then the last-turn delta. The model and the context figures always stay. If there are no rate-limit figures (for example, when you're not on a subscription), the 5h and 7d section is hidden.

## Hooks

| Hook | What it does |
|---|---|
| `session.start` | Takes a first reading and clears the history. |
| `turn.complete` | Takes a reading after each main-loop turn and adds it to the chart. Subagent turns are skipped. |
| `session.measure` | Refreshes the figures when the engine measures the session, for example when a rate-limit window moves. It doesn't add to the chart. |
| `ui.render` on `AbovePrompt` | Draws the band. While a survey is showing, it hands the band back to Claude Code. |

The figures come from `$.session.usage()` (context, rate limits, cost and `startedAt`) and `$.session.model()`. The band has no timer, so it changes only when one of these events fires. The session time is measured at the last reading.

## Install

```text
/plugin install context-weather --marketplace chuan-khuna/altr-stack
```

## Run it

```bash
claude plugin validate ./plugins/context-weather
claude plugin test ./plugins/context-weather
claude --plugin-dir ./plugins/context-weather
```

You need Claude Code 2.1.318 or later, running in a terminal (`AbovePrompt` isn't drawn on every surface).

## Notes

- The percentage is of the full window. Claude Code's own "context used" notice measures against the auto-compact point, so the two can differ.
- The chart's bars are relative to the biggest turn shown. The percentage is the absolute figure.
- The history clears when the session starts.
