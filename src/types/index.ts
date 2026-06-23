export type MvpElement =
  | 'Neutro'
  | 'Água'
  | 'Terra'
  | 'Fogo'
  | 'Vento'
  | 'Veneno'
  | 'Sagrado'
  | 'Sombra'
  | 'Fantasma'
  | 'Morto-vivo'

export type MvpSize = 'Pequeno' | 'Médio' | 'Grande'

export interface MvpMap {
  label: string  // ex: 'Campos de Prontera'
  id: string     // ex: 'prt_field08'
}

export interface MVP {
  id: number
  mobId: number
  aegisName?: string
  name: string
  /** Mapa principal (legado — mantido para compatibilidade) */
  map: string
  /** Lista completa de mapas de spawn. Se vazio, usa `map`. */
  maps?: MvpMap[]
  minRespawn: number
  maxRespawn: number
  priority: number
  notes: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: MvpTag[]
  mvpPoints?: number
  image?: string
  gifUrl?: string
  element?: MvpElement
  size?: MvpSize
  /** Elemento fraco (recebe mais dano) */
  weakness?: MvpElement
}

export type MvpTag =
  | 'solo'
  | 'group'
  | 'high-drop'
  | 'fast'
  | 'field'
  | 'disputed'
  | 'server-exclusive'
  | 'truemmo-exclusive'

export type KillStatus = 'mvp' | 'window-open' | 'soon' | 'far'

export interface KillLog {
  id?: string
  mvp_id: number
  mvp_name: string
  killer: string
  killed_at: string
  note: string
  group_name: string
  created_at?: string
  killed_by_enemy?: boolean
  /** Mapa onde o MVP foi morto (quando tem múltiplos spawns) */
  map_id?: string
}

export interface EnrichedMVP extends MVP {
  latest: KillLog | null
  status: KillStatus
  minRespawnDate: Date | null
  maxRespawnDate: Date | null
  windowProgress: number
  score: number
}

export type GoalMode =
  | 'default'
  | 'mvp-points'
  | 'best-drops'
  | 'fast-rotation'
  | 'group-hunt'

export interface GoalConfig {
  mode: GoalMode
  label: string
  description: string
  emoji: string
}

export const GOAL_CONFIGS: GoalConfig[] = [
  { mode: 'default',        label: 'Padrao',             description: 'Prioridade geral — janelas abertas primeiro.',                  emoji: '⚔️' },
  { mode: 'mvp-points',     label: 'Farmar MVP Points',  description: 'Mais faceis e rapidos primeiro — maximize kills por hora.',    emoji: '🎯' },
  { mode: 'best-drops',     label: 'Melhores Drops',     description: 'Foca nos MVPs com cards de alto valor.',                       emoji: '💎' },
  { mode: 'fast-rotation',  label: 'Rotacao Rapida',     description: 'Respawn curto em primeiro — grupo sempre em movimento.',       emoji: '⚡️' },
  { mode: 'group-hunt',     label: 'Cacada em Grupo',    description: 'MVPs que valem mobilizar o grupo inteiro.',                    emoji: '🤝' },
]
