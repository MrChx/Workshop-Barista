-- Buat tabel participants jika belum ada
create table if not exists public.participants (
  id bigint primary key generated always as identity,
  name text not null,
  "group" text not null,
  created_at timestamptz default now()
);

-- Aktifkan Row Level Security (RLS)
alter table public.participants enable row level security;

-- Hapus policy lama jika ada untuk mencegah konflik
drop policy if exists "Allow insert" on public.participants;
drop policy if exists "Allow select" on public.participants;
drop policy if exists "Allow delete" on public.participants;

-- Policy agar form registrasi umum bisa insert
create policy "Allow insert" on public.participants 
  for insert 
  with check (true);

-- Policy agar data bisa dibaca oleh API / admin
create policy "Allow select" on public.participants 
  for select 
  using (true);

-- Policy agar data bisa dihapus dari dashboard admin
create policy "Allow delete" on public.participants 
  for delete 
  using (true);
