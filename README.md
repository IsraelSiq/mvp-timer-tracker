# 🗡️ Rag MVP Timer

> Timer de respawn de MVP compartilhado em tempo real para servidores de Ragnarok Online.  
> Roda 100% na nuvem (Vercel + Supabase) — sem instalar nada no PC de jogo.

[![License](https://img.shields.io/badge/license-MIT-blue)](#)
[![Version](https://img.shields.io/badge/version-2.2.0-green)](#)
[![MVPs](https://img.shields.io/badge/MVPs-99%2B-orange)](#-mvps-incluídos-99)

> 🧪 Procurando o **Simulador de Skill Tree**? Ele foi movido para o repositório dedicado: [ro-skill-simulator](https://github.com/IsraelSiq/ro-skill-simulator)

---

## ✨ Features

| Feature | Descrição |
|---|---|
| ⏱ **Timer duplo** | Janela mínima e máxima de respawn com countdown em tempo real |
| 🟢 **Status visual** | Vivo / Longe / Em breve / Janela aberta / Passou da janela |
| 🖼️ **Sprites animados** | GIF oficial kRO (gnjoy.com) com fallback automático para Divine Pride |
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
| 🗺️ **99+ MVPs** | Base completa do RO Classic + Renewal com imagens, mapas e prioridades |

---

## 🖼️ Sprites animados (MobSprite)

Cada MVP exibe seu sprite animado com cadeia de fallback automática:

```
1. GIF oficial kRO  → https://imgc1.gnjoy.com/.../Monster/{aegisName}.gif
2. GIF Divine Pride → https://static.divine-pride.net/images/mobs/gif/{mobId}.gif
3. PNG Divine Pride → https://static.divine-pride.net/images/mobs/png/{mobId}.png
4. Ícone Skull      → fallback visual quando nenhuma fonte responde
```

O campo `aegisName` (ex: `AMON_RA`, `BAPHOMET`) está mapeado para todos os **49 MVPs kRO clássicos**. MVPs exclusivos do TrueMmo sem `aegisName` usam diretamente os fallbacks da Divine Pride.

---

## 🎯 Modos de Objetivo

| Emoji | Modo | Lógica de ordenação |
|---|---|---|
| ⚔️ | **Padrão** | Score geral (comportamento original) |
| 🎯 | **Farmar MVP Points** | Easy first, solo, fast spawn, penaliza disputados |
| 💎 | **Melhores Drops** | Tag `high-drop` + prioridade alta |
| ⚡ | **Rotação Rápida** | Menor respawn primeiro |
| 🤝 | **Caçada em Grupo** | Tag `group` + `high-drop` |

---

## 🧱 Stack

- **React 18 + TypeScript + Vite** — frontend rápido e tipado
- **Tailwind CSS** — tema dark customizado estilo Ragnarok
- **Supabase** — PostgreSQL + Realtime + Auth para sincronização de grupo
- **Google OAuth 2.0** — login com conta Google via Supabase Auth
- **Google Gemini 2.0 Flash** — sugestão inteligente de alvo
- **Vercel** — deploy contínuo via GitHub

---

## 📋 MVPs incluídos (99+)

> Lista baseada na wiki oficial do RO BR. MVPs com múltiplos mapas aparecem uma vez por mapa.  
> `Especial` = sem tempo fixo de respawn (instância, evento ou mecânica própria).

### Níveis 25–80

| MVP | Nível | Mapa(s) | Respawn |
|---|---|---|---|
| Gemaring | 25 | lasa_dun01 | 1 h |
| Orc Herói | 50 | gef_fild03 | 1 h |
| Maya | 55 | anthell02 / gld_dun03 / gld_dun02_2 | 2 h / 8 h / 8 h |
| Senhor dos Orcs | 55 | gef_fild10 | 2 h |
| Besouro-Ladrão Dourado | 65 | prt_sewb4 | 1 h |
| Eddga | 65 | pay_fild10 / gld_dun01 / gld_dun01_2 | 2 h / 8 h / 8 h |
| Osíris | 68 | moc_pryd04 | 1 h |
| Amon Ra | 69 | moc_pryd06 | 1 h |
| Freeoni | 71 | moc_fild17 | 2 h |
| Drácula | 75 | gef_dun01 | 1 h |
| Doppelganger | 77 | gef_dun02 / gld_dun02 / gld_dun04 | 2 h / 8 h / 8 h |
| Abelha-Rainha | 78 | mjolnr_04 / gld_dun02 | 2 h / 8 h |
| Flor do Luar | 79 | pay_dun04 / pay_dun01 | 1 h / 8 h |
| Lady Tanee | 80 | ayo_dun02 | 7 h |

### Níveis 81–120

| MVP | Nível | Mapa(s) | Respawn |
|---|---|---|---|
| Bafomé | 81 | prt_maze03 / gld_dun03 | 2 h / 8 h |
| Faraó | 85 | in_sphinx5 | 1 h |
| Kublin | 85 | schg_dun01 / arug_dun01 | Especial |
| Drake | 91 | treasure02 | 2 h |
| Cavaleiro da Tempestade | 92 | xmas_dun02 | 1 h 7 min |
| Boitatá | 93 | bra_dun02 | 2 h |
| Leak | 94 | dew_dun01 | 2 h |
| Senhor dos Mortos | 94 | Niflheim | 2 h 13 min |
| Senhor das Trevas | 96 | gl_chyard / gl_chyard_ / gld_dun04 / gld_dun04_2 | 1 h / 1 h / 8 h / 8 h |
| Gorynych | 97 | mosk_dun03 | 2 h |
| Lady Branca | 97 | lou_dun03 | 1 h 56 min |
| Hatii | 98 | xmas_fild01 | 2 h |
| Ktullanux | 98 | ice_dun03 | 2 h |
| Superaprendiz | 99 | teg_dun02 | 3 h |
| Aprendiz | 99 | teg_dun01 | 3 h |
| RSX-0806 | 100 | ein_dun02 | 2 h 5 min |
| Samurai Encarnado | 100 | ama_dun03 | 1 h 31 min |
| Serpente Suprema | 105 | gon_dun03 | 1 h 34 min |
| Tao Gunka | 110 | beach_dun | 5 h |
| General Tartaruga | 110 | tur_dun04 | 1 h |
| Quimera Venenosa | 110 | slabw01 | 1 h |
| Atroce | 113 | ra_fild03 / ra_fild04 / ve_fild01 / ve_fild02 / gld_dun03_2 | 3 h / 5 h / 3 h / 6 h / 8 h |
| Ilusão do Luar | 118 | Ilusão da Lua | Especial |
| Kraken | 124 | iz_dun05 | 2 h 20 min |

### Níveis 125–160

| MVP | Nível | Mapa(s) | Respawn |
|---|---|---|---|
| Kiel-D-01 | 125 | kh_dun02 | 2 h |
| Vesper | 128 | jupe_core | 2 h |
| Detardeurus | 135 | abyss_03 | 3 h |
| Ktullanux de Cristal | 135 | Ilusão do Gelo | 22 h |
| Bispo Decadente | 138 | abbey02 | 2 h |
| Pesar Noturno | 139 | ra_san05 | 5 h |
| Conde Drácula | 139 | Ilusão do Vampiro | Especial |
| Rainha Scaraba | 140 | dic_dun02 | 2 h |
| Rainha Scaraba Dourada | 140 | dic_dun03 | 2 h |
| Espadachim Egnigem | 141 | lhz_dun02 | 2 h |
| Valquíria Randgris | 141 | odin_tem03 | 8 h |
| Pyuriel Furiosa | 141 | gld2_prt | 8 h |
| General Daehyun | 142 | gld2_pay | 8 h |
| Guardião Morto Kades | 143 | gld2_gef | 8 h |
| Amon Ra do Pesadelo | 145 | moc_prydn2 | 1 h |
| Gioia | 146 | gld2_ald | 8 h |
| Ifrit | 146 | thor_v03 | 11 h |
| Belzebu | 147 | abbey03 | 12 h |
| Morroc Ferido | 151 | moc_fild22 | 12 h |
| Bafomé Amaldiçoado | 154 | gl_cas02_ | 2 h |
| Aranha Mecânica | 158 | rockmi1 | Instantâneo |
| Algoz Eremes | 160 | lhz_dun03 | 2 h |
| Sumo Margaretha | 160 | lhz_dun03 | 2 h |
| Atiradora Cecil | 160 | lhz_dun03 | 2 h |
| Arquimaga Kathryne | 160 | lhz_dun03 | 2 h |
| Mestre-Ferreiro Howard | 160 | lhz_dun03 | 2 h |
| Lorde Seyren | 160 | lhz_dun03 | 2 h |
| Ursinho Brilhante | 160 | Ilusão do Ursinho | Especial |

### Níveis 165–255

| MVP | Nível | Mapa(s) | Respawn |
|---|---|---|---|
| Marechal Tartaruga | 165 | Ilusão da Tartaruga | Especial |
| Árvore de Pitaya | 168 | ba_lost | 6 h |
| Tao Gunka Ancestral | 169 | Ilusão de Luanda | Especial |
| Defensor Wootan | 169 | Ilusão de Luanda | Especial |
| Vigia do Tempo | 170 | c_tower3_ | 2 h |
| R48-85-Bestia | 174 | sp_rudus2 | 1 h |
| Maya Silente | 174 | Ilusão das Gêmeas | Especial |
| Bafomé Caótico | 178 | Ilusão do Labirinto | Especial |
| Bioquímico Flamel | 186 | Tumba da Honra | 2 h |
| Trovador Alphoccio | 186 | Tumba da Honra | 2 h |
| Musa Trentini | 186 | Tumba da Honra | 2 h |
| Arcebispa Margaretha | 187 | Tumba da Honra | 2 h |
| Mecânico Howard | 187 | Tumba da Honra | 2 h |
| Arcana Kathryne | 187 | Tumba da Honra | 2 h |
| Guardião Real Randel | 188 | Tumba da Honra | 2 h |
| Feiticeira Celia | 188 | Tumba da Honra | 2 h |
| Shura Chen | 188 | Tumba da Honra | 2 h |
| Renegada Gertie | 188 | Tumba da Honra | 2 h |
| Muspellskoll | 188 | mag_dun03 | 2 h |
| Sicário Eremes | 189 | Tumba da Honra | 2 h |
| Sentinela Cecil | 189 | Tumba da Honra | 2 h |
| Cavaleiro Rúnico Seyren | 189 | Tumba da Honra | 2 h |
| Lorde das Trevas | 194 | gl_cas01_ | 1 h |
| Aranha Rainha | 195 | gl_cas01_ | 2 h |
| Joialiant | 197 | ein_dun03 | 2 h |
| Kraken Abismal | 204 | Ilusão do Mar | Especial |
| Bruxa do Mar | 205 | Ilusão do Mar | Especial |
| Valquíria Ingrid | 207 | odin_past | Especial |
| Valquíria Reginleif | 207 | odin_past | Especial |
| Detale Esqueleto | 209 | abyss_04 | 3 h |
| R001-Bestia | 215 | sp_rudus4 | 3 h |
| Quimera Única | 245 | amicitia2 | 3 h |
| Bruxa da Morte | 255 | nif_dun02 | 3 h |

---

## 🚀 Setup local

```bash
git clone https://github.com/IsraelSiq/mvp-timer-tracker.git
cd mvp-timer-tracker
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
5. Em **Authorized JavaScript origins**, adicione a URL do seu deploy na Vercel
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
│   ├── MVPCard.tsx            # Card do MVP — sprite animado (MobSprite) + timer + ações
│   ├── MvpDetailsPanel.tsx    # Painel lateral com detalhes completos do MVP selecionado
│   ├── KillModal.tsx          # Modal de registro de kill
│   ├── KillLog.tsx            # Painel de log do grupo
│   ├── AISuggestion.tsx       # Painel de sugestão Gemini
│   ├── StatusBadge.tsx        # Badge de status (Vivo / Longe / Janela / etc)
│   ├── AuthModal.tsx          # Modal de login (Google + e-mail/senha)
│   ├── GoalSelector.tsx       # Seletor de modo objetivo
│   ├── SkillChangesPanel.tsx  # Painel de mudanças de skill (legado — migrado para ro-skill-simulator)
│   └── SkillSimulator/        # Componentes do simulador de skill (legado — migrado para ro-skill-simulator)
├── data/
│   ├── mvps.ts                # 99+ MVPs com respawn, aegisName, prioridade, dificuldade e tags
│   ├── mvpImages.ts           # URLs de imagem legadas (substituídas pelo MobSprite)
│   └── mapNames.ts            # Tradução dos IDs de mapa para nomes em PT-BR
├── hooks/
│   ├── useAuth.ts             # Autenticação (Google OAuth + e-mail/senha)
│   ├── useKills.ts            # Estado de kills + sync Supabase
│   ├── useNow.ts              # Tick a cada 1 s para atualizar timers
│   └── useTimers.ts           # Lógica de respawn e enriquecimento de MVPs
├── lib/
│   ├── supabase.ts            # Cliente Supabase
│   └── gemini.ts              # Integração Gemini AI
├── pages/
│   └── Dashboard.tsx          # Página principal
├── types/
│   └── index.ts               # Interfaces TypeScript: MVP, EnrichedMVP, KillLog, GoalMode, MvpTag
└── utils/
    ├── timer.ts               # Cálculos de respawn e status
    ├── respawn.ts             # Utilitários de respawn
    └── goalSort.ts            # Lógica de scoring por modo objetivo
supabase/
└── policies.sql               # Políticas RLS prontas para aplicar
```

---

## 🏷️ Tags de MVP

| Tag | Descrição |
|---|---|
| `solo` | Pode ser feito solo |
| `group` | Recomendado ou exige grupo |
| `high-drop` | Card / drop de alto valor |
| `fast` | Respawn curto (≤ 1 h) |
| `field` | Aparece em mapa aberto (field) |
| `disputed` | Muito disputado no servidor |
| `truemmo-exclusive` | Exclusivo do servidor TrueMmo |

---

## 🛡️ Segurança

> ⚠️ A chave Gemini fica exposta no bundle client-side (prefixo `VITE_`).  
> Para produção com billing ativo, mova a chamada para uma **Vercel Serverless Function**.

---

## 📄 Licença

MIT © [Israel Siqueira](https://github.com/IsraelSiq)
