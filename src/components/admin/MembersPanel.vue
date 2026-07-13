<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-extrabold text-primary-900">Kelola User & Member</h2>
        <p class="text-slate-400 text-xs">Kelola akun administrator, staf resepsionis, dan member yang terdaftar di sistem.</p>
      </div>
      <button
        @click="openAddModal"
        class="flex items-center gap-2 px-4 py-2.5 bg-accent-500 hover:bg-accent-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-accent-500/25"
      >
        <i class="fa-solid fa-user-plus"></i> Tambah User / Member
      </button>
    </div>

    <!-- Table Card -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <input
          v-model="search"
          type="text"
          placeholder="Cari nama..."
          class="w-full max-w-xs text-sm border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
        />
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-left">
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama</th>
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email/Tipe</th>
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Role</th>
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Bergabung</th>
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="m in filteredMembers" :key="m.id" class="hover:bg-slate-50/60 transition-colors">
              <td class="px-5 py-3 font-semibold text-primary-900 text-xs">
                <div class="flex flex-col">
                  <span class="font-bold text-primary-900">{{ m.name }}</span>
                  <span v-if="m.role === 'member' && getMembershipStatus(m)" :class="['text-[9px] font-semibold mt-1 px-2 py-0.5 rounded-md w-fit border', getMembershipStatusClass(m)]">
                    {{ getMembershipStatus(m) }}
                  </span>
                </div>
              </td>
              <td class="px-5 py-3 text-xs text-slate-400">{{ m.email }}</td>
              <td class="px-5 py-3">
                <span :class="['text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize', roleClass(m.role)]">
                  {{ m.role }}
                </span>
              </td>
              <td class="px-5 py-3 text-xs text-slate-400">
                <div class="flex flex-col">
                  <span>Bergabung: {{ m.created_at ? new Date(m.created_at).toLocaleDateString('id-ID') : '—' }}</span>
                  <span v-if="m.role === 'member' && getMembershipInfo(m)" class="text-[9.5px] text-slate-400 font-semibold mt-0.5">
                    Masa Aktif: s.d. {{ getMembershipInfo(m)?.endDateText }} ({{ getMembershipInfo(m)?.duration }})
                  </span>
                </div>
              </td>
              <td class="px-5 py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    v-if="m.role !== 'member' || m.email !== '— (Registrasi Kasir)'"
                    @click="openEditModal(m)"
                    class="p-1 px-2.5 bg-slate-50 hover:bg-primary-50 text-primary-700 hover:text-primary-800 rounded-lg text-[10px] font-bold border border-slate-200 transition-colors"
                  >
                    <i class="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                  <button
                    @click="handleDelete(m)"
                    class="p-1 px-2.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg text-[10px] font-bold border border-red-200/50 transition-colors"
                  >
                    <i class="fa-solid fa-trash-can"></i> Hapus
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredMembers.length === 0">
              <td colspan="5" class="text-center py-12 text-slate-400 text-xs">
                <i class="fa-solid fa-users text-3xl block mb-2 text-slate-200"></i>
                Tidak ada user atau member ditemukan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form (Tambah / Edit) -->
    <Transition name="fade">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <div class="bg-white rounded-2xl max-w-md w-full border border-slate-100 shadow-2xl p-6 relative">
          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>

          <h3 class="font-extrabold text-primary-900 text-sm mb-5 flex items-center gap-2">
            <i class="fa-solid" :class="isEditMode ? 'fa-user-pen text-accent-500' : 'fa-user-plus text-accent-500'"></i>
            {{ isEditMode ? 'EDIT USER / MEMBER' : 'TAMBAH USER / MEMBER BARU' }}
          </h3>

          <form @submit.prevent="submitForm" class="space-y-4">
            <!-- Nama -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Nama Lengkap</label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="Contoh: Budi Santoso"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 bg-slate-50/50"
              />
            </div>

            <!-- Email -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email</label>
              <input
                v-model="form.email"
                type="email"
                required
                :disabled="isEditMode && form.role === 'member' && form.email === '— (Registrasi Kasir)'"
                placeholder="Contoh: budi@gmail.com"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 bg-slate-50/50 disabled:opacity-60"
              />
            </div>

            <!-- Role -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Role Akses</label>
              <select
                v-model="form.role"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 bg-slate-50/50"
              >
                <option value="admin">Administrator</option>
                <option value="receptionist">Resepsionis</option>
                <option value="member">Member</option>
              </select>
            </div>

            <!-- Password (Only for accounts, optional in edit mode) -->
            <div v-if="form.role !== 'member'" class="space-y-1">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Password {{ isEditMode ? '(Kosongkan jika tidak diubah)' : '' }}
              </label>
              <input
                v-model="form.password"
                type="password"
                :required="!isEditMode"
                placeholder="Min. 6 karakter..."
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 bg-slate-50/50"
              />
            </div>

            <!-- Action buttons -->
            <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="isSaving"
                class="px-5 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-60"
              >
                {{ isSaving ? 'Menyimpan...' : 'Simpan User' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/composables/useToast'
import { useReceptionistStore } from '@/stores/receptionist.store'
import type { User, Role } from '@/types/user'

const toast = useToast()
const recStore = useReceptionistStore()

const members = ref<(User & { password?: string })[]>([])
const search = ref('')

const isModalOpen = ref(false)
const isEditMode = ref(false)
const isSaving = ref(false)
const editingUserId = ref<string | null>(null)

const form = reactive({
  name: '',
  email: '',
  role: 'member' as Role,
  password: ''
})

const filteredMembers = computed(() => {
  const q = search.value.toLowerCase()
  return members.value.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.email.toLowerCase().includes(q)
  )
})

function roleClass(role: string) {
  switch (role) {
    case 'admin': return 'bg-red-50 text-red-600 border-red-200'
    case 'receptionist': return 'bg-blue-50 text-blue-600 border-blue-200'
    default: return 'bg-emerald-50 text-emerald-600 border-emerald-200'
  }
}

function getMembershipInfo(m: any) {
  if (m.role !== 'member') return null
  
  // Find transaction matching cashier member registration
  const tx = recStore.transactions.find(t => t.name.toLowerCase() === m.name.toLowerCase() && t.category === 'Member')
  
  let startDate = m.created_at ? new Date(m.created_at) : new Date()
  let duration = '1 Bulan'
  
  if (tx) {
    if (tx.date) {
      const parts = tx.date.split(/[-/]/)
      if (parts.length >= 3) {
        if (parts[0].length === 4) {
          // YYYY-MM-DD
          startDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
        } else {
          // DD/MM/YYYY
          startDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]))
        }
      } else {
        startDate = new Date(tx.date)
      }
    }
    duration = tx.duration || '1 Bulan'
  }
  
  const months = duration === '3 Bulan' ? 3 : 1
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + months, startDate.getDate())
  const today = new Date()
  today.setHours(0,0,0,0)
  endDate.setHours(0,0,0,0)
  
  const diffTime = endDate.getTime() - today.getTime()
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  const endDateText = endDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
  
  return {
    daysRemaining,
    endDateText,
    duration
  }
}

