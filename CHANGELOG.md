# Changelog

Todos os releases significativos do projeto.

---

## [1.0.0] — 2026-06-01

### ✅ Pronto para uso

#### Adicionado
- 38 MVPs do RO clássico com imagens, mapas, respawn e prioridade
- Timer duplo (janela mínima + máxima) com countdown em tempo real
- Status visual: Vivo / Longe / Em breve / Janela aberta / Passou
- Registro de kill com killer, horário e notas
- Registro de kill por inimigo com hora customizável
- Log compartilhado por grupo via Supabase Realtime
- Fallback `localStorage` para uso sem Supabase
- Sugestão de alvo via Google Gemini 2.0 Flash
- Fallback local de sugestão quando Gemini sem quota
- Busca por nome e mapa
- Filtros por status do MVP
- KPIs: janelas abertas, em breve, melhor alvo
- Imagens dos MVPs servidas via trackeur.vercel.app
- Tema dark customizado estilo Ragnarok
- Deploy automático via Vercel + GitHub

#### Stack
- React 18 + TypeScript + Vite
- Tailwind CSS com tokens customizados
- Supabase (PostgreSQL + Realtime)
- Google Gemini AI
- Vercel

---

## [0.x] — Sprint inicial

- Prototipagem de estrutura base
- Definição de types e hooks
- Integração Supabase e Gemini
- MVP list inicial (24 bosses)
