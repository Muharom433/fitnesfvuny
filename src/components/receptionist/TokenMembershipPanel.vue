<template>
  <div class="flex items-center justify-center min-h-[70vh] p-4 bg-slate-100/50">
    <div class="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-8 relative overflow-hidden transition-all duration-300">
      
      <!-- Top Decorative Bar -->
      <div class="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-accent-500 to-amber-500"></div>

      <!-- Header / Logo -->
      <div class="flex flex-col items-center text-center mb-6">
        <div class="w-16 h-16 rounded-2xl bg-accent-50/80 border border-accent-100 flex items-center justify-center mb-3 shadow-sm">
          <img src="/assets/logo.png" alt="Logo" class="w-12 h-12 object-contain" />
        </div>
        <h3 class="text-sm font-black tracking-widest text-primary-950 uppercase leading-none">FITNESS CENTER</h3>
        <span class="text-[11px] font-bold text-accent-500 tracking-wider uppercase mt-1">VOKASI UNY</span>
        
        <h2 class="text-lg font-black text-primary-950 mt-4 leading-tight">Token Membership</h2>
        <p class="text-slate-400 text-xs mt-1">Masukkan token untuk check-in & merekam aktivitas member</p>
      </div>

      <!-- Main Input Form -->
      <form @submit.prevent="handleCheckIn" class="space-y-5">
        
        <!-- Token Input Field -->
        <div class="space-y-1.5">
          <label class="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">TOKEN MEMBERSHIP</label>
          <div class="relative rounded-xl shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <i class="fa-solid fa-key text-xs"></i>
            </div>
            <input
              v-model="tokenInput"
              type="text"
              required
              placeholder="Masukkan token (Contoh: MEM-XXXXX)"
              class="w-full pl-10 pr-4 py-3 text-xs font-bold text-primary-900 border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all uppercase placeholder:normal-case"
            />
          </div>
        </div>

        <!-- View Data & Activity Button (Replaces Password Field) -->
        <div class="space-y-1.5">
          <label class="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">INFORMASI MEMBERSHIP</label>
          <button
            type="button"
            @click="fetchMemberData"
            class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-primary-900 rounded-xl border border-slate-200 text-xs font-bold transition-all"
          >
            <span class="flex items-center gap-2">
              <i class="fa-solid fa-circle-info text-accent-500"></i>
              Klik untuk Lihat Data / Riwayat Aktivitas
            </span>
            <i class="fa-solid fa-chevron-right text-[10px] opacity-60"></i>
          </button>
        </div>

        <!-- Check-in Button -->
        <button
          type="submit"
          :disabled="isProcessing"
          class="w-full py-3 bg-accent-500 hover:bg-accent-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-accent-500/20 hover:shadow-accent-500/35 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
        >
          <i class="fa-solid fa-right-to-bracket"></i>
          {{ isProcessing ? 'Memproses...' : 'Proses Kehadiran (Check-in)' }}
        </button>

      </form>

      <!-- Member Details Display Area (Visible after lookup or check-in) -->
      <Transition name="fade-slide">
        <div v-if="memberData" class="mt-6 pt-5 border-t border-slate-100 space-y-4">
          <div class="bg-gradient-to-tr from-primary-950 to-primary-900 text-white rounded-2xl p-4 shadow-md relative overflow-hidden">
            <div class="absolute -top-6 -right-6 w-20 h-20 bg-white/5 rounded-full blur-lg pointer-events-none"></div>
            
            <!-- Member Header -->
            <div class="flex items-center justify-between pb-2 border-b border-white/10">
              <div>
                <h4 class="text-xs font-black uppercase tracking-wide text-white">{{ memberData.name }}</h4>
                <p class="text-[9px] font-bold text-accent-400 uppercase tracking-widest mt-0.5">{{ memberData.status_civitas }}</p>
              </div>
              <span :class="['text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider border', statusClass]">
                {{ statusText }}
              </span>
            </div>

            <!-- Details Grid -->
            <div class="grid grid-cols-2 gap-3 py-3 text-[10px]">
              <div>
                <p class="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Token</p>
                <p class="font-mono font-bold text-white mt-0.5 text-xs">{{ memberData.token }}</p>
              </div>
              <div>
                <p class="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Sisa Hari</p>
                <p class="font-bold text-white mt-0.5 text-xs">
                  {{ daysRemaining >= 0 ? `${daysRemaining} Hari` : 'Habis' }}
                </p>
              </div>
              <div>
                <p class="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Masa Aktif</p>
                <p class="font-bold text-white mt-0.5">{{ formatDate(memberData.expiry_date) }}</p>
              </div>
              <div>
                <p class="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Total Kehadiran</p>
                <p class="font-bold text-accent-400 mt-0.5 text-xs">{{ memberData.visit_count }} Kali</p>
              </div>
            </div>

            <!-- Duration Info -->
            <div class="bg-white/5 rounded-lg p-2 flex items-center justify-between text-[9px] text-slate-300">
              <span>Paket: <strong>{{ memberData.duration }}</strong></span>
              <span>Daftar: <strong>{{ formatDate(memberData.registration_date) }}</strong></span>
            </div>
          </div>

          <!-- Extended Management / Perpanjang Membership (Tambahan Fitur) -->
          <div class="bg-slate-50 border border-slate-200/60 rounded-2xl p-4">
            <h4 class="text-[10px] font-extrabold text-primary-950 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <i class="fa-solid fa-clock-rotate-left text-accent-500"></i>
              Perpanjang Masa Membership
            </h4>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="extendMembership(1)"
                :disabled="isExtending"
                class="py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 text-[10px] font-bold transition-all disabled:opacity-50"
              >
                + 1 Bulan
              </button>
              <button
                @click="extendMembership(3)"
                :disabled="isExtending"
                class="py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 text-[10px] font-bold transition-all disabled:opacity-50"
              >
                + 3 Bulan
              </button>
            </div>
          </div>

          <!-- Riwayat 5 Kunjungan Terakhir -->
          <div class="space-y-2">
            <h4 class="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">5 KUNJUNGAN TERAKHIR</h4>
            <div class="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-inner max-h-36 overflow-y-auto">
              <div v-if="!memberData.visits_log || memberData.visits_log.length === 0" class="p-4 text-center text-[10px] text-slate-400">
                Belum ada catatan kunjungan untuk member ini.
              </div>
              <div
                v-else
                v-for="(visit, idx) in sortedVisits.slice(0, 5)"
                :key="idx"
                class="p-2.5 px-3 flex items-center justify-between text-[10.5px] hover:bg-slate-50/50 transition-colors"
              >
                <span class="font-semibold text-primary-900">Kunjungan #{{ memberData.visits_log.length - idx }}</span>
                <span class="text-slate-400 font-medium">
                  {{ formatDate(visit.date) }} — {{ visit.time }}
                </span>
              </div>
            </div>
          </div>

        </div>
      </Transition>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/composables/useToast'
