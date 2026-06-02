import { useState, useCallback } from 'react'
import { fetchMonster } from '@/lib/divinePride'
import type { DPMonster } from '@/lib/divinePride'

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ok';    data: DPMonster }
  | { status: 'error'; msg: string }

export function useMvpDetails() {
  const [state, setState] = useState<State>({ status: 'idle' })

  const load = useCallback(async (mobId: number) => {
    setState({ status: 'loading' })
    const data = await fetchMonster(mobId)
    if (data) {
      setState({ status: 'ok', data })
    } else {
      setState({ status: 'error', msg: 'Não foi possível carregar dados do Divine Pride.' })
    }
  }, [])

  const reset = useCallback(() => setState({ status: 'idle' }), [])

  return { state, load, reset }
}
