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

async function test() {
  // Let's fetch all classes
  const { data: list, error: fetchErr } = await supabase.from('classes').select('*');
  if (fetchErr) {
    console.error('Fetch error:', fetchErr);
    return;
  }
  console.log('Classes list size:', list.length);
  if (list.length > 0) {
    const target = list[0];
    console.log('Attempting to delete class:', target.id);
    const { error: delErr } = await supabase.from('classes').delete().eq('id', target.id);
    if (delErr) {
      console.error('Delete error:', delErr);
    } else {
      console.log('Delete succeeded in DB!');
    }
  }
}

test();
