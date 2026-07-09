-- ============================================================================
-- SUPABASE POSTGRESQL DATABASE SCHEMA & SEED DATA
-- FITNESS CENTER FV UNY
-- ============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. TABLE: CONTACT LINKS (Singleton structure for dynamic page configuration)
-- ----------------------------------------------------------------------------
create table public.contact_links (
    id integer primary key default 1 check (id = 1),
    wa_phone text not null default '6285158907972',
    wa_display text not null default '+62 851-5890-7972',
    youtube text not null default 'https://www.youtube.com/@FVUNYOfficial',
    youtube_display text not null default '@FVUNYOfficial',
    email text not null default 'fv@uny.ac.id',
    instagram text not null default 'https://www.instagram.com/fvuny.fitnesscenter',
    instagram_display text not null default '@fvuny.fitnesscenter',
    website text not null default 'http://fv.uny.ac.id',
    website_display text not null default 'fv.uny.ac.id',
    maps_url text not null default 'https://maps.google.com/maps?q=45W7%2BPWC,+Serut,+Wates,+Kec.+Pengasih,+Kabupaten+Kulon+Progo,+Daerah+Istimewa+Yogyakarta+55652&t=&z=17&ie=UTF8&iwloc=&output=embed',
    updated_at timestamp with time zone default now()
);

-- ----------------------------------------------------------------------------
-- 2. TABLE: PRICING (Membership and incidental tariffs)
-- ----------------------------------------------------------------------------
create table public.pricing (
    id text primary key, -- 'student', 'alumni', 'public'
    category_name_id text not null,
    category_name_en text not null,
    registration_fee numeric not null default 0,
    incidental_fee numeric not null default 0,
    membership_tariffs jsonb not null, -- JSON format e.g. {"1": 150000, "3": 375000}
    updated_at timestamp with time zone default now()
);

-- ----------------------------------------------------------------------------
-- 3. TABLE: TRAINERS (Gym instructors details)
-- ----------------------------------------------------------------------------
create table public.trainers (
    id text primary key,
    name text not null,
    specialty_id text not null,
    specialty_id_val text not null,
    specialty_en text not null,
    quota_filled integer not null default 0,
    quota_max integer not null default 10,
    bio_id text not null,
    bio_en text not null,
    photo text not null default 'assets/trainer_male.png',
    philosophy text not null,
    price numeric not null default 150000,
    created_at timestamp with time zone default now()
);

-- ----------------------------------------------------------------------------
-- 4. TABLE: CLASSES (Group exercise programs)
-- ----------------------------------------------------------------------------
create table public.classes (
    id text primary key,
    name_id text not null,
    name_en text not null,
    duration text not null,
    level text not null,
    desc_id text not null,
    desc_en text not null,
    icon text not null default 'fa-fire-flame-simple',
    price numeric not null default 50000,
    created_at timestamp with time zone default now()
);

-- ----------------------------------------------------------------------------
-- 5. TABLE: AMENITIES (Gym premium features / orderable drinks)
-- ----------------------------------------------------------------------------
create table public.amenities (
    key text primary key,
    title_id text not null,
    title_en text not null,
    desc_id text not null,
    desc_en text not null,
    icon text not null,
    is_orderable boolean not null default false,
    order_text_id text default '',
    order_text_en text default '',
    wa_template_id text default '',
    wa_template_en text default '',
    created_at timestamp with time zone default now()
);

-- ----------------------------------------------------------------------------
-- 6. TABLE: PRODUCTS (Supplements & Merchandise e-shop catalog)
-- ----------------------------------------------------------------------------
create table public.products (
    id text primary key,
    name_id text not null,
    name_en text not null,
    price numeric not null,
    original_price numeric,
    image text not null,
    category text not null, -- 'perlengkapan', 'lifestyle', 'protein'
    created_at timestamp with time zone default now()
);

-- ----------------------------------------------------------------------------
-- 7. TABLE: EQUIPMENT (Gym accessories & fitness gear categories)
-- ----------------------------------------------------------------------------
create table public.equipment (
    id text primary key,
    name_id text not null,
    name_en text not null,
    desc_id text,
    desc_en text,
    icon text not null default 'fa-dumbbell',
    price numeric not null default 0,
    created_at timestamp with time zone default now()
);

