import type { EnrichedMVP, GoalMode } from '@/types'

/**
 * Calcula score específico por objetivo.
 * Quanto maior o score, mais alto o MVP aparece na lista.
 */
export function goalScore(mvp: EnrichedMVP, mode: GoalMode): number {
  const isAvailable = mvp.status === 'alive' || mvp.status === 'no-record' || mvp.status === 'window-open' || mvp.status === 'soon'
  const availableBonus = isAvailable ? 1000 : 0

  switch (mode) {
    case 'mvp-points': {
      // Objetivo: maximizar número de kills → prioriza fáceis, solos e respawn curto
      const diffScore = mvp.difficulty === 'easy' ? 300 : mvp.difficulty === 'medium' ? 150 : 0
      const soloBonus  = mvp.tags.includes('solo') ? 200 : 0
      const fastBonus  = mvp.tags.includes('fast') ? 150 : 0
      const respawnBonus = Math.max(0, 200 - mvp.minRespawn) // quanto menor o respawn, maior o bônus
      const disputedPenalty = mvp.tags.includes('disputed') ? -200 : 0
      return availableBonus + diffScore + soloBonus + fastBonus + respawnBonus + disputedPenalty
    }

    case 'best-drops': {
      // Objetivo: cards mais valiosos → prioriza high-drop e priority alta
      const dropBonus = mvp.tags.includes('high-drop') ? 500 : 0
      const prioBonus = mvp.priority * 30
      return availableBonus + dropBonus + prioBonus
    }

    case 'fast-rotation': {
      // Objetivo: grupo sempre ocupado → menor respawn primeiro
      const respawnScore = Math.max(0, 300 - mvp.minRespawn)
      const fastBonus = mvp.tags.includes('fast') ? 200 : 0
      return availableBonus + respawnScore + fastBonus
    }

    case 'group-hunt': {
      // Objetivo: caçada em grupo → prioriza MVPs que valem o esforço de grupo
      const groupBonus  = mvp.tags.includes('group') ? 400 : 0
      const dropBonus   = mvp.tags.includes('high-drop') ? 200 : 0
      const prioBonus   = mvp.priority * 20
      return availableBonus + groupBonus + dropBonus + prioBonus
    }

    default:
      // 'default' — comportamento original do EnrichedMVP.score
      return mvp.score
  }
}
