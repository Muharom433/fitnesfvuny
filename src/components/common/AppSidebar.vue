<template>
  <!-- Sidebar -->
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out',
      collapsed ? 'w-0 overflow-hidden' : 'w-[min(270px,85vw)]',
    ]"
  >
    <div class="flex flex-col h-full overflow-y-auto overflow-x-hidden">
      <!-- Brand -->
      <div class="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
        <img src="/assets/logo.png" alt="Logo" class="w-10 h-10 object-contain flex-shrink-0" />
        <div class="flex flex-col leading-tight">
          <span class="text-primary-900 font-extrabold text-sm tracking-wide">FITNESS CENTER</span>
          <span class="text-accent-500 font-extrabold text-sm tracking-wide">FV UNY</span>
        </div>
      </div>

      <!-- User Info -->
      <div class="mx-4 my-4 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-accent-50 border border-accent-100 flex items-center justify-center flex-shrink-0">
            <i class="fa-solid fa-user text-accent-500 text-sm"></i>
          </div>
          <div class="min-w-0">
            <p class="text-primary-900 font-bold text-xs truncate">{{ auth.currentUser?.name ?? '—' }}</p>
            <p class="text-accent-600 text-[10px] font-bold uppercase tracking-widest truncate">{{ roleLabel }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Slot -->
      <nav class="flex-1 px-3 py-2 space-y-1">
        <template v-for="section in menuSections" :key="section.label">
          <p class="text-slate-400 text-[10px] font-bold uppercase tracking-[2px] px-3 pt-4 pb-2">{{ section.label }}</p>
          <button
            v-for="item in section.items"
            :key="item.id"
            @click="emit('navigate', item.id)"
            :class="[
              'w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold transition-all duration-200 text-left',
              activePanel === item.id
                ? 'bg-accent-50 text-accent-600 border-l-4 border-accent-500 rounded-r-lg'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg',
            ]"
          >
            <i :class="['w-5 text-center text-base', item.icon, activePanel === item.id ? 'text-accent-500' : 'text-slate-400']"></i>
            <span class="truncate">{{ item.label }}</span>
          </button>
        </template>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-slate-100 mt-auto">
        <button
          @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-extrabold text-white bg-accent-500 hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/25 transition-all duration-200"
        >
          <i class="fa-solid fa-right-from-bracket"></i>
          LOGOUT
        </button>
      </div>
    </div>
  </aside>

  <!-- Overlay for mobile -->
  <Transition name="fade">
    <div
      v-if="!collapsed"
      class="fixed inset-0 z-30 bg-black/50 lg:hidden"
      @click="emit('toggle')"
    ></div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'

interface MenuItem {
  id: string
  label: string
  icon: string
}
interface MenuSection {
  label: string
  items: MenuItem[]
}

defineProps<{
  collapsed: boolean
  activePanel: string
  menuSections: MenuSection[]
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'navigate', panelId: string): void
}>()

const auth = useAuthStore()
const router = useRouter()

const roleLabel = computed(() => {
  if (auth.role === 'admin') return 'Administrator'
  if (auth.role === 'receptionist') return 'Resepsionis'
  return auth.role ?? ''
})

async function handleLogout() {
  await auth.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
