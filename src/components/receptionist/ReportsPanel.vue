<template>
  <div class="space-y-5">
    <h2 class="text-lg font-extrabold text-primary-900">Laporan Keuangan & Statistik</h2>

    <!-- Top Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Card 1 -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center">
        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pemasukan Member/Insidental</p>
        <p class="text-xl font-extrabold text-primary-900 mt-2">Rp {{ visitRevenue.toLocaleString('id-ID') }}</p>
      </div>
      <!-- Card 2 -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center">
        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pemasukan Produk</p>
        <p class="text-xl font-extrabold text-primary-900 mt-2">Rp {{ productRevenue.toLocaleString('id-ID') }}</p>
      </div>
      <!-- Card 3 -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center bg-accent-50/10 border-accent-200/60">
        <p class="text-[10px] text-accent-600 font-bold uppercase tracking-wider">Total Pendapatan</p>
        <p class="text-xl font-extrabold text-accent-600 mt-2">Rp {{ (visitRevenue + productRevenue).toLocaleString('id-ID') }}</p>
      </div>
      <!-- Card 4 -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card text-center">
        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Produk Terjual</p>
        <p class="text-xl font-extrabold text-primary-900 mt-2">{{ totalProductsSold }} unit</p>
      </div>
    </div>

    <!-- Charts Row Card -->
    <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 class="font-extrabold text-primary-900 text-sm flex items-center gap-2">
            <i class="fa-solid fa-chart-line text-accent-500"></i> Grafik Tren Pemasukan
          </h3>
          <p class="text-[10px] text-slate-400 font-semibold mt-0.5">Analisis pendapatan terperinci</p>
        </div>
        <span class="bg-primary-50 text-primary-700 text-[10px] font-bold px-3 py-1 rounded-full border border-primary-200">
          7 Periode Transaksi Terakhir
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Bar Chart -->
        <div class="space-y-2">
          <h4 class="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
            <i class="fa-solid fa-chart-bar mr-1"></i> Pendapatan per Periode (Bar Chart)
          </h4>
          <div class="relative h-[220px]">
            <canvas id="barChart"></canvas>
          </div>
        </div>

        <!-- Line Chart -->
        <div class="space-y-2">
          <h4 class="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
            <i class="fa-solid fa-chart-line mr-1"></i> Tren Kumulatif Pendapatan (Line Chart)
          </h4>
          <div class="relative h-[220px]">
            <canvas id="lineChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Lists Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Left Table: Pemasukan Registrasi -->
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
            <i class="fa-solid fa-users text-xs"></i>
          </div>
          <h3 class="font-extrabold text-primary-900 text-xs uppercase tracking-wider">Pemasukan Registrasi</h3>
        </div>
        <div class="overflow-x-auto max-h-[300px] overflow-y-auto">
          <table class="w-full text-xs">
            <thead>
              <tr class="bg-slate-50 text-slate-400 font-bold">
                <th class="py-2.5 px-4 text-left uppercase">Tanggal</th>
                <th class="py-2.5 px-4 text-left uppercase">Nama</th>
                <th class="py-2.5 px-4 text-left uppercase">Kategori</th>
                <th class="py-2.5 px-4 text-right uppercase">Harga</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="t in visitTransactions" :key="t.id" class="hover:bg-slate-50/50">
                <td class="py-2.5 px-4 text-slate-400">{{ t.date }}</td>
                <td class="py-2.5 px-4 font-bold text-primary-900">{{ t.name }}</td>
                <td class="py-2.5 px-4">
                  <span :class="['px-2 py-0.5 rounded text-[9px] font-bold uppercase', t.category === 'Member' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700']">
                    {{ t.category }}
                  </span>
                </td>
                <td class="py-2.5 px-4 font-bold text-slate-800 text-right">Rp {{ t.amount.toLocaleString('id-ID') }}</td>
              </tr>
              <tr v-if="visitTransactions.length === 0">
                <td colspan="4" class="text-center py-8 text-slate-400">Belum ada data registrasi.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right Table: Pemasukan Produk -->
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
            <i class="fa-solid fa-box text-xs"></i>
          </div>
          <h3 class="font-extrabold text-primary-900 text-xs uppercase tracking-wider">Pemasukan Produk</h3>
        </div>
        <div class="overflow-x-auto max-h-[300px] overflow-y-auto">
          <table class="w-full text-xs">
            <thead>
              <tr class="bg-slate-50 text-slate-400 font-bold">
                <th class="py-2.5 px-4 text-left uppercase">Tanggal</th>
                <th class="py-2.5 px-4 text-left uppercase">Produk</th>
                <th class="py-2.5 px-4 text-center uppercase">Qty</th>
                <th class="py-2.5 px-4 text-right uppercase">Total Bayar</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="p in recStore.productSales" :key="p.id" class="hover:bg-slate-50/50">
                <td class="py-2.5 px-4 text-slate-400">{{ p.date }}</td>
                <td class="py-2.5 px-4 font-bold text-primary-900">{{ p.productName }}</td>
                <td class="py-2.5 px-4 text-center text-slate-500 font-semibold">{{ p.qty }}x</td>
                <td class="py-2.5 px-4 font-bold text-slate-800 text-right">Rp {{ p.total.toLocaleString('id-ID') }}</td>
              </tr>
              <tr v-if="recStore.productSales.length === 0">
                <td colspan="4" class="text-center py-8 text-slate-400">Belum ada data penjualan produk.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Ekspor Rekapan Excel Section -->
    <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card">
      <div class="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
        <div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
          <i class="fa-solid fa-file-excel text-sm"></i>
        </div>
        <div>
          <h3 class="font-extrabold text-primary-900 text-sm">Ekspor Rekapan Transaksi (Excel / Spreadsheet)</h3>
          <p class="text-[10px] text-slate-400 font-semibold mt-0.5">Unduh data laporan kunjungan, member, & penjualan produk untuk pembukuan</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <!-- Pilihan Periode -->
        <div class="space-y-1.5">
          <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Pilih Periode Laporan</label>
          <select v-model="exportPeriod" class="input-field bg-white text-sm font-semibold text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all cursor-pointer shadow-sm">
            <option value="harian">Laporan Harian (Per Tanggal)</option>
            <option value="bulanan">Laporan Bulanan (Per Bulan)</option>
            <option value="tahunan">Laporan Tahunan (Per Tahun)</option>
          </select>
        </div>

        <!-- Pemilih Detail (Dinamis berdasarkan Periode) -->
        <div class="space-y-1.5">
          <!-- Harian -->
          <div v-if="exportPeriod === 'harian'" class="space-y-1.5">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Pilih Tanggal</label>
            <input type="date" v-model="selectedDate" class="input-field bg-white text-sm font-semibold text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all shadow-sm" />
          </div>
          <!-- Bulanan -->
          <div v-if="exportPeriod === 'bulanan'" class="space-y-1.5">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Pilih Bulan & Tahun</label>
            <input type="month" v-model="selectedMonth" class="input-field bg-white text-sm font-semibold text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all shadow-sm" />
          </div>
          <!-- Tahunan -->
          <div v-if="exportPeriod === 'tahunan'" class="space-y-1.5">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Pilih Tahun</label>
            <select v-model="selectedYear" class="input-field bg-white text-sm font-semibold text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all cursor-pointer shadow-sm">
              <option v-for="y in yearsList" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>
        </div>

        <!-- Tombol Download -->
        <div>
          <button @click="exportToExcel" class="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/10 active:scale-[0.98] transition-all cursor-pointer h-[44px]">
            <i class="fa-solid fa-download"></i> Unduh File Excel (.xlsx)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useReceptionistStore } from '@/stores/receptionist.store'
