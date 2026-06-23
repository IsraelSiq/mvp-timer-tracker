import { useState } from 'react'
import { X, Clock, MapPin } from 'lucide-react'
import type { EnrichedMVP, KillLog } from '@/types'

interface Props {
  item?: EnrichedMVP
  mvp?: EnrichedMVP
  groupName: string
  defaultKiller?: string
  player?: string
  onConfirm: (log: KillLog) => void
  onClose: () => void
}

function toLocalDatetimeInput(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  )
}

export function KillModal({ item: itemProp, mvp, groupName, defaultKiller, player, onConfirm, onClose }: Props) {
  const item = (itemProp ?? mvp)!
  const maps = item.maps && item.maps.length > 0 ? item.maps : [{ label: item.map, id: item.map }]
  const isMultiMap = maps.length > 1

  const [killer,   setKiller]   = useState(defaultKiller ?? player ?? '')
  const [note,     setNote]     = useState('')
  const [killedAt, setKilledAt] = useState(() => toLocalDatetimeInput(new Date()))
  const [mapId,    setMapId]    = useState(maps[0].id)

  function submit() {
    onConfirm({
      mvp_id:     item.id,
      mvp_name:   item.name,
      killer:     killer.trim() || 'Sem nome',
      killed_at:  new Date(killedAt).toISOString(),
      note:       note.trim(),
      group_name: groupName,
      map_id:     mapId,
    })
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-rag-surface border border-rag-border rounded-xl p-5 w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-body font-bold text-rag-text">Registrar kill: {item.name}</h3>
          <button onClick={onClose} className="text-rag-muted hover:text-rag-text transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3">

          {/* Seletor de mapa — só aparece se tiver múltiplos spawns */}
          {isMultiMap && (
            <div>
              <label className="flex items-center gap-1.5 text-rag-muted text-xs mb-1">
                <MapPin size={11} /> Em qual mapa você o matou?
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {maps.map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMapId(m.id)}
                    className={`text-left px-3 py-2 rounded-lg border text-sm transition-all ${
                      mapId === m.id
                        ? 'border-rag-accent bg-rag-accent/15 text-rag-accent font-semibold'
                        : 'border-rag-border bg-rag-bg text-rag-muted hover:border-rag-accent/50 hover:text-rag-text'
                    }`}
                  >
                    <span className="font-medium">{m.label}</span>
                    <span className="ml-2 text-xs opacity-60 font-mono">{m.id}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-rag-muted text-xs mb-1">Quem matou?</label>
            <input
              value={killer}
              onChange={e => setKiller(e.target.value)}
              placeholder="Nome do killer / líder / personagem"
              className="w-full bg-rag-bg border border-rag-border rounded-lg px-3 py-2 text-rag-text text-sm outline-none focus:border-rag-accent"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-rag-muted text-xs mb-1">
              <Clock size={11} /> Hora da morte
            </label>
            <input
              type="datetime-local"
              value={killedAt}
              onChange={e => setKilledAt(e.target.value)}
              className="w-full bg-rag-bg border border-rag-border rounded-lg px-3 py-2 text-rag-text text-sm outline-none focus:border-rag-accent [color-scheme:dark]"
            />
            <p className="text-rag-muted/70 text-xs mt-1">Ajuste se o boss morreu alguns minutos atrás.</p>
          </div>

          <div>
            <label className="block text-rag-muted text-xs mb-1">Observações</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Ex: solo, pt full, spot disputado, drop relevante..."
              rows={3}
              className="w-full bg-rag-bg border border-rag-border rounded-lg px-3 py-2 text-rag-text text-sm outline-none focus:border-rag-accent resize-none"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={submit}
              className="flex-1 bg-rag-accent hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-colors text-sm"
            >
              Salvar kill
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-rag-surface2 hover:bg-rag-border text-rag-text py-2 rounded-lg transition-colors text-sm border border-rag-border"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
