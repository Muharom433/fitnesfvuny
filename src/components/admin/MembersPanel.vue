<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-extrabold text-primary-900">Kelola Member & Anggota</h2>
        <p class="text-slate-400 text-xs">Semua pengguna terdaftar dan member kasir di sistem</p>
      </div>
    </div>
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <input v-model="search" type="text" placeholder="Cari nama..." class="w-full max-w-xs text-sm border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all" />
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-left">
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama</th>
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email/Tipe</th>
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Role</th>
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Bergabung</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="m in filteredMembers" :key="m.id" class="hover:bg-slate-50/60 transition-colors">
              <td class="px-5 py-3 font-semibold text-primary-900 text-xs">{{ m.name }}</td>
              <td class="px-5 py-3 text-xs text-slate-400">{{ m.email }}</td>
              <td class="px-5 py-3">
                <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize', roleClass(m.role)]">{{ m.role }}</span>
              </td>
              <td class="px-5 py-3 text-xs text-slate-400">{{ m.created_at ? new Date(m.created_at).toLocaleDateString('id-ID') : '—' }}</td>
            </tr>
            <tr v-if="filteredMembers.length === 0">
              <td colspan="4" class="text-center py-12 text-slate-400 text-xs">
                <i class="fa-solid fa-users text-3xl block mb-2 text-slate-200"></i>
                Tidak ada member ditemukan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import type { User } from '@/types/user'

const members = ref<User[]>([])
const search = ref('')

const filteredMembers = computed(() => {
  const q = search.value.toLowerCase()
  return members.value.filter(m =>
    m.name.toLowerCase().includes(q)
  )
})

function roleClass(role: string) {
  switch (role) {
    case 'admin': return 'bg-red-50 text-red-600 border-red-200'
    case 'receptionist': return 'bg-blue-50 text-blue-600 border-blue-200'
    default: return 'bg-emerald-50 text-emerald-600 border-emerald-200'
  }
}

onMounted(async () => {
  await fetchAllMembers()
})

async function fetchAllMembers() {
  const [usersRes, bookingsRes] = await Promise.all([
    supabase.from('users').select('*').order('created_at', { ascending: false }),
    supabase.from('bookings').select('*').eq('category', 'Member').order('created_at', { ascending: false })
  ])
  
  const list: User[] = []
  const seen = new Set<string>()
  
  // 1. Add actual database registered users
  if (usersRes.data) {
    (usersRes.data as User[]).forEach(u => {
      seen.add(u.name.toLowerCase())
      list.push(u)
    })
  }
  
  // 2. Add members registered via Receptionist Cashier
  if (bookingsRes.data) {
    (bookingsRes.data as any[]).forEach(b => {
      if (!seen.has(b.name.toLowerCase())) {
        seen.add(b.name.toLowerCase())
        list.push({
          id: b.id,
          name: b.name,
          email: '— (Registrasi Kasir)',
          role: 'member',
          created_at: b.created_at
        })
      }
    })
  }
  
  members.value = list
}
</script>
