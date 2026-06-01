import { useEffect, useState, useCallback } from 'react'
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

  const merge = useCallback((incoming: KillLog[]) => {
    setKills(current => {
      const map = new Map(current.map(k => [`${k.mvp_id}-${k.killed_at}`, k]))
      for (const k of incoming) map.set(`${k.mvp_id}-${k.killed_at}`, k)
      const sorted = Array.from(map.values()).sort(
        (a, b) => new Date(b.killed_at).getTime() - new Date(a.killed_at).getTime()
      )
      writeLocal(sorted)
      return sorted
    })
  }, [])

  useEffect(() => {
    if (!supabase) return
    let channel: ReturnType<typeof supabase.channel>

    async function boot() {
      const { data, error } = await supabase!
        .from('mvp_kills')
        .select('*')
        .eq('group_name', groupName)
        .order('killed_at', { ascending: false })
        .limit(200)

      if (!error && data) {
        merge(data as KillLog[])
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
          merge([payload.new as KillLog])
        })
        .subscribe()
    }

    boot()
    return () => { channel && supabase!.removeChannel(channel) }
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
