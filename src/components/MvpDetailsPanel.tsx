import { useState, useEffect } from 'react'
import { X, Swords, Skull } from 'lucide-react'
import { MVP_RESISTANCES } from '@/data/mvpResistances'
import type { EnrichedMVP } from '@/types'

interface Props {
  item: EnrichedMVP
  onClose: () => void
  onRegisterKill?: (id: number) => void
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

const WEAPON_BY_SIZE: Record<string, string> = {
  'Grande': 'Lança / Manopla (120%)',
  'Médio':  'Espada / Arco (100%)',
  'Pequeno':'Adaga / Arco (100%)',
}

const DIFFICULTY_STYLE: Record<string, string> = {
  easy:   'text-green-400 bg-green-900/20 border-green-700/40',
  medium: 'text-yellow-400 bg-yellow-900/20 border-yellow-700/40',
  hard:   'text-red-400 bg-red-900/20 border-red-700/40',
}
const DIFFICULTY_LABEL: Record<string, string> = {
  easy: 'Fácil', medium: 'Médio', hard: 'Difícil',
}

const KRO_BASE = 'https://imgc1.gnjoy.com/games/ro1/object/201310/job/Monster'
const DP_GIF_BASE = 'https://static.divine-pride.net/images/mobs/gif'
const DP_PNG_BASE = 'https://static.divine-pride.net/images/mobs/png'

function buildSrcList(aegisName?: string, mobId?: number, pngUrl?: string): string[] {
  const srcs: string[] = []
  if (aegisName)  srcs.push(`${KRO_BASE}/${aegisName}.gif`)
  if (mobId && mobId > 0) {
    srcs.push(`${DP_GIF_BASE}/${mobId}.gif`)
    srcs.push(pngUrl ?? `${DP_PNG_BASE}/${mobId}.png`)
  } else if (pngUrl) {
    srcs.push(pngUrl)
  }
  return srcs
}

function ElementBadge({ name }: { name: string }) {
  const cls = ELEMENT_COLORS[name] ?? 'text-rag-muted bg-rag-bg border-rag-border'
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${cls}`}>
      {name}
    </span>
  )
}

function MobImage({ aegisName, mobId, name, pngUrl }: { aegisName?: string; mobId: number; name: string; pngUrl?: string }) {
  const srcs = buildSrcList(aegisName, mobId, pngUrl)
  const [idx, setIdx] = useState(0)
  const [failed, setFailed] = useState(srcs.length === 0)

  useEffect(() => {
    setIdx(0)
    setFailed(srcs.length === 0)
  }, [mobId, aegisName])

  if (failed || srcs.length === 0) {
    return (
      <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-rag-bg border border-rag-border shrink-0">
        <Skull size={32} className="text-rag-muted/30" />
      </div>
    )
  }

  return (
    <img
      key={srcs[idx]}
      src={srcs[idx]}
      alt={name}
      width={80}
      height={80}
      className="w-20 h-20 object-contain rounded-xl bg-rag-bg border border-rag-border shrink-0 drop-shadow-lg"
      style={{ imageRendering: 'pixelated' }}
      loading="lazy"
      onError={() => {
        if (idx + 1 < srcs.length) {
          setIdx(idx + 1)
        } else {
          setFailed(true)
        }
      }}
    />
  )
}

function useCountdown(item: EnrichedMVP) {
  const killed = (item as any).lastKill as number | undefined
  if (!killed) return null
  const now = Date.now()
  const mid = killed + ((item.minRespawn + item.maxRespawn) / 2) * 60 * 1000
  const diff = mid - now
  if (diff <= 0) return 'Disponível agora!'
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return h > 0 ? `${h}h ${m}m` : m > 0 ? `${m}m ${s}s` : `${s}s`
}

export function MvpDetailsPanel({ item, onClose, onRegisterKill }: Props) {
  const res = MVP_RESISTANCES[item.mobId]
  const countdown = useCountdown(item)
  const diff = (item as any).difficulty as string | undefined

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      style={{ animation: 'fadeIn 180ms ease' }}
      onClick={onClose}
    >
      <div
        className="bg-rag-surface border border-rag-border rounded-2xl w-full max-w-md flex flex-col shadow-2xl"
        style={{ animation: 'slideUp 220ms cubic-bezier(0.16,1,0.3,1)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header com imagem */}
        <div className="flex items-center gap-4 px-5 py-4 border-b border-rag-border">
          <MobImage aegisName={item.aegisName} mobId={item.mobId} name={item.name} pngUrl={item.image} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-body font-bold text-rag-text text-base leading-tight">{item.name}</h2>
              {diff && (
                <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${DIFFICULTY_STYLE[diff] ?? ''}`}>
                  {DIFFICULTY_LABEL[diff] ?? diff}
                </span>
              )}
            </div>
            <p className="text-rag-muted text-xs mt-0.5 truncate">Mob ID {item.mobId} · {item.map}</p>
            {item.mvpPoints != null && (
              <p className="text-rag-accent text-xs font-semibold mt-0.5">★ {item.mvpPoints} MVP Points</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-rag-surface2 text-rag-muted hover:text-rag-text transition-colors shrink-0"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          {/* Timer do próximo spawn */}
          {countdown && (
            <div className="bg-rag-bg border border-rag-accent/30 rounded-lg px-4 py-2.5 flex items-center justify-between">
              <span className="text-xs text-rag-muted">⏱ Próximo spawn</span>
              <span className="text-rag-accent font-bold text-sm">{countdown}</span>
            </div>
          )}

          {!res ? (
            <p className="text-rag-muted text-sm text-center py-4">
              Dados de resistência não cadastrados para este MVP.
            </p>
          ) : (
            <>
              {/* Info cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-rag-bg border border-rag-border rounded-lg p-3 text-center">
                  <span className="block text-rag-muted text-xs mb-1">Raça</span>
                  <strong className="text-rag-text text-sm">{res.race}</strong>
                </div>
                <div className="bg-rag-bg border border-rag-border rounded-lg p-3 text-center">
                  <span className="block text-rag-muted text-xs mb-1">Tamanho</span>
                  <strong className="text-rag-text text-sm">{res.size}</strong>
                </div>
                <div className="bg-rag-bg border border-rag-border rounded-lg p-3 text-center">
                  <span className="block text-rag-muted text-xs mb-1">Elemento</span>
                  <ElementBadge name={res.element} />
                </div>
              </div>

              {/* Arma recomendada */}
              {WEAPON_BY_SIZE[res.size] && (
                <div className="bg-rag-bg border border-rag-border rounded-lg px-3 py-2 flex items-center gap-2">
                  <Swords size={14} className="text-rag-muted shrink-0" />
                  <span className="text-xs text-rag-muted">Arma ideal:</span>
                  <span className="text-xs text-rag-text font-semibold">{WEAPON_BY_SIZE[res.size]}</span>
                </div>
              )}

              {/* Fraquezas */}
              <div className="bg-rag-bg border border-green-700/30 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-2">★ Mais dano com</p>
                <div className="flex flex-wrap gap-1.5">
                  {res.weakTo.map(e => <ElementBadge key={e} name={e} />)}
                </div>
              </div>

              {/* Resistências */}
              {res.resistTo?.length > 0 && (
                <div className="bg-rag-bg border border-red-700/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-red-400 mb-2">✕ Resiste a</p>
                  <div className="flex flex-wrap gap-1.5">
                    {res.resistTo.map(e => <ElementBadge key={e} name={e} />)}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Botão registrar kill */}
          {onRegisterKill && (
            <button
              onClick={() => { onRegisterKill(item.id); onClose() }}
              className="w-full py-2.5 rounded-xl bg-rag-accent hover:bg-rag-accent/80 text-white font-bold text-sm transition-colors"
            >
              ⚔️ Registrar Kill
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
