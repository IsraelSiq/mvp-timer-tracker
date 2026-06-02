import { useState } from 'react'
import { RotateCcw, Zap, BookOpen } from 'lucide-react'
import { JOB_CHAINS } from '@/data/skillTrees'
import { useSkillSimulator } from '@/hooks/useSkillSimulator'
import { useSkillChanges } from '@/hooks/useSkillChanges'
import { ClassPicker } from './ClassPicker'
import { SkillTree } from './SkillTree'
import { PointsBar } from './PointsBar'

const TIER_LABELS = ['1ª Classe', '2ª Classe', '3ª Classe', '4ª Classe'] as const
const TIER_TOTALS = [50, 70, 50, 60] as const

export function SkillSimulator() {
  const [selectedJob, setSelectedJob] = useState(JOB_CHAINS[0])
  const { alloc, spent, available, isUnlocked, allocate, deallocate, reset } = useSkillSimulator(selectedJob)
  const { state: wikiState, getClassChanges } = useSkillChanges()

  const wikiData = selectedJob ? getClassChanges(selectedJob.name4) : undefined
  const totalSpent = spent.reduce((a, b) => a + b, 0)
  const totalAvailable = available.reduce((a, b) => a + b, 0)

  function handleJobChange(job: typeof JOB_CHAINS[0]) {
    setSelectedJob(job)
    reset()
  }

  return (
    <div className="flex flex-col gap-6 min-h-0">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-rag-text font-bold text-base flex items-center gap-2">
            <BookOpen size={16} className="text-rag-accent" />
            Simulador de Skills
          </h2>
          <p className="text-rag-muted text-xs mt-0.5">
            Clique numa skill para alocar pontos · Clique com Shift para auto-desbloquear cadeia
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-rag-muted text-xs">Pontos gastos</p>
            <p className="text-rag-text font-bold tabular-nums">
              {totalSpent} <span className="text-rag-muted font-normal">/ {TIER_TOTALS.reduce((a, b) => a + b, 0)}</span>
            </p>
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-rag-border text-rag-muted hover:text-rag-text hover:border-rag-accent/40 transition-colors"
          >
            <RotateCcw size={12} /> Resetar
          </button>
        </div>
      </div>

      {/* Seletor de classe */}
      <ClassPicker jobs={JOB_CHAINS} selected={selectedJob} onChange={handleJobChange} />

      {/* Barras de pontos */}
      {selectedJob && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-rag-surface border border-rag-border rounded-xl p-4">
          {TIER_LABELS.map((label, i) => (
            <PointsBar
              key={label}
              tier={(i + 1) as 1 | 2 | 3 | 4}
              label={label}
              spent={spent[i]}
              total={TIER_TOTALS[i]}
            />
          ))}
        </div>
      )}

      {/* Badge de alterações da wiki */}
      {wikiData && wikiState.status === 'ok' && (
        <div className="flex items-center gap-2 bg-yellow-900/10 border border-yellow-700/30 rounded-lg px-3 py-2">
          <Zap size={13} className="text-yellow-400 shrink-0" />
          <p className="text-yellow-300 text-xs">
            <strong>{wikiData.skills.length} skill{wikiData.skills.length !== 1 ? 's' : ''}</strong> desta classe foram alteradas no TrueMmo.
            Skills marcadas com <span className="bg-yellow-500 text-rag-bg text-[10px] font-bold px-1 rounded">⚡</span> têm mudanças — passe o mouse para ver.
          </p>
        </div>
      )}

      {/* Árvore de skills */}
      {selectedJob && (
        <SkillTree
          job={selectedJob}
          alloc={alloc}
          isUnlocked={isUnlocked}
          wikiData={wikiData}
          onAllocate={(id, shift) => allocate(id, shift)}
          onDeallocate={deallocate}
        />
      )}
    </div>
  )
}
