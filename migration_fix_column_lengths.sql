-- ============================================================================
-- MIGRATION SCRIPT: FIX COLUMN LENGTHS (Jalankan di Supabase SQL Editor)
-- FITNESS CENTER FV UNY
-- ============================================================================
-- Script ini mengubah semua kolom yang dibatasi panjang karakternya (character varying/varchar)
-- menjadi tipe TEXT tanpa batas panjang karakter. Ini diperlukan agar upload foto base64
-- dan deskripsi panjang tidak mengalami error 'value too long for type character varying'.

-- 1. Table: trainers
ALTER TABLE public.trainers ALTER COLUMN id TYPE text;
ALTER TABLE public.trainers ALTER COLUMN name TYPE text;
ALTER TABLE public.trainers ALTER COLUMN specialty_id TYPE text;
ALTER TABLE public.trainers ALTER COLUMN specialty_id_val TYPE text;
ALTER TABLE public.trainers ALTER COLUMN specialty_en TYPE text;
ALTER TABLE public.trainers ALTER COLUMN bio_id TYPE text;
ALTER TABLE public.trainers ALTER COLUMN bio_en TYPE text;
ALTER TABLE public.trainers ALTER COLUMN photo TYPE text;
ALTER TABLE public.trainers ALTER COLUMN philosophy TYPE text;

-- 2. Table: classes
ALTER TABLE public.classes ALTER COLUMN id TYPE text;
ALTER TABLE public.classes ALTER COLUMN name_id TYPE text;
ALTER TABLE public.classes ALTER COLUMN name_en TYPE text;
ALTER TABLE public.classes ALTER COLUMN duration TYPE text;
ALTER TABLE public.classes ALTER COLUMN level TYPE text;
ALTER TABLE public.classes ALTER COLUMN desc_id TYPE text;
ALTER TABLE public.classes ALTER COLUMN desc_en TYPE text;
ALTER TABLE public.classes ALTER COLUMN icon TYPE text;

-- 3. Table: products
ALTER TABLE public.products ALTER COLUMN id TYPE text;
ALTER TABLE public.products ALTER COLUMN name_id TYPE text;
ALTER TABLE public.products ALTER COLUMN name_en TYPE text;
ALTER TABLE public.products ALTER COLUMN image TYPE text;
ALTER TABLE public.products ALTER COLUMN category TYPE text;

-- 4. Table: equipment
ALTER TABLE public.equipment ALTER COLUMN id TYPE text;
ALTER TABLE public.equipment ALTER COLUMN name_id TYPE text;
ALTER TABLE public.equipment ALTER COLUMN name_en TYPE text;
ALTER TABLE public.equipment ALTER COLUMN desc_id TYPE text;
ALTER TABLE public.equipment ALTER COLUMN desc_en TYPE text;
ALTER TABLE public.equipment ALTER COLUMN icon TYPE text;

-- 5. Table: equipment_items
ALTER TABLE public.equipment_items ALTER COLUMN equipment_id TYPE text;
ALTER TABLE public.equipment_items ALTER COLUMN name_id TYPE text;
ALTER TABLE public.equipment_items ALTER COLUMN name_en TYPE text;
ALTER TABLE public.equipment_items ALTER COLUMN desc_id TYPE text;
ALTER TABLE public.equipment_items ALTER COLUMN desc_en TYPE text;
ALTER TABLE public.equipment_items ALTER COLUMN icon TYPE text;

-- 6. Table: contact_links
ALTER TABLE public.contact_links ALTER COLUMN wa_phone TYPE text;
ALTER TABLE public.contact_links ALTER COLUMN wa_display TYPE text;
ALTER TABLE public.contact_links ALTER COLUMN youtube TYPE text;
ALTER TABLE public.contact_links ALTER COLUMN youtube_display TYPE text;
ALTER TABLE public.contact_links ALTER COLUMN email TYPE text;
ALTER TABLE public.contact_links ALTER COLUMN instagram TYPE text;
ALTER TABLE public.contact_links ALTER COLUMN instagram_display TYPE text;
ALTER TABLE public.contact_links ALTER COLUMN website TYPE text;
ALTER TABLE public.contact_links ALTER COLUMN website_display TYPE text;
ALTER TABLE public.contact_links ALTER COLUMN maps_url TYPE text;

-- 7. Table: pricing
ALTER TABLE public.pricing ALTER COLUMN profile TYPE text;

-- 8. Table: amenities
ALTER TABLE public.amenities ALTER COLUMN key TYPE text;
ALTER TABLE public.amenities ALTER COLUMN title_id TYPE text;
ALTER TABLE public.amenities ALTER COLUMN title_en TYPE text;
ALTER TABLE public.amenities ALTER COLUMN desc_id TYPE text;
ALTER TABLE public.amenities ALTER COLUMN desc_en TYPE text;
ALTER TABLE public.amenities ALTER COLUMN icon TYPE text;
ALTER TABLE public.amenities ALTER COLUMN order_text_id TYPE text;
ALTER TABLE public.amenities ALTER COLUMN order_text_en TYPE text;
ALTER TABLE public.amenities ALTER COLUMN wa_template_id TYPE text;
ALTER TABLE public.amenities ALTER COLUMN wa_template_en TYPE text;

-- 9. Table: bookings
ALTER TABLE public.bookings ALTER COLUMN name TYPE text;
ALTER TABLE public.bookings ALTER COLUMN booking_date TYPE text;
ALTER TABLE public.bookings ALTER COLUMN booking_day TYPE text;
ALTER TABLE public.bookings ALTER COLUMN booking_time TYPE text;
ALTER TABLE public.bookings ALTER COLUMN trainer TYPE text;
ALTER TABLE public.bookings ALTER COLUMN kelas TYPE text;
ALTER TABLE public.bookings ALTER COLUMN alat TYPE text;
ALTER TABLE public.bookings ALTER COLUMN phone TYPE text;
ALTER TABLE public.bookings ALTER COLUMN status_civitas TYPE text;
ALTER TABLE public.bookings ALTER COLUMN category TYPE text;
ALTER TABLE public.bookings ALTER COLUMN duration TYPE text;
ALTER TABLE public.bookings ALTER COLUMN status TYPE text;
