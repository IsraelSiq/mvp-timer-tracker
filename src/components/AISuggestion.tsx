import { Sparkles, Loader2, X } from 'lucide-react'

interface Props {
  suggestion: string
  loading: boolean
  onAsk: () => void
  onClose?: () => void
}

export function AISuggestion({ suggestion, loading, onAsk, onClose }: Props) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-body font-semibold text-rag-text text-base flex items-center gap-2">
          <Sparkles size={16} className="text-yellow-400" /> Sugestão da IA
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onAsk}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs bg-rag-gold/20 hover:bg-rag-gold/30 text-yellow-300 border border-rag-gold/30 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
            {loading ? 'Consultando...' : 'Analisar agora'}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-rag-muted hover:text-rag-text transition-colors p-1 rounded"
              aria-label="Fechar sugestão"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      <p className="text-rag-muted text-xs">
        A Gemini lê os timers atuais e indica o melhor alvo do momento.
      </p>
      <div className="bg-rag-bg border border-rag-border rounded-lg p-3 text-rag-text text-sm whitespace-pre-wrap min-h-[80px]">
        {suggestion || 'Clique em "Analisar agora" para obter a sugestão.'}
      </div>
    </section>
  )
}