function getMembershipStatus(m: any) {
  const info = getMembershipInfo(m)
  if (!info) return null
  
  if (info.daysRemaining < 0) {
    return 'Nonaktif (Masa Aktif Habis)'
  } else if (info.daysRemaining === 0) {
    return 'Hari Ini Berakhir'
  } else if (info.daysRemaining <= 7) {
    return `⚠️ Segera Habis (H-${info.daysRemaining} hari)`
  } else {
    return `Aktif (Sisa ${info.daysRemaining} hari)`
  }
}

function getMembershipStatusClass(m: any) {
  const info = getMembershipInfo(m)
  if (!info) return ''
  
  if (info.daysRemaining < 0) {
    return 'bg-red-50 text-red-600 border-red-200'
  } else if (info.daysRemaining <= 7) {
    return 'bg-amber-50 text-amber-600 border-amber-200'
  } else {
    return 'bg-emerald-50 text-emerald-600 border-emerald-200'
  }
}

onMounted(async () => {
  recStore.loadFromLocalStorage()
  await fetchAllMembers()
})

async function fetchAllMembers() {
  const [usersRes, bookingsRes] = await Promise.all([
    supabase.from('users').select('*').order('created_at', { ascending: false }),
    supabase.from('bookings').select('*').order('created_at', { ascending: false })
  ])
  
  const list: (User & { password?: string })[] = []
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

function openAddModal() {
  isEditMode.value = false
  editingUserId.value = null
  Object.assign(form, {
    name: '',
    email: '',
    role: 'member',
    password: ''
  })
  isModalOpen.value = true
}

function openEditModal(user: User) {
  isEditMode.value = true
  editingUserId.value = user.id
  Object.assign(form, {
    name: user.name,
    email: user.email === '— (Registrasi Kasir)' ? '' : user.email,
    role: user.role,
    password: ''
  })
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

async function submitForm() {
  isSaving.value = true
  try {
    const payload: any = {
      name: form.name,
      email: form.email || '— (Registrasi Kasir)',
      role: form.role
    }

    if (form.role !== 'member' && form.password) {
      payload.password = form.password
    }

    if (isEditMode.value && editingUserId.value) {
      // Update existing
      // If it was a cashier member row, it actually exists in bookings, not users. Let's handle updates
      const isRealUser = members.value.find(m => m.id === editingUserId.value)?.email !== '— (Registrasi Kasir)'
      
      if (isRealUser) {
        const { error } = await supabase.from('users').update(payload).eq('id', editingUserId.value)
        if (error) throw error
        toast.success('User berhasil diperbarui!')
      } else {
        // Cashier visitor is registered in bookings table
        const { error } = await supabase.from('bookings').update({ name: form.name }).eq('id', editingUserId.value)
        if (error) throw error
        toast.success('Member berhasil diperbarui!')
      }
    } else {
      // Create new
      const { error } = await supabase.from('users').insert([payload])
      if (error) throw error
      toast.success('User baru berhasil ditambahkan!')
    }

    closeModal()
    await fetchAllMembers()
  } catch (err: any) {
    console.error('Error saving user:', err)
    toast.error(err.message || 'Gagal menyimpan data user.')
  } finally {
    isSaving.value = false
  }
}

async function handleDelete(user: User) {
  if (confirm(`Apakah Anda yakin ingin menghapus "${user.name}" dari sistem?`)) {
    try {
      const isRealUser = user.email !== '— (Registrasi Kasir)'
      if (isRealUser) {
        const { error } = await supabase.from('users').delete().eq('id', user.id)
        if (error) throw error
        toast.warning('User berhasil dihapus.')
      } else {
        const { error } = await supabase.from('bookings').delete().eq('id', user.id)
        if (error) throw error
        toast.warning('Member berhasil dihapus.')
      }
      await fetchAllMembers()
    } catch (err: any) {
      console.error('Error deleting user:', err)
      toast.error(err.message || 'Gagal menghapus user.')
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: scale(0.95); }
</style>
