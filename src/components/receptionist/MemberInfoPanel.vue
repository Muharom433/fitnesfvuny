<template>
  <div class="space-y-5">
    <!-- Header Title -->
    <div>
      <h2 class="text-lg font-extrabold text-primary-900">Informasi Membership</h2>
      <p class="text-slate-400 text-xs">Lihat daftar member, total kunjungan, status keaktifan, dan riwayat aktivitas kehadiran.</p>
    </div>

    <!-- Main Layout Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      
      <!-- Left: Member List Table -->
      <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden flex flex-col">
        <!-- Search and Filters -->
        <div class="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div class="relative w-full max-w-xs">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <i class="fa-solid fa-magnifying-glass text-xs"></i>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari nama atau token..."
              class="w-full text-xs pl-8 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all bg-white"
            />
          </div>
          <span class="text-[10px] bg-primary-800 text-white font-bold px-3 py-1 rounded-full">
            {{ filteredMembers.length }} Member Terdaftar
          </span>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead>
              <tr class="bg-slate-50/80 text-left text-slate-500 border-b border-slate-100">
                <th class="px-5 py-3 font-bold uppercase tracking-wider">Nama / Token</th>
                <th class="px-5 py-3 font-bold uppercase tracking-wider">Civitas</th>
                <th class="px-5 py-3 font-bold uppercase tracking-wider">Masa Aktif</th>
                <th class="px-5 py-3 font-bold uppercase tracking-wider text-center">Kunjungan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="m in filteredMembers"
                :key="m.id"
                @click="selectMember(m)"
                :class="[
                  'cursor-pointer hover:bg-slate-50 transition-colors',
                  selectedMember?.id === m.id ? 'bg-accent-50/40 hover:bg-accent-50/60' : ''
                ]"
              >
                <td class="px-5 py-3.5">
                  <div class="flex flex-col gap-1.5">
                    <span class="font-extrabold text-primary-950 text-sm">{{ m.name }}</span>
                    <span class="text-xs font-bold tracking-widest text-accent-600 bg-accent-50 border border-accent-200 rounded-md px-2 py-1 w-fit flex items-center gap-1.5">
                      <i class="fa-solid fa-key text-[10px]"></i> {{ m.token }}
                    </span>
                  </div>
                </td>
                <td class="px-5 py-3.5 font-bold uppercase text-slate-500 text-[10px] tracking-wide">
                  {{ m.status_civitas }}
                </td>
                <td class="px-5 py-3.5">
                  <div class="flex flex-col">
                    <span class="font-semibold text-slate-600">s.d. {{ formatDate(m.expiry_date) }}</span>
                    <span :class="['text-[9px] font-bold mt-1 px-2 py-0.5 rounded border w-fit capitalize', getExpiryClass(m.expiry_date)]">
                      {{ getExpiryText(m.expiry_date) }}
                    </span>
                  </div>
                </td>
                <td class="px-5 py-3.5 text-center font-black text-accent-600 text-xs">
                  {{ m.visit_count }} Kali
                </td>
              </tr>
              <tr v-if="filteredMembers.length === 0">
                <td colspan="4" class="text-center py-12 text-slate-400 text-xs bg-slate-50/20">
                  <i class="fa-solid fa-address-card text-3xl block mb-2 text-slate-200"></i>
                  Tidak ada data member ditemukan.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right: Detailed Member Activity Log -->
      <div class="lg:col-span-1">
        <Transition name="fade" mode="out-in">
          <div v-if="selectedMember" :key="selectedMember.id" class="bg-white rounded-2xl border border-slate-200/80 shadow-card p-5 space-y-4">
            
            <!-- Member Visual Card Header -->
            <div class="bg-gradient-to-tr from-primary-950 to-primary-900 text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
              <div class="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-lg pointer-events-none"></div>
              <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-500/10 rounded-full blur-xl pointer-events-none"></div>
              
              <!-- Card Header -->
              <div class="flex items-start justify-between pb-3 border-b border-white/10">
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-black uppercase tracking-wide text-white leading-tight">{{ selectedMember.name }}</h4>
                  <p class="text-[10px] font-bold text-accent-400 uppercase tracking-widest mt-1">{{ selectedMember.status_civitas }}</p>
                </div>
                <span :class="['text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider border ml-2 shrink-0', detailStatusClass]">
                  {{ detailStatusText }}
                </span>
              </div>

              <!-- Token Badge — Big & Prominent -->
              <div class="my-3 bg-white/8 border border-white/15 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Token Membership</p>
                  <p class="text-xl font-black text-white tracking-widest flex items-center gap-2">
                    <i class="fa-solid fa-key text-accent-400 text-sm"></i>
                    {{ selectedMember.token }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Sisa Hari</p>
                  <p class="text-xl font-black" :class="selectedMemberDaysRemaining >= 0 ? 'text-emerald-400' : 'text-red-400'">
                    {{ selectedMemberDaysRemaining >= 0 ? selectedMemberDaysRemaining : '0' }}
                    <span class="text-xs font-bold text-slate-400">hari</span>
                  </p>
                </div>
              </div>

              <!-- Details Grid -->
              <div class="grid grid-cols-2 gap-3 text-[10px]">
                <div>
                  <p class="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Masa Aktif</p>
                  <p class="font-bold text-white mt-0.5 text-xs">{{ formatDate(selectedMember.expiry_date) }}</p>
                </div>
                <div>
                  <p class="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Total Kehadiran</p>
                  <p class="font-bold text-accent-400 mt-0.5 text-sm">{{ selectedMember.visit_count }} <span class="text-xs">Kali</span></p>
                </div>
              </div>

              <!-- Extra Info -->
              <div class="bg-white/5 rounded-lg p-2 mt-3 flex items-center justify-between text-[9px] text-slate-300">
                <span>Paket: <strong class="text-white">{{ selectedMember.duration }}</strong></span>
                <span>Daftar: <strong class="text-white">{{ formatDate(selectedMember.registration_date) }}</strong></span>
              </div>
            </div>

            <!-- Extend Membership Panel -->
            <div class="bg-slate-50 border border-slate-200/60 rounded-2xl p-4">
              <h4 class="text-[10px] font-extrabold text-primary-950 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <i class="fa-solid fa-clock-rotate-left text-accent-500"></i>
                Perpanjang Masa Membership
              </h4>
              <div class="grid grid-cols-2 gap-2">
                <button
                  @click="extendMembership(1)"
                  :disabled="isExtending"
                  class="py-2.5 bg-white hover:bg-primary-50 text-primary-800 hover:text-primary-900 rounded-xl border border-slate-200 hover:border-primary-200 text-xs font-bold transition-all disabled:opacity-50"
                >
                  + 1 Bulan
                </button>
                <button
                  @click="extendMembership(3)"
                  :disabled="isExtending"
                  class="py-2.5 bg-accent-500 hover:bg-accent-600 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 shadow-sm shadow-accent-500/30"
                >
                  + 3 Bulan
                </button>
              </div>
            </div>

            <!-- Visits Log History list -->
            <div class="space-y-2">
              <h4 class="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">RIWAYAT AKTIVITAS KEHADIRAN</h4>
              <div class="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-inner max-h-60 overflow-y-auto">
                <div v-if="!selectedMember.visits_log || selectedMember.visits_log.length === 0" class="p-4 text-center text-[10px] text-slate-400">
                  Belum ada riwayat aktivitas kehadiran.
                </div>
                <div
                  v-else
                  v-for="(visit, idx) in sortedVisits"
                  :key="idx"
                  class="p-3 px-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
                >
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-accent-100 flex items-center justify-center">
                      <i class="fa-solid fa-person-walking text-accent-500 text-[9px]"></i>
                    </div>
                    <span class="font-bold text-primary-900 text-xs">Kunjungan #{{ selectedMember.visits_log.length - idx }}</span>
                  </div>
                  <span class="text-slate-400 font-medium text-[10px]">
                    {{ formatDate(visit.date) }} — {{ visit.time }}
                  </span>
                </div>
              </div>
            </div>

          </div>

          <!-- Empty details state -->
          <div v-else class="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-slate-400 text-xs shadow-card flex flex-col items-center justify-center min-h-[300px]">
            <i class="fa-solid fa-address-card text-4xl text-slate-200 mb-3 animate-pulse"></i>
            <p class="font-semibold">Pilih member untuk melihat riwayat aktivitas.</p>
          </div>
        </Transition>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/composables/useToast'

interface VisitRecord {
  date: string
  time: string
}

interface MemberToken {
  id: string
  token: string
  name: string
  email: string | null
  phone: string | null
  status_civitas: string
  duration: string
  registration_date: string
  expiry_date: string
  visit_count: number
  visits_log: VisitRecord[]
  created_at: string
}

const props = withDefaults(defineProps<{
  initialToken?: string
}>(), {
  initialToken: ''
})

const toast = useToast()
const members = ref<MemberToken[]>([])
const selectedMember = ref<MemberToken | null>(null)
const searchQuery = ref('')
const isExtending = ref(false)

const filteredMembers = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return members.value
  return members.value.filter(m =>
    m.name.toLowerCase().includes(query) ||
    m.token.toLowerCase().includes(query)
  )
})

