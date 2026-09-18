-- Tambah kolom usia ke tabel participants
alter table public.participants
  add column if not exists age integer not null default 0;
