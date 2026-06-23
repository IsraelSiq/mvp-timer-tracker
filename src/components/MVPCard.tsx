import { useState, useEffect } from 'react'
import { Clock, MapPin, Star, ExternalLink, Skull, Swords, Shield, Zap } from 'lucide-react'
import type { EnrichedMVP, MvpElement } from '@/types'
import { cn } from '@/lib/utils'

const IROW_BASE    = 'https://db.irowiki.org/image/monster'
const DP_GIF_BASE  = 'https://static.divine-pride.net/images/mobs/gif'
const KRO_BASE     = 'https://imgc1.gnjoy.com/games/ro1/object/201310/job/Monster'

function buildSrcList(aegisName?: string, mobId?: number): string[] {
  const srcs: string[] = []
  if (mobId && mobId > 0) {
    srcs.push(`${IROW_BASE}/${mobId}.png`)
    srcs.push(`${DP_GIF_BASE}/${mobId}.gif`)
  }
  if (aegisName) srcs.push(`${KRO_BASE}/${aegisName}.gif`)
  return srcs
}

const ELEMENT_COLOR: Record<MvpElement, string> = {
  'Neutro':     'bg-gray-700/60 text-gray-300',
  'Água':       'bg-blue-900/60 text-blue-300',
  'Terra':      'bg-yellow-900/60 text-yellow-300',
  'Fogo':       'bg-red-900/60 text-red-300',
  'Vento':      'bg-teal-900/60 text-teal-300',
  'Veneno':     'bg-purple-900/60 text-purple-300',
  'Sagrado':    'bg-yellow-100/20 text-yellow-100',
  'Sombra':     'bg-indigo-900/60 text-indigo-300',
  'Fantasma':   'bg-violet-900/60 text-violet-300',
  'Morto-vivo': 'bg-zinc-800/80 text-zinc-400',
}

const ELEMENT_ICON: Record<MvpElement, string> = {
  'Neutro':     '⬜',
  'Água':       '💧',
  'Terra':      '🪨',
  'Fogo':       '🔥',
  'Vento':      '🌀',
  'Veneno':     '☠️',
  'Sagrado':    '✨',
  'Sombra':     '🌑',
  'Fantasma':   '👻',
  'Morto-vivo': '💀',
}

const FRAME: Record<string, { border: string; glow: string; typebar: string; label: string }> = {
  easy: {
    border:  'from-emerald-400 via-emerald-600 to-emerald-400',
    glow:    'shadow-[0_0_18px_2px_rgba(52,211,153,0.35)]',
    typebar: 'from-emerald-900/80 to-emerald-800/60',
    label:   'Comum',
  },
  medium: {
    border:  'from-yellow-300 via-amber-500 to-yellow-300',
    glow:    'shadow-[0_0_18px_2px_rgba(251,191,36,0.4)]',
    typebar: 'from-amber-900/80 to-amber-800/60',
    label:   'Raro',
  },
  hard: {
    border:  'from-red-400 via-rose-600 to-red-400',
    glow:    'shadow-[0_0_22px_4px_rgba(239,68,68,0.45)]',
    typebar: 'from-red-900/80 to-red-800/60',
    label:   'Lendário',
  },
}

const FALLBACK_GRADIENT: Record<string, string> = {
  easy:   'from-emerald-900 via-emerald-800 to-emerald-950',
  medium: 'from-amber-900 via-yellow-800 to-amber-950',
  hard:   'from-rose-900 via-red-800 to-rose-950',
}

const FALLBACK_TEXT: Record<string, string> = {
  easy:   'text-emerald-300',
  medium: 'text-yellow-300',
  hard:   'text-rose-300',
}

const FALLBACK_RING: Record<string, string> = {
  easy:   'ring-emerald-700/40',
  medium: 'ring-yellow-600/40',
  hard:   'ring-rose-700/40',
}

const STATUS_EXTRA_GLOW: Record<string, string> = {
  'mvp':         '',
  'window-open': 'ring-2 ring-green-400/60 ring-offset-1 ring-offset-rag-bg',
  'soon':        'ring-2 ring-yellow-400/50 ring-offset-1 ring-offset-rag-bg',
  'far':         '',
}

