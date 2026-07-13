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

async function testRpc() {
  const { data: adminData, error: adminErr } = await supabase.rpc('check_user_login', {
    p_email: 'admin@uny.ac.id',
    p_password: 'admin123'
  });
  console.log('Admin Login test result (admin123):', { adminData, adminErr });

  const { data: recData, error: recErr } = await supabase.rpc('check_user_login', {
    p_email: 'resepsionis@uny.ac.id',
    p_password: 'resep123'
  });
  console.log('Resepsionis Login test result (resep123):', { recData, recErr });
}

testRpc();
