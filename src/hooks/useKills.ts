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

export function useKills(groupName: string) {
  const [kills, setKills] = useState<KillLog[]>(readLocal)
  const [synced, setSynced] = useState(false)

  // Stable ref so merge never needs to be re-created
  const setKillsRef = useRef(setKills)
  setKillsRef.current = setKills

  const merge = useCallback((incoming: KillLog[]) => {
    setKillsRef.current(current => {
      const map = new Map(current.map(k => [`${k.mvp_id}-${k.killed_at}`, k]))
      for (const k of incoming) map.set(`${k.mvp_id}-${k.killed_at}`, k)
      const sorted = Array.from(map.values()).sort(
        (a, b) => new Date(b.killed_at).getTime() - new Date(a.killed_at).getTime()
      )
      writeLocal(sorted)
      return sorted
    })
  }, []) // stable — no deps needed thanks to ref

  useEffect(() => {
    // Bug #1 fix: reset to local cache and mark as unsynced whenever group changes
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
        .limit(200)

      // Bug #2 fix: ignore response if effect already cleaned up (race condition)
      if (!active) return

      if (!error && data) {
        // Replace state with the remote data for this group (not merge, to avoid
        // cross-group pollution from the previous localStorage read)
        const sorted = (data as KillLog[]).sort(
          (a, b) => new Date(b.killed_at).getTime() - new Date(a.killed_at).getTime()
        )
        setKills(sorted)
        writeLocal(sorted)
        setSynced(true)
      }

      channel = supabase!
        .channel('mvp-kills-' + groupName)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'mvp_kills',
          filter: `group_name=eq.${groupName}`,
        }, payload => {
          if (active) merge([payload.new as KillLog])
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
    merge([entry])
    if (!supabase) return
    const { error } = await supabase.from('mvp_kills').insert({
      mvp_id:     entry.mvp_id,
      mvp_name:   entry.mvp_name,
      killer:     entry.killer,
      killed_at:  entry.killed_at,
      note:       entry.note,
      group_name: entry.group_name,
    })
    if (error) toast.error('Falha ao gravar no Supabase; salvo localmente.')
  }, [merge])

  const clearLocal = useCallback(() => {
    setKills([])
    writeLocal([])
  }, [])

  return { kills, synced, addKill, clearLocal }
}
