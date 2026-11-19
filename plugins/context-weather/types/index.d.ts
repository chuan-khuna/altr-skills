export type Limit = { kind: string; percentUsed: number; resetsAt?: string }

export type Snapshot = {
  model: string
  tokens: number
  window: number
  percent: number
  rateLimits: Limit[]
  costUsd: number | null
  startedAt: number
  measuredAt: number
  history: number[]
}

declare module 'claude-code' {
  interface PluginState {
    'context-weather': { snapshot: Snapshot | null }
  }
}
