export interface MVP {
  id: number
  name: string
  map: string
  minRespawn: number // minutes
  maxRespawn: number // minutes
  priority: number   // 1-10
  notes: string
}

export type KillStatus =
  | 'no-record'
  | 'far'
  | 'soon'
  | 'window-open'
  | 'window-passed'

export interface KillLog {
  id?: string
  mvp_id: number
  mvp_name: string
  killer: string
  killed_at: string  // ISO string
  note: string
  group_name: string
  created_at?: string
}

export interface EnrichedMVP extends MVP {
  latest: KillLog | null
  status: KillStatus
  minRespawnDate: Date | null
  maxRespawnDate: Date | null
  windowProgress: number // 0-100
  score: number
}
