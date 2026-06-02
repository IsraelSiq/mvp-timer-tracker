import { useState, useCallback, useMemo } from 'react'
import type { JobChain, SkillNode } from '@/data/skillTrees'

export type AllocMap = Record<number, number> // skillId → nível alocado

const TIER_POINTS: [number, number, number, number] = [50, 70, 50, 60]

export function useSkillSimulator(job: JobChain | null) {
  const [alloc, setAlloc] = useState<AllocMap>({})

  const reset = useCallback(() => setAlloc({}), [])

  // Pontos gastos por tier
  const spent = useMemo((): [number, number, number, number] => {
    if (!job) return [0, 0, 0, 0]
    const result: [number, number, number, number] = [0, 0, 0, 0]
    for (const skill of job.skills) {
      result[skill.tier - 1] += alloc[skill.id] ?? 0
    }
    return result
  }, [alloc, job])

  const available = useMemo(
    () => TIER_POINTS.map((max, i) => max - spent[i]) as [number, number, number, number],
    [spent]
  )

  // Verifica se os pré-requisitos de uma skill estão satisfeitos
  const isUnlocked = useCallback(
    (skill: SkillNode): boolean => {
      return skill.requires.every(req => (alloc[req.id] ?? 0) >= req.minLevel)
    },
    [alloc]
  )

  // Calcula os pontos mínimos necessários para desbloquear uma skill
  // Retorna um mapa de skillId → nível mínimo a alocar
  const calcMinPath = useCallback(
    (targetId: number): AllocMap => {
      if (!job) return {}
      const skillMap = Object.fromEntries(job.skills.map(s => [s.id, s]))
      const path: AllocMap = {}

      function resolve(id: number, minLevel: number) {
        const skill = skillMap[id]
        if (!skill) return
        const current = alloc[id] ?? 0
        const needed = Math.max(current, minLevel)
        if ((path[id] ?? 0) >= needed) return
        path[id] = needed
        for (const req of skill.requires) {
          resolve(req.id, req.minLevel)
        }
      }

      resolve(targetId, 1)
      return path
    },
    [alloc, job]
  )

  // Aloca 1 ponto na skill (com auto-path se necessário)
  const allocate = useCallback(
    (skillId: number, autoPath = false) => {
      if (!job) return
      const skill = job.skills.find(s => s.id === skillId)
      if (!skill) return

      if (autoPath || !isUnlocked(skill)) {
        const path = calcMinPath(skillId)
        setAlloc(prev => {
          const next = { ...prev }
          for (const [idStr, level] of Object.entries(path)) {
            const id = Number(idStr)
            next[id] = Math.max(next[id] ?? 0, level)
          }
          // Incrementa a skill alvo além do mínimo se já desbloqueada
          const targetCurrent = next[skillId] ?? 0
          if (targetCurrent < skill.maxLevel) next[skillId] = targetCurrent + 1
          return next
        })
      } else {
        // Já desbloqueada: apenas incrementa se tiver ponto disponível
        const current = alloc[skillId] ?? 0
        if (current >= skill.maxLevel) return
        const tierIdx = skill.tier - 1
        if (available[tierIdx] <= 0) return
        setAlloc(prev => ({ ...prev, [skillId]: current + 1 }))
      }
    },
    [alloc, available, isUnlocked, calcMinPath, job]
  )

  // Remove 1 ponto da skill (se não quebrar pré-requisitos de outras)
  const deallocate = useCallback(
    (skillId: number) => {
      if (!job) return
      const current = alloc[skillId] ?? 0
      if (current <= 0) return
      // Verifica se alguma outra skill depende desse nível
      const wouldBreak = job.skills.some(s =>
        s.requires.some(req => req.id === skillId && req.minLevel >= current && (alloc[s.id] ?? 0) > 0)
      )
      if (wouldBreak) return
      setAlloc(prev => ({ ...prev, [skillId]: current - 1 }))
    },
    [alloc, job]
  )

  return { alloc, spent, available, isUnlocked, allocate, deallocate, reset }
}
