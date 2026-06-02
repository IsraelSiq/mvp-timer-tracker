import { useState } from 'react'
import { X, ChevronDown, ChevronUp, Zap, TrendingUp, TrendingDown, RefreshCw, AlertCircle, Loader2 } from 'lucide-react'
import { useSkillChanges } from '@/hooks/useSkillChanges'
import type { ClassSkillChanges, SkillChange } from '@/hooks/useSkillChanges'

interface Props {
  onClose: () => void
}

// Detecta o tipo de alteração para colorir o badge
function detectChangeType(changes: string[]): 'buff' | 'nerf' | 'rework' | 'fix' {
  const text = changes.join(' ').toLowerCase()
  const hasPositive = /\+\d+%|melhorada|aumentad|imort|não .* mais removid|duração aumentada|reduzido.*cooldown|cooldown reduzido/.test(text)
  const hasNegative = /-\d+%/.test(text)
  if (hasPositive && hasNegative) return 'rework'
  if (hasNegative) return 'nerf'
  if (hasPositive) return 'buff'
  return 'fix'
}

const CHANGE_TYPE_STYLE = {
  buff:   { label: 'BUFF',   cls: 'text-green-400  bg-green-900/20  border-green-700/40' },
  nerf:   { label: 'NERF',   cls: 'text-red-400    bg-red-900/20    border-red-700/40'   },
  rework: { label: 'REWORK', cls: 'text-yellow-400 bg-yellow-900/20 border-yellow-700/40' },
  fix:    { label: 'AJUSTE', cls: 'text-blue-400   bg-blue-900/20   border-blue-700/40'  },
}

