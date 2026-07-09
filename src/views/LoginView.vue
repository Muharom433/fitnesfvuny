<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white overflow-x-hidden">
    <!-- LEFT PANEL — Photo / Branding -->
    <div class="hidden lg:flex relative overflow-hidden flex-col">
      <!-- Background photo — visible clearly at top -->
      <img
        src="/assets/recepsionis_putih.jpg"
        alt="Fitness Center FV UNY"
        class="absolute inset-0 w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-[3s]"
      />
      <!-- Subtle overlay — light at top so photo shows, stronger at bottom toward card -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/60"></div>

      <!-- Top RESMI badge -->
      <div class="absolute top-8 left-8 z-10 anim-badge">
        <span class="inline-flex items-center gap-2 bg-accent-500 text-white text-[10px] font-bold uppercase tracking-[2px] px-4 py-2 rounded-full shadow-lg">
          <i class="fa-solid fa-dumbbell"></i> RESMI
        </span>
      </div>

      <!-- Landscape card — slightly below center -->
      <div class="absolute top-[58%] -translate-y-1/2 left-8 right-8 z-10">
        <div class="card-float w-full bg-[#0d1f3a]/82 backdrop-blur-md border border-white/10 rounded-2xl px-8 py-7 shadow-2xl">
          <!-- Shine sweep -->
          <div class="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div class="shine-sweep"></div>
          </div>

          <!-- Orange line -->
          <div class="anim-line w-8 h-[3px] bg-accent-500 mb-5 rounded-full"></div>

          <!-- Title -->
          <h2 class="anim-title1 text-white font-extrabold text-3xl leading-none tracking-tight mb-0.5">
            FITNESS CENTER
          </h2>
          <h2 class="anim-title2 text-accent-400 font-extrabold text-3xl leading-none tracking-tight mb-5">
            VOKASI UNY
          </h2>

          <!-- Dot badge row -->
          <div class="anim-badge-row flex items-center gap-2 mb-6">
            <span class="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
            <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse" style="animation-delay:0.3s"></span>
            <p class="text-white/70 text-[11px] font-bold uppercase tracking-[2.5px] ml-1">SISTEM MANAJEMEN INTERNAL</p>
          </div>

          <!-- Stat cards row -->
          <div class="flex gap-3">
            <div class="stat-card anim-stat1 flex-1 bg-white/12 border border-white/15 rounded-xl px-4 py-3 text-center cursor-default">
              <p class="text-accent-400 font-extrabold text-xl tabular-nums leading-none">{{ memberCount }}</p>
              <p class="text-white/55 text-[9px] font-bold uppercase tracking-wider mt-1.5">Member Aktif</p>
            </div>
            <div class="stat-card anim-stat2 flex-1 bg-white/12 border border-white/15 rounded-xl px-4 py-3 text-center cursor-default">
              <p class="text-accent-400 font-extrabold text-xl leading-none">{{ bookingCount }}</p>
              <p class="text-white/55 text-[9px] font-bold uppercase tracking-wider mt-1.5">Total Booking</p>
            </div>
            <div class="stat-card anim-stat3 flex-1 bg-white/12 border border-white/15 rounded-xl px-4 py-3 text-center cursor-default">
              <p class="text-accent-400 font-extrabold text-sm leading-tight">07.00–21.00</p>
              <p class="text-white/55 text-[9px] font-bold uppercase tracking-wider mt-1.5">Jam Operasional</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT PANEL — Login Form (clean white) -->
    <div class="flex items-center justify-center min-h-screen px-6 py-10 bg-slate-50">
      <div class="w-full max-w-[420px]">

        <!-- Logo mobile only -->
        <div class="flex items-center gap-3 mb-8 lg:hidden">
          <img src="/assets/logo.png" alt="Logo" class="w-12 h-12 object-contain" />
          <div>
            <p class="text-primary-900 font-extrabold text-base">FITNESS CENTER</p>
            <p class="text-accent-500 font-extrabold text-base">FV UNY</p>
          </div>
        </div>

        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center gap-3 mb-4 max-lg:hidden">
            <img src="/assets/logo.png" alt="Logo" class="w-11 h-11 object-contain" />
            <div>
              <span class="text-primary-900 font-extrabold text-sm block leading-tight">FITNESS CENTER</span>
              <span class="text-accent-500 font-extrabold text-sm block leading-tight">VOKASI UNY</span>
            </div>
          </div>
          <h1 class="text-2xl font-extrabold text-primary-900">Selamat Datang</h1>
          <p class="text-slate-400 text-sm mt-1">Masuk ke sistem manajemen internal</p>
        </div>

        <!-- Form Card -->
        <form
          @submit.prevent="handleLogin"
          class="bg-white rounded-2xl shadow-card border border-slate-200/80 p-8 space-y-5"
        >
          <!-- Email -->
          <div class="space-y-1.5">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-widest" for="email">Email</label>
            <div class="relative">
              <i class="fa-regular fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="admin@fitnesuny.ac.id"
                class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-primary-900 font-medium placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="space-y-1.5">
            <label class="text-xs font-bold text-slate-500 uppercase tracking-widest" for="password">Password</label>
            <div class="relative">
              <i class="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-primary-900 font-medium placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-600 transition-colors"
              >
                <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="text-sm"></i>
              </button>
            </div>
          </div>

          <!-- Error message -->
          <Transition name="fade">
            <div v-if="errorMsg" class="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              <i class="fa-solid fa-circle-xmark text-red-500"></i>
              {{ errorMsg }}
            </div>
          </Transition>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white bg-accent-500 hover:bg-accent-600 active:scale-[0.98] shadow-lg shadow-accent-500/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <i v-if="isLoading" class="fa-solid fa-spinner animate-spin"></i>
            <i v-else class="fa-solid fa-right-to-bracket"></i>
            {{ isLoading ? 'Memproses...' : 'Masuk ke Sistem' }}
          </button>
        </form>

        <p class="text-center text-[11px] text-slate-400 mt-6">
          Akses khusus untuk Admin &amp; Resepsionis FITNESS CENTER FV UNY
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { useToast } from '@/composables/useToast'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const auth = useAuthStore()
const toast = useToast()

