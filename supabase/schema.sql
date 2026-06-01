-- Ragnarok MVP Timer — Supabase Schema
-- Run this in the Supabase SQL editor.

create table if not exists public.mvp_kills (
  id          bigint generated always as identity primary key,
  mvp_id      integer      not null,
  mvp_name    text         not null,
  killer      text         not null,
  killed_at   timestamptz  not null default now(),
  note        text,
  group_name  text         not null default 'truemmo-main',
  created_at  timestamptz  not null default now()
);

create index if not exists idx_mvp_kills_group_killed
  on public.mvp_kills (group_name, killed_at desc);

alter table public.mvp_kills enable row level security;

create policy "Public read"   on public.mvp_kills for select using (true);
create policy "Public insert" on public.mvp_kills for insert with check (true);

-- Enable Realtime:
-- Supabase Dashboard → Database → Replication → mvp_kills → toggle on.
