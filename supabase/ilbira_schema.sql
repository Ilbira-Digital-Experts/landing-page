-- Ilbira — blog de recursos, en el mismo proyecto Supabase que fac.
-- Convención: tablas prefijadas con `ilbira_` en el schema `public`, para
-- compartir base de datos sin colisionar con las tablas de fac (posts,
-- comments, etc.) y sin tener que exponer un schema nuevo en la Data API.
--
-- Aplicar a mano desde el SQL Editor del dashboard de Supabase (mismo
-- flujo que fac/supabase/*.sql — no hay CLI ni migraciones versionadas).
--
-- Requiere que public.handle_updated_at() ya exista en el proyecto
-- (creada por fac/supabase/schema.sql). Si el proyecto es nuevo y no
-- existe todavía, descomenta el bloque de abajo.

-- create or replace function public.handle_updated_at()
-- returns trigger as $$
-- begin
--   new.updated_at = now();
--   return new;
-- end;
-- $$ language plpgsql;

create table if not exists public.ilbira_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  slug text not null,
  lang text not null check (lang in ('es', 'en')),
  content text not null,
  category text,
  tags text[] not null default '{}',
  author text not null default 'Ilbira',
  canonical text,
  og_image text,
  robots text not null default 'index, follow',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (slug, lang)
);

alter table public.ilbira_posts enable row level security;

create trigger ilbira_posts_updated_at
  before update on public.ilbira_posts
  for each row execute function public.handle_updated_at();

-- Lectura pública: solo posts publicados.
create policy "ilbira_posts public read published"
  on public.ilbira_posts for select
  to anon
  using (published = true);

-- Panel de administración (mismo modelo single-admin que fac): cualquier
-- usuario autenticado tiene acceso total.
create policy "ilbira_posts authenticated full access"
  on public.ilbira_posts for all
  to authenticated
  using (true)
  with check (true);

create index if not exists ilbira_posts_lang_published_idx
  on public.ilbira_posts (lang, published, published_at desc);