import { useToast } from '@/composables/useToast'
import * as XLSX from 'xlsx'

const recStore = useReceptionistStore()
const toast = useToast()

const visitTransactions = computed(() =>
  recStore.transactions.filter(t => t.type === 'visit')
)

const visitRevenue = computed(() =>
  visitTransactions.value.reduce((sum, t) => sum + t.amount, 0)
)

const productRevenue = computed(() =>
  recStore.productSales.reduce((sum, p) => sum + p.total, 0)
)

const totalProductsSold = computed(() =>
  recStore.productSales.reduce((sum, p) => sum + p.qty, 0)
)

// Helper to format short date text (e.g. "30/06/2026" or "2026-06-30" -> "30 Juni")
function formatShortDate(dateStr: string) {
  const parts = dateStr.includes('-') ? dateStr.split('-') : dateStr.split('/')
  if (parts.length < 3) return dateStr

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  
  if (dateStr.includes('-')) {
    // YYYY-MM-DD
    const day = Number(parts[2])
    const month = months[Number(parts[1]) - 1]
    return `${day} ${month}`
  } else {
    // DD/MM/YYYY
    const day = Number(parts[0])
    const month = months[Number(parts[1]) - 1]
    return `${day} ${month}`
  }
}

onMounted(() => {
  // 1. Get unique dates from last 7 transaction days
  const allDates = [
    ...new Set([
      ...recStore.transactions.map(t => t.date),
      ...recStore.productSales.map(p => p.date)
    ])
  ].sort().slice(-7)

  const chartLabels = allDates.map(formatShortDate)

  // 2. Bar Chart Data
  // Dataset 1: Registrasi Member (category === 'Member')
  const memberData = allDates.map(d =>
    recStore.transactions
      .filter(t => t.date === d && t.category === 'Member')
      .reduce((s, t) => s + t.amount, 0)
  )

  // Dataset 2: Penjualan Produk
  const productData = allDates.map(d =>
    recStore.productSales
      .filter(p => p.date === d)
      .reduce((s, p) => s + p.total, 0)
  )

  // Dataset 3: Transaksi Manual / Insidental (category === 'Insidental')
  const incidentalData = allDates.map(d =>
    recStore.transactions
      .filter(t => t.date === d && t.category === 'Insidental')
      .reduce((s, t) => s + t.amount, 0)
  )

  // 3. Line Chart Data (Cumulative Total)
  let cumulativeSum = 0
  const cumulativeData = allDates.map(d => {
    const dayTotal = recStore.transactions
      .filter(t => t.date === d)
      .reduce((s, t) => s + t.amount, 0) +
      recStore.productSales
        .filter(p => p.date === d)
        .reduce((s, p) => s + p.total, 0)
    
    cumulativeSum += dayTotal
    return cumulativeSum
  })

  // Render Bar Chart
  const barCtx = document.getElementById('barChart') as HTMLCanvasElement
  if (barCtx && (window as any).Chart) {
    new (window as any).Chart(barCtx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'Registrasi Member',
            data: memberData,
            backgroundColor: '#6366f1', // Indogo / Purple
            borderRadius: 6,
          },
          {
            label: 'Penjualan Produk',
            data: productData,
            backgroundColor: '#10b981', // Green
            borderRadius: 6,
          },
          {
            label: 'Transaksi Manual',
            data: incidentalData,
            backgroundColor: '#f59e0b', // Yellow / Amber
            borderRadius: 6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 10, font: { size: 9 } }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: (v: number) => 'Rp ' + (v / 1000).toFixed(0) + 'rb',
              font: { size: 9 }
            },
            grid: { color: 'rgba(0,0,0,0.03)' }
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 9 } }
          }
        }
      }
    })
  }

  // Render Line Chart
  const lineCtx = document.getElementById('lineChart') as HTMLCanvasElement
  if (lineCtx && (window as any).Chart) {
    new (window as any).Chart(lineCtx, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'Pemasukan Kumulatif',
            data: cumulativeData,
            borderColor: '#ec4899', // Pink
            backgroundColor: 'rgba(236,72,153,0.06)',
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointBackgroundColor: '#ec4899',
            pointRadius: 4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 10, font: { size: 9 } }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: (v: number) => 'Rp ' + (v / 1000).toFixed(0) + 'rb',
              font: { size: 9 }
            },
            grid: { color: 'rgba(0,0,0,0.03)' }
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 9 } }
          }
        }
      }
    })
  }
})

