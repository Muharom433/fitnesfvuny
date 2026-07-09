<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-extrabold text-primary-900">Pengaturan Diskon Khusus & Event</h2>
        <p class="text-slate-400 text-xs">Atur persentase diskon dasar serta buat diskon khusus/event untuk setiap kategori civitas.</p>
      </div>
      <button
        type="button"
        @click="showAddModal = true"
        class="flex items-center gap-1.5 px-4 py-2 bg-accent-500 text-white rounded-xl text-xs font-bold hover:bg-accent-600 transition-colors shadow-lg shadow-accent-500/20"
      >
        <i class="fa-solid fa-plus"></i> Tambah Kategori
      </button>
    </div>

    <div v-if="admin.pricing.length === 0" class="text-center py-10 bg-white rounded-2xl border text-slate-400 text-xs">
      Loading data kategori...
    </div>

    <form v-else @submit.prevent="saveDiscounts" class="bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div v-for="p in admin.pricing" :key="p.id" class="bg-slate-50 border border-slate-200/60 rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div class="font-bold text-accent-600 text-sm uppercase tracking-wide flex items-center gap-2 mb-3">
              <i class="fa-solid fa-tags"></i> {{ getCategoryLabel(p.id) }}
            </div>
            
            <div class="space-y-3">
              <div class="space-y-1.5" v-if="discounts[p.id]">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Diskon Member Dasar (%)</label>
                <input type="number" v-model.number="discounts[p.id].member" min="0" max="100" class="input-field-small" required />
              </div>
              <div class="space-y-1.5" v-if="discounts[p.id]">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Diskon Insidental Dasar (%)</label>
                <input type="number" v-model.number="discounts[p.id].incidental" min="0" max="100" class="input-field-small" required />
              </div>
            </div>

            <!-- Custom Events Section -->
            <div class="mt-6 border-t border-slate-200 pt-4 space-y-3">
              <h4 class="text-xs font-bold text-primary-900 uppercase tracking-wider">Diskon Event / Khusus</h4>
              <div v-if="!discounts[p.id]?.custom || discounts[p.id].custom.length === 0" class="text-[10px] text-slate-400">Belum ada diskon event khusus.</div>
              <div v-else class="space-y-2 max-h-36 overflow-y-auto pr-1">
                <div v-for="(ev, idx) in discounts[p.id].custom" :key="ev.id" class="flex justify-between items-center bg-white border border-slate-200 rounded-lg p-2 text-xs">
                  <div class="min-w-0">
                    <p class="font-bold text-primary-900 truncate">{{ ev.name }}</p>
                    <p class="text-[10px] text-accent-600 font-semibold">Diskon {{ ev.percentage }}%</p>
                  </div>
                  <button type="button" @click="removeCustomDiscount(p.id, idx)" class="text-red-400 hover:text-red-600 p-1">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Add Custom Event Discount Input Row -->
          <div class="mt-4 border-t border-slate-200/60 pt-3 space-y-2 bg-slate-100/50 p-2.5 rounded-lg border" v-if="newEvent[p.id]">
            <input v-model="newEvent[p.id].name" placeholder="Nama event/promo..." class="input-field-small bg-white" />
            <div class="flex gap-2">
              <input type="number" v-model.number="newEvent[p.id].percentage" min="1" max="100" placeholder="%" class="input-field-small w-16 bg-white" />
              <button type="button" @click="addCustomDiscount(p.id)" class="flex-1 py-1.5 bg-primary-800 text-white rounded-lg font-bold text-[11px] hover:bg-primary-900 transition-colors">
                + Tambah
              </button>
            </div>
          </div>
        </div>

      </div>

      <div class="flex justify-end pt-3">
        <button type="submit" class="px-6 py-3 rounded-xl bg-accent-500 text-white text-xs font-bold hover:bg-accent-600 transition-colors shadow-lg shadow-accent-500/25">
          <i class="fa-solid fa-floppy-disk mr-1.5"></i> Simpan Konfigurasi Diskon
        </button>
      </div>
    </form>

    <!-- Add Category Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1f3c]/40 backdrop-blur-sm p-4">
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full max-w-md p-6 space-y-4">
        <div class="flex justify-between items-center pb-3 border-b border-slate-100">
          <h3 class="font-extrabold text-primary-900 text-sm flex items-center gap-1.5">
            <i class="fa-solid fa-plus text-accent-500"></i> Tambah Kategori Civitas Baru
          </h3>
          <button type="button" @click="showAddModal = false" class="text-slate-400 hover:text-slate-600">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <div class="space-y-3">
          <div class="space-y-1">
            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Nama Kategori (contoh: VIP, Karyawan)</label>
            <input type="text" v-model="newCategoryForm.name" placeholder="Nama Kategori..." class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-primary-900 focus:outline-none bg-white" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Pendaftaran Member (Rp)</label>
              <input type="number" v-model.number="newCategoryForm.registration_fee" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white" />
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Insidental Harian (Rp)</label>
              <input type="number" v-model.number="newCategoryForm.incidental_fee" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white" />
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Member 1 Bulan (Rp)</label>
              <input type="number" v-model.number="newCategoryForm.member_1_month_fee" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white" />
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Member 3 Bulan (Rp)</label>
              <input type="number" v-model.number="newCategoryForm.member_3_month_fee" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white" />
            </div>
          </div>
        </div>

        <div class="flex gap-3 pt-3 border-t border-slate-100">
          <button type="button" @click="showAddModal = false" class="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors">
            Batal
          </button>
          <button type="button" @click="createCategory" class="flex-1 py-2.5 bg-accent-500 hover:bg-accent-600 text-white rounded-xl text-xs font-bold transition-colors shadow-md shadow-accent-500/25">
            Simpan Kategori
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useAdminStore } from '@/stores/admin.store'
import { useToast } from '@/composables/useToast'

