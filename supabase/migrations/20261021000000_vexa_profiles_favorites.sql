-- VEXA – perfis de usuária e notícias favoritas
-- Execute no Supabase: SQL Editor (colar e rodar) ou `supabase db push`.

-- ---------------------------------------------------------------------------
-- Função utilitária: mantém updated_at
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles: 1 linha por usuária de auth.users (e-mail e senha ficam só no Auth)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  name       text not null check (char_length(btrim(name)) between 1 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Cria o perfil automaticamente quando a conta é criada (nome vem do cadastro).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    left(
      coalesce(
        nullif(btrim(new.raw_user_meta_data ->> 'name'), ''),
        nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
        'Usuária'
      ),
      100
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Perfis de contas que já existiam antes desta migração
insert into public.profiles (id, name)
select u.id,
       left(coalesce(nullif(btrim(u.raw_user_meta_data ->> 'name'), ''),
                     nullif(split_part(coalesce(u.email, ''), '@', 1), ''),
                     'Usuária'), 100)
from auth.users u
on conflict (id) do nothing;

alter table public.profiles enable row level security;

drop policy if exists "profiles: ver o próprio" on public.profiles;
create policy "profiles: ver o próprio"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "profiles: criar o próprio" on public.profiles;
create policy "profiles: criar o próprio"
  on public.profiles for insert to authenticated
  with check ((select auth.uid()) = id);

drop policy if exists "profiles: editar o próprio" on public.profiles;
create policy "profiles: editar o próprio"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Sem policy de delete: o perfil some junto com a conta (on delete cascade).
revoke all on public.profiles from anon;

-- ---------------------------------------------------------------------------
-- favorites: notícias favoritadas. news_id = "id" em src/data/conteudos.json
-- (as notícias não estão no banco, então não há tabela news nem FK).
-- ---------------------------------------------------------------------------
create table if not exists public.favorites (
  id         bigint generated always as identity primary key,
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  news_id    integer not null check (news_id > 0),
  created_at timestamptz not null default now(),
  constraint favorites_user_news_unique unique (user_id, news_id)
);

alter table public.favorites enable row level security;

drop policy if exists "favorites: ver os próprios" on public.favorites;
create policy "favorites: ver os próprios"
  on public.favorites for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "favorites: criar os próprios" on public.favorites;
create policy "favorites: criar os próprios"
  on public.favorites for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "favorites: remover os próprios" on public.favorites;
create policy "favorites: remover os próprios"
  on public.favorites for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Sem policy de update: favoritar/desfavoritar é inserir/remover.
revoke all on public.favorites from anon;
