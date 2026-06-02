import { ChevronDown } from 'lucide-react'
import type { JobChain } from '@/data/skillTrees'

interface Props {
  jobs: JobChain[]
  selected: JobChain | null
  onChange: (job: JobChain) => void
}

export function ClassPicker({ jobs, selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {jobs.map(job => (
        <button
          key={job.id}
          onClick={() => onChange(job)}
          className={`
            text-sm px-4 py-2 rounded-xl border font-semibold transition-all duration-150
            ${
              selected?.id === job.id
                ? 'bg-rag-accent/20 border-rag-accent text-rag-accent scale-[1.03] shadow-md'
                : 'bg-rag-surface border-rag-border text-rag-muted hover:text-rag-text hover:border-rag-accent/40'
            }
          `}
        >
          {job.name4}
        </button>
      ))}
    </div>
  )
}