import { useReceptionistStore } from '@/stores/receptionist.store'

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

const toast = useToast()
const recStore = useReceptionistStore()

const tokenInput = ref('')
const isProcessing = ref(false)
const isExtending = ref(false)
const memberData = ref<MemberToken | null>(null)

// Calculate days remaining
const daysRemaining = computed(() => {
  if (!memberData.value) return 0
  const expiry = new Date(memberData.value.expiry_date)
  expiry.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffTime = expiry.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

const sortedVisits = computed(() => {
  if (!memberData.value || !memberData.value.visits_log) return []
  return [...memberData.value.visits_log].reverse()
})

const statusText = computed(() => {
  if (daysRemaining.value < 0) return 'Nonaktif (Masa Aktif Habis)'
  if (daysRemaining.value === 0) return 'Hari Ini Berakhir'
  if (daysRemaining.value <= 7) return `Segera Habis (H-${daysRemaining.value})`
  return 'Aktif'
})

const statusClass = computed(() => {
  if (daysRemaining.value < 0) return 'bg-red-500/10 text-red-500 border-red-500/20'
  if (daysRemaining.value <= 7) return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
  return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
})

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Fetch member data details
async function fetchMemberData() {
  if (!tokenInput.value.trim()) {
    toast.warning('Silakan masukkan token terlebih dahulu.')
    return
  }

  isProcessing.value = true
  try {
    const formattedToken = tokenInput.value.trim().toUpperCase()
    const { data, error } = await supabase
      .from('member_tokens')
      .select('*')
      .eq('token', formattedToken)
      .maybeSingle()

    if (error) throw error

    if (!data) {
      toast.error('Token tidak ditemukan. Periksa pendaftaran member.')
      memberData.value = null
      return
    }

    memberData.value = data as MemberToken
    toast.success('Data member ditemukan!')
  } catch (err: any) {
    console.error('Error fetching member token:', err)
    toast.error(err.message || 'Gagal mencari data member.')
  } finally {
    isProcessing.value = false
  }
}

// Process check-in attendance
async function handleCheckIn() {
  if (!tokenInput.value.trim()) {
    toast.warning('Silakan masukkan token terlebih dahulu.')
    return
  }

  isProcessing.value = true
  try {
    const formattedToken = tokenInput.value.trim().toUpperCase()
    
    // 1. Fetch token first
    const { data: member, error: fetchErr } = await supabase
      .from('member_tokens')
      .select('*')
      .eq('token', formattedToken)
      .maybeSingle()

    if (fetchErr) throw fetchErr

    if (!member) {
      toast.error('Token tidak valid atau tidak terdaftar.')
      return
    }

    // 2. Check if active period expired
    const expiry = new Date(member.expiry_date)
    expiry.setHours(0, 0, 0, 0)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (expiry < today) {
      toast.error('Gagal Check-in: Masa aktif membership telah berakhir. Silakan perpanjang terlebih dahulu!')
      memberData.value = member as MemberToken
      return
    }

    // 3. Update visit count and append log
    const now = new Date()
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    const dateStr = now.toISOString().split('T')[0]
    
    const newVisit: VisitRecord = { date: dateStr, time: timeStr }
    const updatedLog = [...(member.visits_log || []), newVisit]
    const updatedCount = (member.visit_count || 0) + 1

    const { data: updatedMember, error: updateErr } = await supabase
      .from('member_tokens')
      .update({
        visit_count: updatedCount,
        visits_log: updatedLog
      })
      .eq('id', member.id)
      .select()
      .single()

    if (updateErr) throw updateErr

    memberData.value = updatedMember as MemberToken

    // 4. Record zero-price visit transaction locally to receptionist store to sync stats
    recStore.addTransaction({
      id: 'tx_token_' + member.id + '_' + Date.now(),
      date: dateStr,
      time: timeStr,
      name: member.name,
      phone: member.phone || '-',
      civitas: member.status_civitas === 'student' ? 'Mahasiswa / Civitas UNY' : member.status_civitas === 'alumni' ? 'Alumni UNY' : 'Masyarakat Umum',
      category: 'Member (Token)',
      duration: member.duration,
      trainer: '-',
      kelas: '-',
      alat: '-',
      amount: 0,
      paymentMethod: 'Token Membership',
      status: 'Lunas',
      type: 'visit'
    })

    toast.success(`Check-in berhasil! Selamat datang, ${member.name}.`)
  } catch (err: any) {
    console.error('Error check-in:', err)
    toast.error(err.message || 'Gagal memproses check-in.')
  } finally {
    isProcessing.value = false
  }
}

// Extend membership active period directly
async function extendMembership(months: number) {
  if (!memberData.value) return
  
  isExtending.value = true
  try {
    const currentExpiry = new Date(memberData.value.expiry_date)
    const baseDate = currentExpiry < new Date() ? new Date() : currentExpiry
    baseDate.setMonth(baseDate.getMonth() + months)
    
    const nextExpiryStr = baseDate.toISOString().split('T')[0]

    const { data: updatedMember, error } = await supabase
      .from('member_tokens')
      .update({ expiry_date: nextExpiryStr })
      .eq('id', memberData.value.id)
      .select()
      .single()

    if (error) throw error

    memberData.value = updatedMember as MemberToken
    toast.success(`Membership berhasil diperpanjang +${months} bulan!`)
  } catch (err: any) {
    console.error('Error extending membership:', err)
    toast.error('Gagal memperpanjang masa aktif.')
  } finally {
    isExtending.value = false
  }
}
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
