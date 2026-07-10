<template>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-5">
    <!-- Left: Buat/Edit Jadwal Baru -->
    <div class="xl:col-span-1 bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 h-fit relative">
      <h3 class="font-extrabold text-primary-900 text-sm mb-5">
        <i class="fa-solid fa-calendar-plus text-accent-500 mr-2"></i>
        {{ editingId ? 'EDIT JADWAL BOOKING' : 'BUAT JADWAL BARU' }}
      </h3>
      <form @submit.prevent="submitBooking" class="space-y-4">
        <!-- Kategori Booking Selection -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Kategori Booking</label>
          <select v-model="bookingType" class="input-field">
            <option value="member">Member Terdaftar</option>
            <option value="umum">Masyarakat Umum / Harian (Insidental)</option>
          </select>
        </div>

        <!-- 1. IF MEMBER: Pilih Member Dropdown -->
        <div v-if="bookingType === 'member'" class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Pilih Member Terdaftar</label>
          <select v-model="selectedMemberIndex" required class="input-field">
            <option value="">-- Pilih Member --</option>
            <option v-for="(m, idx) in registeredMembers" :key="m.name" :value="idx">
              {{ m.name }} ({{ m.civitas }})
            </option>
          </select>
          <p class="text-[10px] text-slate-400 mt-1">Daftar memuat pengunjung yang mendaftar paket Membership di Kasir Kunjungan.</p>
        </div>

        <!-- 2. IF UMUM: Input Nama & Civitas Manual -->
        <div v-else class="space-y-4">
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nama Pengunjung</label>
            <input v-model="form.name" required placeholder="Nama lengkap..." class="input-field" />
          </div>
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Status Civitas</label>
            <select v-model="form.civitas" required class="input-field">
              <option value="">-- Pilih Civitas --</option>
              <option v-for="p in adminStore.pricing" :key="p.id" :value="p.id">
                {{ getCategoryLabel(p.id) }}
              </option>
            </select>
          </div>
        </div>

        <!-- Info Civitas & Durasi (Only if Member is selected) -->
        <div v-if="bookingType === 'member' && selectedMember" class="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-xs">
          <div>
            <span class="text-[10px] text-slate-400 font-bold block uppercase">Status Civitas</span>
            <span class="font-extrabold text-primary-900">{{ selectedMember.civitas }}</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 font-bold block uppercase">Paket Durasi</span>
            <span class="font-extrabold text-primary-900">{{ selectedMember.duration }}</span>
          </div>
        </div>

        <!-- Tanggal Latihan -->
        <div class="space-y-1.5 relative">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Tanggal Latihan</label>
          <!-- Trigger Button -->
          <div
            @click="calendarOpen = !calendarOpen"
            class="input-field flex justify-between items-center cursor-pointer bg-white"
          >
            <span :class="form.date ? 'text-primary-900 font-semibold' : 'text-slate-400'">
              {{ form.date ? formatIndonesianDate(form.date) : 'Pilih tanggal...' }}
            </span>
            <i class="fa-solid fa-calendar text-slate-400 text-sm"></i>
          </div>
          <p v-if="dateWarning" class="text-[10px] text-red-500 font-bold mt-1">{{ dateWarning }}</p>

          <!-- Custom Large Dropdown Calendar Card -->
          <div v-if="calendarOpen" class="absolute z-30 w-full bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 mt-2 space-y-4">
            <!-- Navigation -->
            <div class="flex justify-between items-center">
              <button type="button" @click.stop="prevMonth" class="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors">
                <i class="fa-solid fa-chevron-left"></i>
              </button>
              <span class="font-black text-sm text-primary-900 uppercase tracking-wider">
                {{ monthNames[currentMonth] }} {{ currentYear }}
              </span>
              <button type="button" @click.stop="nextMonth" class="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors">
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <!-- Grid Header Weekdays -->
            <div class="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-slate-400 uppercase tracking-wider">
              <span v-for="d in ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']" :key="d" :class="d === 'Min' ? 'text-red-400' : ''">
                {{ d }}
              </span>
            </div>

            <!-- Grid Days -->
            <div class="grid grid-cols-7 gap-1">
              <!-- Padding days -->
              <div v-for="p in firstDayPadding" :key="'pad-' + p"></div>
              <!-- Active days -->
              <button
                v-for="item in activeMonthDays"
                :key="item.dateStr"
                type="button"
                @click.stop="selectDate(item.dateStr)"
                :disabled="item.isSunday"
                :class="[
                  'w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all',
                  item.isSunday ? 'text-red-400 cursor-not-allowed opacity-40' : 'text-primary-900 hover:bg-slate-100',
                  form.date === item.dateStr ? 'bg-accent-500 text-white font-black hover:bg-accent-600 shadow-md shadow-accent-500/20' : '',
                  isToday(item.dateStr) && form.date !== item.dateStr ? 'border border-accent-400 text-accent-500' : ''
                ]"
              >
                {{ item.day }}
              </button>
            </div>
            <!-- Footer -->
            <div class="flex justify-between items-center pt-2 border-t border-slate-100 text-[10px]">
              <button type="button" @click.stop="selectToday" class="text-accent-500 font-extrabold hover:underline">Hari Ini</button>
              <button type="button" @click.stop="calendarOpen = false" class="text-slate-400 font-bold hover:underline">Tutup</button>
            </div>
          </div>
        </div>

        <!-- Hari -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Hari</label>
          <input :value="form.day" type="text" readonly class="input-field bg-slate-100 cursor-not-allowed" />
        </div>

        <!-- Waktu Latihan -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Waktu Latihan</label>
          <select v-model="form.timeSlot" required :disabled="!form.date || !!dateWarning" class="input-field">
            <option value="">-- Pilih Waktu Latihan --</option>
            <option
              v-for="slot in timeSlots"
              :key="slot"
              :value="slot"
              :disabled="isSlotBooked(form.date, slot)"
            >
              {{ slot }} {{ isSlotBooked(form.date, slot) ? '— [SUDAH DIBOOKING]' : '' }}
            </option>
          </select>
          <p v-if="slotWarning" class="text-[10px] text-red-500 font-bold mt-1">⚠️ Slot waktu terpilih sudah dibooking. Silakan pilih slot lain.</p>
        </div>

        <!-- Pelatih Pilihan -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Pelatih Pilihan (Opsional)</label>
          <select v-model="form.trainerId" class="input-field">
            <option value="">Mandiri (Tanpa Pelatih)</option>
            <option v-for="t in adminStore.trainers" :key="t.id" :value="t.id">
              {{ t.name }} (+Rp {{ t.price.toLocaleString('id-ID') }})
            </option>
          </select>
        </div>

        <!-- Program Kelas -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Pilih Program Kelas (Opsional)</label>
          <select v-model="form.classId" class="input-field">
            <option value="">Tidak memilih / Tanpa Kelas</option>
            <option v-for="c in adminStore.classes" :key="c.id" :value="c.id">
              {{ c.name_id }} (+Rp {{ c.price.toLocaleString('id-ID') }})
            </option>
          </select>
        </div>

        <!-- Kategori Alat -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Pilih Kategori Alat (Opsional)</label>
          <select v-model="form.equipmentId" class="input-field">
            <option value="">Tidak memilih / Tanpa Alat</option>
            <option v-for="e in adminStore.equipment" :key="e.id" :value="e.id">
              {{ e.name_id }} (+Rp {{ e.price.toLocaleString('id-ID') }})
            </option>
          </select>
        </div>

        <!-- Estimasi Harga (Auto Calculated) -->
        <div class="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
          <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Estimasi Harga Tambahan</p>
          <p class="text-lg font-extrabold text-primary-900">Rp {{ computedAmount.toLocaleString('id-ID') }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2">
          <button v-if="editingId" type="button" @click="resetForm" class="flex-1 py-3 border border-slate-200 text-slate-600 font-semibold text-sm rounded-xl hover:bg-slate-50 transition-colors">
            Batal
          </button>
          <button type="submit" :disabled="!!dateWarning || (!!form.timeSlot && isSlotBooked(form.date, form.timeSlot))" class="flex-1 py-3 bg-accent-500 text-white font-bold text-sm rounded-xl hover:bg-accent-600 transition-colors disabled:opacity-60">
            <i class="fa-solid fa-floppy-disk mr-1.5"></i>
            {{ editingId ? 'Simpan Perubahan' : 'SIMPAN JADWAL BOOKING' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Right: Daftar Booking Jadwal -->
    <div class="xl:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden h-fit">
      <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 class="font-extrabold text-primary-900 text-sm">DAFTAR BOOKING JADWAL</h3>
          <p class="text-slate-400 text-xs text-left">Jadwal latihan terdaftar di sistem</p>
        </div>
        <button @click="printBookingReport" class="flex items-center gap-1.5 px-3 py-1.5 border border-primary-200 text-primary-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">
          <i class="fa-solid fa-print"></i> Cetak Laporan Booking
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="bg-slate-50 text-left">
              <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Nama Member</th>
              <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Kategori</th>
              <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Tanggal</th>
              <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Hari</th>
              <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Waktu</th>
              <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Pelatih</th>
              <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Kelas</th>
              <th class="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider">Alat</th>
              <th class="px-4 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="b in bookings" :key="b.id" class="hover:bg-slate-50/60 transition-colors">
              <td class="px-4 py-3 font-bold text-primary-900">{{ b.name }}</td>
              <td class="px-4 py-3">
                <span :class="[
                  'text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase',
                  b.category === 'Member' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                ]">
                  {{ b.category }}
                </span>
              </td>
              <td class="px-4 py-3 text-slate-700 font-semibold">{{ getSplitTime(b.preferred_time).date }}</td>
              <td class="px-4 py-3 text-slate-600">{{ getSplitTime(b.preferred_time).day }}</td>
              <td class="px-4 py-3">
                <span class="bg-primary-50 text-primary-800 font-bold px-2 py-0.5 rounded border border-primary-100 text-[10px]">
                  {{ getSplitTime(b.preferred_time).timeSlot }}
                </span>
              </td>
              <td class="px-4 py-3 text-slate-500 truncate max-w-[85px]">{{ getTrainerName(b.trainer_id) }}</td>
              <td class="px-4 py-3 text-slate-500 truncate max-w-[85px]">{{ getClassName(b.class_id) }}</td>
              <td class="px-4 py-3 text-slate-500 truncate max-w-[85px]">{{ getEquipmentName(b.equipment_id) }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-center gap-1.5">
                  <button @click="startEdit(b)" class="text-[10px] font-bold px-2 py-1 border border-primary-200 text-primary-700 rounded-lg hover:bg-slate-50 transition-colors">
                    Edit
                  </button>
                  <button @click="deleteBooking(b.id!)" class="text-[10px] font-bold px-2 py-1 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="bookings.length === 0">
              <td colspan="9" class="text-center py-16 text-slate-400">
                <i class="fa-solid fa-calendar-xmark text-3xl block mb-2 text-slate-200"></i>
                Belum ada jadwal booking latihan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Hidden Print Container for Booking Laporan -->
  <div id="print-booking-layout" class="print-only font-sans text-black bg-white p-8">
    <div class="text-center pb-4 border-b-2 border-slate-800">
      <h2 class="text-xl font-black uppercase tracking-wide">FITNESS CENTER FAKULTAS VOKASI UNY</h2>
      <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Laporan Rekap Jadwal & Booking Latihan</p>
      <p class="text-[10px] text-slate-400 mt-0.5">Tanggal Cetak: {{ new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
    </div>

    <table class="w-full text-xs border-collapse mt-6">
      <thead>
        <tr class="border-b border-slate-800 text-left bg-slate-50">
          <th class="py-2 px-2 font-bold">No</th>
          <th class="py-2 px-2 font-bold">Nama Member</th>
          <th class="py-2 px-2 font-bold">Kategori</th>
          <th class="py-2 px-2 font-bold">Tanggal</th>
          <th class="py-2 px-2 font-bold">Hari</th>
          <th class="py-2 px-2 font-bold">Waktu</th>
          <th class="py-2 px-2 font-bold">Pelatih</th>
          <th class="py-2 px-2 font-bold">Kelas</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200">
        <tr v-for="(b, idx) in bookings" :key="b.id">
          <td class="py-2 px-2 text-slate-400">{{ idx + 1 }}</td>
          <td class="py-2 px-2 font-bold">{{ b.name }}</td>
          <td class="py-2 px-2 font-bold">{{ b.category }}</td>
          <td class="py-2 px-2">{{ getSplitTime(b.preferred_time).date }}</td>
          <td class="py-2 px-2">{{ getSplitTime(b.preferred_time).day }}</td>
          <td class="py-2 px-2 font-bold">{{ getSplitTime(b.preferred_time).timeSlot }}</td>
          <td class="py-2 px-2">{{ getTrainerName(b.trainer_id) }}</td>
          <td class="py-2 px-2">{{ getClassName(b.class_id) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useReceptionistStore } from '@/stores/receptionist.store'
import { useAdminStore } from '@/stores/admin.store'
import { useToast } from '@/composables/useToast'
import { supabase } from '@/lib/supabase'
import type { Booking } from '@/types/booking'

const recStore = useReceptionistStore()
const adminStore = useAdminStore()
const toast = useToast()

const bookings = ref<Booking[]>([])
const editingId = ref<string | null>(null)

// Custom state for Booking Category selection
const bookingType = ref<'member' | 'umum'>('member')
const selectedMemberIndex = ref<number | string>('')

// Custom Date Picker State
const calendarOpen = ref(false)
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth()) // 0-indexed

const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

const timeSlots = [
  'Pagi (07:00 - 11:00)',
  'Siang (11:00 - 15:00)',
  'Sore (15:00 - 18:00)',
  'Malam (18:00 - 21:00)'
]

const form = reactive({
  name: '',
  civitas: '',
  category: 'Member',
  duration: '',
  date: '',
  day: '',
  timeSlot: '',
  trainerId: '',
  classId: '',
  equipmentId: ''
})

// Generate padding days for first week of current month
const firstDayPadding = computed(() => {
  const startDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
  return startDay
})

// Generate active days list of current month
const activeMonthDays = computed(() => {
  const totalDays = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const days: { day: number; dateStr: string; isSunday: boolean }[] = []

  for (let d = 1; d <= totalDays; d++) {
    const mm = String(currentMonth.value + 1).padStart(2, '0')
    const dd = String(d).padStart(2, '0')
    const dStr = `${currentYear.value}-${mm}-${dd}`
    const isSun = new Date(currentYear.value, currentMonth.value, d).getDay() === 0
    days.push({ day: d, dateStr: dStr, isSunday: isSun })
  }
  return days
})

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value -= 1
  } else {
    currentMonth.value -= 1
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value += 1
  } else {
    currentMonth.value += 1
  }
}

function selectDate(dateStr: string) {
  form.date = dateStr
  calendarOpen.value = false
}

function selectToday() {
  const now = new Date()
  currentYear.value = now.getFullYear()
  currentMonth.value = now.getMonth()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  selectDate(`${yyyy}-${mm}-${dd}`)
}

function isToday(dateStr: string) {
  const t = new Date()
  const mm = String(t.getMonth() + 1).padStart(2, '0')
  const dd = String(t.getDate()).padStart(2, '0')
  return dateStr === `${t.getFullYear()}-${mm}-${dd}`
}

function formatIndonesianDate(dateStr: string) {
  if (!dateStr) return ''
  const parts = dateStr.split('-')
  if (parts.length < 3) return dateStr
  const y = parts[0]
  const m = monthNames[Number(parts[1]) - 1]
  const d = Number(parts[2])
  return `${d} ${m} ${y}`
}

// Extract unique members registered from cashier transactions (only category === 'Member')
const registeredMembers = computed(() => {
  const list: { name: string; civitas: string; duration: string }[] = []
  const seen = new Set<string>()

  recStore.transactions.forEach(t => {
    if (t.category === 'Member' && !seen.has(t.name.toLowerCase())) {
      seen.add(t.name.toLowerCase())
      list.push({
        name: t.name,
        civitas: t.civitas,
        duration: t.duration || '1 Bulan'
      })
    }
  })
  return list
})

const selectedMember = computed(() => {
  if (selectedMemberIndex.value === '') return null
  return registeredMembers.value[Number(selectedMemberIndex.value)]
})

// Auto-fill form values when member is selected or switch modes
watch(bookingType, (type) => {
  if (!editingId.value) {
    form.name = ''
    form.civitas = ''
    form.duration = ''
    selectedMemberIndex.value = ''
  }
})

watch(selectedMember, (member) => {
  if (bookingType.value === 'member' && member) {
    form.name = member.name
    form.civitas = getCategoryIdFromLabel(member.civitas)
    form.duration = member.duration
  }
})

onMounted(async () => {
  adminStore.fetchAll()
  await refreshBookings()
})

async function refreshBookings() {
  const data = await recStore.fetchBookings()
  if (data) {
    bookings.value = (data as any[]).map(dbRow => {
      const preferred_time = `${dbRow.booking_date || ''}|${dbRow.booking_day || ''}|${dbRow.booking_time || ''}`
      
      const trainer_id = adminStore.trainers.find(t => t.name === dbRow.trainer)?.id || null
      const class_id = adminStore.classes.find(c => c.name_id === dbRow.kelas)?.id || null
      const equipment_id = adminStore.equipment.find(e => e.name_id === dbRow.alat)?.id || null

      return {
        id: dbRow.id,
        user_id: dbRow.user_id,
        name: dbRow.name,
        phone: '-',
        status_civitas: 'Masyarakat Umum',
        category: 'Insidental',
        duration: null,
        trainer_id,
        class_id,
        equipment_id,
        preferred_time,
        estimated_price: 0,
        status: 'Approved',
        created_at: dbRow.created_at
      }
    })
  }
}

const isSlotBooked = (dateStr: string, slotStr: string) => {
  if (!dateStr || !slotStr) return false
  return bookings.value.some(b => {
    if (editingId.value && b.id === editingId.value) return false
    const parts = b.preferred_time.split('|')
    return parts[0] === dateStr && parts[2] === slotStr
  })
}

// Warnings
const dateWarning = computed(() => {
  if (!form.date) return ''
  const d = new Date(form.date)
  if (isNaN(d.getTime())) return ''
  if (d.getDay() === 0) return '⚠️ Hari Minggu Fitness Center FV UNY Tutup!'
  return ''
})

const slotWarning = computed(() => {
  if (!form.date || !form.timeSlot) return false
  return isSlotBooked(form.date, form.timeSlot)
})

watch(
  () => form.date,
  (newVal) => {
    if (newVal) {
      const d = new Date(newVal)
      if (!isNaN(d.getTime())) {
        const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        form.day = dayNames[d.getDay()]
        return
      }
    }
    form.day = ''
  }
)

// Computed Add-on Prices
const computedAmount = computed(() => {
  let total = 0

  // If Harian (umum/insidental), add standard ticket base price
  if (bookingType.value === 'umum' && form.civitas) {
    const pricing = adminStore.pricing.find(p => p.id === form.civitas)
    if (pricing) total += Number(pricing.incidental_fee)
  }

  // Add-on Trainer Price
  if (form.trainerId) {
    const t = adminStore.trainers.find(tr => tr.id === form.trainerId)
    if (t) total += Number(t.price)
  }
  // Add-on Class Price
  if (form.classId) {
    const c = adminStore.classes.find(cl => cl.id === form.classId)
    if (c) total += Number(c.price)
  }
  // Add-on Equipment Price
  if (form.equipmentId) {
    const e = adminStore.equipment.find(eq => eq.id === form.equipmentId)
    if (e) total += Number(e.price)
  }
  return total
})

function getSplitTime(preferredTime: string) {
  const parts = (preferredTime || '').split('|')
  return {
    date: parts[0] || '—',
    day: parts[1] || '—',
    timeSlot: parts[2] || preferredTime
  }
}

function getTrainerName(id: string | null | undefined) {
  if (!id) return '-'
  return adminStore.trainers.find(t => t.id === id)?.name || '-'
}

function getClassName(id: string | null | undefined) {
  if (!id) return '-'
  return adminStore.classes.find(c => c.id === id)?.name_id || '-'
}

function getEquipmentName(id: string | null | undefined) {
  if (!id) return '-'
  return adminStore.equipment.find(e => e.id === id)?.name_id || '-'
}

async function submitBooking() {
  if (isSlotBooked(form.date, form.timeSlot)) {
    toast.error('Slot waktu terpilih sudah dibooking!')
    return
  }

  const finalTime = `${form.date}|${form.day}|${form.timeSlot}`

  const selectedTrainer = adminStore.trainers.find(t => t.id === form.trainerId)?.name || 'Mandiri (Tanpa Pelatih)'
  const selectedClass = adminStore.classes.find(c => c.id === form.classId)?.name_id || 'Tanpa Kelas'
  const selectedEquipment = adminStore.equipment.find(e => e.id === form.equipmentId)?.name_id || 'Tanpa Alat'

  const payload = {
    name: form.name,
    booking_date: form.date,
    booking_day: form.day,
    booking_time: form.timeSlot,
    trainer: selectedTrainer,
    kelas: selectedClass,
    alat: selectedEquipment,
    user_id: null
  }

  try {
    if (editingId.value) {
      const { error } = await supabase.from('bookings').update(payload).eq('id', editingId.value)
      if (!error) {
        toast.success('Jadwal booking berhasil diperbarui!')
        resetForm()
      } else {
        toast.error('Gagal memperbarui: ' + error.message)
      }
    } else {
      const { error } = await supabase.from('bookings').insert(payload)
      if (!error) {
        toast.success('Jadwal booking berhasil disimpan!')
        resetForm()
      } else {
        toast.error('Gagal membuat booking: ' + error.message)
      }
    }
    await refreshBookings()
  } catch (err) {
    toast.error('Error: ' + (err as Error).message)
  }
}

function startEdit(b: Booking) {
  editingId.value = b.id || null
  form.name = b.name
  form.civitas = getCategoryIdFromLabel(b.status_civitas)
  form.duration = b.duration || ''
  form.trainerId = b.trainer_id || ''
  form.classId = b.class_id || ''
  form.equipmentId = b.equipment_id || ''

  if (b.category === 'Member') {
    bookingType.value = 'member'
    const matchIdx = registeredMembers.value.findIndex(m => m.name.toLowerCase() === b.name.toLowerCase())
    if (matchIdx !== -1) {
      selectedMemberIndex.value = matchIdx
    } else {
      selectedMemberIndex.value = ''
    }
  } else {
    bookingType.value = 'umum'
    selectedMemberIndex.value = ''
  }

  const times = getSplitTime(b.preferred_time)
  form.date = times.date !== '—' ? times.date : ''
  form.day = times.day !== '—' ? times.day : ''
  form.timeSlot = times.timeSlot

  // Set calendar focus to editing date
  if (form.date) {
    const d = new Date(form.date)
    if (!isNaN(d.getTime())) {
      currentYear.value = d.getFullYear()
      currentMonth.value = d.getMonth()
    }
  }
}

async function deleteBooking(id: string) {
  if (!confirm('Apakah Anda yakin ingin menghapus booking ini?')) return
  const { error } = await supabase.from('bookings').delete().eq('id', id)
  if (!error) {
    toast.success('Jadwal booking berhasil dihapus!')
    await refreshBookings()
    if (editingId.value === id) resetForm()
  } else {
    toast.error('Gagal menghapus: ' + error.message)
  }
}

function resetForm() {
  editingId.value = null
  selectedMemberIndex.value = ''
  bookingType.value = 'member'
  calendarOpen.value = false
  Object.assign(form, {
    name: '',
    civitas: '',
    duration: '',
    date: '',
    day: '',
    timeSlot: '',
    trainerId: '',
    classId: '',
    equipmentId: ''
  })
}

function printBookingReport() {
  window.print()
}

function getCategoryLabel(id?: string) {
  if (!id) return ''
  if (id === 'student') return 'UNY (Mahasiswa, Tendik/Dosen)'
  if (id === 'alumni') return 'Alumni UNY'
  if (id === 'public') return 'Masyarakat Umum'
  return id.replace(/_/g, ' ').toUpperCase()
}

function getCategoryIdFromLabel(label?: string) {
  if (!label) return ''
  const l = label.toLowerCase()
  if (l.includes('mahasiswa') || l === 'student') return 'student'
  if (l.includes('alumni') || l === 'alumni') return 'alumni'
  if (l.includes('umum') || l.includes('masyarakat') || l === 'public') return 'public'
  const match = adminStore.pricing.find(p => p.id.toLowerCase() === l || getCategoryLabel(p.id).toLowerCase() === l)
  return match ? match.id : label.toLowerCase().trim().replace(/\s+/g, '_')
}
</script>

<style>
@media screen {
  .print-only {
    display: none !important;
  }
}
@media print {
  /* Hide all screen components */
  aside, header, main, nav, button, .no-print, #app > div > div:not(#print-booking-layout) {
    display: none !important;
  }
  #print-booking-layout {
    display: block !important;
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    background: white !important;
    color: black !important;
  }
}
</style>
