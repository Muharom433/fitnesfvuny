<template>
  <header class="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 h-[68px] bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] min-w-0 overflow-x-hidden">

    <!-- Left: hamburger + title -->
    <div class="flex items-center gap-4">
      <button
        @click="emit('toggleSidebar')"
        class="relative flex items-center justify-center w-10 h-10 rounded-xl text-slate-500 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200 group"
      >
        <i class="fa-solid fa-bars text-base transition-transform duration-300 group-hover:scale-110"></i>
      </button>
      <div class="hidden sm:flex flex-col gap-0.5 anim-title">
        <h1 class="text-sm font-extrabold text-primary-800 leading-tight tracking-wide">{{ title }}</h1>
        <p class="text-[11px] text-slate-400 font-medium flex items-center gap-1">
          <i class="fa-solid fa-chevron-right text-[8px] text-accent-400"></i>
          {{ subtitle }}
        </p>
      </div>
    </div>

    <!-- Right: clock + date + user -->
    <div class="flex items-center gap-2">

      <!-- Live Clock — clean light badge -->
      <div class="hidden md:flex items-center gap-2 bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-xl px-3.5 py-2 transition-all duration-200 anim-badge">
        <i class="fa-regular fa-clock text-slate-500 text-xs"></i>
        <span class="text-slate-700 text-xs font-mono font-bold tracking-wider tabular-nums">{{ liveTime }}</span>
      </div>

      <!-- Date badge -->
      <div class="hidden lg:flex items-center gap-2 bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 rounded-xl px-3.5 py-2 transition-all duration-200 anim-badge" style="animation-delay:0.1s">
        <i class="fa-regular fa-calendar-days text-slate-400 text-xs"></i>
        <span class="text-slate-600 text-xs font-semibold">{{ liveDate }}</span>
      </div>

      <!-- Divider -->
      <div class="hidden lg:block w-px h-7 bg-slate-200 mx-1"></div>

      <!-- User pill — accent themed -->
      <div class="flex items-center gap-2.5 bg-accent-500/8 border border-accent-200/60 hover:border-accent-300 hover:bg-accent-50 rounded-xl px-3 py-2 transition-all duration-200 cursor-default group anim-badge" style="animation-delay:0.2s">
        <div class="w-7 h-7 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-sm flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
          <i class="fa-solid fa-user text-white text-[10px]"></i>
        </div>
        <span class="text-xs font-bold text-primary-800 max-w-[130px] truncate">{{ userName }}</span>
      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  title: string
  subtitle?: string
  userName?: string
}>()

const emit = defineEmits<{
  (e: 'toggleSidebar'): void
}>()

const liveTime = ref('')
const liveDate = ref('')

function updateClock() {
  const now = new Date()
  liveTime.value = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  liveDate.value = now.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
/* Staggered entrance */
.anim-title {
  animation: fadeSlideRight 0.5s 0.1s cubic-bezier(0.16,1,0.3,1) both;
}
.anim-badge {
  animation: fadeSlideDown 0.5s cubic-bezier(0.16,1,0.3,1) both;
}
@keyframes fadeSlideRight {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes fadeSlideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