const form = reactive({ email: '', password: '' })
const showPassword = ref(false)
const isLoading = ref(false)
const errorMsg = ref('')

// Real member count from Supabase bookings table
const memberCount = ref('—')
const bookingCount = ref('—')

onMounted(async () => {
  try {
    // Count unique members (category = 'Member') from bookings
    const { data: memberData } = await supabase
      .from('bookings')
      .select('name')
      .eq('category', 'Member')

    if (memberData) {
      const uniqueNames = new Set(memberData.map((b: any) => b.name?.toLowerCase().trim()).filter(Boolean))
      memberCount.value = uniqueNames.size > 0 ? `${uniqueNames.size}` : '0'
    }

    // Total bookings
    const { count } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })

    bookingCount.value = count !== null ? `${count}` : '0'
  } catch {
    memberCount.value = '0'
    bookingCount.value = '0'
  }
})

async function handleLogin() {
  errorMsg.value = ''
  isLoading.value = true

  const result = await auth.login(form.email, form.password)

  if (!result.ok) {
    errorMsg.value = result.message
    isLoading.value = false
    return
  }

  toast.success(`Selamat datang, ${auth.currentUser?.name ?? ''}!`)

  if (auth.role === 'admin') {
    router.push({ name: 'admin' })
  } else if (auth.role === 'receptionist') {
    router.push({ name: 'resepsionis' })
  } else {
    errorMsg.value = 'Akun Anda tidak memiliki akses ke sistem ini. Hubungi administrator.'
    await auth.logout()
  }

  isLoading.value = false
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }

/* ===== Shine sweep ===== */
.shine-sweep {
  position: absolute;
  top: 0;
  left: -150%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
  transform: skewX(-25deg);
  animation: shine 7s infinite ease-in-out;
}
@keyframes shine {
  0%   { left: -150%; }
  40%  { left: 120%; }
  100% { left: 120%; }
}

/* ===== Card gentle float animation ===== */
.card-float {
  animation: cardFloat 4s ease-in-out infinite;
}
@keyframes cardFloat {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
}

/* ===== Entrance animations (staggered) ===== */
.anim-badge {
  animation: fadeSlideDown 0.7s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-line {
  animation: fadeSlideUp 0.6s 0.15s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-title1 {
  animation: fadeSlideUp 0.7s 0.25s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-title2 {
  animation: fadeSlideUp 0.7s 0.38s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-badge-row {
  animation: fadeSlideUp 0.6s 0.5s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-stat1 {
  animation: fadeSlideUp 0.55s 0.62s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-stat2 {
  animation: fadeSlideUp 0.55s 0.72s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-stat3 {
  animation: fadeSlideUp 0.55s 0.82s cubic-bezier(0.16,1,0.3,1) both;
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeSlideDown {
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ===== Stat card hover lift ===== */
.stat-card {
  transition: transform 0.22s ease, background 0.22s ease, border-color 0.22s ease;
}
.stat-card:hover {
  transform: translateY(-4px) scale(1.03);
  background: rgba(255,255,255,0.20);
  border-color: rgba(255,107,0,0.45);
}
</style>
