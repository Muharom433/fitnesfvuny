-- ============================================================================
-- MIGRATION SCRIPT: MEMBER TOKENS TABLE (Jalankan di Supabase SQL Editor)
-- FITNESS CENTER FV UNY
-- ============================================================================

-- 1. Buat Tabel Member Tokens
create table if not exists public.member_tokens (
    id uuid primary key default gen_random_uuid(),
    token text unique not null,
    name text not null,
    email text,
    phone text,
    status_civitas text not null default 'public', -- 'student', 'alumni', 'public'
    duration text not null default '1 Bulan', -- '1 Bulan', '3 Bulan'
    registration_date date not null default current_date,
    expiry_date date not null,
    visit_count integer not null default 0,
    visits_log jsonb not null default '[]'::jsonb, -- array riwayat kunjungan: [{"date": "2026-07-13", "time": "18:40"}]
    created_at timestamp with time zone default now()
);

-- 2. Matikan RLS agar mempermudah frontend menulis/membaca data secara langsung
alter table public.member_tokens disable row level security;