const STATUS_LABEL: Record<string, { text: string; color: string }> = {
  'mvp':         { text: 'Aguardando kill',      color: 'text-rag-muted' },
  'window-open': { text: '✨ Janela aberta!',     color: 'text-green-400' },
  'soon':        { text: '⏰ Nascendo em breve',  color: 'text-yellow-400' },
  'far':         { text: 'Longe',                color: 'text-rag-muted' },
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return 'Disponível'
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return h > 0 ? `${h}h ${m}m` : m > 0 ? `${m}m ${s}s` : `${s}s`
}

function SpriteFallback({ name, difficulty }: { name: string; difficulty: string }) {
  const initial = name.trim().charAt(0).toUpperCase()
  const grad    = FALLBACK_GRADIENT[difficulty] ?? FALLBACK_GRADIENT.hard
  const textCls = FALLBACK_TEXT[difficulty]     ?? FALLBACK_TEXT.hard
  const ringCls = FALLBACK_RING[difficulty]      ?? FALLBACK_RING.hard
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
      <div className={cn('w-20 h-20 rounded-2xl ring-2 flex items-center justify-center bg-gradient-to-br select-none', grad, ringCls)}>
        <span className={cn('text-4xl font-black font-display tracking-tighter', textCls)}>{initial}</span>
      </div>
      <span className="text-[9px] text-rag-muted/50 font-mono tracking-widest uppercase">sem sprite</span>
    </div>
  )
}

