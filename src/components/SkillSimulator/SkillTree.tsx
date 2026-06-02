import type { JobChain } from '@/data/skillTrees'
import type { AllocMap } from '@/hooks/useSkillSimulator'
import type { ClassSkillChanges } from '@/hooks/useSkillChanges'
import { SkillNode } from './SkillNode'

interface Props {
  job: JobChain
  alloc: AllocMap
  isUnlocked: (skill: any) => boolean
  wikiData: ClassSkillChanges | undefined
  onAllocate: (id: number, autoPath?: boolean) => void
  onDeallocate: (id: number) => void
}

const TIER_LABELS = ['1ª Classe', '2ª Classe', '3ª Classe', '4ª Classe']
const TIER_NAMES = (job: JobChain) => [job.name1, job.name2, job.name3, job.name4]
const TIER_COLORS = [
  'border-blue-700/30 bg-blue-900/5',
  'border-green-700/30 bg-green-900/5',
  'border-yellow-700/30 bg-yellow-900/5',
  'border-rag-accent/30 bg-rag-accent/5',
]

export function SkillTree({ job, alloc, isUnlocked, wikiData, onAllocate, onDeallocate }: Props) {
  const tierNames = TIER_NAMES(job)

  return (
    <div className="flex gap-3 overflow-x-auto pb-4">
      {([1, 2, 3, 4] as const).map((tier, i) => {
        const tierSkills = job.skills.filter(s => s.tier === tier)
        // Calcula grid: máx rows e cols usados
        const maxRow = Math.max(...tierSkills.map(s => s.row), 0)
        const maxCol = Math.max(...tierSkills.map(s => s.col), 0)

        return (
          <div
            key={tier}
            className={`flex-shrink-0 border rounded-xl p-4 flex flex-col gap-3 ${TIER_COLORS[i]}`}
            style={{ minWidth: (maxCol + 1) * 88 + 32 }}
          >
            {/* Header do tier */}
            <div className="text-center pb-2 border-b border-rag-border/40">
              <p className="text-rag-muted text-[10px] uppercase tracking-widest">{TIER_LABELS[i]}</p>
              <p className="text-rag-text text-sm font-bold">{tierNames[i]}</p>
            </div>

            {/* Grid de skills */}
            <div
              className="relative"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${maxCol + 1}, 88px)`,
                gridTemplateRows: `repeat(${maxRow + 1}, 110px)`,
                gap: 0,
              }}
            >
              {tierSkills.map(skill => {
                const wikiSkill = wikiData?.skills.find(
                  s => s.skill.toLowerCase() === skill.name.toLowerCase()
                )
                return (
                  <div
                    key={skill.id}
                    style={{ gridColumn: skill.col + 1, gridRow: skill.row + 1 }}
                    className="flex items-center justify-center"
                  >
                    <SkillNode
                      skill={skill}
                      alloc={alloc}
                      isUnlocked={isUnlocked(skill)}
                      wikiChange={wikiSkill?.changes}
                      onAllocate={onAllocate}
                      onDeallocate={onDeallocate}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
