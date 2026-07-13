import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ndjzewkyrrbyymcjhbwj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kanpld2t5cnJieXltY2poYndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2ODI3ODMsImV4cCI6MjA5NzI1ODc4M30.b8nU5WQyH54xvgxPk_KHeyjQbX2ckVaZbXdgsdfclUM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUserInsert() {
  const payload = {
    name: 'Test Member No Pass',
    email: 'testmembernopass@example.com',
    role: 'member'
  };
  
  console.log('Inserting user without password:', payload);
  const { data, error } = await supabase.from('users').insert(payload).select();
  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Insert success:', data);
    if (data && data.length > 0) {
      const deleteRes = await supabase.from('users').delete().eq('id', data[0].id);
      console.log('Cleanup result:', deleteRes);
    }
  }
}

testUserInsert();