create table public.equipment_items (
    id serial primary key,
    parent_id text references public.equipment(id) on delete cascade,
    name_id text not null,
    name_en text not null,
    desc_id text,
    desc_en text,
    icon text not null default 'fa-dumbbell',
    created_at timestamp with time zone default now()
);

-- ----------------------------------------------------------------------------
-- 8. TABLE: PROFILES (User personal data synced with Supabase Auth auth.users)
-- ----------------------------------------------------------------------------
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    name text not null,
    email text unique not null,
    phone text,
    gender text check (gender in ('Pria', 'Wanita')),
    birthdate date,
    identity_type text,
    identity_number text,
    address text,
    is_admin boolean not null default false,
    created_at timestamp with time zone default now()
);

-- ----------------------------------------------------------------------------
-- 9. TABLE: BOOKINGS (User/Member registrations, classes and trainers booking)
-- ----------------------------------------------------------------------------
create table public.bookings (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id) on delete set null,
    name text not null,
    phone text not null,
    status_civitas text not null,
    category text not null, -- 'Member', 'Insidental'
    duration text, -- e.g., '1 Bulan', '3 Bulan'
    trainer_id text references public.trainers(id) on delete set null,
    class_id text references public.classes(id) on delete set null,
    equipment_id text references public.equipment(id) on delete set null,
    preferred_time text not null,
    estimated_price numeric not null default 0,
    status text not null default 'Pending' check (status in ('Pending', 'Approved', 'Cancelled')),
    created_at timestamp with time zone default now()
);

-- ============================================================================
-- AUTOMATED ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS
alter table public.contact_links enable row level security;
alter table public.pricing enable row level security;
alter table public.trainers enable row level security;
alter table public.classes enable row level security;
alter table public.amenities enable row level security;
alter table public.products enable row level security;
alter table public.equipment enable row level security;
alter table public.equipment_items enable row level security;
alter table public.profiles enable row level security;
alter table public.bookings enable row level security;

-- Helper function to check if the current user is an admin
create or replace function public.is_admin()
returns boolean security definer as $$
begin
    return exists (
        select 1 from public.profiles
        where id = auth.uid() and is_admin = true
    );
end;
$$ language plpgsql;

-- 1. Read access for everyone (Public tables)
create policy "Allow public read access for contact links" on public.contact_links for select using (true);
create policy "Allow public read access for pricing" on public.pricing for select using (true);
create policy "Allow public read access for trainers" on public.trainers for select using (true);
create policy "Allow public read access for classes" on public.classes for select using (true);
create policy "Allow public read access for amenities" on public.amenities for select using (true);
create policy "Allow public read access for products" on public.products for select using (true);
create policy "Allow public read access for equipment" on public.equipment for select using (true);
create policy "Allow public read access for equipment items" on public.equipment_items for select using (true);

-- 2. Write access for Admin only (Public tables)
create policy "Allow admin write access for contact links" on public.contact_links for all using (public.is_admin());
create policy "Allow admin write access for pricing" on public.pricing for all using (public.is_admin());
create policy "Allow admin write access for trainers" on public.trainers for all using (public.is_admin());
create policy "Allow admin write access for classes" on public.classes for all using (public.is_admin());
create policy "Allow admin write access for amenities" on public.amenities for all using (public.is_admin());
create policy "Allow admin write access for products" on public.products for all using (public.is_admin());
create policy "Allow admin write access for equipment" on public.equipment for all using (public.is_admin());
create policy "Allow admin write access for equipment items" on public.equipment_items for all using (public.is_admin());

-- 3. Profiles Policies
create policy "Allow users to read their own profile" on public.profiles for select using (auth.uid() = id or public.is_admin());
create policy "Allow users to update their own profile" on public.profiles for update using (auth.uid() = id or public.is_admin());
create policy "Allow admin to manage all profiles" on public.profiles for all using (public.is_admin());

