<template>
  <div class="space-y-5">
    <div>
      <h2 class="text-lg font-extrabold text-primary-900">Biaya Gym & Metode Pembayaran</h2>
      <p class="text-slate-400 text-xs">Kelola biaya keanggotaan dan metode pembayaran transfer bank untuk Fitness Center FV UNY.</p>
    </div>

    <!-- Tab Buttons -->
    <div class="flex border-b border-slate-200">
      <button
        @click="activeTab = 'tariffs'"
        :class="[
          'px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2',
          activeTab === 'tariffs' ? 'border-accent-500 text-accent-500' : 'border-transparent text-slate-400 hover:text-slate-600'
        ]"
      >
        Biaya Gym
      </button>
      <button
        @click="activeTab = 'payments'"
        :class="[
          'px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2',
          activeTab === 'payments' ? 'border-accent-500 text-accent-500' : 'border-transparent text-slate-400 hover:text-slate-600'
        ]"
      >
        Metode Pembayaran
      </button>
    </div>

    <!-- Tab Contents -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-card p-6">
      
      <!-- Tab 1: Biaya & Tarif -->
      <div v-if="activeTab === 'tariffs'" class="space-y-6">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-accent-50 flex items-center justify-center text-accent-500 flex-shrink-0">
            <i class="fa-solid fa-circle-info text-base"></i>
          </div>
          <h3 class="font-extrabold text-primary-900 text-base tracking-wide">BIAYA GYM & METODE PEMBAYARAN</h3>
        </div>
        <div class="h-[3px] w-16 bg-primary-900 rounded mb-6"></div>

        <div v-if="pricingList.length === 0" class="text-center py-8 text-slate-400 text-xs">
          Loading data pricing...
        </div>

        <div v-else class="space-y-8">
          <div v-for="cat in pricingList" :key="cat.id" class="space-y-4 pb-8 border-b border-slate-100 last:border-0 last:pb-0">
            <div class="flex justify-between items-center max-w-xl mb-2">
              <div class="font-extrabold text-accent-500 text-xs uppercase tracking-wider">
                {{ getCategoryName(cat.id) }}
              </div>
              <button
                type="button"
                @click="deleteCategory(cat.id)"
                class="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1.5"
              >
                <i class="fa-solid fa-trash-can"></i> Hapus Kategori
              </button>
            </div>

            <div class="space-y-4 max-w-xl">
              <!-- Registration Fee -->
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-primary-900 uppercase tracking-wider block">PENDAFTARAN MEMBER (RP)</label>
                <input
                  type="number"
                  v-model.number="cat.registration_fee"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all bg-slate-50/50"
                />
              </div>

              <!-- Membership Tariffs (dynamic keys, sorted 1 then 3) -->
              <template v-if="cat.membership_tariffs">
                <div v-for="months in ['1', '3']" :key="months" class="space-y-1.5">
                  <label class="text-[11px] font-bold text-primary-900 uppercase tracking-wider block">MEMBER {{ months }} BULAN (RP)</label>
                  <input
                    type="number"
                    v-model.number="cat.membership_tariffs[months]"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all bg-slate-50/50"
                  />
                </div>
              </template>

              <!-- Incidental Fee -->
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-primary-900 uppercase tracking-wider block">INSIDENTAL HARIAN (RP)</label>
                <input
                  type="number"
                  v-model.number="cat.incidental_fee"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all bg-slate-50/50"
                />
              </div>
            </div>
          </div>



          <div class="flex justify-end pt-2 max-w-xl">
            <button
              @click="saveTariffs"
              :disabled="isSaving"
              class="px-6 py-3 bg-accent-500 text-white rounded-xl text-xs font-bold hover:bg-accent-600 transition-colors disabled:opacity-60 shadow-lg shadow-accent-500/25"
            >
              {{ isSaving ? 'Menyimpan...' : 'Simpan Biaya & Tarif' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Tab 2: Metode Pembayaran -->
      <div v-if="activeTab === 'payments'" class="space-y-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-extrabold text-primary-900 text-sm flex items-center gap-2">
            <i class="fa-solid fa-credit-card text-accent-500"></i> Kelola Metode Pembayaran (Bank)
          </h3>
          <button
            type="button"
            @click="addNewBank"
            class="flex items-center gap-1.5 px-3 py-1.5 border border-primary-200 text-primary-700 rounded-lg text-[10px] font-bold hover:bg-primary-50 transition-colors"
          >
            <i class="fa-solid fa-plus"></i> Tambah Bank
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="(bank, index) in bankList"
            :key="index"
            class="bg-slate-50 border border-slate-200/60 rounded-xl p-5 relative"
          >
            <!-- Delete Bank Block Button -->
            <button
              type="button"
              class="absolute top-5 right-5 text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1"
              @click="deleteBank(index)"
            >
              <i class="fa-solid fa-trash-can"></i> Hapus
            </button>

            <div class="text-[10px] font-bold text-accent-500 uppercase tracking-widest mb-4">
              {{ index + 1 }} - Metode Pembayaran (Bank)
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Key Identitas (e.g. bca, mandiri)</label>
                <input
                  type="text"
                  v-model="bank.key"
                  required
                  placeholder="bca"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nama Bank / Layanan</label>
                <input
                  type="text"
                  v-model="bank.name"
                  required
                  placeholder="BCA (Bank Central Asia)"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nomor Rekening / Akun</label>
                <input
                  type="text"
                  v-model="bank.number"
                  required
                  placeholder="8023-1122-3344"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div v-if="bankList.length === 0" class="text-center py-10 text-slate-400 text-xs">
            Belum ada metode pembayaran terdaftar. Klik "+ Tambah Bank" untuk membuat.
          </div>

          <div class="flex justify-end pt-2">
            <button
              @click="savePayments"
              class="px-5 py-2.5 bg-accent-500 text-white rounded-xl text-xs font-bold hover:bg-accent-600 transition-colors shadow-sm"
            >
              Simpan Metode Pembayaran
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useAdminStore } from '@/stores/admin.store'
import { useToast } from '@/composables/useToast'
import type { Pricing } from '@/types/booking'

const admin = useAdminStore()
const toast = useToast()

const activeTab = ref('tariffs')
const isSaving = ref(false)

const pricingList = ref<Pricing[]>([])
const bankList = ref<{ key: string; name: string; number: string }[]>([])

// Watch for store pricing updates (handles async loading delay)
watch(
  () => admin.pricing,
  (newVal) => {
    if (newVal && newVal.length > 0) {
      pricingList.value = JSON.parse(JSON.stringify(newVal))
    }
  },
  { immediate: true, deep: true }
)

onMounted(async () => {
  // Load pricing
  if (admin.pricing.length === 0) {
    await admin.fetchAll()
  }
  if (admin.pricing.length > 0) {
    pricingList.value = JSON.parse(JSON.stringify(admin.pricing))
  }

  // Load banks from localStorage
  const storedBanks = localStorage.getItem('fit_uny_banks')
  if (storedBanks) {
    try {
      bankList.value = JSON.parse(storedBanks)
    } catch {
      bankList.value = []
    }
  } else {
    bankList.value = []
  }
})



async function deleteCategory(id?: string) {
  if (!id) return
  if (confirm(`Apakah Anda yakin ingin menghapus kategori "${getCategoryName(id)}"?`)) {
    const { error } = await admin.deletePricingCategory(id)
    if (!error) {
      toast.warning('Kategori berhasil dihapus.')
    } else {
      toast.error('Gagal menghapus kategori dari database.')
    }
  }
}

function getCategoryName(id?: string) {
  if (!id) return ''
  if (id === 'student') return 'UNY (MAHASISWA, TENDIK/DOSEN)'
  if (id === 'alumni') return 'ALUMNI UNY'
  if (id === 'public') return 'MASYARAKAT UMUM'
  return id.replace(/_/g, ' ').toUpperCase()
}

function setDefaultBanks() {
  bankList.value = [
    { key: 'bca', name: 'BCA (Bank Central Asia)', number: '8023-1122-3344' },
    { key: 'mandiri', name: 'Bank Mandiri', number: '137-00-5566-7788' },
    { key: 'bni', name: 'BNI (Bank Negara Indonesia)', number: '0234-9988-77' },
    { key: 'bri', name: 'BRI (Bank Rakyat Indonesia)', number: '6023-01-002233-53-4' }
  ]
}

async function saveTariffs() {
  isSaving.value = true
  try {
    let success = true
    for (const p of pricingList.value) {
      const payload = {
        registration_fee: Number(p.registration_fee),
        incidental_fee: Number(p.incidental_fee),
        membership_tariffs: p.membership_tariffs
      }
      const { error } = await admin.updatePricing(p.id, payload)
      if (error) success = false
    }
    if (success) {
      toast.success('Biaya & Tarif berhasil disimpan!')
    } else {
      toast.error('Beberapa data tarif gagal disimpan ke database.')
    }
  } finally {
    isSaving.value = false
  }
}

function addNewBank() {
  bankList.value.push({
    key: 'bank_baru',
    name: 'Nama Bank / Layanan Baru',
    number: '0000-0000-0000'
  })
}

function deleteBank(index: number) {
  if (confirm('Hapus metode pembayaran ini?')) {
    bankList.value.splice(index, 1)
  }
}

function savePayments() {
  localStorage.setItem('fit_uny_banks', JSON.stringify(bankList.value))
  toast.success('Metode Pembayaran berhasil disimpan!')
}
</script>
