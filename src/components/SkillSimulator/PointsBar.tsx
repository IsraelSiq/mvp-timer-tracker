interface Props {
  tier: 1 | 2 | 3 | 4
  label: string
  spent: number
  total: number
}

export function PointsBar({ tier, label, spent, total }: Props) {
  const pct = Math.min((spent / total) * 100, 100)
  const left = total - spent
  const full = left === 0

  const COLOR = {
    1: 'bg-blue-500',
    2: 'bg-green-500',
    3: 'bg-yellow-500',
    4: 'bg-rag-accent',
  }[tier]

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-rag-muted font-semibold uppercase tracking-wider">{label}</span>
        <span className={full ? 'text-rag-accent font-bold' : 'text-rag-text tabular-nums'}>
          {spent}/{total}
          {full && ' ✓'}
        </span>
      </div>
      <div className="h-1.5 bg-rag-border rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${COLOR}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
