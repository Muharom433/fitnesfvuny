-- ============================================================
-- Migration: Tabel Persistensi Transaksi Kasir
-- Jalankan di Supabase SQL Editor
-- ============================================================

-- 1. Tabel utama transaksi kunjungan
create table if not exists public.kasir_transactions (
  id text primary key,
  date text not null,
  time text,
  name text not null,
  phone text,
  civitas text,
  category text,
  duration text,
  trainer text,
  kelas text,
  alat text,
  nim text,
  amount numeric default 0,
  payment_method text,
  status text,
  type text default 'visit',
  token text,
  created_at timestamptz default now()
);

-- 2. Tabel penjualan produk
create table if not exists public.product_sales (
  id text primary key,
  date text not null,
  product_name text,
  qty int default 1,
  price numeric default 0,
  total numeric default 0,
  payment_method text,
  created_at timestamptz default now()
);

-- 3. Enable RLS
alter table public.kasir_transactions enable row level security;
alter table public.product_sales enable row level security;

-- 4. Policy: semua user terautentikasi bisa baca & tulis
create policy "Allow all for authenticated users" on public.kasir_transactions
  for all using (true) with check (true);

create policy "Allow all for authenticated users" on public.product_sales
  for all using (true) with check (true);
