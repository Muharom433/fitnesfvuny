<template>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-5">
    <!-- Left: Form Kasir Kunjungan -->
    <div class="xl:col-span-1 bg-white rounded-2xl border border-slate-200/80 shadow-card p-6">
      <h3 class="font-extrabold text-primary-900 text-sm mb-5">
        <i class="fa-solid fa-cash-register text-accent-500 mr-2"></i>Form Kunjungan & Member
      </h3>
      <form @submit.prevent="submitKasir" class="space-y-4">
        <!-- Nama Pengunjung -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Pengunjung</label>
          <input v-model="form.name" required placeholder="Nama lengkap" class="input-field" />
        </div>

        <!-- Status Civitas -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status Civitas</label>
          <select v-model="form.civitas" required class="input-field">
            <option value="">-- Pilih Status --</option>
            <option v-for="p in adminStore.pricing" :key="p.id" :value="p.id">
              {{ getCategoryLabel(p.id) }}
            </option>
          </select>
        </div>

        <!-- Identity Number (NIM / NIP) - CONDITIONAL -->
        <div v-if="form.civitas === 'student' || form.civitas === 'alumni'" class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nomor Identitas (NIM / NIP / NIDN)</label>
          <input v-model="form.identityNumber" required placeholder="Masukkan NIM / NIP Anda..." class="input-field" />
        </div>

        <!-- Kategori Akses -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kategori Akses</label>
          <select v-model="form.category" required class="input-field">
            <option value="">-- Pilih Kategori --</option>
            <option value="Member">Member (Bulanan)</option>
            <option value="Insidental">Insidental (Harian)</option>
          </select>
        </div>

        <!-- Durasi - CONDITIONAL (only for Member) -->
        <div v-if="form.category === 'Member'" class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Durasi</label>
          <select v-model="form.duration" required class="input-field">
            <option value="">-- Pilih Durasi --</option>
            <option value="1 Bulan">1 Bulan</option>
            <option value="3 Bulan">3 Bulan</option>
          </select>
        </div>

        <!-- Trainer Pilihan (Optional) -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pelatih Pilihan (Opsional)</label>
          <select v-model="form.trainerId" class="input-field">
            <option value="">Mandiri (Tanpa Pelatih)</option>
            <option v-for="t in adminStore.trainers" :key="t.id" :value="t.id">
              {{ t.name }} (+Rp {{ t.price.toLocaleString('id-ID') }})
            </option>
          </select>
        </div>

        <!-- Kelas Pilihan (Optional) -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pilih Program Kelas (Opsional)</label>
          <select v-model="form.classId" class="input-field">
            <option value="">Tanpa Kelas Tambahan</option>
            <option v-for="c in adminStore.classes" :key="c.id" :value="c.id">
              {{ c.name_id }} (+Rp {{ c.price.toLocaleString('id-ID') }})
            </option>
          </select>
        </div>

        <!-- Alat Pilihan (Optional) -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pilih Paket Alat (Opsional)</label>
          <select v-model="form.equipmentId" class="input-field">
            <option value="">Standard Access (Free)</option>
            <option v-for="e in adminStore.equipment" :key="e.id" :value="e.id">
              {{ e.name_id }} (+Rp {{ e.price.toLocaleString('id-ID') }})
            </option>
          </select>
        </div>

        <!-- Diskon Event / Khusus (Optional) -->
        <div v-if="availableCustomDiscounts.length > 0" class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Diskon Event / Khusus (Opsional)</label>
          <select v-model="form.selectedDiscountId" class="input-field">
            <option value="">-- Tanpa Diskon Event --</option>
            <option v-for="d in availableCustomDiscounts" :key="d.id" :value="d.id">
              {{ d.name }} (Diskon {{ d.percentage }}%)
            </option>
          </select>
        </div>

        <!-- Metode Bayar -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Metode Bayar</label>
          <select v-model="form.paymentMethod" required class="input-field">
            <option value="Tunai">Tunai</option>
            <option value="Transfer Bank">Transfer Bank</option>
            <option value="QRIS">QRIS</option>
          </select>
        </div>

        <!-- Bank Select (if Transfer Bank) -->
        <div v-if="form.paymentMethod === 'Transfer Bank'" class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pilih Bank</label>
          <select v-model="form.selectedBank" required class="input-field">
            <option value="">-- Pilih Bank --</option>
            <option v-for="b in bankList" :key="b.key" :value="`${b.name} (${b.number})`">
              {{ b.name }} - {{ b.number }}
            </option>
            <option v-if="bankList.length === 0" disabled>Belum ada bank diatur admin</option>
          </select>
        </div>

        <!-- Total Pembayaran Visual Card -->
        <div class="bg-[#0b1f3c] text-white rounded-2xl p-5 text-center border border-[#0d2547] shadow-lg relative overflow-hidden">
          <div class="absolute top-0 right-0 w-24 h-24 bg-accent-500/10 rounded-full blur-xl pointer-events-none"></div>
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Pembayaran</p>
          <p class="text-2xl font-black text-white mt-1.5">Rp {{ form.amount.toLocaleString('id-ID') }}</p>
        </div>

        <button type="submit" class="w-full py-3 bg-accent-500 text-white font-bold text-sm rounded-xl hover:bg-accent-600 transition-colors shadow-sm mt-2">
          <i class="fa-solid fa-circle-check mr-2"></i>Catat Kunjungan
        </button>
      </form>
    </div>

    <!-- Right: Summary + Table Log -->
    <div class="xl:col-span-2 space-y-4">
      <!-- Stats Summary -->
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center">
          <i class="fa-solid fa-users text-accent-500 text-xl mb-1"></i>
          <p class="text-2xl font-extrabold text-primary-900">{{ recStore.todayVisitors }}</p>
          <p class="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Pengunjung Hari Ini</p>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center">
          <i class="fa-solid fa-sack-dollar text-emerald-500 text-xl mb-1"></i>
          <p class="text-xl font-extrabold text-primary-900">Rp {{ recStore.todayRevenue.toLocaleString('id-ID') }}</p>
          <p class="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Pendapatan Hari Ini</p>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center">
          <i class="fa-solid fa-clock text-blue-500 text-xl mb-1"></i>
          <p class="text-xl font-extrabold text-primary-900">{{ liveTime }}</p>
          <p class="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Waktu Sekarang</p>
        </div>
      </div>

      <!-- Log Kunjungan Hari Ini Card -->
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 class="font-extrabold text-primary-900 text-sm">Log Kunjungan Hari Ini</h3>
          <div class="flex items-center gap-2">
            <span class="bg-primary-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              {{ todayTransactions.length }} Tiket
            </span>
            <button @click="triggerPrintRekap" class="flex items-center gap-1.5 px-3 py-1.5 border border-primary-200 text-primary-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">
              <i class="fa-solid fa-print"></i> Cetak Rekap
            </button>
          </div>
        </div>

        <!-- Table Kunjungan -->
        <div class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead>
              <tr class="bg-slate-50 text-left">
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">#</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Nama</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Kategori</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Durasi</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Pelatih</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Kelas</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Alat</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Harga</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Metode</th>
                <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Waktu</th>
                <th class="px-4 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="(tx, index) in todayTransactions" :key="tx.id" class="hover:bg-slate-50/60 transition-colors">
                <td class="px-4 py-3 font-semibold text-slate-400">{{ index + 1 }}</td>
                <td class="px-4 py-3 font-bold text-primary-900">{{ tx.name }}</td>
                <td class="px-4 py-3">
                  <span :class="[
                    'text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase',
                    tx.category === 'Member' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                  ]">
                    {{ tx.category }}
                  </span>
                </td>
                <td class="px-4 py-3 text-slate-500">{{ tx.duration || '-' }}</td>
                <td class="px-4 py-3 text-slate-500 truncate max-w-[100px]">{{ tx.trainer || '-' }}</td>
                <td class="px-4 py-3 text-slate-500 truncate max-w-[100px]">{{ tx.kelas || '-' }}</td>
                <td class="px-4 py-3 text-slate-500 truncate max-w-[100px]">{{ tx.alat || '-' }}</td>
                <td class="px-4 py-3 font-bold text-primary-900">Rp {{ tx.amount.toLocaleString('id-ID') }}</td>
                <td class="px-4 py-3 text-slate-600 truncate max-w-[100px]">{{ tx.paymentMethod }}</td>
                <td class="px-4 py-3 text-slate-400">{{ tx.time }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center justify-center gap-2">
                    <button v-if="tx.category === 'Member'" @click="openCardModal(tx)" class="flex items-center gap-1 text-[10px] font-bold px-2 py-1 border border-accent-500 text-accent-500 rounded-lg hover:bg-accent-50 transition-colors">
                      <i class="fa-solid fa-address-card"></i> Cetak Kartu
                    </button>
                    <button @click="recStore.removeTransaction(tx.id)" class="text-red-400 hover:text-red-600 transition-colors p-1">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="todayTransactions.length === 0">
                <td colspan="11" class="text-center py-12 text-slate-400">
                  <i class="fa-solid fa-receipt text-3xl block mb-2 text-slate-200"></i>
                  Belum ada kunjungan hari ini.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Membership Card Preview Modal (Interactive Popup) -->
    <div v-if="showCardModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 max-w-sm w-full">
        <div class="flex justify-between items-center mb-4">
          <h4 class="font-extrabold text-sm text-primary-900">Kartu Membership</h4>
          <button @click="showCardModal = false" class="text-slate-400 hover:text-slate-700">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <!-- The Membership Card (Visual Mockup) -->
        <div id="visual-member-card" class="bg-gradient-to-br from-primary-900 to-primary-950 text-white rounded-2xl p-5 shadow-lg relative border border-primary-800 flex flex-col justify-between overflow-hidden" style="aspect-ratio: 85/55; width: 100%;">
          <!-- Card Decorative Wave -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <!-- Card Top -->
          <div class="flex items-center justify-between pb-2 border-b border-white/10">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-dumbbell text-accent-500 text-lg"></i>
              <div>
                <h5 class="text-[11px] font-extrabold tracking-wider leading-none">FITNESS CENTER</h5>
                <span class="text-[8px] font-bold text-accent-500 leading-none">FAKULTAS VOKASI UNY</span>
              </div>
            </div>
            <span class="text-[8px] bg-accent-500/20 text-accent-400 px-2 py-0.5 rounded border border-accent-500/30 uppercase tracking-widest font-extrabold">MEMBER</span>
          </div>

          <!-- Card Content -->
          <div class="flex gap-4 my-2.5 items-center">
            <!-- Left: Avatar Photo -->
            <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 flex-shrink-0">
              <i class="fa-solid fa-user text-2xl text-accent-500"></i>
            </div>
            <!-- Right: Details -->
            <div class="min-w-0 space-y-0.5">
              <p class="text-xs font-extrabold uppercase truncate text-white leading-tight">{{ activeCard?.name }}</p>
              <p class="text-[8px] text-slate-300 font-bold uppercase">{{ activeCard?.civitas }}</p>
              <p v-if="activeCard?.nim" class="text-[9px] font-mono text-accent-500 tracking-wider">ID: {{ activeCard?.nim }}</p>
              <p v-else class="text-[9px] font-mono text-accent-500 tracking-wider">ID: MEM-{{ activeCard?.id.slice(-5) }}</p>
            </div>
          </div>

          <!-- Card Bottom -->
          <div class="flex items-end justify-between pt-1 border-t border-white/10">
            <div class="space-y-0.5">
              <p class="text-[7px] text-slate-400 uppercase tracking-wider font-bold">Masa Berlaku</p>
              <p class="text-[9px] font-extrabold text-white">{{ activeCardExpiry }}</p>
            </div>
            <!-- Dummy Barcode -->
            <div class="flex flex-col items-center">
              <div class="flex gap-0.5 h-4 items-center bg-white/10 px-1 rounded">
                <div v-for="w in [1,2,1,3,1,2,1,1,2,1]" :key="w" :class="['bg-white h-3', w === 1 ? 'w-[0.5px]' : w === 2 ? 'w-[1px]' : 'w-[2px]']"></div>
              </div>
              <span class="text-[6px] font-mono mt-0.5 text-slate-400">UNY-GYM-{{ activeCard?.id.slice(-4) }}</span>
            </div>
          </div>
        </div>

        <button @click="triggerPrintCard" class="w-full mt-5 py-2.5 bg-accent-500 text-white font-bold text-xs rounded-xl hover:bg-accent-600 transition-colors shadow-lg shadow-accent-500/25 flex items-center justify-center gap-1.5">
          <i class="fa-solid fa-print"></i> Cetak Kartu Fisik
        </button>
      </div>
    </div>
  </div>

  <!-- Hidden Print Layout Container (Activated only on Ctrl+P or window.print()) -->
  <div id="print-container" class="hidden print:block font-sans text-black bg-white">
    <!-- Card Print Layout -->
    <div v-if="printType === 'card' && activeCard" class="w-[85mm] h-[55mm] border border-slate-300 rounded-xl p-5 bg-slate-900 text-white relative flex flex-col justify-between overflow-hidden mx-auto my-12" style="page-break-inside: avoid;">
      <div class="flex items-center justify-between pb-2 border-b border-white/20">
        <div class="flex items-center gap-2">
          <span class="text-xs font-black tracking-wider leading-none">FITNESS CENTER</span>
          <span class="text-[7px] font-bold text-orange-400">FV UNY</span>
        </div>
        <span class="text-[8px] bg-orange-500 text-white px-2 py-0.5 rounded font-black tracking-widest uppercase">MEMBER</span>
      </div>

      <div class="flex gap-4 my-auto items-center">
        <div class="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
          <span class="text-3xl text-orange-400">&#x1F464;</span>
        </div>
        <div class="space-y-0.5">
          <p class="text-sm font-extrabold uppercase leading-tight text-white">{{ activeCard.name }}</p>
          <p class="text-[8px] text-slate-300 font-bold uppercase">{{ activeCard.civitas }}</p>
          <p v-if="activeCard.nim" class="text-[9px] font-mono text-orange-400 tracking-wider">ID: {{ activeCard.nim }}</p>
          <p v-else class="text-[9px] font-mono text-orange-400 tracking-wider">ID: MEM-{{ activeCard.id.slice(-5) }}</p>
        </div>
      </div>

      <div class="flex items-end justify-between pt-1 border-t border-white/20">
        <div class="space-y-0.5">
          <p class="text-[7px] text-slate-400 uppercase tracking-wider font-bold">Masa Berlaku</p>
          <p class="text-[9px] font-extrabold text-white">{{ activeCardExpiry }}</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="flex gap-0.5 h-4 items-center bg-white/20 px-1 rounded">
            <div v-for="w in [1,2,1,3,1,2,1,1,2,1]" :key="w" :class="['bg-white h-3', w === 1 ? 'w-[0.5px]' : w === 2 ? 'w-[1px]' : 'w-[2px]']"></div>
          </div>
          <span class="text-[6px] font-mono mt-0.5 text-slate-400">UNY-GYM-{{ activeCard.id.slice(-4) }}</span>
        </div>
      </div>
    </div>

    <!-- Rekap Print Layout -->
    <div v-if="printType === 'rekap'" class="p-8 space-y-6">
      <div class="text-center pb-4 border-b-2 border-slate-800">
        <h2 class="text-xl font-black tracking-wide uppercase">FITNESS CENTER FAKULTAS VOKASI UNY</h2>
        <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Laporan Rekap Kunjungan & Penjualan Tiket Harian</p>
        <p class="text-xs text-slate-400 mt-1">Tanggal: {{ new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
      </div>

      <!-- Summary Stats -->
      <div class="grid grid-cols-2 gap-4 pb-4">
        <div class="border border-slate-200 rounded-xl p-4 text-center">
          <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Pengunjung</p>
          <p class="text-2xl font-black text-slate-900 mt-1">{{ recStore.todayVisitors }} Orang</p>
        </div>
        <div class="border border-slate-200 rounded-xl p-4 text-center">
          <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Pendapatan Tiket</p>
          <p class="text-2xl font-black text-slate-900 mt-1">Rp {{ recStore.todayRevenue.toLocaleString('id-ID') }}</p>
        </div>
      </div>

      <!-- Table Logs -->
      <table class="w-full text-xs border-collapse">
        <thead>
          <tr class="border-b-2 border-slate-800 text-left bg-slate-50">
            <th class="py-2.5 px-2 font-bold uppercase">No</th>
            <th class="py-2.5 px-2 font-bold uppercase">Nama</th>
            <th class="py-2.5 px-2 font-bold uppercase">Civitas</th>
            <th class="py-2.5 px-2 font-bold uppercase">Kategori</th>
            <th class="py-2.5 px-2 font-bold uppercase">Durasi</th>
            <th class="py-2.5 px-2 font-bold uppercase">Harga</th>
            <th class="py-2.5 px-2 font-bold uppercase">Metode</th>
            <th class="py-2.5 px-2 font-bold uppercase">Waktu</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-for="(tx, idx) in todayTransactions" :key="tx.id">
            <td class="py-2 px-2 text-slate-400 font-semibold">{{ idx + 1 }}</td>
            <td class="py-2 px-2 font-bold">{{ tx.name }}</td>
            <td class="py-2 px-2 text-slate-600">{{ tx.civitas }}</td>
            <td class="py-2 px-2 font-bold text-slate-800">{{ tx.category }}</td>
            <td class="py-2 px-2 text-slate-500">{{ tx.duration || '-' }}</td>
            <td class="py-2 px-2 font-bold text-slate-900">Rp {{ tx.amount.toLocaleString('id-ID') }}</td>
            <td class="py-2 px-2 text-slate-600">{{ tx.paymentMethod }}</td>
            <td class="py-2 px-2 text-slate-500">{{ tx.time }}</td>
          </tr>
          <tr v-if="todayTransactions.length === 0">
            <td colspan="8" class="text-center py-6 text-slate-400">Tidak ada transaksi terdaftar hari ini.</td>
          </tr>
        </tbody>
      </table>

      <!-- Signatures -->
      <div class="pt-12 flex justify-end">
        <div class="text-center w-48 space-y-12">
          <p class="text-xs font-bold uppercase">Petugas Resepsionis</p>
          <div class="h-[2px] bg-slate-800 w-full"></div>
          <p class="text-[10px] text-slate-400 font-medium">FV UNY Fitness Center</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useReceptionistStore } from '@/stores/receptionist.store'
import { useAdminStore } from '@/stores/admin.store'
import { useToast } from '@/composables/useToast'
import type { KasirTransaction } from '@/types/booking'

const recStore = useReceptionistStore()
const adminStore = useAdminStore()
const toast = useToast()

const liveTime = ref('')
let timer: ReturnType<typeof setInterval>

const showCardModal = ref(false)
const activeCard = ref<KasirTransaction | null>(null)
const printType = ref<'card' | 'rekap'>('card')

const bankList = ref<{ key: string; name: string; number: string }[]>([])

const form = reactive({
  name: '',
  phone: '',
  civitas: '',
  identityNumber: '',
  category: '',
  duration: '',
  trainerId: '',
  classId: '',
  equipmentId: '',
  paymentMethod: 'Tunai',
  selectedBank: '',
  amount: 0,
  selectedDiscountId: '',
})

const discountsConfig = ref<any>(null)

const availableCustomDiscounts = computed(() => {
  if (!form.civitas || !discountsConfig.value) return []
  return discountsConfig.value[form.civitas]?.custom || []
})

// Reset selected discount when civitas changes
watch(() => form.civitas, () => {
  form.selectedDiscountId = ''
})

// Fetch all resources on mount
onMounted(() => {
  adminStore.fetchAll()
  liveTime.value = new Date().toLocaleTimeString('id-ID')
  timer = setInterval(() => {
    liveTime.value = new Date().toLocaleTimeString('id-ID')
  }, 1000)

  // Load banks list
  const stored = localStorage.getItem('fit_uny_banks')
  if (stored) {
    try {
      bankList.value = JSON.parse(stored)
    } catch {
      bankList.value = []
    }
  }

  // Load discounts list
  const storedDisc = localStorage.getItem('fit_uny_discounts')
  if (storedDisc) {
    try {
      discountsConfig.value = JSON.parse(storedDisc)
    } catch {
      discountsConfig.value = null
    }
  }
})

onUnmounted(() => clearInterval(timer))

const today = computed(() => new Date().toISOString().split('T')[0])
const todayTransactions = computed(() =>
  recStore.transactions.filter(t => t.date === today.value && t.type === 'visit')
)

// Computed expiry date for member card
const activeCardExpiry = computed(() => {
  if (!activeCard.value) return '—'
  const dateStr = activeCard.value.date // YYYY-MM-DD
  const parts = dateStr.split('-')
  if (parts.length < 3) return '—'
  
  const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
  const durationText = activeCard.value.duration || '1 Bulan'
  const months = Number(durationText.replace(/[^0-9]/g, '')) || 1
  
  d.setMonth(d.getMonth() + months)
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
})

// Calculate price automatically when civitas, category, duration, or optional features change
const computedAmount = computed(() => {
  if (!form.civitas || !form.category) return 0

  const pricing = adminStore.pricing.find(p => p.id === form.civitas)
  if (!pricing) return 0

  let total = 0

  // 1. Base Fee
  if (form.category === 'Insidental') {
    total += Number(pricing.incidental_fee)
  } else if (form.category === 'Member') {
    total += Number(pricing.registration_fee)
    let durKey = '1'
    if (form.duration === '3 Bulan') durKey = '3'
    
    total += Number(pricing.membership_tariffs[durKey] ?? 0)
  }

  // 2. Add-on Trainer Price
  if (form.trainerId) {
    const t = adminStore.trainers.find(tr => tr.id === form.trainerId)
    if (t) total += Number(t.price)
  }

  // 3. Add-on Class Price
  if (form.classId) {
    const c = adminStore.classes.find(cl => cl.id === form.classId)
    if (c) total += Number(c.price)
  }

  // 4. Add-on Equipment Price
  if (form.equipmentId) {
    const e = adminStore.equipment.find(eq => eq.id === form.equipmentId)
    if (e) total += Number(e.price)
  }

  // 5. Apply Discounts (Base + Custom event)
  let discountPercent = 0
  const civitasKey = form.civitas

  // A. Apply base discount if configured
  if (discountsConfig.value && discountsConfig.value[civitasKey]) {
    const baseDisc = discountsConfig.value[civitasKey]
    if (form.category === 'Member') {
      discountPercent += Number(baseDisc.member || 0)
    } else if (form.category === 'Insidental') {
      discountPercent += Number(baseDisc.incidental || 0)
    }
  }

  // B. Apply custom selected event discount if selected
  if (form.selectedDiscountId && discountsConfig.value) {
    const customList = discountsConfig.value[civitasKey]?.custom || []
    const selectedDisc = customList.find((c: any) => c.id === form.selectedDiscountId)
    if (selectedDisc) {
      discountPercent += Number(selectedDisc.percentage || 0)
    }
  }

  total = total * (1 - Math.min(discountPercent, 100) / 100)
  return Math.round(total)
})

// Watch amount update
watch(computedAmount, (newVal) => {
  form.amount = newVal
})

function submitKasir() {
  const now = new Date()
  
  // Resolve trainer, class, equipment labels
  const selectedTrainer = adminStore.trainers.find(t => t.id === form.trainerId)?.name || ''
  const selectedClass = adminStore.classes.find(c => c.id === form.classId)?.name_id || ''
  const selectedEquipment = adminStore.equipment.find(e => e.id === form.equipmentId)?.name_id || ''

  const finalMethod = form.paymentMethod === 'Transfer Bank' && form.selectedBank
    ? `Transfer Bank - ${form.selectedBank}`
    : form.paymentMethod

  const tx: KasirTransaction = {
    id: Date.now().toString(),
    date: now.toISOString().split('T')[0],
    time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    name: form.name,
    phone: '-',
    civitas: getCategoryLabel(form.civitas),
    category: form.category,
    duration: form.category === 'Member' ? form.duration : '',
    trainer: selectedTrainer,
    kelas: selectedClass,
    alat: selectedEquipment,
    nim: (form.civitas === 'student' || form.civitas === 'alumni') ? form.identityNumber : '',
    amount: form.amount,
    paymentMethod: finalMethod,
    status: 'Lunas',
    type: 'visit',
  }

  recStore.addTransaction(tx)
  toast.success(`Kunjungan ${form.name} berhasil dicatat!`)
  
  // Reset form
  Object.assign(form, {
    name: '',
    phone: '',
    civitas: '',
    identityNumber: '',
    category: '',
    duration: '',
    trainerId: '',
    classId: '',
    equipmentId: '',
    paymentMethod: 'Tunai',
    selectedBank: '',
    amount: 0,
    selectedDiscountId: '',
  })
}

function getCategoryLabel(id?: string) {
  if (!id) return ''
  if (id === 'student') return 'UNY (Mahasiswa, Tendik/Dosen)'
  if (id === 'alumni') return 'Alumni UNY'
  if (id === 'public') return 'Masyarakat Umum'
  return id.replace(/_/g, ' ').toUpperCase()
}

function openCardModal(tx: KasirTransaction) {
  activeCard.value = tx
  showCardModal.value = true
}

function triggerPrintCard() {
  printType.value = 'card'
  setTimeout(() => {
    window.print()
  }, 100)
}

function triggerPrintRekap() {
  printType.value = 'rekap'
  setTimeout(() => {
    window.print()
  }, 100)
}
</script>

<style>
/* CSS Scoped Media Query for standard print pages */
@media print {
  body > * {
    display: none !important;
  }
  #print-container, #print-container * {
    display: block !important;
  }
  #print-container {
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    background: white !important;
    color: black !important;
  }
}
</style>
