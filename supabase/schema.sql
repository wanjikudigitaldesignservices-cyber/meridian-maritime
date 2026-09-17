-- ============ ENUMS ============
create type user_role as enum ('admin','regional_editor','ops','client');
create type post_status as enum ('draft','review','published','archived');
create type lead_status as enum ('new','contacted','quoted','won','lost');
create type job_status as enum ('booked','in_transit','at_berth','discharging','cleared','completed','on_hold');
create type application_status as enum ('received','screening','interview','offered','rejected','pooled');
create type vessel_type as enum ('container','bulk_carrier','tanker','chemical','lng','osv','icebreaker','ropax','general_cargo');

-- ============ REGIONS ============
create table regions (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  entity_name text not null,
  continent text not null,
  country text,
  primary_port text not null,
  unlocode text not null,
  lat text not null,
  lng text not null,
  timezone text not null,
  load_line_zone text not null,
  accent_hex text not null,
  currency text not null,
  languages text[] not null default '{en}',
  emergency_phone text not null,
  office_phone text,
  email text,
  address text,
  hero_headline text,
  hero_subline text,
  hero_image_url text,
  positioning text,
  regulators text[],
  licences text[],
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============ SERVICES ============
create table services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  division text not null,
  short_description text not null,
  long_description text,
  icon_name text,
  hero_image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table region_services (
  id uuid primary key default gen_random_uuid(),
  region_id uuid not null references regions(id) on delete cascade,
  service_id uuid not null references services(id) on delete cascade,
  local_headline text,
  local_description text,
  indicative_rate_note text,
  is_featured boolean default false,
  sort_order int default 0,
  unique (region_id, service_id)
);

-- ============ PORTS ============
create table ports (
  id uuid primary key default gen_random_uuid(),
  region_id uuid not null references regions(id) on delete cascade,
  slug text not null,
  name text not null,
  country text not null,
  unlocode text not null,
  lat numeric(9,6) not null,
  lng numeric(9,6) not null,
  max_draught_m numeric(4,1),
  max_loa_m numeric(5,1),
  berth_count int,
  cargo_types text[],
  restrictions text,
  agent_contact_name text,
  agent_contact_phone text,
  agent_contact_email text,
  is_primary boolean default false,
  unique (region_id, slug)
);

-- ============ VESSELS ============
create table vessels (
  id uuid primary key default gen_random_uuid(),
  imo_number text unique not null,
  name text not null,
  vessel_type vessel_type not null,
  flag_state text,
  class_society text,
  year_built int,
  dwt int,
  loa_m numeric(5,1),
  beam_m numeric(4,1),
  gross_tonnage int,
  is_ice_class boolean default false,
  ice_class_notation text,
  managed_by_region_id uuid references regions(id),
  cii_rating text,
  image_url text,
  is_active boolean default true
);

-- ============ PEOPLE ============
create table people (
  id uuid primary key default gen_random_uuid(),
  region_id uuid references regions(id) on delete set null,
  full_name text not null,
  job_title text not null,
  bio text,
  photo_url text,
  email text,
  phone text,
  linkedin_url text,
  is_group_leadership boolean default false,
  sort_order int default 0
);

-- ============ BLOG / INSIGHTS ============
create table post_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null
);

create table posts (
  id uuid primary key default gen_random_uuid(),
  region_id uuid references regions(id) on delete cascade,
  category_id uuid references post_categories(id) on delete set null,
  author_id uuid references auth.users(id) on delete set null,
  slug text not null,
  title text not null,
  excerpt text,
  body_markdown text not null,
  cover_image_url text,
  status post_status not null default 'draft',
  is_news boolean default false,
  tags text[],
  read_minutes int,
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (region_id, slug)
);

-- ============ CAREERS ============
create table jobs_board (
  id uuid primary key default gen_random_uuid(),
  region_id uuid references regions(id) on delete cascade,
  title text not null,
  slug text not null,
  track text not null check (track in ('seafarer','shore')),
  rank_or_level text,
  department text,
  location text,
  contract_type text,
  contract_months int,
  description_markdown text not null,
  requirements text[],
  is_open boolean default true,
  closes_at date,
  created_at timestamptz default now()
);

create table applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs_board(id) on delete set null,
  region_id uuid references regions(id),
  track text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  nationality text,
  rank_applied text,
  coc_number text,
  coc_issuing_country text,
  stcw_certs text[],
  sea_service_months int,
  last_vessel_type vessel_type,
  medical_expiry date,
  years_experience int,
  cover_note text,
  cv_url text,
  status application_status default 'received',
  created_at timestamptz default now()
);

-- ============ LEADS / ENQUIRIES ============
create table leads (
  id uuid primary key default gen_random_uuid(),
  region_id uuid references regions(id),
  service_id uuid references services(id),
  lead_type text not null check (lead_type in ('quote','agency_appointment','general','emergency','newsletter')),
  company_name text,
  contact_name text not null,
  email text not null,
  phone text,
  country text,
  vessel_name text,
  imo_number text,
  eta date,
  port_of_call text,
  cargo_description text,
  message text,
  status lead_status default 'new',
  internal_notes text,
  assigned_to uuid references auth.users(id),
  created_at timestamptz default now()
);

-- ============ CLIENT PORTAL ============
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company_name text,
  role user_role not null default 'client',
  region_id uuid references regions(id),
  avatar_url text,
  phone text,
  created_at timestamptz default now()
);

