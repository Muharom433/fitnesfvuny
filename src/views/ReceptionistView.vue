<template>
  <div class="flex min-h-screen bg-slate-100">
    <AppSidebar
      :collapsed="sidebarCollapsed"
      :active-panel="activePanel"
      :menu-sections="menuSections"
      @toggle="sidebarCollapsed = !sidebarCollapsed"
      @navigate="switchPanel"
    />

    <div
      :class="[
        'flex-1 flex flex-col min-w-0 transition-all duration-300 overflow-x-hidden',
        sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-[min(270px,85vw)]',
      ]"
    >
      <AppHeader
        title="Kasir Resepsionis"
        :subtitle="panelLabel"
        :user-name="auth.currentUser?.name"
        @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed"
      />

      <main class="flex-1 p-4 md:p-6 overflow-y-auto">
        <Transition name="panel-fade" mode="out-in">
          <div :key="activePanel">
            <KasirPanel v-if="activePanel === 'kasir'" />
            <TokenMembershipPanel
              v-else-if="activePanel === 'token-membership'"
              @checkin-success="handleCheckinSuccess"
            />
            <BookingPanel v-else-if="activePanel === 'booking'" />
            <ProductSalesPanel v-else-if="activePanel === 'products'" />
            <MemberInfoPanel
              v-else-if="activePanel === 'member-info'"
              :initial-token="checkedInToken"
            />
            <ReportsPanel v-else-if="activePanel === 'reports'" />
          </div>
        </Transition>
      </main>
    </div>

    <AppToast />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useReceptionistStore } from '@/stores/receptionist.store'
import AppSidebar from '@/components/common/AppSidebar.vue'
import AppHeader from '@/components/common/AppHeader.vue'
import AppToast from '@/components/common/AppToast.vue'
import { supabase } from '@/lib/supabase'

import KasirPanel from '@/components/receptionist/KasirPanel.vue'
import TokenMembershipPanel from '@/components/receptionist/TokenMembershipPanel.vue'
import BookingPanel from '@/components/receptionist/BookingPanel.vue'
import ProductSalesPanel from '@/components/receptionist/ProductSalesPanel.vue'
import MemberInfoPanel from '@/components/receptionist/MemberInfoPanel.vue'
import ReportsPanel from '@/components/receptionist/ReportsPanel.vue'

import { useAdminStore } from '@/stores/admin.store'

const auth = useAuthStore()
const recStore = useReceptionistStore()
const adminStore = useAdminStore()

const sidebarCollapsed = ref(false)
const activePanel = ref('kasir')
const checkedInToken = ref('')

const panelLabelMap: Record<string, string> = {
  kasir: 'Kasir Kunjungan Harian',
  'token-membership': 'Token Membership',
  booking: 'Booking & Jadwal',
  products: 'Kasir Produk',
  'member-info': 'Informasi Membership',
  reports: 'Kas & Laporan Rekapan',
}
const panelLabel = computed(() => panelLabelMap[activePanel.value] ?? '')

function switchPanel(id: string) {
  activePanel.value = id
  if (window.innerWidth < 1024) sidebarCollapsed.value = true
}

function handleCheckinSuccess(token: string) {
  checkedInToken.value = token
  switchPanel('member-info')
}

const menuSections = [
  {
    label: 'Menu Utama',
    items: [
      { id: 'kasir', label: 'Kasir Kunjungan', icon: 'fa-solid fa-cash-register' },
      { id: 'token-membership', label: 'Token Membership', icon: 'fa-solid fa-key' },
      { id: 'booking', label: 'Booking & Jadwal', icon: 'fa-solid fa-calendar-check' },
      { id: 'products', label: 'Kasir Produk', icon: 'fa-solid fa-bag-shopping' },
    ],
  },
  {
    label: 'Laporan',
    items: [
      { id: 'reports', label: 'Kas & Laporan Rekapan', icon: 'fa-solid fa-chart-line' },
    ],
  },
]

let realtimeChannel: any = null

onMounted(() => {
  recStore.loadFromLocalStorage()
  adminStore.fetchAll()

  // Realtime updates when bookings or pricing configurations are updated
  realtimeChannel = supabase
    .channel('receptionist-realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
      recStore.fetchBookings()
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'pricing' }, () => {
      adminStore.fetchAll()
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'trainers' }, () => {
      adminStore.fetchAll()
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'classes' }, () => {
      adminStore.fetchAll()
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'equipment' }, () => {
      adminStore.fetchAll()
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
      adminStore.fetchAll()
    })
    .subscribe()
})

onUnmounted(() => {
  if (realtimeChannel) {
    supabase.removeChannel(realtimeChannel)
  }
})
</script>

<style scoped>
.panel-fade-enter-active,
.panel-fade-leave-active { transition: all 0.25s ease; }
.panel-fade-enter-from,
.panel-fade-leave-to { opacity: 0; transform: translateY(8px); }
</style>
