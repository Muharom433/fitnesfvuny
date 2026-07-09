<template>
  <div class="space-y-5">
    <!-- Stats Row -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label"
        class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-shadow"
      >
        <div class="flex items-center justify-between mb-3">
          <div :class="['w-10 h-10 rounded-xl flex items-center justify-center text-lg', stat.iconBg]">
            <i :class="[stat.icon, stat.iconColor]"></i>
          </div>
          <span :class="['text-xs font-bold px-2 py-0.5 rounded-full', stat.badgeClass]">{{ stat.badge }}</span>
        </div>
        <p class="text-2xl font-extrabold text-primary-900">{{ stat.value }}</p>
        <p class="text-xs text-slate-400 font-medium mt-0.5">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Revenue Chart -->
      <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="font-extrabold text-primary-900">Pendapatan Bulanan</h3>
            <p class="text-slate-400 text-xs mt-0.5">Estimasi pendapatan 6 bulan terakhir</p>
          </div>
          <span class="bg-accent-50 text-accent-600 text-xs font-bold px-2.5 py-1 rounded-full border border-accent-200">2025</span>
        </div>
        <canvas id="revenueChart" height="220"></canvas>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
        <h3 class="font-extrabold text-primary-900 mb-4">Aktivitas Terbaru</h3>
        <div class="space-y-3">
          <div v-if="recentActivity.length === 0" class="text-center py-8 text-slate-300 text-xs">
            <i class="fa-solid fa-inbox text-2xl block mb-2"></i>
            Belum ada aktivitas.
          </div>
          <div v-else v-for="item in recentActivity" :key="item.id"
            class="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0"
          >
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs', item.iconBg]">
              <i :class="[item.icon, item.iconColor]"></i>
            </div>
            <div class="min-w-0">
              <p class="text-xs font-semibold text-primary-800 truncate">{{ item.name }}</p>
              <p class="text-[11px] text-slate-400">{{ item.desc }}</p>
              <p class="text-[10px] text-slate-300 mt-0.5">{{ item.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bookings Table Preview -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 class="font-extrabold text-primary-900 text-sm">Booking Terbaru</h3>
          <p class="text-slate-400 text-xs">Permintaan yang belum diproses</p>
        </div>
        <span class="bg-primary-800 text-white text-xs font-bold px-3 py-1 rounded-full">
          {{ pendingBookings.length }} Pending
        </span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-left">
              <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama</th>
              <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori</th>
              <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Harga</th>
              <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="b in pendingBookings.slice(0, 5)" :key="b.id" class="hover:bg-slate-50/60 transition-colors">
              <td class="px-6 py-3 font-semibold text-primary-900 text-xs">{{ b.name }}</td>
              <td class="px-6 py-3 text-xs text-slate-500">{{ b.category }}</td>
              <td class="px-6 py-3 text-xs font-semibold text-primary-700">Rp {{ (b.estimated_price ?? 0).toLocaleString('id-ID') }}</td>
              <td class="px-6 py-3">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">Pending</span>
              </td>
              <td class="px-6 py-3">
                <div class="flex gap-1.5">
                  <button @click="approveBooking(b.id!)" class="text-[10px] font-bold px-2.5 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">Setujui</button>
                  <button @click="cancelBooking(b.id!)" class="text-[10px] font-bold px-2.5 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">Tolak</button>
                </div>
              </td>
            </tr>
            <tr v-if="pendingBookings.length === 0">
              <td colspan="5" class="text-center py-10 text-slate-400 text-xs">Tidak ada booking pending.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAdminStore } from '@/stores/admin.store'
import { useToast } from '@/composables/useToast'

const admin = useAdminStore()
const toast = useToast()

const pendingBookings = computed(() => admin.bookings.filter(b => b.status === 'Pending'))

const stats = computed(() => [
  {
    label: 'Total Booking',
    value: admin.bookings.length,
    icon: 'fa-solid fa-clipboard-list',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    badge: 'Semua',
    badgeClass: 'bg-blue-50 text-blue-600',
  },
  {
    label: 'Booking Pending',
    value: pendingBookings.value.length,
    icon: 'fa-solid fa-hourglass-half',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    badge: 'Menunggu',
    badgeClass: 'bg-amber-50 text-amber-600',
  },
  {
    label: 'Total Pelatih',
    value: admin.trainers.length,
    icon: 'fa-solid fa-person-running',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    badge: 'Aktif',
    badgeClass: 'bg-emerald-50 text-emerald-600',
  },
  {
    label: 'Total Produk',
    value: admin.products.length,
    icon: 'fa-solid fa-bag-shopping',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
    badge: 'Item',
    badgeClass: 'bg-purple-50 text-purple-600',
  },
])

const recentActivity = computed(() =>
  admin.bookings.slice(0, 5).map((b, i) => ({
    id: b.id ?? String(i),
    name: b.name ?? '—',
    desc: `${b.category} — ${b.status_civitas}`,
    time: b.created_at ? new Date(b.created_at).toLocaleDateString('id-ID') : '—',
    icon: 'fa-solid fa-user',
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-600',
  }))
)

async function approveBooking(id: string) {
  const { error } = await admin.updateBookingStatus(id, 'Approved')
  if (!error) toast.success('Booking disetujui!')
  else toast.error('Gagal menyetujui booking.')
}

async function cancelBooking(id: string) {
  const { error } = await admin.updateBookingStatus(id, 'Cancelled')
  if (!error) toast.warning('Booking dibatalkan.')
  else toast.error('Gagal membatalkan booking.')
}

onMounted(() => {
  // Simple bar chart using Chart.js (loaded globally via CDN)
  try {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement | null
    if (!ctx || !(window as any).Chart) return
    new (window as any).Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
        datasets: [{
          label: 'Pendapatan (Rp)',
          data: [4200000, 5100000, 3800000, 6200000, 7500000, 5900000],
          backgroundColor: 'rgba(255,107,0,0.12)',
          borderColor: '#ff6b00',
          borderWidth: 2,
          borderRadius: 8,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            ticks: {
              callback: (v: number) => 'Rp' + (v / 1000000).toFixed(1) + 'jt',
              font: { size: 10 },
            },
            grid: { color: 'rgba(0,0,0,0.04)' },
          },
          x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        },
      },
    })
  } catch (e) {
    console.warn('Chart.js not loaded or error:', e)
  }
})
</script>