create table jobs (
  id uuid primary key default gen_random_uuid(),
  job_reference text unique not null,
  client_id uuid references profiles(id) on delete set null,
  region_id uuid not null references regions(id),
  port_id uuid references ports(id),
  vessel_id uuid references vessels(id),
  service_id uuid references services(id),
  status job_status default 'booked',
  eta timestamptz,
  etd timestamptz,
  cargo_description text,
  created_at timestamptz default now()
);

create table job_milestones (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  label text not null,
  occurred_at timestamptz,
  is_complete boolean default false,
  notes text,
  sort_order int default 0
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(id) on delete cascade,
  client_id uuid references profiles(id) on delete cascade,
  doc_type text not null,
  file_name text not null,
  file_url text not null,
  file_size_kb int,
  uploaded_at timestamptz default now()
);

-- ============ PUBLIC DOWNLOADS ============
create table downloads (
  id uuid primary key default gen_random_uuid(),
  region_id uuid references regions(id) on delete cascade,
  title text not null,
  description text,
  category text not null,
  file_url text not null,
  file_size_kb int,
  created_at timestamptz default now()
);

-- ============ SITE SETTINGS ============
create table site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- ============ INDEXES ============
create index idx_posts_region_status on posts(region_id, status, published_at desc);
create index idx_posts_slug on posts(slug);
create index idx_region_services_region on region_services(region_id);
create index idx_ports_region on ports(region_id);
create index idx_leads_region_status on leads(region_id, status, created_at desc);
create index idx_jobs_reference on jobs(job_reference);
create index idx_jobs_client on jobs(client_id);
create index idx_applications_status on applications(status, created_at desc);

-- ============ RLS ENABLE ============
alter table regions          enable row level security;
alter table services         enable row level security;
alter table region_services  enable row level security;
alter table ports            enable row level security;
alter table vessels          enable row level security;
alter table people           enable row level security;
alter table post_categories  enable row level security;
alter table posts            enable row level security;
alter table jobs_board       enable row level security;
alter table applications     enable row level security;
alter table leads            enable row level security;
alter table profiles         enable row level security;
alter table jobs             enable row level security;
alter table job_milestones   enable row level security;
alter table documents        enable row level security;
alter table downloads        enable row level security;
alter table site_settings    enable row level security;

-- ============ FUNCTIONS & POLICIES ============
create or replace function auth_role()
returns user_role
language sql stable security definer
as $$ select role from profiles where id = auth.uid() $$;

create or replace function auth_region()
returns uuid
language sql stable security definer
as $$ select region_id from profiles where id = auth.uid() $$;

-- PUBLIC READ
create policy "public read regions" on regions for select using (is_active = true);
create policy "public read services" on services for select using (true);
create policy "public read region_services" on region_services for select using (true);
create policy "public read ports" on ports for select using (true);
create policy "public read vessels" on vessels for select using (is_active = true);
create policy "public read people" on people for select using (true);
create policy "public read categories" on post_categories for select using (true);
create policy "public read downloads" on downloads for select using (true);

-- POSTS
create policy "public read published posts" on posts for select using (status = 'published' and published_at <= now());
create policy "admin all posts" on posts for all using (auth_role() = 'admin') with check (auth_role() = 'admin');
create policy "editor own region posts" on posts for all using (auth_role() = 'regional_editor' and region_id = auth_region()) with check (auth_role() = 'regional_editor' and region_id = auth_region());

-- JOBS BOARD
create policy "public read open jobs" on jobs_board for select using (is_open = true);
create policy "admin manage jobs_board" on jobs_board for all using (auth_role() in ('admin','regional_editor')) with check (auth_role() = 'admin' or region_id = auth_region());

-- APPLICATIONS
create policy "anyone submit application" on applications for insert with check (true);
create policy "staff read applications" on applications for select using (auth_role() in ('admin','ops'));
create policy "staff update applications" on applications for update using (auth_role() in ('admin','ops'));

-- LEADS
create policy "anyone submit lead" on leads for insert with check (true);
create policy "staff read leads" on leads for select using (auth_role() in ('admin','ops','regional_editor'));
create policy "staff update leads" on leads for update using (auth_role() in ('admin','ops'));

-- PROFILES
create policy "own profile read" on profiles for select using (id = auth.uid() or auth_role() = 'admin');
create policy "own profile update" on profiles for update using (id = auth.uid());
create policy "admin manage profiles" on profiles for all using (auth_role() = 'admin');

-- CLIENT PORTAL
create policy "client read own jobs" on jobs for select using (client_id = auth.uid() or auth_role() in ('admin','ops'));
create policy "client read own milestones" on job_milestones for select using (
    exists (select 1 from jobs j where j.id = job_id and (j.client_id = auth.uid() or auth_role() in ('admin','ops')))
);
create policy "client read own documents" on documents for select using (client_id = auth.uid() or auth_role() in ('admin','ops'));
create policy "staff manage jobs" on jobs for all using (auth_role() in ('admin','ops'));

-- ADMIN ONLY
create policy "admin manage regions" on regions for all using (auth_role() = 'admin');
create policy "admin manage services" on services for all using (auth_role() = 'admin');
create policy "admin manage region_services" on region_services for all using (auth_role() = 'admin');
create policy "admin manage ports" on ports for all using (auth_role() in ('admin','ops'));
create policy "admin manage vessels" on vessels for all using (auth_role() in ('admin','ops'));
create policy "admin manage people" on people for all using (auth_role() = 'admin' or region_id = auth_region());
create policy "admin manage downloads" on downloads for all using (auth_role() in ('admin','regional_editor'));
create policy "admin manage settings" on site_settings for all using (auth_role() = 'admin');

create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'client');
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
