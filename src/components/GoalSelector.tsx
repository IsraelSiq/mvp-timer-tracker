import { GOAL_CONFIGS } from '@/types'
import type { GoalMode, EnrichedMVP } from '@/types'

interface Props {
  value: GoalMode
  onChange: (mode: GoalMode) => void
  topTarget?: EnrichedMVP
}

export function GoalSelector({ value, onChange }: Props) {
  return (
    <div className="bg-rag-surface border border-rag-border rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-rag-text">🎯 Objetivo atual</span>
        <span className="text-xs text-rag-muted">(reordena os MVPs)</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {GOAL_CONFIGS.map(cfg => (
          <button
            key={cfg.mode}
            onClick={() => onChange(cfg.mode)}
            title={cfg.description}
            className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border transition-colors ${
              value === cfg.mode
                ? 'bg-rag-accent/20 border-rag-accent text-rag-accent font-bold'
                : 'bg-rag-bg border-rag-border text-rag-muted hover:text-rag-text hover:border-rag-accent/40'
            }`}
          >
            <span>{cfg.emoji}</span>
            <span>{cfg.label}</span>
          </button>
        ))}
      </div>
      {GOAL_CONFIGS.find(c => c.mode === value) && (
        <p className="text-xs text-rag-muted italic">
          {GOAL_CONFIGS.find(c => c.mode === value)!.description}
        </p>
      )}
    </div>
  )
}
