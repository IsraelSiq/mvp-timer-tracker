export interface MVP {
  id: number
  mobId: number      // mob ID no banco do RO (usado para imagem e referência)
  name: string
  map: string
  minRespawn: number // minutes
  maxRespawn: number // minutes
  priority: number   // 1-10
  notes: string
  difficulty: 'easy' | 'medium' | 'hard'  // dificuldade de matar solo/duo
  tags: MvpTag[]                           // características do MVP
}

export type MvpTag =
  | 'solo'        // pode ser morto solo
  | 'group'       // recomenda grupo
  | 'high-drop'   // card de alto valor
  | 'fast'        // respawn <= 70 min
  | 'field'       // spawn em field (sem dungeon)
  | 'disputed'    // alta disputa de outros jogadores

export type KillStatus =
  | 'alive'         // no record — assumed alive/roaming
  | 'no-record'     // legacy alias, treated same as alive
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
  killed_by_enemy?: boolean  // true = killed by rival guild, not us
}

export interface EnrichedMVP extends MVP {
  latest: KillLog | null
  status: KillStatus
  minRespawnDate: Date | null
  maxRespawnDate: Date | null
  windowProgress: number // 0-100
  score: number
}

// ── Objetivo / Modo de jogo ──────────────────────────────────────────────────
export type GoalMode =
  | 'default'       // comportamento padrão (score geral)
  | 'mvp-points'    // farmar MVP Points: prioriza fáceis, solos, respawn curto
  | 'best-drops'    // focar nos cards mais valiosos
  | 'fast-rotation' // manter o grupo ocupado: respawn mais curto primeiro
  | 'group-hunt'    // caçada em grupo: MVPs que exigem ou se beneficiam de grupo

export interface GoalConfig {
  mode: GoalMode
  label: string
  description: string
  emoji: string
}

export const GOAL_CONFIGS: GoalConfig[] = [
  {
    mode: 'default',
    label: 'Padrão',
    description: 'Prioridade geral — janelas abertas primeiro.',
    emoji: '⚔️',
  },
  {
    mode: 'mvp-points',
    label: 'Farmar MVP Points',
    description: 'Mais fáceis e rápidos primeiro — maximize kills por hora.',
    emoji: '🎯',
  },
  {
    mode: 'best-drops',
    label: 'Melhores Drops',
    description: 'Foca nos MVPs com cards de alto valor.',
    emoji: '💎',
  },
  {
    mode: 'fast-rotation',
    label: 'Rotação Rápida',
    description: 'Respawn curto em primeiro — grupo sempre em movimento.',
    emoji: '⚡',
  },
  {
    mode: 'group-hunt',
    label: 'Caçada em Grupo',
    description: 'MVPs que valem mobilizar o grupo inteiro.',
    emoji: '🛡️',
  },
]
