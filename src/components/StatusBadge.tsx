import type { KillStatus } from '@/types'

const MAP: Record<KillStatus, { label: string; className: string }> = {
  'alive':         { label: '🟢 Vivo',            className: 'bg-green-900/20 text-green-400 border border-green-700/30' },
  'no-record':     { label: '🟢 Vivo',            className: 'bg-green-900/20 text-green-400 border border-green-700/30' },
  'far':           { label: 'Longe',              className: 'bg-rag-surface2 text-rag-muted border border-rag-border' },
  'soon':          { label: '⏳ Em breve',         className: 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/40' },
  'window-open':   { label: '🟡 Janela aberta',   className: 'bg-green-900/30 text-green-400 border border-green-700/40 animate-pulse' },
  'window-passed': { label: 'Passou da janela',   className: 'bg-red-900/20 text-rag-accent border border-rag-accent/30' },
}

export function StatusBadge({ status }: { status: KillStatus }) {
  const { label, className } = MAP[status] ?? MAP['no-record']
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded-full shrink-0 ${className}`}>
      {label}
    </span>
  )
}
