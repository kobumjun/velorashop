-- Meridian — initial schema (run in Supabase SQL Editor or via CLI)

-- Profiles: username + password (custom auth; accessed only via service role from app server)
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create index if not exists profiles_username_idx on public.profiles (username);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text not null check (category in ('시계', '선글라스', '모자')),
  price integer not null check (price >= 0),
  description text,
  size_info text,
  cover_image_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_category_idx on public.products (category);
create index if not exists products_published_idx on public.products (is_published);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  image_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists product_images_product_id_idx on public.product_images (product_id);

-- updated_at maintenance
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row
  execute function public.set_updated_at();

-- RLS: public reads only published catalog; profiles have no anon/authenticated policies
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;

-- Published products visible to anonymous API consumers
create policy "products_select_published"
  on public.products
  for select
  to anon, authenticated
  using (is_published = true);

-- Gallery rows only when parent product is published
create policy "product_images_select_published"
  on public.product_images
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.products p
      where p.id = product_images.product_id
        and p.is_published = true
    )
  );

-- No insert/update/delete policies for anon/authenticated on these tables:
-- server-side admin uses the service role key, which bypasses RLS.

comment on table public.profiles is 'Custom username/password users; mutate only via service role from trusted server code.';
comment on table public.products is 'Catalog; public SELECT via RLS when is_published.';
comment on table public.product_images is 'Extra images; public SELECT when parent is published.';
