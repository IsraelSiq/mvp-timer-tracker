import { useMemo, useState, useEffect } from 'react'
import { Shield, Radio, Search, LogIn, LogOut, User, Zap, GitBranch } from 'lucide-react'
import { MVP_LIST } from '@/data/mvps'
import { enrichMVP } from '@/utils/timer'
import { goalScore } from '@/utils/goalSort'
import { useKills } from '@/hooks/useKills'
import { useNow } from '@/hooks/useNow'
import { useAuth } from '@/hooks/useAuth'
import { askGemini } from '@/lib/gemini'
import { MVPCard } from '@/components/MVPCard'
import { KillModal } from '@/components/KillModal'
import { AISuggestion } from '@/components/AISuggestion'
import { KillLogPanel } from '@/components/KillLog'
import { GoalSelector } from '@/components/GoalSelector'
import { AuthModal } from '@/components/AuthModal'
import { SkillChangesPanel } from '@/components/SkillChangesPanel'
import { SkillSimulator } from '@/components/SkillSimulator'
import type { EnrichedMVP, KillLog, KillStatus, GoalMode } from '@/types'
import toast from 'react-hot-toast'

type StatusFilter = 'mvp-alive' | KillStatus
type MainTab = 'mvp' | 'skills'

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: 'mvp-alive',    label: 'MVP' },
  { value: 'window-open', label: '🏁 Janela Aberta' },
  { value: 'soon',        label: '🔵 Em Breve' },
  { value: 'far',         label: '🔴 Longe' },
]

