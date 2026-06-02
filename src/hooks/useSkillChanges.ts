import { useState, useEffect, useCallback } from 'react'

export interface SkillChange {
  skill: string
  iconId: string | null
  changes: string[]
}

export interface ClassSkillChanges {
  className: string
  skills: SkillChange[]
}

interface WikiResponse {
  updatedAt: string
  classes: ClassSkillChanges[]
}

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ok';    data: WikiResponse }
  | { status: 'error'; msg: string }

// Cache em memória para evitar refetch desnecessário durante a sessão
let _cache: WikiResponse | null = null

export function useSkillChanges() {
  const [state, setState] = useState<State>(
    _cache ? { status: 'ok', data: _cache } : { status: 'idle' }
  )

  const load = useCallback(async () => {
    if (_cache) {
      setState({ status: 'ok', data: _cache })
      return
    }

    setState({ status: 'loading' })
    try {
      const res = await fetch('/api/truemmo-wiki')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data: WikiResponse = await res.json()
      _cache = data
      setState({ status: 'ok', data })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro desconhecido'
      setState({ status: 'error', msg: `Não foi possível carregar as alterações de habilidades. (${msg})` })
    }
  }, [])

  // Carrega automaticamente na montagem
  useEffect(() => { load() }, [load])

  const reset = useCallback(() => {
    _cache = null
    setState({ status: 'idle' })
  }, [])

  // Helper: busca as skills de uma classe específica
  const getClassChanges = useCallback(
    (className: string): ClassSkillChanges | undefined => {
      if (state.status !== 'ok') return undefined
      return state.data.classes.find(
        c => c.className.toLowerCase() === className.toLowerCase()
      )
    },
    [state]
  )

  // Helper: monta URL do ícone da skill a partir do iconId
  const getSkillIconUrl = useCallback(
    (iconId: string | null): string | null => {
      if (!iconId) return null
      return `https://wiki.truemmo.com.br/images/S${iconId}.png`
    },
    []
  )

  return { state, load, reset, getClassChanges, getSkillIconUrl }
}
