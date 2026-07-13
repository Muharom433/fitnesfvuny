import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ndjzewkyrrbyymcjhbwj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kanpld2t5cnJieXltY2poYndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2ODI3ODMsImV4cCI6MjA5NzI1ODc4M30.b8nU5WQyH54xvgxPk_KHeyjQbX2ckVaZbXdgsdfclUM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testEquipmentItemsInsert() {
  const payload = {
    equipment_id: 'test_equipment_id', // parent category
    name_id: 'Item Test',
    name_en: 'Test Item',
    desc_id: 'Desc',
    desc_en: 'Desc',
    icon: 'fa-dumbbell'
  };
  const { data, error } = await supabase.from('equipment_items').insert(payload).select();
  if (error) {
    console.error('Equipment items Insert error:', error);
  } else {
    console.log('Equipment items Insert success:', data);
    if (data && data.length > 0) {
      console.log('Columns in equipment_items:', Object.keys(data[0]));
      await supabase.from('equipment_items').delete().eq('id', data[0].id);
    }
  }
}

testEquipmentItemsInsert();
