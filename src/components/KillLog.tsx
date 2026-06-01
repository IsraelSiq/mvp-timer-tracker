import { ScrollText } from 'lucide-react'
import type { KillLog } from '@/types'
import { formatDateTime } from '@/utils/timer'

interface Props {
  kills: KillLog[]
  groupName: string
}

export function KillLogPanel({ kills, groupName }: Props) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-body font-semibold text-rag-text text-base flex items-center gap-2">
        <ScrollText size={16} className="text-rag-blue" /> Log do grupo
      </h2>
      <p className="text-rag-muted text-xs">Registros compartilhados do grupo <strong className="text-rag-text">{groupName}</strong>.</p>
      {kills.length === 0 ? (
        <div className="border border-dashed border-rag-border rounded-lg p-6 text-center text-rag-muted text-sm">
          Ainda não há kills registradas.
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
          {kills.slice(0, 40).map((log, i) => (
            <div key={`${log.mvp_id}-${log.killed_at}-${i}`} className="bg-rag-bg border border-rag-border rounded-lg p-3">
              <strong className="text-rag-text text-sm block">{log.mvp_name} abatido por {log.killer}</strong>
              <span className="text-rag-muted text-xs">{formatDateTime(log.killed_at)} • {log.group_name}</span>
              {log.note && <p className="text-rag-muted/80 text-xs mt-1 italic">{log.note}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
