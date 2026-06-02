import { X } from 'lucide-react'
import { MVP_RESISTANCES } from '@/data/mvpResistances'
import type { EnrichedMVP } from '@/types'

interface Props {
  item: EnrichedMVP
  onClose: () => void
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
    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${cls}`}>
      {name}
    </span>
  )
}

export function MvpDetailsPanel({ item, onClose }: Props) {
  const res = MVP_RESISTANCES[item.mobId]

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-rag-surface border border-rag-border rounded-2xl w-full max-w-md flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-rag-border">
          <div>
            <h2 className="font-body font-bold text-rag-text text-base">{item.name}</h2>
            <p className="text-rag-muted text-xs">Mob ID {item.mobId} · {item.map}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-rag-surface2 text-rag-muted hover:text-rag-text transition-colors"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          {!res ? (
            <p className="text-rag-muted text-sm text-center py-4">
              Dados de resistência não cadastrados para este MVP.
            </p>
          ) : (
            <>
              {/* Elemento do MVP */}
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

              {/* Fraquezas */}
              <div className="bg-rag-bg border border-green-700/30 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-2">★ Mais dano com</p>
                <div className="flex flex-wrap gap-1.5">
                  {res.weakTo.map(e => <ElementBadge key={e} name={e} />)}
                </div>
              </div>

              {/* Resistências */}
              <div className="bg-rag-bg border border-red-700/30 rounded-lg p-3">
                <p className="text-xs font-semibold text-red-400 mb-2">✕ Resiste a</p>
                <div className="flex flex-wrap gap-1.5">
                  {res.resistTo.map(e => <ElementBadge key={e} name={e} />)}
                </div>
              </div>

              {/* Dica */}
              {res.tips && (
                <div className="bg-rag-accent/10 border border-rag-accent/30 rounded-lg px-3 py-2">
                  <p className="text-rag-accent text-xs">💡 {res.tips}</p>
                </div>
              )}

              {/* Link externo */}
              <a
                href={`https://www.divine-pride.net/database/monster/${item.mobId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-rag-muted hover:text-rag-text underline underline-offset-2 transition-colors text-center"
              >
                Ver completo no Divine Pride ↗
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
