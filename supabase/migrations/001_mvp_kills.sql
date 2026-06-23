-- =============================================================
-- Migration 001 — tabela mvp_kills
-- Aplique no SQL Editor do Supabase ou via CLI:
--   supabase db push
-- =============================================================

-- Extensão UUID (já ativa na maioria dos projetos Supabase)
create extension if not exists "pgcrypto";

-- Tabela principal de registro de kills
create table if not exists public.mvp_kills (
  id              uuid        primary key default gen_random_uuid(),
  mvp_id          integer     not null,
  mvp_name        text        not null,
  killer          text        not null default '',
  killed_at       timestamptz not null default now(),
  note            text        not null default '',
  group_name      text        not null default 'default',
  killed_by_enemy boolean     not null default false,
  created_at      timestamptz not null default now()
);

-- Index para a query principal: busca por grupo ordenada por data
create index if not exists mvp_kills_group_killed_at_idx
  on public.mvp_kills (group_name, killed_at desc);

-- ── Row Level Security ─────────────────────────────────────────
alter table public.mvp_kills enable row level security;

-- Leitura pública (qualquer usuário autenticado pode ver o log do grupo)
create policy "mvp_kills: leitura autenticada"
  on public.mvp_kills
  for select
  using (auth.role() = 'authenticated');

-- Insert: apenas usuários autenticados
create policy "mvp_kills: insert autenticado"
  on public.mvp_kills
  for insert
  with check (auth.role() = 'authenticated');

-- ── Realtime ───────────────────────────────────────────────────
-- Habilite também em: Supabase Dashboard → Realtime → mvp_kills
alter publication supabase_realtime add table public.mvp_kills;
