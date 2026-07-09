<template>
  <div class="space-y-5">
    <h2 class="text-lg font-extrabold text-primary-900">Laporan Keuangan</h2>

    <!-- Summary cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center">
        <i class="fa-solid fa-sack-dollar text-2xl text-emerald-400 mb-2"></i>
        <p class="text-2xl font-extrabold text-primary-900">Rp {{ totalRevenue.toLocaleString('id-ID') }}</p>
        <p class="text-xs text-slate-400 font-medium mt-1">Total Estimasi Pendapatan</p>
      </div>
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center">
        <i class="fa-solid fa-circle-check text-2xl text-blue-400 mb-2"></i>
        <p class="text-2xl font-extrabold text-primary-900">{{ approvedCount }}</p>
        <p class="text-xs text-slate-400 font-medium mt-1">Booking Approved</p>
      </div>
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center">
        <i class="fa-solid fa-users text-2xl text-accent-500 mb-2"></i>
        <p class="text-2xl font-extrabold text-primary-900">{{ admin.bookings.length }}</p>
        <p class="text-xs text-slate-400 font-medium mt-1">Total Transaksi</p>
      </div>
    </div>

    <!-- Chart -->
    <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
      <h3 class="font-extrabold text-primary-900 mb-4">Pendapatan per Kategori</h3>
      <canvas id="financeChart" height="180"></canvas>
    </div>

    <!-- Approved bookings table -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100">
        <h3 class="font-extrabold text-primary-900 text-sm">Transaksi Approved</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="bg-slate-50">
              <th class="px-5 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Nama</th>
              <th class="px-5 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Kategori</th>
              <th class="px-5 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Pendapatan</th>
              <th class="px-5 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Tanggal</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="b in approvedBookings" :key="b.id" class="hover:bg-slate-50/60">
              <td class="px-5 py-3 font-semibold text-primary-900">{{ b.name }}</td>
              <td class="px-5 py-3 text-slate-500">{{ b.category }}</td>
              <td class="px-5 py-3 font-bold text-emerald-600">Rp {{ (b.estimated_price ?? 0).toLocaleString('id-ID') }}</td>
              <td class="px-5 py-3 text-slate-400">{{ b.created_at ? new Date(b.created_at).toLocaleDateString('id-ID') : '—' }}</td>
            </tr>
            <tr v-if="approvedBookings.length === 0">
              <td colspan="4" class="text-center py-10 text-slate-400">Belum ada transaksi approved.</td>
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

const admin = useAdminStore()

const approvedBookings = computed(() => admin.bookings.filter(b => b.status === 'Approved'))
const approvedCount = computed(() => approvedBookings.value.length)
const totalRevenue = computed(() =>
  approvedBookings.value.reduce((sum, b) => sum + (b.estimated_price ?? 0), 0)
)

onMounted(() => {
  const ctx = document.getElementById('financeChart') as HTMLCanvasElement
  if (!ctx || !(window as any).Chart) return
  const categories = ['Member', 'Insidental']
  const data = categories.map(cat =>
    approvedBookings.value.filter(b => b.category === cat).reduce((s, b) => s + (b.estimated_price ?? 0), 0)
  )
  new (window as any).Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: categories,
      datasets: [{ data, backgroundColor: ['#ff6b00', '#0a2540'], borderWidth: 0 }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: { callbacks: { label: (c: any) => 'Rp ' + c.parsed.toLocaleString('id-ID') } },
      },
    },
  })
})
</script>
