<template>
  <div class="flex min-h-screen bg-slate-100">
    <!-- Sidebar -->
    <AppSidebar
      :collapsed="sidebarCollapsed"
      :active-panel="activePanel"
      :menu-sections="menuSections"
      @toggle="sidebarCollapsed = !sidebarCollapsed"
      @navigate="switchPanel"
    />

    <!-- Main content — shifts right when sidebar is open on desktop -->
    <div
      :class="[
        'flex-1 flex flex-col min-w-0 transition-all duration-300 overflow-x-hidden',
        sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-[min(270px,85vw)]',
      ]"
    >
      <AppHeader
        title="Dashboard Admin"
        :subtitle="panelLabel"
        :user-name="auth.currentUser?.name"
        @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed"
      />

      <!-- Panel Content -->
      <main class="flex-1 p-4 md:p-6 overflow-y-auto">
        <Transition name="panel-fade" mode="out-in">
          <div :key="activePanel">
            <DashboardPanel v-if="activePanel === 'dashboard'" />
            <RegistrationsPanel v-else-if="activePanel === 'registrations'" />
            <FinancePanel v-else-if="activePanel === 'finance'" />
            <MembersPanel v-else-if="activePanel === 'members'" />
            <TrainersPanel v-else-if="activePanel === 'trainers'" />
            <ClassesPanel v-else-if="activePanel === 'classes'" />
            <EquipmentPanel v-else-if="activePanel === 'equipment'" />
            <ProductsPanel v-else-if="activePanel === 'products'" />
            <DiscountsPanel v-else-if="activePanel === 'discounts'" />
            <InfoBiayaPanel v-else-if="activePanel === 'content'" />
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
import { useAdminStore } from '@/stores/admin.store'
import AppSidebar from '@/components/common/AppSidebar.vue'
import AppHeader from '@/components/common/AppHeader.vue'
import AppToast from '@/components/common/AppToast.vue'
import { supabase } from '@/lib/supabase'

// Panel components
import DashboardPanel from '@/components/admin/DashboardPanel.vue'
import RegistrationsPanel from '@/components/admin/RegistrationsPanel.vue'
import FinancePanel from '@/components/admin/FinancePanel.vue'
import MembersPanel from '@/components/admin/MembersPanel.vue'
import TrainersPanel from '@/components/admin/TrainersPanel.vue'
import ClassesPanel from '@/components/admin/ClassesPanel.vue'
import EquipmentPanel from '@/components/admin/EquipmentPanel.vue'
import ProductsPanel from '@/components/admin/ProductsPanel.vue'
import DiscountsPanel from '@/components/admin/DiscountsPanel.vue'
import InfoBiayaPanel from '@/components/admin/InfoBiayaPanel.vue'

const auth = useAuthStore()
const adminStore = useAdminStore()

const sidebarCollapsed = ref(false)
const activePanel = ref('dashboard')

const panelLabelMap: Record<string, string> = {
  dashboard: 'Overview & Statistik',
  registrations: 'Log Pendaftaran & Booking',
  finance: 'Laporan Keuangan',
  members: 'Kelola User & Member',
  trainers: 'Kelola Pelatih',
  classes: 'Kelola Kelas',
  equipment: 'Kelola Alat',
  products: 'Kelola Produk',
  discounts: 'Pengaturan Diskon',
  content: 'Biaya Gym & Metode Pembayaran',
}
const panelLabel = computed(() => panelLabelMap[activePanel.value] ?? '')

function switchPanel(id: string) {
  activePanel.value = id
  // Collapse sidebar on mobile
  if (window.innerWidth < 1024) {
    sidebarCollapsed.value = true
  }
}

const menuSections = [
  {
    label: 'Menu Utama',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-chart-pie' },
      { id: 'registrations', label: 'Registrasi & Booking', icon: 'fa-solid fa-clipboard-list' },
      { id: 'finance', label: 'Keuangan', icon: 'fa-solid fa-sack-dollar' },
      { id: 'members', label: 'Kelola User & Member', icon: 'fa-solid fa-users' },
    ],
  },
  {
    label: 'Fasilitas',
    items: [
      { id: 'trainers', label: 'Pelatih', icon: 'fa-solid fa-person-running' },
      { id: 'classes', label: 'Kelas Grup', icon: 'fa-solid fa-people-group' },
      { id: 'equipment', label: 'Alat', icon: 'fa-solid fa-dumbbell' },
      { id: 'products', label: 'Produk', icon: 'fa-solid fa-bag-shopping' },
    ],
  },
  {
    label: 'Pengaturan',
    items: [
      { id: 'discounts', label: 'Diskon', icon: 'fa-solid fa-tag' },
      { id: 'content', label: 'Biaya Gym & Metode Pembayaran', icon: 'fa-solid fa-circle-info' },
    ],
  },
]

let realtimeChannel: any = null

onMounted(() => {
  adminStore.fetchAll()

  // Setup Supabase Realtime channel for all relevant tables
  realtimeChannel = supabase
    .channel('admin-realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => adminStore.fetchAll())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => adminStore.fetchAll())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'trainers' }, () => adminStore.fetchAll())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'classes' }, () => adminStore.fetchAll())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'equipment' }, () => adminStore.fetchAll())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => adminStore.fetchAll())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'pricing' }, () => adminStore.fetchAll())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'kasir_transactions' }, () => adminStore.fetchAll())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'product_sales' }, () => adminStore.fetchAll())
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
.panel-fade-leave-active {
  transition: all 0.25s ease;
}
.panel-fade-enter-from,
.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
