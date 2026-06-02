# 🗡️ Ragnarok MVP Timer — TRUEMMO

> Timer de respawn de MVP compartilhado em tempo real para o servidor **TRUEMMO**.  
> Roda 100% na nuvem (Vercel + Supabase) — sem instalar nada no PC de jogo.

[![Deploy](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](https://truemmo-mvp-timer.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue)](#)
[![Version](https://img.shields.io/badge/version-2.0.0-green)](#)

---

## ✨ Features

| Feature | Descrição |
|---|---|
| ⏱ **Timer duplo** | Janela mínima e máxima de respawn com countdown em tempo real |
| 🟢 **Status visual** | Vivo / Longe / Em breve / Janela aberta / Passou da janela |
| ⚔️ **Registro de kill** | Registra quem matou, horário e observações (requer login) |
| ⚡ **Kill por inimigo** | Marca morte por guild rival com hora customizável (requer login) |
| 📡 **Realtime** | Log compartilhado via Supabase Realtime — todos do grupo veem na hora |
| 🔐 **Autenticação** | Login com Google ou e-mail/senha via Supabase Auth |
| 👁️ **Log público** | Qualquer visitante pode ver o log; apenas logados podem inserir |
| 🎯 **Modo Objetivo** | Filtra e ordena MVPs por objetivo (farm de points, melhores drops, etc.) |
| 💾 **Offline first** | Fallback `localStorage` se Supabase não estiver configurado |
| 🤖 **IA (Gemini)** | Analisa todos os timers e sugere o melhor alvo do momento |
| 🔍 **Busca e filtros** | Filtra por nome, mapa e status do MVP |
| 📊 **KPIs** | Janelas abertas, abrindo em breve e melhor alvo no topo |
| 🗺️ **38 MVPs** | Base completa do RO clássico com imagens, mapas e prioridades |

---

## 🎯 Modos de Objetivo

| Emoji | Modo | Lógica de ordenação |
|---|---|---|
| ⚔️ | **Padrão** | Score geral (comportamento original) |
| 🎯 | **Farmar MVP Points** | Easy first, solo, fast spawn, penaliza disputados |
| 💎 | **Melhores Drops** | Tag `high-drop` + prioridade alta |
| ⚡ | **Rotação Rápida** | Menor respawn primeiro |
| 🛡️ | **Caçada em Grupo** | Tag `group` + `high-drop` |

---

## 🧱 Stack

- **React 18 + TypeScript + Vite** — frontend rápido e tipado
- **Tailwind CSS** — tema dark customizado estilo Ragnarok
- **Supabase** — PostgreSQL + Realtime + Auth para sincronização de grupo
- **Google OAuth 2.0** — login com conta Google via Supabase Auth
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

## 🗄️ Configurar Supabase

Sem Supabase o app funciona normalmente com `localStorage` — apenas sem sync entre jogadores.

### 1. Criar a tabela

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
```

### 2. Políticas RLS (Row Level Security)

```sql
alter table mvp_kills enable row level security;

-- Leitura pública (sem login)
create policy "Leitura pública de kills"
on public.mvp_kills for select
using (true);

-- Inserção apenas para usuários autenticados
create policy "Apenas autenticados inserem kills"
on public.mvp_kills for insert
with check (auth.role() = 'authenticated');
```

> O script também está disponível em `supabase/policies.sql`.

### 3. Ativar Realtime

Vá em **Database → Replication** e ative a tabela `mvp_kills`.

---

## 🔐 Configurar Autenticação Google (OAuth)

### Passo 1 — Google Cloud Console

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um projeto OAuth em **APIs & Services → Credentials → OAuth client ID**
3. Application type: **Web application**
4. Em **Authorized redirect URIs**, adicione:
   ```
   https://<seu-projeto>.supabase.co/auth/v1/callback
   ```
5. Em **Authorized JavaScript origins**, adicione a URL da sua Vercel:
   ```
   https://truemmo-mvp-timer.vercel.app
   ```
6. Copie o **Client ID** e o **Client Secret**

### Passo 2 — Supabase

1. Acesse **Authentication → Sign In / Providers → Google**
2. Ative o toggle **Enable**
3. Cole o **Client ID** e **Client Secret** do passo anterior
4. Salve

### Permissões de acesso

| Ação | Sem login | Com login |
|---|---|---|
| Ver lista de MVPs | ✅ | ✅ |
| Ver log de kills | ✅ | ✅ |
| Registrar kill | ❌ | ✅ |
| Marcar kill por inimigo | ❌ | ✅ |

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
│   ├── MVPCard.tsx          # Card individual do MVP com timer e ações
│   ├── KillModal.tsx        # Modal de registro de kill
│   ├── KillLog.tsx          # Painel de log do grupo
│   ├── AISuggestion.tsx     # Painel de sugestão Gemini
│   ├── StatusBadge.tsx      # Badge de status (Vivo/Longe/Janela/etc)
│   ├── AuthModal.tsx        # Modal de login (Google + e-mail/senha)
│   └── GoalSelector.tsx     # Seletor de modo objetivo
├── data/
│   ├── mvps.ts              # Lista de 38 MVPs com respawn, prioridade, dificuldade e tags
│   ├── mvpImages.ts         # URLs das imagens dos MVPs
│   └── mapNames.ts          # Tradução dos IDs de mapa
├── hooks/
│   ├── useAuth.ts           # Autenticação (Google OAuth + e-mail/senha)
│   ├── useKills.ts          # Estado de kills + sync Supabase
│   ├── useNow.ts            # Tick a cada 1s para atualizar timers
│   └── useTimers.ts         # Lógica de respawn
├── lib/
│   ├── supabase.ts          # Cliente Supabase
│   └── gemini.ts            # Integração Gemini AI
├── pages/
│   └── Dashboard.tsx        # Página principal
├── types/
│   └── index.ts             # Interfaces TypeScript + GoalMode + MvpTag
└── utils/
    ├── timer.ts             # Cálculos de respawn e status
    ├── respawn.ts           # Utilitários de respawn
    └── goalSort.ts          # Lógica de scoring por modo objetivo
supabase/
└── policies.sql             # Políticas RLS prontas para aplicar
```

---

## 🛡️ Segurança

> ⚠️ A chave Gemini fica exposta no bundle client-side (prefixo `VITE_`).  
> Para produção com billing ativo, mova a chamada para uma **Vercel Serverless Function**.

---

## 📄 Licença

MIT © [Israel Siqueira](https://github.com/IsraelSiq)