// Renderiza uma linha de alteração colorindo valores antigos/novos
function ChangeText({ text }: { text: string }) {
  // Substitui [valor_antigo] por badge tachado e destaca valores novos com seta
  const parts = text.split(/(\[.*?\]|[+-]\d+%|\u2192\s*\S+)/g)
  return (
    <span>
      {parts.map((part, i) => {
        if (/^\[.*\]$/.test(part)) {
          return (
            <span key={i} className="line-through text-rag-muted/60 text-xs mx-0.5">
              {part.slice(1, -1)}
            </span>
          )
        }
        if (/^\+\d+%$/.test(part)) {
          return <span key={i} className="text-green-400 font-bold mx-0.5">{part}</span>
        }
        if (/^-\d+%$/.test(part)) {
          return <span key={i} className="text-red-400 font-bold mx-0.5">{part}</span>
        }
        if (/^→/.test(part)) {
          return <span key={i} className="text-rag-accent font-semibold mx-0.5">{part}</span>
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

function SkillIcon({ iconId, skillName }: { iconId: string | null; skillName: string }) {
  const [err, setErr] = useState(false)
  if (!iconId || err) {
    return (
      <div className="w-8 h-8 rounded-lg bg-rag-bg border border-rag-border flex items-center justify-center shrink-0">
        <Zap size={14} className="text-rag-muted/50" />
      </div>
    )
  }
  return (
    <img
      src={`https://wiki.truemmo.com.br/images/S${iconId}.png`}
      alt={skillName}
      width={32}
      height={32}
      loading="lazy"
      className="w-8 h-8 rounded-lg bg-rag-bg border border-rag-border object-contain shrink-0"
      style={{ imageRendering: 'pixelated' }}
      onError={() => setErr(true)}
    />
  )
}

function SkillRow({ skill }: { skill: SkillChange }) {
  const type = detectChangeType(skill.changes)
  const { label, cls } = CHANGE_TYPE_STYLE[type]
  const icon = type === 'buff'   ? <TrendingUp  size={11} />
             : type === 'nerf'   ? <TrendingDown size={11} />
             : type === 'rework' ? <RefreshCw    size={11} />
             :                     <Zap          size={11} />

  return (
    <div className="flex gap-3 py-2.5 border-b border-rag-border/50 last:border-0">
      <SkillIcon iconId={skill.iconId} skillName={skill.skill} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-rag-text text-sm font-semibold leading-tight">{skill.skill}</span>
          <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border font-bold ${cls}`}>
            {icon}{label}
          </span>
        </div>
        <ul className="space-y-0.5">
          {skill.changes.map((change, i) => (
            <li key={i} className="text-rag-muted text-xs leading-relaxed flex gap-1.5">
              <span className="text-rag-muted/40 mt-0.5 shrink-0">•</span>
              <ChangeText text={change} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ClassCard({ cls }: { cls: ClassSkillChanges }) {
  const [open, setOpen] = useState(false)
  const buffCount  = cls.skills.filter(s => detectChangeType(s.changes) === 'buff').length
  const nerfCount  = cls.skills.filter(s => detectChangeType(s.changes) === 'nerf').length
  const totalCount = cls.skills.length

  return (
    <div className="bg-rag-bg border border-rag-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-rag-surface/60 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-rag-accent shrink-0" />
          <span className="text-rag-text font-semibold text-sm">{cls.className}</span>
          <span className="text-rag-muted text-xs">{totalCount} skill{totalCount !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-2">
          {buffCount > 0 && (
            <span className="text-[10px] font-bold text-green-400 bg-green-900/20 border border-green-700/40 px-1.5 py-0.5 rounded-full">
              +{buffCount}
            </span>
          )}
          {nerfCount > 0 && (
            <span className="text-[10px] font-bold text-red-400 bg-red-900/20 border border-red-700/40 px-1.5 py-0.5 rounded-full">
              -{nerfCount}
            </span>
          )}
          {open
            ? <ChevronUp  size={16} className="text-rag-muted shrink-0" />
            : <ChevronDown size={16} className="text-rag-muted shrink-0" />}
        </div>
      </button>

      {open && (
        <div className="px-4 pb-2 border-t border-rag-border/50">
          {cls.skills.map(skill => (
            <SkillRow key={skill.skill} skill={skill} />
          ))}
        </div>
      )}
    </div>
  )
}

export function SkillChangesPanel({ onClose }: Props) {
  const { state, load } = useSkillChanges()

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      style={{ animation: 'fadeIn 180ms ease' }}
      onClick={onClose}
    >
      <div
        className="bg-rag-surface border border-rag-border rounded-2xl w-full max-w-lg flex flex-col shadow-2xl max-h-[85dvh]"
        style={{ animation: 'slideUp 220ms cubic-bezier(0.16,1,0.3,1)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-rag-border shrink-0">
          <div>
            <h2 className="text-rag-text font-bold text-base flex items-center gap-2">
              <Zap size={16} className="text-rag-accent" />
              Alterações de Habilidades
            </h2>
            {state.status === 'ok' && (
              <p className="text-rag-muted text-xs mt-0.5">
                {state.data.classes.length} classes · atualizado da wiki
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-rag-surface2 text-rag-muted hover:text-rag-text transition-colors"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {state.status === 'loading' && (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 size={28} className="text-rag-accent animate-spin" />
              <p className="text-rag-muted text-sm">Carregando da wiki...</p>
            </div>
          )}

          {state.status === 'error' && (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <AlertCircle size={28} className="text-red-400" />
              <p className="text-rag-muted text-sm text-center max-w-[240px]">{state.msg}</p>
              <button
                onClick={load}
                className="flex items-center gap-2 text-xs text-rag-accent border border-rag-accent/40 hover:bg-rag-accent/10 px-3 py-1.5 rounded-lg transition-colors"
              >
                <RefreshCw size={12} /> Tentar novamente
              </button>
            </div>
          )}

          {state.status === 'ok' && (
            <>
              {/* Legenda */}
              <div className="flex flex-wrap gap-2 pb-2">
                {Object.entries(CHANGE_TYPE_STYLE).map(([, { label, cls }]) => (
                  <span key={label} className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${cls}`}>
                    {label}
                  </span>
                ))}
              </div>

              {state.data.classes.map(cls => (
                <ClassCard key={cls.className} cls={cls} />
              ))}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  )
}
