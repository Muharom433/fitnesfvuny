import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read .env file directly
const envContent = fs.readFileSync('.env', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
    env[key] = val;
  }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAllE2E() {
  console.log('--- STARTING COMPREHENSIVE E2E DB AUDIT ---');
  let hasErrors = false;

  // 1. Test Pricing Table
  try {
    const { data: pricingData, error: pricingErr } = await supabase.from('pricing').select('*');
    if (pricingErr) throw pricingErr;
    console.log('✅ Pricing table select:', pricingData.length, 'profiles found');
  } catch (e) {
    console.error('❌ Pricing table error:', e.message);
    hasErrors = true;
  }

  // 2. Test Trainers Table (Insert -> Update -> Select -> Delete)
  try {
    const trainerId = 'coach_test_' + Date.now().toString().slice(-4);
    const { data: tIns, error: tInsErr } = await supabase.from('trainers').insert({
      id: trainerId,
      name: 'Coach Test E2E',
      specialty_id: 'trainer_fitness',
      specialty_id_val: 'Fitness & Gym',
      specialty_en: 'Fitness & Gym',
      bio_id: 'Bio test',
      bio_en: 'Bio test',
      philosophy: 'No pain no gain',
      price: 150000
    }).select().single();
    if (tInsErr) throw tInsErr;
    console.log('✅ Trainers Insert OK:', tIns.id);

    const { error: tUpErr } = await supabase.from('trainers').update({ price: 175000 }).eq('id', trainerId);
    if (tUpErr) throw tUpErr;
    console.log('✅ Trainers Update OK');

    const { error: tDelErr } = await supabase.from('trainers').delete().eq('id', trainerId);
    if (tDelErr) throw tDelErr;
    console.log('✅ Trainers Delete OK');
  } catch (e) {
    console.error('❌ Trainers table CRUD error:', e.message);
    hasErrors = true;
  }

  // 3. Test Classes Table (Insert -> Update -> Select -> Delete)
  try {
    const classId = 'class_test_' + Date.now().toString().slice(-4);
    const { data: cIns, error: cInsErr } = await supabase.from('classes').insert({
      id: classId,
      name_id: 'Kelas Test E2E',
      name_en: 'Test Class E2E',
      duration: '45 Menit',
      level: 'Semua Level',
      icon: 'fa-users',
      price: 50000,
      desc_id: 'Deskripsi test',
      desc_en: 'Test description'
    }).select().single();
    if (cInsErr) throw cInsErr;
    console.log('✅ Classes Insert OK:', cIns.id);

    const { error: cUpErr } = await supabase.from('classes').update({ price: 60000 }).eq('id', classId);
    if (cUpErr) throw cUpErr;
    console.log('✅ Classes Update OK');

    const { error: cDelErr } = await supabase.from('classes').delete().eq('id', classId);
    if (cDelErr) throw cDelErr;
    console.log('✅ Classes Delete OK');
  } catch (e) {
    console.error('❌ Classes table CRUD error:', e.message);
    hasErrors = true;
  }

  // 4. Test Equipment & Equipment_Items Table
  try {
    const equipId = 'equip_test_' + Date.now().toString().slice(-4);
    const { data: eIns, error: eInsErr } = await supabase.from('equipment').insert({
      id: equipId,
      name_id: 'Alat Test E2E',
      name_en: 'Equipment Test E2E',
      desc_id: 'Test desc',
      desc_en: 'Test desc',
      icon: 'fa-dumbbell',
      price: 25000
    }).select().single();
    if (eInsErr) throw eInsErr;
    console.log('✅ Equipment Insert OK:', eIns.id);

    const { data: itemIns, error: itemInsErr } = await supabase.from('equipment_items').insert({
      equipment_id: equipId,
      name_id: 'Dumbbell 10kg',
      name_en: 'Dumbbell 10kg',
      icon: 'fa-dumbbell'
    }).select().single();
    if (itemInsErr) throw itemInsErr;
    console.log('✅ Equipment Item Insert OK:', itemIns.id);

    const { error: itemUpErr } = await supabase.from('equipment_items').update({ name_id: 'Dumbbell 12kg' }).eq('id', itemIns.id);
    if (itemUpErr) throw itemUpErr;
    console.log('✅ Equipment Item Update OK');

    const { error: itemDelErr } = await supabase.from('equipment_items').delete().eq('id', itemIns.id);
    if (itemDelErr) throw itemDelErr;
    console.log('✅ Equipment Item Delete OK');

    const { error: eDelErr } = await supabase.from('equipment').delete().eq('id', equipId);
    if (eDelErr) throw eDelErr;
    console.log('✅ Equipment Delete OK');
  } catch (e) {
    console.error('❌ Equipment table CRUD error:', e.message);
    hasErrors = true;
  }

  // 5. Test Products Table (Insert -> Update -> Select -> Delete)
  try {
    const prodId = 'prod_test_' + Date.now().toString().slice(-4);
    const { data: pIns, error: pInsErr } = await supabase.from('products').insert({
      id: prodId,
      name_id: 'Air Mineral 600ml',
      name_en: 'Mineral Water 600ml',
      price: 5000,
      original_price: 5000,
      category: 'Minuman',
      image: 'assets/produk.png'
    }).select().single();
    if (pInsErr) throw pInsErr;
    console.log('✅ Products Insert OK:', pIns.id);

    const { error: pUpErr } = await supabase.from('products').update({ price: 6000 }).eq('id', prodId);
    if (pUpErr) throw pUpErr;
    console.log('✅ Products Update OK');

    const { error: pDelErr } = await supabase.from('products').delete().eq('id', prodId);
    if (pDelErr) throw pDelErr;
    console.log('✅ Products Delete OK');
  } catch (e) {
    console.error('❌ Products table CRUD error:', e.message);
    hasErrors = true;
  }

  // 6. Test Bookings Table (Insert -> Update -> Delete)
  try {
    const { data: bIns, error: bInsErr } = await supabase.from('bookings').insert({
      name: 'Pengunjung Test E2E',
      phone: '081234567890',
      status_civitas: 'UNY (Mahasiswa, Tendik/Dosen)',
      category: 'Insidental',
      duration: null,
      booking_date: '2026-07-20',
      booking_day: 'Senin',
      booking_time: 'Pagi (07:00 - 11:00)',
      trainer: 'Mandiri (Tanpa Pelatih)',
      kelas: 'Tanpa Kelas',
      alat: 'Tanpa Alat',
      estimated_price: 20000,
      user_id: null
    }).select().single();
    if (bInsErr) throw bInsErr;
    console.log('✅ Bookings Insert OK:', bIns.id);

    const { error: bUpErr } = await supabase.from('bookings').update({ status: 'Approved' }).eq('id', bIns.id);
    if (bUpErr) throw bUpErr;
    console.log('✅ Bookings Update Status OK');

    const { error: bDelErr } = await supabase.from('bookings').delete().eq('id', bIns.id);
    if (bDelErr) throw bDelErr;
    console.log('✅ Bookings Delete OK');
  } catch (e) {
    console.error('❌ Bookings table CRUD error:', e.message);
    hasErrors = true;
  }

  // 7. Test Check User Login RPC
  try {
    const { data: rpcRes, error: rpcErr } = await supabase.rpc('check_user_login', {
      p_email: 'admin@fitnesuny.ac.id',
      p_password: 'admin'
    });
    if (rpcErr) throw rpcErr;
    console.log('✅ check_user_login RPC OK, returned:', rpcRes ? rpcRes.length : 0, 'rows');
  } catch (e) {
    console.error('❌ check_user_login RPC error:', e.message);
    hasErrors = true;
  }

  console.log('--- SUMMARY ---');
  if (hasErrors) {
    console.log('❌ SOME TESTS FAILED');
  } else {
    console.log('🎉 ALL DB E2E TESTS PASSED WITH ZERO ERRORS!');
  }
}

testAllE2E();
