import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

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

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function inspect() {
  const { data: users, error: uErr } = await supabase.from('users').select('*').limit(1);
  console.log('Users first row keys:', users && users.length ? Object.keys(users[0]) : 'no rows or error', uErr);

  const { data: bookings, error: bErr } = await supabase.from('bookings').select('*').limit(1);
  console.log('Bookings first row keys:', bookings && bookings.length ? Object.keys(bookings[0]) : 'no rows or error', bErr);
  
  const { data: pricing, error: pErr } = await supabase.from('pricing').select('*').limit(1);
  console.log('Pricing first row keys:', pricing && pricing.length ? Object.keys(pricing[0]) : 'no rows or error', pErr);
}

inspect();