const admin = useAdminStore()
const toast = useToast()

interface CustomDiscount {
  id: string
  name: string
  percentage: number
}

const showAddModal = ref(false)
const newCategoryForm = reactive({
  name: '',
  registration_fee: 0,
  incidental_fee: 0,
  member_1_month_fee: 0,
  member_3_month_fee: 0,
})

const discounts = ref<Record<string, { member: number; incidental: number; custom: CustomDiscount[] }>>({})
const newEvent = reactive<Record<string, { name: string; percentage: number | null }>>({})

// Dynamic watchers to make sure that discounts object resolves correctly for newly added category rows
watch(
  () => admin.pricing,
  (newVal) => {
    const stored = localStorage.getItem('fit_uny_discounts')
    let parsed: any = {}
    if (stored) {
      try {
        parsed = JSON.parse(stored)
      } catch {}
    }

    newVal.forEach(p => {
      if (!discounts.value[p.id]) {
        discounts.value[p.id] = {
          member: parsed[p.id]?.member ?? 0,
          incidental: parsed[p.id]?.incidental ?? 0,
          custom: parsed[p.id]?.custom ?? []
        }
      }
      if (!newEvent[p.id]) {
        newEvent[p.id] = { name: '', percentage: null }
      }
    })
  },
  { deep: true, immediate: true }
)

onMounted(async () => {
  if (admin.pricing.length === 0) {
    await admin.fetchAll()
  }
})

function getCategoryLabel(id: string) {
  if (id === 'student') return 'UNY (Mahasiswa/Tendik/Dosen)'
  if (id === 'alumni') return 'Alumni UNY'
  if (id === 'public') return 'Masyarakat Umum'
  return id.replace(/_/g, ' ').toUpperCase()
}

function addCustomDiscount(key: string) {
  if (!newEvent[key]) return
  const name = newEvent[key].name.trim()
  const val = newEvent[key].percentage

  if (!name || val === null || val <= 0 || val > 100) {
    toast.error('Masukkan nama event dan nilai persentase diskon (1-100)%!')
    return
  }

  if (!discounts.value[key]) {
    discounts.value[key] = { member: 0, incidental: 0, custom: [] }
  }

  discounts.value[key].custom.push({
    id: Date.now().toString(),
    name,
    percentage: val
  })

  // Reset input row
  newEvent[key].name = ''
  newEvent[key].percentage = null
  toast.success('Diskon event berhasil ditambahkan ke daftar!')
}

function removeCustomDiscount(key: string, index: number) {
  if (discounts.value[key] && discounts.value[key].custom) {
    discounts.value[key].custom.splice(index, 1)
    toast.warning('Diskon event berhasil dihapus.')
  }
}

async function createCategory() {
  const name = newCategoryForm.name.trim()
  if (!name) {
    toast.error('Masukkan nama kategori terlebih dahulu!')
    return
  }
  const payload = {
    registration_fee: Number(newCategoryForm.registration_fee || 0),
    incidental_fee: Number(newCategoryForm.incidental_fee || 0),
    member_1_month_fee: Number(newCategoryForm.member_1_month_fee || 0),
    member_3_month_fee: Number(newCategoryForm.member_3_month_fee || 0),
  }
  const { error } = await admin.addPricingCategory(name, payload)
  if (!error) {
    toast.success('Kategori baru berhasil ditambahkan!')
    showAddModal.value = false
    Object.assign(newCategoryForm, {
      name: '',
      registration_fee: 0,
      incidental_fee: 0,
      member_1_month_fee: 0,
      member_3_month_fee: 0,
    })
  } else {
    toast.error('Gagal menambahkan kategori baru.')
  }
}

function saveDiscounts() {
  localStorage.setItem('fit_uny_discounts', JSON.stringify(discounts.value))
  toast.success('Konfigurasi diskon dasar & event berhasil disimpan!')
}
</script>

<style scoped>
.input-field-small {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 11px;
  color: #0b1f3c;
  font-weight: 600;
  outline: none;
  transition: all 0.2s ease-in-out;
}
.input-field-small:focus {
  border-color: #ff6b00;
  box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.15);
}
</style>