const selectedMemberDaysRemaining = computed(() => {
  if (!selectedMember.value) return 0
  const expiry = new Date(selectedMember.value.expiry_date)
  expiry.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffTime = expiry.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

const sortedVisits = computed(() => {
  if (!selectedMember.value || !selectedMember.value.visits_log) return []
  return [...selectedMember.value.visits_log].reverse()
})

const detailStatusText = computed(() => {
  if (selectedMemberDaysRemaining.value < 0) return 'Nonaktif'
  if (selectedMemberDaysRemaining.value === 0) return 'Habis Hari Ini'
  if (selectedMemberDaysRemaining.value <= 7) return `Segera Habis (H-${selectedMemberDaysRemaining.value})`
  return 'Aktif'
})

const detailStatusClass = computed(() => {
  if (selectedMemberDaysRemaining.value < 0) return 'bg-red-500/10 text-red-500 border-red-500/20'
  if (selectedMemberDaysRemaining.value <= 7) return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
  return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
})

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
}

function getExpiryClass(expiryDate: string) {
  const expiry = new Date(expiryDate)
  expiry.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffTime = expiry.getTime() - today.getTime()
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (days < 0) return 'bg-red-50 text-red-600 border-red-200'
  if (days <= 7) return 'bg-amber-50 text-amber-600 border-amber-200'
  return 'bg-emerald-50 text-emerald-600 border-emerald-200'
}

function getExpiryText(expiryDate: string) {
  const expiry = new Date(expiryDate)
  expiry.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffTime = expiry.getTime() - today.getTime()
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (days < 0) return 'Masa Aktif Habis'
  if (days === 0) return 'Berakhir Hari Ini'
  if (days <= 7) return `Sisa ${days} Hari`
  return 'Aktif'
}

async function fetchMembers() {
  try {
    const { data, error } = await supabase
      .from('member_tokens')
      .select('*')
      .order('name')
    if (error) throw error
    members.value = data as MemberToken[]
    
    // Auto-select member from initialToken prop (after check-in redirect)
    if (props.initialToken) {
      const target = members.value.find(m => m.token === props.initialToken)
      if (target) selectedMember.value = target
    }

    // Auto-update selected member details if it was open
    if (selectedMember.value) {
      const updated = members.value.find(m => m.id === selectedMember.value?.id)
      if (updated) selectedMember.value = updated
    }
  } catch (err: any) {
    console.error('Error fetching member list:', err)
  }
}

function selectMember(member: MemberToken) {
  selectedMember.value = member
}

async function extendMembership(months: number) {
  if (!selectedMember.value) return
  isExtending.value = true
  try {
    const currentExpiry = new Date(selectedMember.value.expiry_date)
    const baseDate = currentExpiry < new Date() ? new Date() : currentExpiry
    baseDate.setMonth(baseDate.getMonth() + months)
    
    const nextExpiryStr = baseDate.toISOString().split('T')[0]

    const { data: updatedMember, error } = await supabase
      .from('member_tokens')
      .update({ expiry_date: nextExpiryStr })
      .eq('id', selectedMember.value.id)
      .select()
      .single()

    if (error) throw error

    selectedMember.value = updatedMember as MemberToken
    toast.success(`Membership ${selectedMember.value.name} berhasil diperpanjang +${months} bulan!`)
    await fetchMembers()
  } catch (err: any) {
    console.error('Error extending membership:', err)
    toast.error('Gagal memperpanjang masa aktif.')
  } finally {
    isExtending.value = false
  }
}

let refreshInterval: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  await fetchMembers()
  // Auto-refresh every 30s to reflect check-ins from TokenMembershipPanel
  refreshInterval = setInterval(() => {
    fetchMembers()
  }, 30000)
})

// If initialToken changes (parent navigates here again), re-select the member
watch(() => props.initialToken, async (newToken) => {
  if (newToken) {
    await fetchMembers()
    const target = members.value.find(m => m.token === newToken)
    if (target) selectedMember.value = target
  }
})

onUnmounted(() => {
  if (refreshInterval) clearInterval(refreshInterval)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
