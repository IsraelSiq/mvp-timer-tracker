# 🗡️ Ragnarok MVP Timer — TRUEMMO

> Timer de respawn de MVP compartilhado em tempo real para o servidor **TRUEMMO**.
> Roda 100% na nuvem (Vercel + Supabase) — sem instalar nada no PC de jogo.

[![Deploy](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](https://truemmo-mvp-timer.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue)](#)
[![Version](https://img.shields.io/badge/version-1.0.0-green)](#)

---

## ✨ Features

| Feature | Descrição |
|---|---|
| ⏱ **Timer duplo** | Janela mínima e máxima de respawn com countdown em tempo real |
| 🟢 **Status visual** | Vivo / Longe / Em breve / Janela aberta / Passou da janela |
| ⚔️ **Registro de kill** | Registra quem matou, horário e observações |
| ⚡ **Kill por inimigo** | Marca morte por guild rival com hora customizável |
| 📡 **Realtime** | Log compartilhado via Supabase Realtime — todos do grupo veem na hora |
| 💾 **Offline first** | Fallback `localStorage` se Supabase não estiver configurado |
| 🤖 **IA (Gemini)** | Analisa todos os timers e sugere o melhor alvo do momento |
| 🔍 **Busca e filtros** | Filtra por nome, mapa e status do MVP |
| 📊 **KPIs** | Janelas abertas, abrindo em breve e melhor alvo no topo |
| 🗺️ **38 MVPs** | Base completa do RO clássico com imagens, mapas e prioridades |

---

## 🧱 Stack

- **React 18 + TypeScript + Vite** — frontend rápido e tipado
- **Tailwind CSS** — tema dark customizado estilo Ragnarok
- **Supabase** — PostgreSQL + Realtime para sincronização de grupo
- **Google Gemini 2.0 Flash** — sugestão inteligente de alvo
- **Vercel** — deploy contínuo via GitHub

---

## 📋 MVPs incluídos (38)

| MVP | Mapa | Respawn | Prioridade |
|---|---|---|---|
| Orc Hero | gef_fild14 | 60–70 min | 7 |
| Moonlight Flower | pay_dun04 | 60–70 min | 8 |
| Osiris | moc_pryd04 | 60–70 min | 7 |
| Golden Thief Bug | prt_sewb4 | 60–70 min | 9 |
| Stormy Knight | xmas_dun02 | 60–70 min | 6 |
| Turtle General | tur_dun04 | 60–70 min | 8 |
| Dark Lord | gl_chyard | 60–70 min | 8 |
| Dracula | gef_dun02 | 60–70 min | 7 |
| Pharaoh | in_sphinx5 | 60–70 min | 6 |
| Amon Ra | moc_pryd06 | 60–70 min | 7 |
| Evil Snake Lord | gon_dun03 | 95–105 min | 6 |
| Incantation Samurai | ama_dun03 | 90–100 min | 6 |
| White Lady | lou_dun03 | 117–127 min | 7 |
| Ktullanux | ice_dun03 | 120 min | 7 |
| Kiel-D-01 | kh_dun02 | 120–130 min | 9 |
| Vesper | jupe_core | 120–130 min | 8 |
| Baphomet | prt_maze03 | 120–130 min | 10 |
| Eddga | pay_fild11 | 120–130 min | 8 |
| Drake | treasure01 | 120–130 min | 8 |
| Phreeoni | moc_fild17 | 120–130 min | 6 |
| Mistress | mjolnir_04 | 120–130 min | 8 |
| Doppelganger | gef_dun02 | 120–130 min | 7 |
| Maya | anthell02 | 120–130 min | 7 |
| Orc Lord | gef_fild10 | 120–130 min | 7 |
| Fallen Bishop | abbey03 | 120–130 min | 9 |
| Hatii | xmas_fild01 | 120–130 min | 6 |
| Egnigem Cenia | lhz_dun02 | 120–130 min | 8 |
| RSX-0806 | ein_dun02 | 125–135 min | 7 |
| Thanatos Phantom | tha_t10 | 120 min | 9 |
| Gloom Under Night | ra_san05 | 300–310 min | 9 |
| Tao Gunka | beach_dun | 123–133 min | 10 |
| Lord of Death | niflheim | 133–143 min | 9 |
| Detardeurus | abyss_03 | 180–190 min | 8 |
| Atroce | ra_fild02 | 240–250 min | 9 |
| Lady Tanee | ayo_dun02 | 420–430 min | 8 |
| Valkyrie Randgris | odin_tem03 | 480–490 min | 10 |
| Ifrit | thor_v03 | 660–670 min | 10 |
| Beelzebub | abbey03 | 720–730 min | 10 |

---

## 🚀 Setup local

```bash
git clone https://github.com/IsraelSiq/truemmo-mvp-timer.git
cd truemmo-mvp-timer
npm install
cp .env.example .env
# Preencha as variáveis no .env
npm run dev
```

---

## ☁️ Deploy no Vercel

1. Conecte o repositório no [vercel.com](https://vercel.com)
2. Adicione as variáveis de ambiente:

| Variável | Obrigatória | Descrição |
|---|---|---|
| `VITE_SUPABASE_URL` | Opcional | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Opcional | Chave anon do Supabase |
| `VITE_GEMINI_API_KEY` | Opcional | Chave do Google AI Studio |

3. Clique em **Deploy** — acesse sempre pela URL, fora do PC de jogo.

---

## 🗄️ Configurar Supabase (opcional)

Sem Supabase o app funciona normalmente com `localStorage` — apenas sem sync entre jogadores.

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Vá em **SQL Editor** e rode o script abaixo:

```sql
create table mvp_kills (
  id uuid default gen_random_uuid() primary key,
  mvp_id integer not null,
  mvp_name text not null,
  killer text not null,
  killed_at timestamptz not null,
  note text default '',
  group_name text not null,
  killed_by_enemy boolean default false,
  created_at timestamptz default now()
);

create index on mvp_kills (group_name, killed_at desc);
alter table mvp_kills enable row level security;
create policy "public read" on mvp_kills for select using (true);
create policy "public insert" on mvp_kills for insert with check (true);
```

3. Ative **Realtime** para a tabela `mvp_kills` em *Database → Replication*.

---

## 🤖 Configurar Gemini (opcional)

1. Acesse [Google AI Studio](https://aistudio.google.com) e crie uma API key
2. Adicione como `VITE_GEMINI_API_KEY` nas variáveis da Vercel
3. Se a quota gratuita acabar, o app usa sugestão local automática como fallback

---

## 🗂️ Estrutura do projeto

```
src/
├── components/
│   ├── MVPCard.tsx        # Card individual do MVP com timer e ações
│   ├── KillModal.tsx      # Modal de registro de kill
│   ├── KillLog.tsx        # Painel de log do grupo
│   ├── AISuggestion.tsx   # Painel de sugestão Gemini
│   └── StatusBadge.tsx    # Badge de status (Vivo/Longe/Janela/etc)
├── data/
│   ├── mvps.ts            # Lista de 38 MVPs com respawn e prioridade
│   ├── mvpImages.ts       # URLs das imagens dos MVPs
│   └── mapNames.ts        # Tradução dos IDs de mapa
├── hooks/
│   ├── useKills.ts        # Estado de kills + sync Supabase
│   ├── useNow.ts          # Tick a cada 1s para atualizar timers
│   └── useTimers.ts       # Lógica de respawn
├── lib/
│   ├── supabase.ts        # Cliente Supabase
│   └── gemini.ts          # Integração Gemini AI
├── pages/
│   └── Dashboard.tsx      # Página principal
├── types/
│   └── index.ts           # Interfaces TypeScript
└── utils/
    ├── timer.ts           # Cálculos de respawn e status
    └── respawn.ts         # Utilitários de respawn
```

---

## 🛡️ Segurança

> ⚠️ A chave Gemini fica exposta no bundle client-side (prefixo `VITE_`).  
> Para produção com billing ativo, mova a chamada para uma **Vercel Serverless Function**.

---

## 📄 Licença

MIT © [Israel Siqueira](https://github.com/IsraelSiq)
