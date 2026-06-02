import { useEffect } from 'react'
import { Loader2, X } from 'lucide-react'
import { useMvpDetails } from '@/hooks/useMvpDetails'
import {
  formatDropChance,
  getElementName,
  getRaceName,
  getSizeName,
} from '@/lib/divinePride'
import type { EnrichedMVP } from '@/types'

interface Props {
  item: EnrichedMVP
  onClose: () => void
}

export function MvpDetailsPanel({ item, onClose }: Props) {
  const { state, load } = useMvpDetails()

  useEffect(() => { load(item.mobId) }, [item.mobId, load])

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-rag-surface border border-rag-border rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-rag-border sticky top-0 bg-rag-surface z-10">
          <div>
            <h2 className="font-body font-bold text-rag-text text-base">{item.name}</h2>
            <p className="text-rag-muted text-xs">Divine Pride · Mob ID {item.mobId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-rag-surface2 text-rag-muted hover:text-rag-text transition-colors"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5">

          {/* Loading */}
          {state.status === 'loading' && (
            <div className="flex items-center justify-center gap-2 py-10 text-rag-muted">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">Buscando dados...</span>
            </div>
          )}

          {/* Erro */}
          {state.status === 'error' && (
            <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 text-red-400 text-sm">
              {state.msg}
              <p className="text-xs mt-1 text-rag-muted">Verifique se VITE_DIVINE_PRIDE_KEY está configurada no .env</p>
            </div>
          )}

          {state.status === 'ok' && (() => {
            const d = state.data
            const allDrops = [...(d.mvpDrops ?? []), ...(d.drops ?? [])]
              .filter(drop => drop.item)
              .sort((a, b) => b.chance - a.chance)

            return (
              <>
                {/* Stats principais */}
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-rag-muted mb-2">Informações</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Level',    value: d.level },
                      { label: 'HP',       value: d.health?.toLocaleString('pt-BR') },
                      { label: 'Elemento', value: getElementName(d.element) },
                      { label: 'Raça',     value: getRaceName(d.race) },
                      { label: 'Tamanho',  value: getSizeName(d.size) },
                      { label: 'EXP MVP', value: d.mvpExp?.toLocaleString('pt-BR') },
                    ].map(s => (
                      <div key={s.label} className="bg-rag-bg border border-rag-border rounded-lg p-2">
                        <span className="block text-rag-muted text-xs mb-0.5">{s.label}</span>
                        <strong className="text-rag-text text-sm">{s.value ?? '—'}</strong>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Drops */}
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-rag-muted mb-2">
                    Drops
                    <span className="ml-1.5 text-rag-faint normal-case">({allDrops.length} itens)</span>
                  </h3>
                  {allDrops.length === 0 ? (
                    <p className="text-rag-muted text-sm">Nenhum drop encontrado.</p>
                  ) : (
                    <ul className="flex flex-col gap-1.5">
                      {allDrops.map((drop, i) => {
                        const isMvpDrop = (d.mvpDrops ?? []).some(mv => mv.itemId === drop.itemId)
                        return (
                          <li key={`${drop.itemId}-${i}`}
                            className="flex items-center gap-3 bg-rag-bg border border-rag-border rounded-lg px-3 py-2">
                            {drop.item.imageUrl ? (
                              <img
                                src={drop.item.imageUrl}
                                alt={drop.item.name}
                                width={24} height={24}
                                className="shrink-0"
                                style={{ imageRendering: 'pixelated' }}
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-6 h-6 shrink-0 rounded bg-rag-surface2 border border-rag-border" />
                            )}
                            <span className="flex-1 text-sm text-rag-text truncate">
                              {drop.item.name}
                              {isMvpDrop && (
                                <span className="ml-1.5 text-xs text-yellow-400 font-bold">MVP</span>
                              )}
                            </span>
                            <span className={`text-xs font-mono tabular-nums shrink-0 ${
                              drop.chance >= 5000 ? 'text-green-400'
                              : drop.chance >= 500  ? 'text-yellow-400'
                              : 'text-rag-muted'
                            }`}>
                              {formatDropChance(drop.chance)}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </section>

                {/* Link externo */}
                <a
                  href={`https://www.divine-pride.net/database/monster/${item.mobId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-rag-muted hover:text-rag-text underline underline-offset-2 transition-colors"
                >
                  Ver completo no Divine Pride ↗
                </a>
              </>
            )
          })()}
        </div>
      </div>
    </div>
  )
}
