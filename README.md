# Ragnarok MVP Timer — TRUEMMO

Timer de MVP compartilhado para o servidor TRUEMMO.
Roda 100% na nuvem (Vercel + Supabase + Gemini) — sem precisar abrir nada local no PC.

## Stack
- **React 18 + TypeScript + Vite**
- **Tailwind CSS** com tema dark Ragnarok
- **Supabase** — banco PostgreSQL + Realtime (logs em tempo real)
- **Google Gemini 2.0 Flash** — sugestão de melhor alvo
- **Deploy:** Vercel ou Netlify

## Features
- ⏱ Timer de janela de respawn (mínimo e máximo) para 14 MVPs
- 🟢 Status visual: Longe / Em breve / Janela aberta / Passou da janela
- ⚔️ Registro de kill com killer e observações
- 📡 Log compartilhado por grupo via Supabase Realtime
- 🤖 Sugestão de alvo com Gemini (analisa todos os timers)
- 💾 Fallback localStorage se Supabase não configurado

## Setup local

```bash
npm install
cp .env.example .env
# Preencha as variáveis no .env
npm run dev
```

## Deploy no Vercel

1. Conecte o repositório ao Vercel
2. Adicione as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GEMINI_API_KEY`
3. Deploy — acesse a URL fora do PC de jogo

## Configurar Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Rode `supabase/schema.sql` no SQL Editor
3. Habilite Realtime para a tabela `mvp_kills`

## Configurar Gemini

1. [Google AI Studio](https://aistudio.google.com) → crie uma API key
2. Adicione como `VITE_GEMINI_API_KEY`

## ⚠️ Segurança
Para produção, mova a chamada Gemini para uma Vercel Serverless Function.

## Próximas evoluções
- [ ] Auth por convite de grupo
- [ ] Ranking de kills por player
- [ ] Histórico filtrável por data
- [ ] Push notification quando janela abre
