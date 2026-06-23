import { useEffect, useState, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import type { KillLog } from '@/types'
import toast from 'react-hot-toast'

const LS_KEY = 'rag-mvp-kills'

function readLocal(): KillLog[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]') } catch { return [] }
}
function writeLocal(kills: KillLog[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(kills))
}

/**
 * Chave de deduplicação.
 * Usa `id` (UUID gerado no cliente) quando disponível —
 * garante match mesmo após o Postgres arredondar o timestamp.
 * Fallback para mvp_id|killed_at para logs antigos sem id.
 */
function killKey(k: KillLog): string {
  return k.id ?? `${k.mvp_id}|${k.killed_at}`
}

export function useKills(groupName: string) {
  const [kills, setKills] = useState<KillLog[]>(readLocal)
  const [synced, setSynced] = useState(false)

  const setKillsRef = useRef(setKills)
  setKillsRef.current = setKills

  const merge = useCallback((incoming: KillLog[]) => {
    setKillsRef.current(current => {
      const map = new Map(current.map(k => [killKey(k), k]))
      for (const k of incoming) map.set(killKey(k), k)
      const sorted = Array.from(map.values()).sort(
        (a, b) => new Date(b.killed_at).getTime() - new Date(a.killed_at).getTime()
      )
      writeLocal(sorted)
      return sorted
    })
  }, [])

  useEffect(() => {
    setKills(readLocal())
    setSynced(false)

    if (!supabase) return

    let active = true
    let channel: ReturnType<typeof supabase.channel>

    async function boot() {
      const { data, error } = await supabase!
        .from('mvp_kills')
        .select('*')
        .eq('group_name', groupName)
        .order('killed_at', { ascending: false })
        .limit(500)

      if (!active) return

      if (!error && data) {
        const sorted = (data as KillLog[]).sort(
          (a, b) => new Date(b.killed_at).getTime() - new Date(a.killed_at).getTime()
        )
        setKills(sorted)
        writeLocal(sorted)
        setSynced(true)
      } else if (error) {
        console.error('[useKills] Supabase error:', error.message, error.details, error.hint)
      }

      channel = supabase!
        .channel('mvp-kills-' + groupName)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'mvp_kills',
          filter: `group_name=eq.${groupName}`,
        }, payload => {
          if (!active) return
          const incoming = payload.new as KillLog
          setKillsRef.current(current => {
            // Guard: se o id já existe localmente, é o insert que nós mesmos fizemos
            const exists = current.some(k => killKey(k) === killKey(incoming))
            if (exists) return current
            const map = new Map(current.map(k => [killKey(k), k]))
            map.set(killKey(incoming), incoming)
            const sorted = Array.from(map.values()).sort(
              (a, b) => new Date(b.killed_at).getTime() - new Date(a.killed_at).getTime()
            )
            writeLocal(sorted)
            return sorted
          })
        })
        .subscribe()
    }

    boot()

    return () => {
      active = false
      channel && supabase!.removeChannel(channel)
    }
  }, [groupName, merge])

  const addKill = useCallback(async (entry: KillLog) => {
    // Gera UUID no cliente para deduplicação determinística
    const id = entry.id ?? crypto.randomUUID()
    const entryWithId: KillLog = { ...entry, id }

    merge([entryWithId])  // merge local imediato

    if (!supabase) return

    const { error } = await supabase.from('mvp_kills').insert({
      id,
      mvp_id:          entryWithId.mvp_id,
      mvp_name:        entryWithId.mvp_name,
      killer:          entryWithId.killer,
      killed_at:       entryWithId.killed_at,
      note:            entryWithId.note,
      group_name:      entryWithId.group_name,
      killed_by_enemy: entryWithId.killed_by_enemy ?? false,
    })
    if (error) toast.error('Falha ao gravar no Supabase; salvo localmente.')
  }, [merge])

  const clearLocal = useCallback(() => {
    setKills([])
    writeLocal([])
  }, [])

  return { kills, synced, addKill, clearLocal }
}