-- 4. Bookings Policies
create policy "Allow users to read their own bookings" on public.bookings for select using (auth.uid() = user_id or public.is_admin());
create policy "Allow users to insert their own bookings" on public.bookings for insert with check (auth.uid() = user_id or user_id is null);
create policy "Allow admin to manage all bookings" on public.bookings for all using (public.is_admin());

-- ============================================================================
-- SUPABASE AUTH SYNCRONIZATION TRIGGER (Triggers when user signs up in Auth)
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger security definer as $$
begin
  insert into public.profiles (id, name, email, phone, gender, birthdate, identity_type, identity_number, address, is_admin)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', 'Anggota Baru'),
    new.email,
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'gender',
    case when new.raw_user_meta_data->>'birthdate' is not null then (new.raw_user_meta_data->>'birthdate')::date else null end,
    new.raw_user_meta_data->>'identity_type',
    new.raw_user_meta_data->>'identity_number',
    new.raw_user_meta_data->>'address',
    false -- defaults to non-admin
  );
  return new;
end;
$$ language plpgsql;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================================
-- INITIAL SEED DATA
-- ============================================================================

-- Contact Links Seed
insert into public.contact_links (id, wa_phone, wa_display, youtube, youtube_display, email, instagram, instagram_display, website, website_display)
values (1, '6285158907972', '+62 851-5890-7972', 'https://www.youtube.com/@FVUNYOfficial', '@FVUNYOfficial', 'fv@uny.ac.id', 'https://www.instagram.com/fvuny.fitnesscenter', '@fvuny.fitnesscenter', 'http://fv.uny.ac.id', 'fv.uny.ac.id')
on conflict (id) do nothing;

-- Pricing Seed
insert into public.pricing (id, category_name_id, category_name_en, registration_fee, incidental_fee, membership_tariffs)
values 
('student', 'Mahasiswa / Civitas UNY', 'UNY Students & Civitas', 0, 20000, '{"1": 150000, "3": 375000}'),
('alumni', 'Alumni UNY', 'UNY Alumni', 10000, 35000, '{"1": 150000}'),
('public', 'Masyarakat Umum', 'General Public', 10000, 35000, '{"1": 170000, "2": 320000, "3": 460000}')
on conflict (id) do nothing;

-- Trainers Seed
insert into public.trainers (id, name, specialty_id, specialty_id_val, specialty_en, quota_filled, quota_max, bio_id, bio_en, photo, philosophy, price)
values
('coach_budi', 'Coach Budi Santoso', 'trainer_1_special', 'Diet & Nutrisi Spesialis', 'Diet & Nutrition Specialist', 8, 10, 'Budi Santoso adalah lulusan Ilmu Keolahragaan UNY dengan pengalaman lebih dari 6 tahun di bidang nutrisi dan manajemen berat badan.', 'Budi Santoso is a UNY Sports Science graduate with over 6 years of experience in nutrition and weight management.', 'assets/trainer_male.png', 'Sehat adalah investasi terbaik hidup Anda.', 150000),
('coach_sarah', 'Coach Sarah Amalia', 'trainer_2_special', 'Penurunan Berat Badan & Cardio', 'Weight Loss & Cardio Coach', 6, 10, 'Sarah Amalia adalah spesialis latihan kardiovaskular dan penurunan berat badan wanita. Mantan atlet atletik regional dengan sertifikasi HIIT.', 'Sarah Amalia is a cardiovascular training and female weight loss specialist. Former regional track athlete.', 'assets/trainer_female.png', 'Batasan Anda hanyalah apa yang Anda pikirkan.', 150000),
('coach_rian', 'Coach Rian Wijaya', 'trainer_3_special', 'Beban & Kekuatan Spesialis', 'Strength & Conditioning Specialist', 5, 10, 'Rian Wijaya adalah pelatih kekuatan berlisensi dengan spesialisasi Powerlifting dan peningkatan performa atlet.', 'Rian Wijaya is a licensed strength coach specializing in Powerlifting and athletic performance.', 'assets/trainer_male.png', 'Kekuatan fisik membangun kekuatan mental.', 150000),
('coach_dewi', 'Coach Dewi Lestari', 'trainer_4_special', 'Yoga & Pilates Spesialis', 'Yoga & Pilates Specialist', 4, 10, 'Dewi Lestari adalah instruktur Yoga dan Pilates bersertifikat internasional (RYT-200). Berpengalaman mengajar yoga restoratif.', 'Dewi Lestari is an internationally certified Yoga and Pilates instructor (RYT-200).', 'assets/trainer_female.png', 'Bernapaslah dan biarkan tubuhmu bergerak dengan harmoni.', 150000)
on conflict (id) do nothing;

