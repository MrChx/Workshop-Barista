-- Tambah policy UPDATE untuk participants (diperlukan untuk fitur Edit)
drop policy if exists "Allow update" on public.participants;

create policy "Allow update" on public.participants
  for update
  using (true)
  with check (true);
