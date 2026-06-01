import type { KillLog, KillStatus, EnrichedMVP, MVP } from '@/types'

export function getStatus(killAt: string | null, min: number, max: number, now: number): KillStatus {
  if (!killAt) return 'no-record'
  const minTime = new Date(killAt).getTime() + min * 60_000
  const maxTime = new Date(killAt).getTime() + max * 60_000
  if (now < minTime) {
    return (minTime - now) <= 15 * 60_000 ? 'soon' : 'far'
  }
  if (now <= maxTime) return 'window-open'
  return 'window-passed'
}

export function formatRemaining(ms: number): string {
  if (ms <= 0) return 'agora'
  const total = Math.floor(ms / 1000)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return [h ? `${h}h` : null, m ? `${m}m` : null, `${s}s`].filter(Boolean).join(' ')
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('pt-BR')
}

export function enrichMVP(mvp: MVP, logs: KillLog[], now: number): EnrichedMVP {
  const latest = logs.find(l => l.mvp_id === mvp.id) ?? null
  const status = getStatus(latest?.killed_at ?? null, mvp.minRespawn, mvp.maxRespawn, now)

  const minRespawnDate = latest
    ? new Date(new Date(latest.killed_at).getTime() + mvp.minRespawn * 60_000)
    : null
  const maxRespawnDate = latest
    ? new Date(new Date(latest.killed_at).getTime() + mvp.maxRespawn * 60_000)
    : null

  const totalWindowMs = Math.max(1, (mvp.maxRespawn - mvp.minRespawn) * 60_000)
  const elapsedSinceMin = latest
    ? now - (new Date(latest.killed_at).getTime() + mvp.minRespawn * 60_000)
    : 0
  const windowProgress = latest ? Math.min(100, Math.max(0, (elapsedSinceMin / totalWindowMs) * 100)) : 0

  const score = (() => {
    if (!latest) return 0
    if (status === 'window-open')  return 100 + mvp.priority * 10
    if (status === 'soon')         return 70  + mvp.priority * 8
    if (status === 'far')          return 25  + mvp.priority * 5
    return 10
  })()

  return { ...mvp, latest, status, minRespawnDate, maxRespawnDate, windowProgress, score }
}
