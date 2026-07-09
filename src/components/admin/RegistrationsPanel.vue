<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-extrabold text-primary-900">Registrasi & Booking</h2>
        <p class="text-slate-400 text-xs mt-0.5">Semua log pendaftaran dan booking anggota</p>
      </div>
      <!-- Filter -->
      <div class="flex gap-2">
        <select v-model="statusFilter" class="text-xs border border-slate-200 rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-accent-500/30">
          <option value="">Semua Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-left">
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama</th>
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Civitas</th>
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kategori</th>
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Harga</th>
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Waktu</th>
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th class="px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="b in filteredBookings" :key="b.id" class="hover:bg-slate-50/60 transition-colors">
              <td class="px-5 py-3 font-semibold text-primary-900 text-xs">{{ b.name }}</td>
              <td class="px-5 py-3 text-xs text-slate-500">{{ b.status_civitas }}</td>
              <td class="px-5 py-3 text-xs text-slate-500">{{ b.category }}</td>
              <td class="px-5 py-3 text-xs font-semibold text-primary-700">Rp {{ (b.estimated_price ?? 0).toLocaleString('id-ID') }}</td>
              <td class="px-5 py-3 text-xs text-slate-400">{{ b.preferred_time }}</td>
              <td class="px-5 py-3">
                <span :class="['text-[10px] font-bold px-2.5 py-0.5 rounded-full border', statusClass(b.status)]">
                  {{ b.status }}
                </span>
              </td>
              <td class="px-5 py-3">
                <div class="flex gap-1.5" v-if="b.status === 'Pending'">
                  <button @click="approve(b.id!)" class="text-[10px] font-bold px-2.5 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">✓</button>
                  <button @click="cancel(b.id!)" class="text-[10px] font-bold px-2.5 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">✕</button>
                </div>
                <span v-else class="text-slate-300 text-xs">—</span>
              </td>
            </tr>
            <tr v-if="filteredBookings.length === 0">
              <td colspan="7" class="text-center py-12 text-slate-400 text-xs">
                <i class="fa-solid fa-inbox text-2xl block mb-2 text-slate-200"></i>
                Tidak ada data ditemukan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAdminStore } from '@/stores/admin.store'
import { useToast } from '@/composables/useToast'

const admin = useAdminStore()
const toast = useToast()
const statusFilter = ref('')

const filteredBookings = computed(() => {
  const f = statusFilter.value
  return f ? admin.bookings.filter(b => b.status === f) : admin.bookings
})

function statusClass(status: string) {
  switch (status) {
    case 'Approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'Cancelled': return 'bg-red-50 text-red-600 border-red-200'
    default: return 'bg-amber-50 text-amber-600 border-amber-200'
  }
}

async function approve(id: string) {
  const { error } = await admin.updateBookingStatus(id, 'Approved')
  if (!error) toast.success('Booking disetujui!')
  else toast.error('Gagal memperbarui booking.')
}
async function cancel(id: string) {
  const { error } = await admin.updateBookingStatus(id, 'Cancelled')
  if (!error) toast.warning('Booking dibatalkan.')
  else toast.error('Gagal memperbarui booking.')
}
</script>