-- Classes Seed
insert into public.classes (id, name_id, name_en, duration, level, desc_id, desc_en, icon, price)
values
('class_1', 'Cardio & HIIT Blast', 'Cardio & HIIT Blast', '45 Menit', 'Menengah - Tinggi', 'Cardio & High-Intensity Interval Training (HIIT) dirancang untuk menyelingi periode latihan anaerobik intensitas tinggi dengan pemulihan singkat.', 'Cardio & High-Intensity Interval Training (HIIT) alternates short bursts of intense anaerobic exercise with recovery periods.', 'fa-fire-flame-simple', 50000),
('class_2', 'Yoga & Mind Balance', 'Yoga & Mind Balance', '60 Menit', 'Pemula - Menengah', 'Kombinasi peregangan mendalam, postur yoga (asana), teknik pernapasan (pranayama), dan meditasi.', 'A combination of deep stretching, yoga postures (asanas), breathing techniques (pranayama), and meditation.', 'fa-child-reaching', 50000),
('class_3', 'Power Lift & Strength', 'Power Lift & Strength', '50 Menit', 'Menengah', 'Fokus pada penguasaan teknik dasar angkat beban seperti Squat, Bench Press, dan Deadlift secara aman dan terstruktur.', 'Focuses on mastering fundamental compound weightlifting movements like Squats, Bench Press, and Deadlifts.', 'fa-bolt', 50000),
('class_4', 'Spin & Peak Cycling', 'Spin & Peak Cycling', '45 Menit', 'Semua Tingkatan', 'Latihan sepeda statis dalam ruangan berenergi tinggi yang dipandu musik ritmis dan instruktur dinamis.', 'An indoor cycling workout set to high-energy music and led by a dynamic instructor.', 'fa-bicycle', 50000)
on conflict (id) do nothing;

-- Amenities Seed
insert into public.amenities (key, title_id, title_en, desc_id, desc_en, icon, is_orderable, order_text_id, order_text_en, wa_template_id, wa_template_en)
values
('ac', 'Air Conditioner (AC)', 'Air Conditioner (AC)', 'Suhu ruangan sejuk & segar dengan pendingin udara di setiap sudut ruangan.', 'Cool & fresh room temperature with air conditioning in every corner.', 'fa-snowflake', false, '', '', '', ''),
('air_minum', 'Air Minum Gratis', 'Free Drinking Water', 'Layanan air mineral gratis dari dispenser higienis, serta tersedia kopi hangat dan teh secara cuma-cuma.', 'Complimentary mineral water from hygienic dispensers, with hot coffee and tea available for free.', 'fa-mug-hot', true, 'Pesan Kopi / Teh Hangat', 'Order Hot Coffee / Tea', 'Halo Admin, saya ingin memesan Kopi/Teh hangat di area Fitness Center FV UNY.', 'Hi Admin, I would like to order hot Coffee/Tea at the Fitness Center area.'),
('loker_secure', 'Loker & Loker Penyimpanan Aman', 'Secure Locker Rooms', 'Loker steril berpintu kokoh dengan sistem penguncian personal terenkripsi.', 'Sterile lockers with encrypted personal locking systems.', 'fa-key', false, '', '', '', ''),
('wifi_fast', 'WiFi Cepat Gratis', 'Free High-Speed WiFi', 'Koneksi internet nirkabel berkecepatan tinggi di seluruh sudut area gym.', 'High-speed wireless internet connection throughout the gym.', 'fa-wifi', false, '', '', '', '')
on conflict (key) do nothing;