// State variables for export form
const exportPeriod = ref<'harian' | 'bulanan' | 'tahunan'>('harian')
const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedMonth = ref(new Date().toISOString().slice(0, 7)) // YYYY-MM
const selectedYear = ref(new Date().getFullYear())

const yearsList = computed(() => {
  const startYear = 2024
  const currentYear = new Date().getFullYear()
  const maxYear = Math.max(currentYear, 2028)
  const list = []
  for (let y = startYear; y <= maxYear; y++) {
    list.push(y)
  }
  return list
})

// Robust helper to parse dates formatted in YYYY-MM-DD or DD/MM/YYYY
function parseDateParts(dateStr: string) {
  const separators = /[-/]/
  const parts = dateStr.split(separators)
  if (parts.length < 3) return { year: '', month: '', day: '' }
  
  if (parts[0].length === 4) {
    // YYYY-MM-DD
    return {
      year: parts[0],
      month: parts[1].padStart(2, '0'),
      day: parts[2].padStart(2, '0')
    }
  } else {
    // DD/MM/YYYY or D/M/YYYY
    return {
      year: parts[2],
      month: parts[1].padStart(2, '0'),
      day: parts[0].padStart(2, '0')
    }
  }
}

function exportToExcel() {
  let visitsToExport = []
  let productsToExport = []
  let filename = ''
  let reportPeriodLabel = ''

  if (exportPeriod.value === 'harian') {
    const targetDate = selectedDate.value
    const targetParts = parseDateParts(targetDate)
    
    visitsToExport = recStore.transactions.filter(t => {
      const p = parseDateParts(t.date)
      return p.year === targetParts.year && p.month === targetParts.month && p.day === targetParts.day && t.type === 'visit'
    })
    
    productsToExport = recStore.productSales.filter(p => {
      const pts = parseDateParts(p.date)
      return pts.year === targetParts.year && pts.month === targetParts.month && pts.day === targetParts.day
    })

    filename = `Laporan_Harian_${targetDate}.xlsx`
    reportPeriodLabel = `HARIAN - ${targetDate}`
  } else if (exportPeriod.value === 'bulanan') {
    const [year, month] = selectedMonth.value.split('-')
    
    visitsToExport = recStore.transactions.filter(t => {
      const p = parseDateParts(t.date)
      return p.year === year && p.month === month && t.type === 'visit'
    })
    
    productsToExport = recStore.productSales.filter(p => {
      const pts = parseDateParts(p.date)
      return pts.year === year && pts.month === month
    })

    filename = `Laporan_Bulanan_${year}_${month}.xlsx`
    reportPeriodLabel = `BULANAN - ${month}/${year}`
  } else {
    const targetYear = selectedYear.value.toString()
    
    visitsToExport = recStore.transactions.filter(t => {
      const p = parseDateParts(t.date)
      return p.year === targetYear && t.type === 'visit'
    })
    
    productsToExport = recStore.productSales.filter(p => {
      const pts = parseDateParts(p.date)
      return pts.year === targetYear
    })

    filename = `Laporan_Tahunan_${targetYear}.xlsx`
    reportPeriodLabel = `TAHUNAN - TAHUN ${targetYear}`
  }

  // 1. Sheet: Ringkasan
  const totalVisitRevenue = visitsToExport.reduce((sum, t) => sum + t.amount, 0)
  const totalProductRevenue = productsToExport.reduce((sum, p) => sum + p.total, 0)
  const grandTotal = totalVisitRevenue + totalProductRevenue
  const totalQtySold = productsToExport.reduce((sum, p) => sum + p.qty, 0)

  const summaryData = [
    ['FITNESS CENTER FV UNY WATES'],
    ['LAPORAN REKAPAN TRANSAKSI KEUANGAN'],
    ['================================================'],
    ['Jenis Laporan:', reportPeriodLabel],
    ['Tanggal Ekspor:', new Date().toLocaleString('id-ID')],
    ['Petugas:', 'Resepsionis Fitness Center'],
    ['================================================'],
    [],
    ['RINGKASAN TOTAL PEMASUKAN:'],
    ['------------------------------------------------'],
    ['Pemasukan Registrasi / Member:', `Rp ${totalVisitRevenue.toLocaleString('id-ID')}`],
    ['Pemasukan Penjualan Produk:', `Rp ${totalProductRevenue.toLocaleString('id-ID')}`],
    ['Total Produk Terjual (Unit):', `${totalQtySold} unit`],
    ['------------------------------------------------'],
    ['GRAND TOTAL PENDAPATAN:', `Rp ${grandTotal.toLocaleString('id-ID')}`],
    ['================================================']
  ]

  // 2. Sheet: Registrasi & Kunjungan
  const visitHeaders = [
    ['LAPORAN DETAIL PEMASUKAN REGISTRASI & MEMBER'],
    [`Periode: ${reportPeriodLabel}`],
    [],
    ['No', 'Tanggal', 'Waktu', 'Nama Pengunjung', 'Civitas', 'Kategori', 'Durasi', 'Pelatih', 'Kelas', 'Alat', 'Total Bayar', 'Metode Bayar']
  ]
  const visitRows = visitsToExport.map((t, idx) => [
    idx + 1,
    t.date,
    t.time,
    t.name,
    t.civitas,
    t.category,
    t.duration || '-',
    t.trainer || '-',
    t.kelas || '-',
    t.alat || '-',
    t.amount,
    t.paymentMethod
  ])
  const visitTotalRow = ['', '', '', '', '', '', '', '', '', 'Total:', totalVisitRevenue, '']
  const visitSheetData = [...visitHeaders, ...visitRows, [], visitTotalRow]

  // 3. Sheet: Penjualan Produk
  const productHeaders = [
    ['LAPORAN DETAIL PENJUALAN PRODUK'],
    [`Periode: ${reportPeriodLabel}`],
    [],
    ['No', 'Tanggal', 'Nama Produk', 'Qty', 'Harga Satuan', 'Total Bayar', 'Metode Bayar']
  ]
  const productRows = productsToExport.map((p, idx) => [
    idx + 1,
    p.date,
    p.productName,
    p.qty,
    p.price,
    p.total,
    p.paymentMethod
  ])
  const productTotalRow = ['', '', '', '', 'Total:', totalProductRevenue, '']
  const productSheetData = [...productHeaders, ...productRows, [], productTotalRow]

  // Initialize Workbook
  const wb = XLSX.utils.book_new()
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData)
  const wsVisits = XLSX.utils.aoa_to_sheet(visitSheetData)
  const wsProducts = XLSX.utils.aoa_to_sheet(productSheetData)

  // Align Column Widths beautifully
  wsSummary['!cols'] = [{ wch: 30 }, { wch: 25 }]
  wsVisits['!cols'] = [
    { wch: 5 },  // No
    { wch: 12 }, // Tanggal
    { wch: 8 },  // Waktu
    { wch: 25 }, // Nama Pengunjung
    { wch: 25 }, // Civitas
    { wch: 12 }, // Kategori
    { wch: 10 }, // Durasi
    { wch: 20 }, // Pelatih
    { wch: 20 }, // Kelas
    { wch: 20 }, // Alat
    { wch: 15 }, // Total Bayar
    { wch: 15 }  // Metode Bayar
  ]
  wsProducts['!cols'] = [
    { wch: 5 },  // No
    { wch: 12 }, // Tanggal
    { wch: 25 }, // Nama Produk
    { wch: 8 },  // Qty
    { wch: 15 }, // Harga Satuan
    { wch: 15 }, // Total Bayar
    { wch: 15 }  // Metode Bayar
  ]

  // Append Sheets
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Ringkasan Laporan')
  XLSX.utils.book_append_sheet(wb, wsVisits, 'Registrasi & Kunjungan')
  XLSX.utils.book_append_sheet(wb, wsProducts, 'Penjualan Produk')

  // Save Workbook
  XLSX.writeFile(wb, filename)
  toast.success(`Laporan ${filename} berhasil diunduh!`)
}
</script>
