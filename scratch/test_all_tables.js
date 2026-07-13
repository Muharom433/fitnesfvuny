import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ndjzewkyrrbyymcjhbwj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kanpld2t5cnJieXltY2poYndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2ODI3ODMsImV4cCI6MjA5NzI1ODc4M30.b8nU5WQyH54xvgxPk_KHeyjQbX2ckVaZbXdgsdfclUM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const tables = [
  'contact_links',
  'pricing',
  'trainers',
  'classes',
  'amenities',
  'products',
  'equipment',
  'equipment_items',
  'users',
  'bookings',
  'transactions',
  'tickets',
  'ticket_comments'
];

async function checkAll() {
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('*').limit(3);
      if (error) {
        console.log(`❌ Table [${table}]: Error -`, error.message);
      } else {
        console.log(`✅ Table [${table}]: Success - Found ${data.length} rows`);
        if (data.length > 0) {
          console.log(`   Columns:`, Object.keys(data[0]));
        } else {
          console.log(`   Columns (No data to display columns)`);
        }
      }
    } catch (e) {
      console.log(`❌ Table [${table}]: Exception -`, e.message);
    }
  }
}

checkAll();
