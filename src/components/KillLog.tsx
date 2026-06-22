import { ScrollText, Sword, Skull } from 'lucide-react'
import type { KillLog } from '@/types'
import { formatDateTime } from '@/utils/timer'

interface Props {
  kills: KillLog[]
  groupName?: string
}

export function KillLogPanel({ kills, groupName }: Props) {
  return (
    <aside className="w-72 shrink-0 flex flex-col gap-0 border-l border-rag-border bg-rag-surface h-[calc(100vh-8rem)] sticky top-0 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-rag-border flex items-center justify-between">
        <h2 className="font-body font-semibold text-rag-text text-sm flex items-center gap-2">
          <ScrollText size={14} className="text-rag-blue" /> Log do grupo
        </h2>
        {groupName && (
          <span className="text-rag-muted text-xs truncate max-w-[120px]" title={groupName}>
            #{groupName}
          </span>
        )}
      </div>

      {/* Entries */}
      {kills.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-rag-muted px-4 text-center">
          <Sword size={24} className="text-rag-faint" />
          <p className="text-xs">Nenhuma kill registrada ainda.</p>
          <p className="text-xs text-rag-faint">Registre kills para ver o log aqui.</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto flex flex-col divide-y divide-rag-border">
          {kills.slice(0, 60).map((log, i) => (
            <div
              key={`${log.mvp_id}-${log.killed_at}-${i}`}
              className="px-4 py-3 flex flex-col gap-0.5 hover:bg-rag-surface2 transition-colors"
            >
              {/* Jogador */}
              <div className="flex items-center gap-1.5">
                {log.killed_by_enemy ? (
                  <Skull size={11} className="text-red-400 shrink-0" />
                ) : (
                  <Sword size={11} className="text-green-400 shrink-0" />
                )}
                <span className={`text-xs font-semibold truncate ${
                  log.killed_by_enemy ? 'text-red-400' : 'text-green-400'
                }`}>
                  {log.killer}
                </span>
              </div>
              {/* MVP */}
              <span className="text-rag-text text-sm font-medium leading-tight">
                {log.mvp_name}
              </span>
              {/* Horário */}
              <span className="text-rag-faint text-xs">
                {formatDateTime(log.killed_at)}
              </span>
              {/* Nota */}
              {log.note && log.note !== 'Morto por guild inimiga.' && (
                <p className="text-rag-muted/80 text-xs italic mt-0.5 truncate" title={log.note}>
                  {log.note}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}
