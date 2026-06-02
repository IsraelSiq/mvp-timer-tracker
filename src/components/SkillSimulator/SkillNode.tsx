import { useState } from 'react'
import { Zap, Plus, Minus, Lock } from 'lucide-react'
import type { SkillNode as SkillNodeType } from '@/data/skillTrees'
import type { AllocMap } from '@/hooks/useSkillSimulator'

interface Props {
  skill: SkillNodeType
  alloc: AllocMap
  isUnlocked: boolean
  wikiChange?: string[]   // alterações do TrueMmo
  onAllocate: (id: number, autoPath?: boolean) => void
  onDeallocate: (id: number) => void
}

export function SkillNode({ skill, alloc, isUnlocked, wikiChange, onAllocate, onDeallocate }: Props) {
  const [showTip, setShowTip] = useState(false)
  const level = alloc[skill.id] ?? 0
  const maxed = level >= skill.maxLevel
  const hasPoints = level > 0
  const hasWikiChange = wikiChange && wikiChange.length > 0

  const TIER_RING = {
    1: 'border-blue-500/60',
    2: 'border-green-500/60',
    3: 'border-yellow-500/60',
    4: 'border-rag-accent/80',
  }[skill.tier]

  const TIER_GLOW = {
    1: 'shadow-blue-500/20',
    2: 'shadow-green-500/20',
    3: 'shadow-yellow-500/20',
    4: 'shadow-rag-accent/30',
  }[skill.tier]

  return (
    <div
      className="relative flex flex-col items-center gap-1 select-none"
      style={{ width: 72 }}
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      {/* Ícone da skill */}
      <div
        className={`
          relative w-14 h-14 rounded-xl border-2 flex items-center justify-center cursor-pointer
          transition-all duration-200
          ${hasPoints
            ? `${TIER_RING} bg-rag-surface shadow-lg ${TIER_GLOW} scale-105`
            : isUnlocked
              ? 'border-rag-border bg-rag-bg hover:border-rag-accent/50 hover:bg-rag-surface'
              : 'border-rag-border/40 bg-rag-bg/50 opacity-50 cursor-not-allowed'
          }
        `}
        onClick={() => onAllocate(skill.id)}
      >
        <SkillIcon skillId={skill.id} name={skill.name} hasPoints={hasPoints} isUnlocked={isUnlocked} />

        {/* Nível alocado */}
        {hasPoints && (
          <span className={`
            absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold
            flex items-center justify-center border
            ${maxed ? 'bg-rag-accent border-rag-accent text-white' : 'bg-rag-surface border-rag-border text-rag-text'}
          `}>
            {level}
          </span>
        )}

        {/* Lock icon */}
        {!isUnlocked && !hasPoints && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-rag-bg/60">
            <Lock size={14} className="text-rag-muted/50" />
          </div>
        )}

        {/* Badge TrueMmo */}
        {hasWikiChange && (
          <div className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-yellow-500 border border-rag-bg flex items-center justify-center">
            <Zap size={9} className="text-rag-bg" />
          </div>
        )}
      </div>

      {/* Nome da skill */}
      <span className={`text-center leading-tight text-[10px] max-w-[72px] ${
        hasPoints ? 'text-rag-text font-semibold' : 'text-rag-muted'
      }`}>
        {skill.name}
      </span>

      {/* +/- botões rápidos */}
      {hasPoints && (
        <div className="flex gap-1">
          <button
            onClick={e => { e.stopPropagation(); onDeallocate(skill.id) }}
            className="w-5 h-5 rounded bg-rag-surface border border-rag-border text-rag-muted hover:text-red-400 hover:border-red-700/40 flex items-center justify-center transition-colors"
          >
            <Minus size={9} />
          </button>
          {!maxed && (
            <button
              onClick={e => { e.stopPropagation(); onAllocate(skill.id) }}
              className="w-5 h-5 rounded bg-rag-surface border border-rag-border text-rag-muted hover:text-green-400 hover:border-green-700/40 flex items-center justify-center transition-colors"
            >
              <Plus size={9} />
            </button>
          )}
        </div>
      )}

      {/* Tooltip */}
      {showTip && (
        <div className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 w-52 bg-rag-surface border border-rag-border rounded-xl p-3 shadow-2xl pointer-events-none">
          <p className="text-rag-text text-xs font-bold mb-1">{skill.name}</p>
          <p className="text-rag-muted text-xs">Nível: {level}/{skill.maxLevel}</p>
          {skill.requires.length > 0 && (
            <div className="mt-1.5 pt-1.5 border-t border-rag-border/50">
              <p className="text-rag-muted text-[10px] uppercase tracking-wide mb-1">Pré-requisitos</p>
              {skill.requires.map(req => (
                <p key={req.id} className="text-rag-muted text-xs">• Skill #{req.id} lv {req.minLevel}+</p>
              ))}
            </div>
          )}
          {hasWikiChange && (
            <div className="mt-1.5 pt-1.5 border-t border-yellow-700/40">
              <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-wide mb-1">✦ TrueMmo</p>
              {wikiChange!.map((c, i) => (
                <p key={i} className="text-rag-muted text-[10px]">{c}</p>
              ))}
            </div>
          )}
          {!isUnlocked && (
            <p className="mt-1.5 text-red-400 text-[10px]">🔒 Clique para auto-desbloquear</p>
          )}
        </div>
      )}
    </div>
  )
}

// Ícone da skill via Divine Pride CDN
function SkillIcon({ skillId, name, hasPoints, isUnlocked }: { skillId: number; name: string; hasPoints: boolean; isUnlocked: boolean }) {
  const [err, setErr] = useState(false)
  if (err) {
    return <Zap size={22} className={hasPoints ? 'text-rag-accent' : 'text-rag-muted/40'} />
  }
  return (
    <img
      src={`https://static.divine-pride.net/images/skills/${skillId}.png`}
      alt={name}
      width={36}
      height={36}
      loading="lazy"
      className={`object-contain transition-opacity ${isUnlocked || hasPoints ? 'opacity-100' : 'opacity-30'}`}
      style={{ imageRendering: 'pixelated' }}
      onError={() => setErr(true)}
    />
  )
}
