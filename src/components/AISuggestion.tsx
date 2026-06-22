import { Sparkles, Loader2, RefreshCw } from 'lucide-react'

interface Props {
  suggestion: string
  loading: boolean
  onAsk: () => void
}

export function AISuggestion({ suggestion, loading, onAsk }: Props) {
  return (
    <section className="bg-rag-surface border border-rag-gold/30 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-body font-semibold text-rag-text text-base flex items-center gap-2">
          <Sparkles size={16} className="text-yellow-400" />
          Sugestão da IA
          <span className="text-xs font-normal text-rag-muted">— Gemini analisa os timers e indica o melhor alvo agora</span>
        </h2>
        <button
          onClick={onAsk}
          disabled={loading}
          title="Reanalisar"
          className="flex items-center gap-1.5 text-xs bg-rag-gold/20 hover:bg-rag-gold/30 text-yellow-300 border border-rag-gold/30 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
        >
          {loading
            ? <Loader2 size={12} className="animate-spin" />
            : <RefreshCw size={12} />}
          {loading ? 'Analisando...' : 'Reanalisar'}
        </button>
      </div>

      <div className={`rounded-lg px-4 py-3 text-sm whitespace-pre-wrap min-h-[52px] border transition-colors ${
        suggestion
          ? 'bg-rag-bg border-rag-border text-rag-text'
          : 'bg-rag-bg border-dashed border-rag-border text-rag-muted'
      }`}>
        {loading
          ? <span className="flex items-center gap-2 text-rag-muted"><Loader2 size={14} className="animate-spin" /> Consultando Gemini...</span>
          : suggestion || 'Registre kills para ativar a análise automática. Sem API key, a sugestão é local.'}
      </div>
    </section>
  )
}
