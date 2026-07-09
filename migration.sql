-- ============================================================================
-- MIGRATION SCRIPT: LOGIN KUSTOM TANPA auth.users (Jalankan di Supabase SQL Editor)
-- FITNESS CENTER FV UNY
-- ============================================================================

-- 1. Bersihkan trigger lama jika ada
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user() cascade;

-- 2. Hapus constraint relasi lama agar tabel profiles/users bisa di-drop
alter table public.bookings drop constraint if exists bookings_user_id_fkey;
alter table public.tickets drop constraint if exists tickets_assigned_to_fkey;
alter table public.ticket_comments drop constraint if exists ticket_comments_author_id_fkey;
alter table public.transactions drop constraint if exists transactions_cashier_id_fkey;

-- 3. Hapus tabel lama
drop table if exists public.profiles cascade;
drop table if exists public.users cascade;

-- 4. Buat tabel public.users yang baru (ID menggunakan default gen_random_uuid)
create table public.users (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text unique not null,
    password text not null, -- Kolom password kustom terenkripsi
    phone text,
    gender text check (gender in ('Pria', 'Wanita')),
    birthdate date,
    identity_type text,
    identity_number text,
    address text,
    role text not null default 'member' check (role in ('admin', 'receptionist', 'member')),
    created_at timestamp with time zone default now()
);

-- 5. Nonaktifkan RLS untuk tabel users agar client-side JS bisa mengakses data profil secara langsung
alter table public.users disable row level security;

-- 6. Hubungkan kembali foreign key dari tabel-tabel lain ke tabel users kustom
alter table public.bookings
    add constraint bookings_user_id_fkey
    foreign key (user_id) references public.users(id) on delete set null;

alter table public.tickets
    add constraint tickets_assigned_to_fkey
    foreign key (assigned_to) references public.users(id) on delete set null;

alter table public.ticket_comments
    add constraint ticket_comments_author_id_fkey
    foreign key (author_id) references public.users(id) on delete set null;

alter table public.transactions
    add constraint transactions_cashier_id_fkey
    foreign key (cashier_id) references public.users(id) on delete set null;

-- 7. Buat fungsi RPC untuk verifikasi login secara aman di sisi database (Bcrypt)
create or replace function public.check_user_login(p_email text, p_password text)
returns table (id uuid, name text, email text, role text) as $$
begin
    return query
    select u.id, u.name, u.email, u.role
    from public.users u
    where u.email = p_email
      and u.password = extensions.crypt(p_password, u.password); -- Pencocokan Bcrypt
end;
$$ language plpgsql security definer;

-- 8. Tambahkan Akun Admin & Resepsionis Default (Password dienkripsi Bcrypt otomatis)
insert into public.users (name, email, password, role)
values 
('Admin Utama', 'admin@uny.ac.id', extensions.crypt('admin123', extensions.gen_salt('bf')), 'admin'),
('Resepsionis FV', 'resepsionis@uny.ac.id', extensions.crypt('resep123', extensions.gen_salt('bf')), 'receptionist');

-- 9. Nonaktifkan RLS untuk seluruh tabel agar client-side JS bisa melakukan write/delete secara langsung
alter table public.contact_links disable row level security;
alter table public.pricing disable row level security;
alter table public.trainers disable row level security;
alter table public.classes disable row level security;
alter table public.amenities disable row level security;
alter table public.products disable row level security;
alter table public.equipment disable row level security;
alter table public.equipment_items disable row level security;
alter table public.bookings disable row level security;

-- 10. Tambahkan trigger untuk mengenkripsi password secara otomatis saat insert atau update
create or replace function public.encrypt_user_password()
returns trigger as $$
begin
  -- Jika password NULL atau kosong, biarkan saja
  if new.password is null or new.password = '' then
    return new;
  end if;

  -- Jika operasi UPDATE dan password tidak berubah, jangan enkripsi ulang
  if tg_op = 'UPDATE' and new.password = old.password then
    return new;
  end if;

  -- Hanya enkripsi jika password bukan merupakan hash bcrypt yang valid
  if length(new.password) = 60 and left(new.password, 2) = '$2' then
    return new;
  else
    new.password := extensions.crypt(new.password, extensions.gen_salt('bf'));
  end if;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_encrypt_user_password on public.users;
create trigger trg_encrypt_user_password
before insert or update on public.users
for each row
execute function public.encrypt_user_password();


