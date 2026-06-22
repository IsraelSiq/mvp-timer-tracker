import { useState } from 'react'
import { Swords, Skull, MapPin, ChevronDown } from 'lucide-react'
import type { EnrichedMVP } from '@/types'
import { StatusBadge } from './StatusBadge'
import { MvpDetailsPanel } from './MvpDetailsPanel'
import { formatRemaining, formatDateTime } from '@/utils/timer'
import { getMapName } from '@/data/mapNames'

interface Props {
  // Accept both `item` (internal) and `mvp` (Dashboard usage) for compatibility
  item?: EnrichedMVP
  mvp?: EnrichedMVP
  now: number
  onKill: (item: EnrichedMVP) => void
  onEnemyKill: (item: EnrichedMVP, killedAt: string) => void
  player?: string
}

const DIFFICULTY_LABEL = {
  easy:   { label: 'Fácil',   className: 'text-green-400  border-green-700/40  bg-green-900/20'  },
  medium: { label: 'Médio',   className: 'text-yellow-400 border-yellow-700/40 bg-yellow-900/20' },
  hard:   { label: 'Difícil', className: 'text-red-400    border-red-700/40    bg-red-900/20'    },
}