-- Products Seed
insert into public.products (id, name_id, name_en, price, original_price, image, category)
values
('prod_shaker', 'Shaker Whey Protein Botol Minum PURO, 400ml', 'Puro Whey Protein Shaker Bottle, 400ml', 39000, null, 'assets/shaker_puro.png', 'perlengkapan'),
('prod_handuk', 'Handuk Terry Palmer 40x75 cm Cocok untuk Keringat', 'Terry Palmer Hand Towel 40x75 cm for Sweat', 39900, null, 'assets/handuk_terry.png', 'lifestyle'),
('prod_fitbar', 'Fitbar Protein Chocolate 12x25gr', 'Fitbar Protein Chocolate 12x25gr', 115100, null, 'assets/fitbar_chocolate.png', 'protein'),
('prod_gloves', 'Sarung Tangan untuk Gym, Nyaman dan Anti Slip untuk Pria & Wanita', 'Anti-Slip Gym Gloves for Men & Women', 58000, null, 'assets/sarung_tangan.png', 'perlengkapan'),
('prod_tumbler', 'Cuculemon Tumbler Kapasitas Besar dengan Bahan Stainless Steel', 'Cuculemon Stainless Steel Large Capacity Tumbler', 69000, 150000, 'assets/cuculemon_tumbler.png', 'lifestyle')
on conflict (id) do nothing;

-- Equipment Seed
insert into public.equipment (id, name_id, name_en, desc_id, desc_en, icon, price)
values
('strength', 'Strength & Resistance Area', 'Strength & Resistance Area', 'Fokus utama bagi para atlet maupun penggiat angkat beban.', 'Main focus for athletes or weight lifters.', 'fa-weight-hanging', 20000),
('cardio', 'Cardio Theater Zone', 'Cardio Theater Zone', 'Latihan intensitas tinggi dengan peralatan modern penunjang jantung bugar.', 'High-intensity workouts with modern cardiovascular equipment.', 'fa-heart-pulse', 20000),
('free_weight', 'Free Weight & Power Rack', 'Free Weight & Power Rack', 'Fokus untuk pembentukan daya tahan dan penambahan masa otot.', 'Focus on strength building and hypertrophy.', 'fa-dumbbell', 20000)
on conflict (id) do nothing;

insert into public.equipment_items (parent_id, name_id, name_en, desc_id, desc_en, icon)
values
('strength', 'Dumbbell Set Impor', 'Imported Dumbbell Set', 'Pasangan dumbbell solid dari 2.5 kg hingga 40 kg.', 'Solid dumbbell pairs from 2.5 kg to 40 kg.', 'fa-dumbbell'),
('strength', 'Power Rack & Barbell', 'Power Rack & Barbell', 'Rak beban olympic dengan barbell solid 20kg dan bumper plate lengkap.', 'Olympic barbell rack with 20kg solid bar and full bumper plates.', 'fa-cubes'),
('cardio', 'Treadmill Commercial', 'Commercial Treadmill', 'Treadmill kelas komersial dengan penyesuaian kemiringan otomatis.', 'Commercial grade treadmill with automatic incline adjustment.', 'fa-person-running'),
('cardio', 'Sepatu Ergometer & Elliptical', 'Elliptical & Ergometer Bike', 'Sepeda statis modern dengan hambatan magnetis bersuara halus.', 'Modern stationary bikes with quiet magnetic resistance.', 'fa-bicycle')
on conflict do nothing;

-- ----------------------------------------------------------------------------
-- 10. TABLE: APP SETTINGS (Miscellaneous config storage)
-- ----------------------------------------------------------------------------
create table if not exists public.app_settings (
    key text primary key,
    value jsonb not null,
    updated_at timestamp with time zone default now()
);

-- Enable RLS for app_settings
alter table public.app_settings enable row level security;

-- Policies for app_settings
create policy "Allow public read access for app settings" on public.app_settings for select using (true);
create policy "Allow authenticated write access for app settings" on public.app_settings for all using (auth.uid() is not null);

