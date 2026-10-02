-- ============================================================================
-- MIGRATION SCRIPT: ADD member_2_month_fee COLUMN TO PRICING TABLE
-- FITNESS CENTER FV UNY
-- Jalankan SEKALI di Supabase SQL Editor
-- ============================================================================

-- 1. Tambahkan kolom member_2_month_fee jika belum ada
ALTER TABLE public.pricing 
ADD COLUMN IF NOT EXISTS member_2_month_fee numeric NOT NULL DEFAULT 0;

-- 2. Isi data awal berdasarkan data yang sudah ada (jika nilainya masih 0)
--    Sesuaikan nilai di bawah ini dengan harga 2 bulan yang Anda inginkan:

-- Masyarakat Umum: 2 Bulan = 320000
UPDATE public.pricing
SET member_2_month_fee = 320000
WHERE profile = 'public' AND member_2_month_fee = 0;

-- Mahasiswa/Civitas UNY: 2 Bulan = 290000 (sesuaikan dengan tarif Anda)
UPDATE public.pricing
SET member_2_month_fee = 290000
WHERE profile = 'student' AND member_2_month_fee = 0;

-- Alumni UNY: 2 Bulan = 290000 (sesuaikan dengan tarif Anda)
UPDATE public.pricing
SET member_2_month_fee = 290000
WHERE profile = 'alumni' AND member_2_month_fee = 0;

-- 3. Verifikasi hasil:
SELECT profile, registration_fee, incidental_fee, 
       member_1_month_fee, member_2_month_fee, member_3_month_fee
FROM public.pricing
ORDER BY profile;

-- ============================================================================
-- SETELAH MENJALANKAN SCRIPT INI:
-- Buka Admin > Biaya & Tarif, set harga 2 Bulan sesuai keinginan, 
-- lalu klik Simpan Perubahan → otomatis tersinkron ke Resepsionis.
-- ============================================================================
