import { useState, useEffect } from 'react'
import { Swords, Skull, ExternalLink } from 'lucide-react'
import type { EnrichedMVP } from '@/types'
import { StatusBadge } from './StatusBadge'
import { MvpDetailsPanel } from './MvpDetailsPanel'
import { formatRemaining, formatDateTime } from '@/utils/timer'
import { getMapName } from '@/data/mapNames'
import { MVP_RESISTANCES } from '@/data/mvpResistances'

interface Props {
  item?: EnrichedMVP
  mvp?: EnrichedMVP
  now: number
  onKill: (item: EnrichedMVP) => void
  onEnemyKill: (item: EnrichedMVP, killedAt: string) => void
  player?: string
}

const DIFFICULTY_LABEL = {
  easy:   { label: 'Fácil',   className: 'text-green-400  border-green-700/40  bg-green-900/20'  },
  medium: { label: 'Médio',   className: 'text-yellow-400 border-yellow-700/40 bg-yellow-900/20' },
  hard:   { label: 'Difícil', className: 'text-red-400    border-red-700/40    bg-red-900/20'    },
}

const ELEMENT_COLORS: Record<string, string> = {
  'Sagrado':    'text-yellow-300 bg-yellow-900/20 border-yellow-700/40',
  'Sombra':     'text-purple-400 bg-purple-900/20 border-purple-700/40',
  'Fogo':       'text-red-400    bg-red-900/20    border-red-700/40',
  'Água':       'text-blue-400   bg-blue-900/20   border-blue-700/40',
  'Vento':      'text-green-300  bg-green-900/20  border-green-700/40',
  'Terra':      'text-amber-400  bg-amber-900/20  border-amber-700/40',
  'Neutro':     'text-gray-300   bg-gray-800/40   border-gray-600/40',
  'Veneno':     'text-lime-400   bg-lime-900/20   border-lime-700/40',
  'Morto-vivo': 'text-rose-400   bg-rose-900/20   border-rose-700/40',
  'Fantasma':   'text-indigo-300 bg-indigo-900/20 border-indigo-700/40',
  'Elétrico':   'text-cyan-300   bg-cyan-900/20   border-cyan-700/40',
}

function ElementBadge({ name }: { name: string }) {
  const cls = ELEMENT_COLORS[name] ?? 'text-rag-muted bg-rag-bg border-rag-border'
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded-full border font-semibold ${cls}`}>
      {name}
    </span>
  )
}

function MobSprite({ mobId, name, pngUrl }: { mobId: number; name: string; pngUrl?: string }) {
  const gifUrl = mobId > 0
    ? `https://static.divine-pride.net/images/mobs/gif/${mobId}.gif`
    : null
  const fallbackUrl = pngUrl ?? (mobId > 0 ? `https://static.divine-pride.net/images/mobs/png/${mobId}.png` : null)

  const [src, setSrc] = useState<string | null>(gifUrl ?? fallbackUrl)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setSrc(gifUrl ?? fallbackUrl)
    setFailed(false)
  }, [mobId])

  if (!src || failed) {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-rag-bg border border-rag-border shrink-0">
        <Skull size={20} className="text-rag-muted/30" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={name}
      width={48}
      height={48}
      className="w-12 h-12 object-contain rounded-lg bg-rag-bg border border-rag-border shrink-0"
      style={{ imageRendering: 'pixelated' }}
      loading="lazy"
      onError={() => {
        if (src === gifUrl && fallbackUrl) {
          setSrc(fallbackUrl)
        } else {
          setFailed(true)
        }
      }}
    />
  )
}

function toLocalDatetimeInput(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  )
}

