import { useState, useEffect } from 'react'
import { Clock, MapPin, Star, ExternalLink, Skull } from 'lucide-react'
import type { EnrichedMVP } from '@/types'
import { cn } from '@/lib/utils'

const KRO_BASE = 'https://imgc1.gnjoy.com/games/ro1/object/201310/job/Monster'
const DP_GIF_BASE = 'https://static.divine-pride.net/images/mobs/gif'
const DP_PNG_BASE = 'https://static.divine-pride.net/images/mobs/png'

function buildSrcList(aegisName?: string, mobId?: number): string[] {
  const srcs: string[] = []
  if (aegisName)           srcs.push(`${KRO_BASE}/${aegisName}.gif`)
  if (mobId && mobId > 0) {
    srcs.push(`${DP_GIF_BASE}/${mobId}.gif`)
    srcs.push(`${DP_PNG_BASE}/${mobId}.png`)
  }
  return srcs
}

function MobSprite({ aegisName, mobId, name }: { aegisName?: string; mobId: number; name: string }) {
  const srcs = buildSrcList(aegisName, mobId)
  const [idx, setIdx]     = useState(0)
  const [failed, setFailed] = useState(srcs.length === 0)

  useEffect(() => {
    setIdx(0)
    setFailed(srcs.length === 0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobId, aegisName])

  if (failed || srcs.length === 0) {
    return (
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-rag-bg border border-rag-border shrink-0">
        <Skull size={20} className="text-rag-muted/40" />
      </div>
    )
  }

  return (
    <img
      key={srcs[idx]}
      src={srcs[idx]}
      alt={name}
      width={48}
      height={48}
      loading="lazy"
      className="w-12 h-12 object-contain rounded-lg bg-rag-bg border border-rag-border shrink-0"
      style={{ imageRendering: 'pixelated' }}
      onError={() => {
        if (idx + 1 < srcs.length) setIdx(i => i + 1)
        else setFailed(true)
      }}
    />
  )
}

export interface MVPCardProps {
  item?:           EnrichedMVP
  mvp?:            EnrichedMVP
  now?:            number
  onKill?:         (item: EnrichedMVP) => void
  onEnemyKill?:    (item: EnrichedMVP, killedAt: string) => void
  player?:         string
  onRegisterKill?: (id: number) => void
  onSelect?:       (item: EnrichedMVP) => void
}

const STATUS_STYLES: Record<string, string> = {
  'mvp':         'border-rag-border bg-rag-surface',
  'window-open': 'border-green-500/60 bg-green-900/10',
  'soon':        'border-yellow-500/50 bg-yellow-900/10',
  'far':         'border-rag-border bg-rag-surface',
}

const DIFFICULTY_STYLE: Record<string, string> = {
  easy:   'text-green-400',
  medium: 'text-yellow-400',
  hard:   'text-red-400',
}

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: 'Fácil', medium: 'Médio', hard: 'Difícil',
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return 'Disponível'
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return h > 0 ? `${h}h ${m}m` : m > 0 ? `${m}m ${s}s` : `${s}s`
}

export function MVPCard({
  item, mvp, now: nowProp,
  onKill, onEnemyKill,
  onRegisterKill, onSelect,
}: MVPCardProps) {
  const data = item ?? mvp

  // Se `now` não for passado pelo pai, mantém timer interno (retrocompat)
  const [internalNow, setInternalNow] = useState(Date.now())
  useEffect(() => {
    if (nowProp !== undefined) return
    const t = setInterval(() => setInternalNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [nowProp])
  const now = nowProp ?? internalNow

  // Guard: early-return após todos os hooks
  if (!data) return null

  const status = data.status
  const midMs = data.minRespawnDate && data.maxRespawnDate
    ? (data.minRespawnDate.getTime() + data.maxRespawnDate.getTime()) / 2
    : null
  const timeLeft = midMs ? Math.max(0, midMs - now) : null
  const dpUrl = data.mobId > 0
    ? `https://db.divine-pride.net/database/monster/${data.mobId}`
    : null

  function handleKill(e: React.MouseEvent) {
    e.stopPropagation()
    onKill?.(data!)
    onRegisterKill?.(data!.id)
  }

  function handleEnemyKill(e: React.MouseEvent) {
    e.stopPropagation()
    onEnemyKill?.(data!, new Date().toISOString())
  }

  return (
    <div
      className={cn(
        'rounded-xl border p-3 flex flex-col gap-2 cursor-pointer transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99]',
        STATUS_STYLES[status],
      )}
      onClick={() => onSelect?.(data!)}
    >
      {/* Row 1: sprite + nome + mapa + ações */}
      <div className="flex items-center gap-3">
        <MobSprite aegisName={data.aegisName} mobId={data.mobId} name={data.name} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-body font-semibold text-rag-text text-sm leading-tight truncate">
              {data.name}
            </span>
            <span className={cn('text-xs font-medium', DIFFICULTY_STYLE[data.difficulty])}>
              · {DIFFICULTY_LABEL[data.difficulty]}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-0.5 text-rag-muted text-xs">
            <MapPin size={10} className="shrink-0" />
            <span className="truncate">{data.map}</span>
            <span className="text-rag-border">·</span>
            <span className="text-rag-faint font-mono text-[10px]">#{data.mobId}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {dpUrl && (
            <a
              href={dpUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="p-1 rounded hover:bg-rag-surface2 text-rag-muted hover:text-rag-accent transition-colors"
              title="Ver no Divine Pride"
            >
              <ExternalLink size={12} />
            </a>
          )}
          {(onKill || onRegisterKill) && (
            <button
              onClick={handleKill}
              className="px-2 py-1 rounded-lg bg-rag-accent/10 hover:bg-rag-accent/20 text-rag-accent text-xs font-semibold transition-colors"
            >
              Kill
            </button>
          )}
          {onEnemyKill && (
            <button
              onClick={handleEnemyKill}
              className="px-2 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold transition-colors"
              title="Morto por inimigo"
            >
              💀
            </button>
          )}
        </div>
      </div>

      {/* Row 2: pontos + timer */}
      {data.mvpPoints != null && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 text-rag-accent text-xs font-semibold">
            <Star size={10} />{data.mvpPoints} pts
          </span>
          {timeLeft !== null && (
            <span className={cn(
              'flex items-center gap-1 text-xs font-medium',
              status === 'window-open' ? 'text-green-400'
              : status === 'soon'      ? 'text-yellow-400'
              : 'text-rag-muted',
            )}>
              <Clock size={10} />{formatCountdown(timeLeft)}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
