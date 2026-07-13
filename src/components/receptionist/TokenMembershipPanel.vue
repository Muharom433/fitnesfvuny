<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-170px)] p-4 bg-slate-100/50">
    <div class="w-full max-w-xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-12 relative overflow-hidden transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.1)] hover:-translate-y-1">
      
      <!-- Top Decorative Bar -->
      <div class="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-accent-500 to-amber-500"></div>

      <!-- Header / Logo Backdrop glow -->
      <div class="absolute -top-10 -left-10 w-28 h-28 bg-accent-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <!-- Header / Logo -->
      <div class="flex flex-col items-center text-center mb-8">
        <div class="w-24 h-24 rounded-3xl bg-accent-50/80 border border-accent-100 flex items-center justify-center mb-4 shadow-sm transition-transform duration-500 hover:rotate-12">
          <img src="/assets/logo.png" alt="Logo" class="w-16 h-16 object-contain" />
        </div>
        <h3 class="text-base font-black tracking-widest text-primary-950 uppercase leading-none">FITNESS CENTER</h3>
        <span class="text-xs font-bold text-accent-500 tracking-wider uppercase mt-1.5">VOKASI UNY</span>
        
        <h2 class="text-2xl font-black text-primary-950 mt-5 leading-tight">Token Membership</h2>
        <p class="text-slate-400 text-sm mt-2 px-2">Masukkan token untuk proses kehadiran & menyimpan aktivitas membership</p>
      </div>

      <!-- Main Input Form -->
      <form @submit.prevent="handleCheckIn" class="space-y-8">
        
        <!-- Token Input Field -->
        <div class="space-y-2">
          <label class="text-xs font-extrabold text-slate-500 uppercase tracking-widest block">TOKEN MEMBERSHIP</label>
          <div class="relative rounded-2xl shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400">
              <i class="fa-solid fa-key text-sm"></i>
            </div>
            <input
              v-model="tokenInput"
              type="text"
              required
              placeholder="Masukkan token membership Anda"
              class="w-full pl-12 pr-6 py-4 text-sm font-bold text-primary-900 border border-slate-200 rounded-2xl bg-slate-50/50 focus:outline-none focus:ring-4 focus:ring-accent-500/10 focus:border-accent-500 focus:shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all uppercase placeholder:normal-case"
            />
          </div>
        </div>

        <!-- Check-in Button -->
        <button
          type="submit"
          :disabled="isProcessing"
          class="w-full py-4 bg-accent-500 hover:bg-accent-600 text-white font-black text-sm rounded-2xl shadow-lg shadow-accent-500/20 hover:shadow-accent-500/35 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
        >
          <i class="fa-solid fa-circle-check text-base"></i>
          {{ isProcessing ? 'Memproses...' : 'Proses Kehadiran' }}
        </button>

      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/composables/useToast'
import { useReceptionistStore } from '@/stores/receptionist.store'

interface VisitRecord {
  date: string
  time: string
}

const toast = useToast()
const recStore = useReceptionistStore()

const tokenInput = ref('')
const isProcessing = ref(false)

// Process presence check-in attendance
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
      toast.error('Gagal memproses kehadiran: Masa aktif membership telah berakhir. Silakan perpanjang terlebih dahulu!')
      return
    }

    // 3. Update visit count and append log
    const now = new Date()
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    const dateStr = now.toISOString().split('T')[0]
    
    const newVisit: VisitRecord = { date: dateStr, time: timeStr }
    const updatedLog = [...(member.visits_log || []), newVisit]
    const updatedCount = (member.visit_count || 0) + 1

    const { error: updateErr } = await supabase
      .from('member_tokens')
      .update({
        visit_count: updatedCount,
        visits_log: updatedLog
      })
      .eq('id', member.id)

    if (updateErr) throw updateErr

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
      type: 'visit',
      token: formattedToken
    })

    toast.success(`Kehadiran berhasil dicatat! Selamat datang, ${member.name}.`)
    tokenInput.value = ''
  } catch (err: any) {
    console.error('Error proses kehadiran:', err)
    toast.error(err.message || 'Gagal memproses kehadiran.')
  } finally {
    isProcessing.value = false
  }
}
</script>