export function MVPCard({ item: itemProp, mvp, now, onKill, onEnemyKill }: Props) {
  const item = (itemProp ?? mvp)!

  const minRemaining = item.minRespawnDate ? item.minRespawnDate.getTime() - now : 0
  const maxRemaining = item.maxRespawnDate ? item.maxRespawnDate.getTime() - now : 0
  const diff = DIFFICULTY_LABEL[item.difficulty]
  const res  = MVP_RESISTANCES[item.mobId]

  const [showEnemyForm, setShowEnemyForm] = useState(false)
  const [enemyTime,     setEnemyTime]     = useState(() => toLocalDatetimeInput(new Date()))
  const [showDPDetails, setShowDPDetails] = useState(false)

  function submitEnemyKill() {
    onEnemyKill(item, new Date(enemyTime).toISOString())
    setShowEnemyForm(false)
  }

  const noRecord = item.status === 'mvp'
  const mapName  = getMapName(item.map)

  return (
    <>
      <article className="bg-rag-surface border border-rag-border rounded-xl overflow-hidden flex flex-col hover:border-rag-accent/50 transition-colors">

        {/* Header: sprite + identidade + status */}
        <div className="p-3 flex items-start gap-3">
          <MobSprite mobId={item.mobId} name={item.name} pngUrl={item.image} />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-body font-semibold text-rag-text text-sm leading-tight truncate">
                  {item.name}
                </h3>
                <p className="text-rag-muted text-xs mt-0.5">
                  Mob #{item.mobId > 0 ? item.mobId : '—'}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={`text-xs px-1.5 py-0.5 rounded border whitespace-nowrap ${diff.className}`}>
                  {diff.label}
                </span>
                <StatusBadge status={item.status} />
              </div>
            </div>

            {/* Mapa */}
            <p className="text-rag-blue text-xs font-medium mt-1 truncate">
              {mapName}
            </p>
            <p className="text-rag-muted/60 text-xs truncate">
              ({item.map}) · {item.minRespawn}–{item.maxRespawn} min
            </p>
          </div>
        </div>

        <div className="px-3 pb-3 flex flex-col gap-2">

          {/* Stats de combate */}
          {res && (
            <div className="bg-rag-bg border border-rag-border rounded-lg px-2.5 py-2 flex flex-col gap-1.5">
              <p className="text-rag-muted text-xs">
                {res.size} · {res.race} · <ElementBadge name={res.element} />
              </p>
              {res.weakTo.length > 0 && (
                <p className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-green-400 text-xs font-semibold">★ Fraco contra</span>
                  {res.weakTo.map(e => <ElementBadge key={e} name={e} />)}
                </p>
              )}
            </div>
          )}

          {/* Timers */}
          {!noRecord && (
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-rag-bg rounded-lg p-2 border border-rag-border">
                <span className="block text-rag-muted text-xs uppercase tracking-wider mb-0.5">Janela mín.</span>
                <strong className="text-rag-text text-sm tabular-nums">
                  {item.minRespawnDate ? formatRemaining(minRemaining) : '—'}
                </strong>
              </div>
              <div className="bg-rag-bg rounded-lg p-2 border border-rag-border">
                <span className="block text-rag-muted text-xs uppercase tracking-wider mb-0.5">Janela máx.</span>
                <strong className="text-rag-text text-sm tabular-nums">
                  {item.maxRespawnDate ? formatRemaining(maxRemaining) : '—'}
                </strong>
              </div>
            </div>
          )}

          {noRecord && (
            <p className="text-rag-muted text-xs">
              ⚪ Nenhuma kill registrada — status desconhecido.
            </p>
          )}

          {/* Barra de progresso */}
          {!noRecord && (
            <div className="h-1.5 bg-rag-bg rounded-full overflow-hidden border border-rag-border">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${item.windowProgress}%`,
                  background: item.status === 'window-open'
                    ? 'linear-gradient(90deg, #27ae60, #f1c40f)'
                    : 'linear-gradient(90deg, #2980b9, #c0392b)',
                }}
              />
            </div>
          )}

          {/* Última kill */}
          <p className="text-rag-muted text-xs">
            {item.latest
              ? <>{item.latest.killed_by_enemy
                  ? <span className="text-orange-400">⚡ Morto por inimigo</span>
                  : <span>Kill: {item.latest.killer}</span>
                } — {formatDateTime(item.latest.killed_at)}</>
              : 'Nenhuma kill registrada.'}
          </p>

          {/* Formulário inimigo */}
          {showEnemyForm && (
            <div className="flex flex-col gap-2 bg-rag-bg border border-rag-border rounded-lg p-3">
              <label className="text-rag-muted text-xs">Hora que o inimigo matou:</label>
              <input
                type="datetime-local"
                value={enemyTime}
                onChange={e => setEnemyTime(e.target.value)}
                className="w-full bg-rag-surface border border-rag-border rounded-lg px-2 py-1.5 text-rag-text text-xs outline-none focus:border-rag-accent [color-scheme:dark]"
              />
              <div className="flex gap-2">
                <button
                  onClick={submitEnemyKill}
                  className="flex-1 bg-orange-700 hover:bg-orange-600 text-white text-xs font-bold py-1.5 rounded-lg transition-colors"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => setShowEnemyForm(false)}
                  className="flex-1 bg-rag-surface2 border border-rag-border text-rag-muted text-xs py-1.5 rounded-lg transition-colors hover:text-rag-text"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => onKill(item)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-rag-accent hover:bg-red-700 text-white font-semibold text-xs transition-colors"
            >
              <Swords size={13} /> Nós matamos
            </button>
            <button
              onClick={() => { setShowEnemyForm(v => !v); setEnemyTime(toLocalDatetimeInput(new Date())) }}
              title="Registrar morte por inimigo"
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-orange-900/40 hover:bg-orange-800/60 border border-orange-700/40 text-orange-400 text-xs transition-colors"
            >
              <Skull size={13} /> Inimigo
            </button>
            <button
              onClick={() => setShowDPDetails(true)}
              title="Ver no Divine Pride"
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-rag-border bg-rag-bg hover:border-rag-accent/40 hover:text-rag-text text-rag-muted text-xs transition-colors"
            >
              <ExternalLink size={12} /> DP
            </button>
          </div>
        </div>
      </article>

      {showDPDetails && (
        <MvpDetailsPanel
          item={item}
          onClose={() => setShowDPDetails(false)}
        />
      )}
    </>
  )
}