function MobSprite({ aegisName, mobId, name, difficulty }: {
  aegisName?: string; mobId: number; name: string; difficulty: string
}) {
  const srcs = buildSrcList(aegisName, mobId)
  const [idx, setIdx]       = useState(0)
  const [failed, setFailed] = useState(srcs.length === 0)
  useEffect(() => { setIdx(0); setFailed(srcs.length === 0) }, [mobId, aegisName]) // eslint-disable-line
  if (failed || srcs.length === 0) return <SpriteFallback name={name} difficulty={difficulty} />
  return (
    <img key={srcs[idx]} src={srcs[idx]} alt={name} width={160} height={160} loading="lazy"
      className="w-40 h-40 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
      style={{ imageRendering: 'pixelated' }}
      onError={() => { if (idx + 1 < srcs.length) setIdx(i => i + 1); else setFailed(true) }}
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

export function MVPCard({
  item, mvp, now: nowProp,
  onKill, onEnemyKill,
  onRegisterKill, onSelect,
}: MVPCardProps) {
  const data = item ?? mvp

  const [internalNow, setInternalNow] = useState(Date.now())
  useEffect(() => {
    if (nowProp !== undefined) return
    const t = setInterval(() => setInternalNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [nowProp])
  const now = nowProp ?? internalNow

  if (!data) return null

  const frame      = FRAME[data.difficulty] ?? FRAME.medium
  const status     = data.status
  const midMs      = data.minRespawnDate && data.maxRespawnDate
    ? (data.minRespawnDate.getTime() + data.maxRespawnDate.getTime()) / 2
    : null
  const timeLeft   = midMs ? Math.max(0, midMs - now) : null
  const irowUrl    = data.mobId > 0 ? `https://db.irowiki.org/db/monster-info/${data.mobId}/` : null
  const statusInfo = STATUS_LABEL[status]

  const spawnMaps = data.maps && data.maps.length > 0 ? data.maps : [{ label: data.map, id: data.map }]

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
        // self-start impede o card de esticar verticalmente no grid/flex da linha
        'self-start p-[2px] rounded-2xl bg-gradient-to-b cursor-pointer transition-all duration-200',
        'hover:scale-[1.02] active:scale-[0.98]',
        frame.border, frame.glow, STATUS_EXTRA_GLOW[status],
      )}
      onClick={() => onSelect?.(data!)}
    >
      <div className="rounded-2xl bg-[#0f1020] overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="px-3 pt-2.5 pb-1.5 flex items-center justify-between gap-2 bg-gradient-to-r from-[#1a1d30] to-[#12142a] border-b border-white/5">
          <span className="font-display text-[10px] text-rag-text leading-tight truncate tracking-wide">
            {data.name}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {data.mvpPoints != null && (
              <span className="flex items-center gap-0.5 text-rag-gold text-[10px] font-bold font-mono">
                <Star size={9} fill="currentColor" />{data.mvpPoints}
              </span>
            )}
            {irowUrl && (
              <a href={irowUrl} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-rag-muted hover:text-rag-accent transition-colors"
                title="Ver no iROWiki">
                <ExternalLink size={10} />
              </a>
            )}
          </div>
        </div>

        {/* SPRITE */}
        <div className="relative flex items-center justify-center bg-gradient-to-b from-[#080a14] to-[#0d1020] h-44 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] select-none pointer-events-none flex items-center justify-center text-6xl text-white">
            &#x16A0;&#x16B7;&#x16D2;&#x16A2;
          </div>
          <MobSprite aegisName={data.aegisName} mobId={data.mobId} name={data.name} difficulty={data.difficulty} />
        </div>

        {/* ELEMENT / SIZE / WEAKNESS */}
        {(data.element || data.size || data.weakness) && (
          <div className="px-2.5 py-1.5 flex items-center gap-1.5 flex-wrap bg-[#0a0c1a] border-b border-white/5">
            {data.element && (
              <span className={cn('text-[9px] font-semibold px-1.5 py-0.5 rounded-full', ELEMENT_COLOR[data.element])}>
                {ELEMENT_ICON[data.element]} {data.element}
              </span>
            )}
            {data.size && (
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-white/5 text-white/50">
                {data.size}
              </span>
            )}
            {data.weakness && (
              <span className={cn('text-[9px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5', ELEMENT_COLOR[data.weakness])}>
                <Zap size={8} /> {data.weakness}
              </span>
            )}
          </div>
        )}

        {/* TYPE BAR */}
        <div className={cn('px-3 py-1 flex items-center justify-between bg-gradient-to-r text-[10px] font-semibold', frame.typebar, 'border-b border-white/10')}>
          <span className="text-white/80 italic">MVP Boss &mdash; {frame.label}</span>
        </div>

        {/* SPAWN MAPS — altura fixa, scroll interno se tiver muitos */}
        <div className="px-2.5 py-1.5 bg-[#090b19] border-b border-white/5 h-[52px] overflow-y-auto flex flex-col gap-0.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {spawnMaps.map(m => (
            <div key={m.id} className="flex items-center gap-1 shrink-0">
              <MapPin size={8} className="text-rag-muted shrink-0" />
              <span className="text-[9px] text-white/60 truncate">{m.label}</span>
              <span className="text-[8px] text-rag-muted/50 font-mono ml-auto shrink-0">{m.id}</span>
            </div>
          ))}
        </div>

        {/* TEXT BOX */}
        <div className="px-3 py-2 bg-[#0c0e1c] flex flex-col gap-1 min-h-[48px]">
          <p className={cn('text-[11px] font-semibold', statusInfo.color)}>{statusInfo.text}</p>
          {timeLeft !== null && timeLeft > 0 && (
            <p className="flex items-center gap-1 text-[11px] text-rag-muted">
              <Clock size={9} />
              <span className="font-mono">{formatCountdown(timeLeft)}</span>
            </p>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-2.5 pb-2.5 pt-1.5 flex items-center justify-between gap-2 bg-gradient-to-r from-[#0e1022] to-[#0c0f20] border-t border-white/5">
          <div className="flex items-center gap-1.5">
            {(onKill || onRegisterKill) && (
              <button onClick={handleKill}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rag-accent/20 hover:bg-rag-accent/40 text-rag-accent text-[10px] font-bold border border-rag-accent/30 transition-all hover:shadow-[0_0_8px_rgba(192,57,43,0.5)]">
                <Swords size={10} /> Kill
              </button>
            )}
            {onEnemyKill && (
              <button onClick={handleEnemyKill}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 text-[10px] font-bold border border-red-800/30 transition-all"
                title="Morto por inimigo">
                <Skull size={10} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono text-rag-muted/70 border border-white/10 rounded px-1.5 py-0.5 bg-black/30">
            <Shield size={8} />
            {data.minRespawn}~{data.maxRespawn}m
          </div>
        </div>

      </div>
    </div>
  )
}