export function Dashboard() {
  const now = useNow()
  const { user, loading: authLoading, displayName, signOut } = useAuth()
  const [groupName,    setGroupName]    = useState(() => localStorage.getItem('rag-group') ?? 'default')
  const { kills, synced, addKill, clearLocal } = useKills(groupName)
  const [query,        setQuery]        = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('mvp-alive')
  const [goalMode,     setGoalMode]     = useState<GoalMode>('default')
  const [selected,     setSelected]     = useState<EnrichedMVP | null>(null)
  const [aiSuggestion, setAiSuggestion] = useState('')
  const [aiLoading,    setAiLoading]    = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)
  const [showAuth,     setShowAuth]     = useState(false)
  const [showSkills,   setShowSkills]   = useState(false)
  const [mainTab,      setMainTab]      = useState<MainTab>('mvp')

  const [playerOverride, setPlayerOverride] = useState(() => localStorage.getItem('rag-player') ?? '')
  const player = displayName || playerOverride

  const enriched = useMemo(() => {
    return MVP_LIST
      .filter(m => `${m.name} ${m.map}`.toLowerCase().includes(query.toLowerCase()))
      .map(m => enrichMVP(m, kills, now))
      .sort((a, b) => goalScore(b, goalMode) - goalScore(a, goalMode) || b.priority - a.priority)
  }, [kills, now, query, goalMode])

  const filtered = useMemo(() => {
    if (statusFilter === 'mvp-alive') {
      return enriched.filter(e => e.status !== 'far' && e.status !== 'soon')
    }
    return enriched.filter(e => e.status === statusFilter)
  }, [enriched, statusFilter])

  const openCount = enriched.filter(e => e.status === 'window-open').length
  const soonCount = enriched.filter(e => e.status === 'soon').length
  const topTarget = enriched.find(e => e.status === 'window-open' || e.status === 'soon')

  useEffect(() => {
    if (enriched.some(e => e.status === 'window-open' || e.status === 'soon')) {
      handleAsk()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleAsk() {
    setAiLoading(true)
    try {
      const text = await askGemini(enriched)
      setAiSuggestion(text)
    } catch {
      setAiSuggestion('Falha ao consultar Gemini.')
    } finally {
      setAiLoading(false)
    }
  }

  function saveGroup() {
    localStorage.setItem('rag-group', groupName)
    toast.success('Grupo salvo!')
  }

  function savePlayer() {
    localStorage.setItem('rag-player', playerOverride)
  }

  function handleClearLocal() {
    if (!confirmClear) {
      setConfirmClear(true)
      setTimeout(() => setConfirmClear(false), 4000)
      return
    }
    clearLocal()
    setConfirmClear(false)
    toast.success('Registros locais apagados.')
  }

  function handleKillClick(item: EnrichedMVP) {
    if (!user) { setShowAuth(true); return }
    setSelected(item)
  }

  function handleEnemyKill(item: EnrichedMVP, killedAt: string) {
    if (!user) { setShowAuth(true); return }
    const log: KillLog = {
      mvp_id:          item.id,
      mvp_name:        item.name,
      killer:          'Inimigo',
      killed_at:       killedAt,
      note:            'Morto por guild inimiga.',
      group_name:      groupName,
      killed_by_enemy: true,
    }
    addKill(log)
    toast.success(`${item.name} marcado como morto por inimigo.`, { icon: '⚡' })
  }

  return (
    <div className="min-h-screen bg-rag-bg text-rag-text font-body">
      {/* Header */}
      <header className="border-b border-rag-border bg-rag-surface px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border border-rag-border bg-rag-surface2 flex items-center justify-center">
            <svg viewBox="0 0 64 64" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M32 6 12 18v14c0 13 8.5 21.5 20 26 11.5-4.5 20-13 20-26V18L32 6Z" />
              <path d="M23 34h18M32 19v30" />
            </svg>
          </div>
          <div>
            <h1 className="font-body font-bold text-rag-text text-lg leading-tight">Ragnarok MVP Timer</h1>
            <p className="text-rag-muted text-xs">Logs em grupo · Realtime</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border ${
            synced
              ? 'border-green-700/40 bg-green-900/20 text-green-400'
              : 'border-rag-border bg-rag-surface2 text-rag-muted'
          }`}>
            <Radio size={11} /> {synced ? 'Realtime ativo' : 'Local apenas'}
          </span>
          <span className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border border-rag-blue/40 bg-blue-900/20 text-rag-blue">
            <Shield size={11} /> Cloud-ready
          </span>
          <button
            onClick={() => setShowSkills(true)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-rag-accent/40 bg-rag-accent/10 text-rag-accent hover:bg-rag-accent/20 transition-colors font-semibold"
          >
            <Zap size={11} /> Mudanças
          </button>
          {authLoading ? null : user ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border border-rag-border bg-rag-surface2 text-rag-muted">
                <User size={11} /> {displayName}
              </span>
              <button
                onClick={() => signOut()}
                title="Sair"
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-rag-border bg-rag-surface2 text-rag-muted hover:text-rag-text transition-colors"
              >
                <LogOut size={11} /> Sair
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-rag-accent/50 bg-rag-accent/10 text-rag-accent hover:bg-rag-accent/20 transition-colors font-semibold"
            >
              <LogIn size={11} /> Entrar para registrar kills
            </button>
          )}
        </div>
      </header>

      {/* Main Tab Bar */}
      <div className="border-b border-rag-border bg-rag-surface px-6">
        <div className="flex gap-0">
          {[
            { key: 'mvp' as MainTab, label: '🏆 MVP Timer' },
            { key: 'skills' as MainTab, label: '⚔️ Skill Simulator' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setMainTab(tab.key)}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                mainTab === tab.key
                  ? 'border-rag-accent text-rag-accent'
                  : 'border-transparent text-rag-muted hover:text-rag-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {mainTab === 'mvp' ? (
        <div className="flex items-start">
          <main className="flex-1 min-w-0 px-4 py-6 space-y-6">
            {/* Settings row */}
            <div className="flex flex-wrap gap-3 items-end">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-rag-muted font-medium flex items-center gap-1">
                  <GitBranch size={11} /> Grupo
                </label>
                <div className="flex gap-2">
                  <input
                    value={groupName}
                    onChange={e => setGroupName(e.target.value)}
                    className="bg-rag-surface2 border border-rag-border rounded px-3 py-1.5 text-sm text-rag-text w-40 focus:outline-none focus:border-rag-accent"
                    placeholder="nome-do-grupo"
                  />
                  <button
                    onClick={saveGroup}
                    className="text-xs px-3 py-1.5 rounded border border-rag-border bg-rag-surface2 text-rag-muted hover:text-rag-text transition-colors"
                  >
                    Salvar
                  </button>
                </div>
              </div>

              {!user && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-rag-muted font-medium flex items-center gap-1">
                    <User size={11} /> Personagem
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={playerOverride}
                      onChange={e => setPlayerOverride(e.target.value)}
                      onBlur={savePlayer}
                      className="bg-rag-surface2 border border-rag-border rounded px-3 py-1.5 text-sm text-rag-text w-40 focus:outline-none focus:border-rag-accent"
                      placeholder="Seu personagem"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2 ml-auto items-end">
                <button
                  onClick={handleClearLocal}
                  className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                    confirmClear
                      ? 'border-red-700/60 bg-red-900/20 text-red-400'
                      : 'border-rag-border bg-rag-surface2 text-rag-muted hover:text-rag-text'
                  }`}
                >
                  {confirmClear ? 'Confirmar limpeza?' : 'Limpar local'}
                </button>
              </div>
            </div>

            {/* AI Suggestion */}
            <AISuggestion
              suggestion={aiSuggestion}
              loading={aiLoading}
              onAsk={handleAsk}
            />

            {/* Search + Status filter */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-48">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rag-muted" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Buscar MVP ou mapa..."
                  className="w-full bg-rag-surface2 border border-rag-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-rag-accent"
                />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {STATUS_TABS.map(tab => (
                  <button
                    key={tab.value}
                    onClick={() => setStatusFilter(tab.value)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${
                      statusFilter === tab.value
                        ? 'border-rag-accent bg-rag-accent/15 text-rag-accent'
                        : 'border-rag-border bg-rag-surface2 text-rag-muted hover:text-rag-text'
                    }`}
                  >
                    {tab.label}
                    {tab.value === 'window-open' && openCount > 0 && (
                      <span className="ml-1.5 bg-rag-accent/20 text-rag-accent rounded-full px-1.5 py-0.5 text-xs">
                        {openCount}
                      </span>
                    )}
                    {tab.value === 'soon' && soonCount > 0 && (
                      <span className="ml-1.5 bg-rag-blue/20 text-rag-blue rounded-full px-1.5 py-0.5 text-xs">
                        {soonCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal selector */}
            <GoalSelector value={goalMode} onChange={setGoalMode} topTarget={topTarget} />

            {/* MVP Grid — 6 colunas a partir de xl */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-rag-muted">
                <p className="text-4xl mb-3">🏆</p>
                <p className="font-medium">Nenhum MVP neste filtro.</p>
                <p className="text-xs mt-1 text-rag-faint">Tente outro status ou limpe a busca.</p>
              </div>
            ) : (
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6">
                {filtered.map(mvp => (
                  <MVPCard
                    key={mvp.id}
                    mvp={mvp}
                    now={now}
                    onKill={handleKillClick}
                    onEnemyKill={handleEnemyKill}
                    player={player}
                  />
                ))}
              </div>
            )}
          </main>

          {/* Sidebar: Kill Log */}
          <KillLogPanel kills={kills} groupName={groupName} />
        </div>
      ) : (
        <SkillSimulator />
      )}

      {selected && (
        <KillModal
          mvp={selected}
          player={player}
          groupName={groupName}
          onConfirm={(log) => { addKill(log); setSelected(null) }}
          onClose={() => setSelected(null)}
        />
      )}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      {showSkills && <SkillChangesPanel onClose={() => setShowSkills(false)} />}
    </div>
  )
}
