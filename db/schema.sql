create extension if not exists pgcrypto;

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'new' check (status in ('new', 'confirmed', 'declined')),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  event_date date not null,
  pickup text,
  notes text,
  title text not null,
  car_slug text,
  route_stops jsonb not null default '[]'::jsonb,
  addons jsonb not null default '[]'::jsonb,
  km integer,
  quoted_total integer,
  is_custom boolean not null default false,
  consent boolean not null default true,
  source text not null default 'website',
  mail_owner_status text not null default 'pending',
  mail_customer_status text not null default 'pending',
  mail_error text,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reservations_event_date_idx on reservations (event_date);
create index if not exists reservations_status_idx on reservations (status);
create index if not exists reservations_car_slug_idx on reservations (car_slug);

create table if not exists calendar_blocks (
  id uuid primary key default gen_random_uuid(),
  event_date date not null,
  car_slug text,
  reason text not null,
  created_at timestamptz not null default now()
);

create index if not exists calendar_blocks_event_date_idx on calendar_blocks (event_date);
create index if not exists calendar_blocks_car_slug_idx on calendar_blocks (car_slug);

create table if not exists admin_login_attempts (
  id bigserial primary key,
  ip_hash text not null,
  success boolean not null,
  created_at timestamptz not null default now()
);

create index if not exists admin_login_attempts_ip_created_idx
  on admin_login_attempts (ip_hash, created_at desc);

create table if not exists reservation_attempts (
  id bigserial primary key,
  ip_hash text not null,
  success boolean not null,
  created_at timestamptz not null default now()
);

create index if not exists reservation_attempts_ip_created_idx
  on reservation_attempts (ip_hash, created_at desc);
