<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-extrabold text-primary-900">Kelola Pelatih</h2>
        <p class="text-slate-400 text-xs">{{ admin.trainers.length }} pelatih terdaftar</p>
      </div>
      <button @click="openAdd" class="flex items-center gap-2 px-4 py-2.5 bg-accent-500 text-white rounded-xl text-xs font-bold hover:bg-accent-600 transition-colors shadow-sm">
        <i class="fa-solid fa-plus"></i> Tambah Pelatih
      </button>
    </div>

    <!-- Trainer Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="t in admin.trainers" :key="t.id"
        class="bg-white rounded-2xl border border-slate-200/80 shadow-card p-5 hover:shadow-card-hover transition-shadow flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between gap-3 mb-3">
            <span class="text-[10px] font-bold uppercase tracking-widest text-accent-600 bg-accent-50 px-2.5 py-1 rounded-full">
              {{ t.specialty_id_val }}
            </span>
          </div>

          <!-- Photo + Info -->
          <div class="flex items-center gap-3.5 mb-3">
            <div class="w-14 h-14 rounded-full bg-slate-100 overflow-hidden flex-shrink-0 border-2 border-slate-200 flex items-center justify-center text-slate-400 text-xl shadow-xs">
              <img
                v-if="t.photo && formatImageUrl(t.photo)"
                :src="formatImageUrl(t.photo)"
                :alt="t.name"
                class="w-full h-full object-cover"
                @error="handleImgError"
              />
              <i v-else class="fa-solid fa-user-ninja text-accent-500"></i>
            </div>
            <div>
              <h4 class="font-extrabold text-primary-900 text-base leading-tight">{{ t.name }}</h4>
              <span class="text-[10px] text-slate-400 font-medium">Tarif Dasar: Rp {{ t.price.toLocaleString('id-ID') }} / sesi</span>
            </div>
          </div>

          <!-- Tariff Packages List (Up to 6) -->
          <div class="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
            <span class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Pilihan Paket Tarif ({{ t.packages?.length || 0 }} Paket):</span>
            <div v-if="t.packages && t.packages.length > 0" class="space-y-1">
              <div
                v-for="(pkg, pIdx) in t.packages"
                :key="pIdx"
                class="flex justify-between items-center bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 text-xs"
              >
                <span class="font-semibold text-slate-700 text-[11px] truncate max-w-[140px]">{{ pkg.name }}</span>
                <span class="font-extrabold text-accent-600">Rp {{ Number(pkg.price).toLocaleString('id-ID') }}</span>
              </div>
            </div>
            <div v-else class="text-[11px] text-slate-400 italic">
              Rp {{ t.price.toLocaleString('id-ID') }} / sesi (Tarif Standar)
            </div>
          </div>
        </div>

        <div class="flex gap-2 mt-5 pt-3 border-t border-slate-100">
          <button @click="openEdit(t)" class="flex-1 text-[11px] font-bold px-3 py-2 border border-primary-200 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors">
            <i class="fa-solid fa-pen-to-square mr-1"></i> Edit
          </button>
          <button @click="handleDelete(t.id)" class="text-[11px] font-bold px-3 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <div v-if="admin.trainers.length === 0"
        class="col-span-full text-center py-16 text-slate-400 text-sm"
      >
        <i class="fa-solid fa-person-running text-4xl block mb-3 text-slate-200"></i>
        Belum ada pelatih. Tambahkan pelatih baru.
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <Transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <h3 class="font-extrabold text-primary-900 text-sm">{{ editing ? 'Edit Pelatih' : 'Tambah Pelatih Baru' }}</h3>
            <button @click="showModal = false" class="text-slate-400 hover:text-slate-700 transition-colors">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
          <form @submit.prevent="saveTrainer" class="p-6 space-y-4">
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Pelatih</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Coach Budi Santoso"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
              />
            </div>
            
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Spesialisasi</label>
              <input
                v-model="form.specialty_id_val"
                type="text"
                placeholder="Diet & Nutrisi Spesialis"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
              />
            </div>

            <!-- Photo URL Input (Bebas URL / Drive / Link direct) -->
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Link Foto Pelatih (JPG / PNG / Google Drive)
              </label>
              <input
                v-model="form.photo"
                type="text"
                placeholder="https://drive.google.com/file/d/... atau https://.../foto.jpg"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
              />
              <p class="text-[10px] text-slate-400">Bisa diisi link Google Drive / link foto publik. Foto langsung tampil di beranda depan.</p>
              
              <!-- Image Preview -->
              <div v-if="form.photo && formatImageUrl(form.photo)" class="mt-2 flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                <img
                  :src="formatImageUrl(form.photo)"
                  alt="Preview"
                  class="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-xs"
                  @error="handleImgError"
                />
                <span class="text-xs text-slate-500 font-semibold">Preview Foto Pelatih</span>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Harga/Sesi Standar (Rp)</label>
              <input
                v-model.number="form.price"
                type="number"
                placeholder="100000"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
              />
            </div>

            <!-- Dynamic 6 Tariff Packages Section -->
            <div class="space-y-3 pt-3 border-t border-slate-100">
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Pilihan Paket Tarif Pelatih</label>
                  <p class="text-[10px] text-slate-400">Tambah hingga 6 opsi paket tarif (e.g. 1 Sesi, 5 Sesi, 10 Sesi, Paket Bulanan, dll)</p>
                </div>
                <button
                  type="button"
                  @click="addPackage"
                  :disabled="form.packages.length >= 6"
                  class="flex items-center gap-1.5 px-3 py-1.5 bg-accent-50 text-accent-600 rounded-lg text-[11px] font-bold border border-accent-200 hover:bg-accent-100 disabled:opacity-40 transition-colors"
                >
                  <i class="fa-solid fa-plus"></i> Tambah Paket
                </button>
              </div>

              <div class="space-y-2 max-h-56 overflow-y-auto pr-1">
                <div
                  v-for="(pkg, idx) in form.packages"
                  :key="idx"
                  class="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                >
                  <span class="text-[10px] font-extrabold text-slate-400 w-5 text-center">{{ idx + 1 }}</span>
                  <input
                    v-model="pkg.name"
                    type="text"
                    placeholder="Nama Paket (e.g. 5 Sesi)"
                    required
                    class="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-primary-900 bg-white focus:outline-none focus:ring-1 focus:ring-accent-500"
                  />
                  <div class="relative w-36">
                    <span class="absolute left-2.5 top-1.5 text-xs text-slate-400 font-bold">Rp</span>
                    <input
                      v-model.number="pkg.price"
                      type="number"
                      placeholder="100000"
                      required
                      class="w-full pl-8 pr-2 py-1.5 rounded-lg border border-slate-200 text-xs text-primary-900 bg-white focus:outline-none focus:ring-1 focus:ring-accent-500 font-bold"
                    />
                  </div>
                  <button
                    type="button"
                    @click="removePackage(idx)"
                    class="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus Paket"
                  >
                    <i class="fa-solid fa-trash text-xs"></i>
                  </button>
                </div>

                <div v-if="form.packages.length === 0" class="text-center py-3 text-slate-400 text-xs italic bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                  Belum ada paket khusus. Klik "+ Tambah Paket" untuk menambah opsi tarif (max 6).
                </div>
              </div>
            </div>

            <div class="flex gap-3 pt-4 border-t border-slate-100">
              <button type="button" @click="showModal = false" class="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">Batal</button>
              <button type="submit" :disabled="isSaving" class="flex-1 py-2.5 rounded-xl bg-accent-500 text-white text-sm font-bold hover:bg-accent-600 transition-colors disabled:opacity-60">
                {{ isSaving ? 'Menyimpan...' : 'Simpan' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAdminStore } from '@/stores/admin.store'
import { useToast } from '@/composables/useToast'
import type { Trainer, TrainerPackage } from '@/types/booking'
import { formatImageUrl } from '@/lib/imageHelper'

const admin = useAdminStore()
const toast = useToast()

const showModal = ref(false)
const editing = ref<Trainer | null>(null)
const isSaving = ref(false)

const form = reactive<{
  id: string
  name: string
  specialty_id: string
  specialty_id_val: string
  specialty_en: string
  bio_id: string
  bio_en: string
  philosophy: string
  photo: string
  price: number
  quota_filled: number
  quota_max: number
  packages: TrainerPackage[]
}>({
  id: '', name: '', specialty_id: '', specialty_id_val: '', specialty_en: '',
  bio_id: '', bio_en: '', philosophy: '', photo: '',
  price: 0, quota_filled: 0, quota_max: 10,
  packages: []
})

function handleImgError(e: Event) {
  const target = e.target as HTMLImageElement
  if (target) {
    target.style.display = 'none'
  }
}

function addPackage() {
  if (form.packages.length < 6) {
    const nextNum = form.packages.length + 1
    form.packages.push({
      name: `${nextNum} Sesi`,
      price: form.price > 0 ? form.price * nextNum : 100000
    })
  } else {
    toast.warning('Maksimal 6 paket tarif.')
  }
}

function removePackage(idx: number) {
  form.packages.splice(idx, 1)
}

function openAdd() {
  editing.value = null
  Object.assign(form, {
    id: '', name: '', specialty_id: '', specialty_id_val: '', specialty_en: '',
    bio_id: '', bio_en: '', philosophy: '', photo: '',
    price: 100000, quota_filled: 0, quota_max: 10,
    packages: []
  })
  showModal.value = true
}

function openEdit(t: Trainer) {
  editing.value = t
  Object.assign(form, {
    ...t,
    photo: t.photo || '',
    packages: t.packages && t.packages.length > 0 ? JSON.parse(JSON.stringify(t.packages)) : []
  })
  showModal.value = true
}

async function saveTrainer() {
  isSaving.value = true
  try {
    const payload = { ...form }
    
    if (!payload.id) {
      const cleanSlug = payload.name.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 30)
      payload.id = 'coach_' + cleanSlug + '_' + Date.now().toString().slice(-4)
    }

    const cleanSpecSlug = payload.specialty_id_val.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 35)
    payload.specialty_id = 'trainer_' + cleanSpecSlug
    payload.specialty_en = payload.specialty_id_val
    payload.bio_id = `${payload.name} adalah pelatih profesional di bidang ${payload.specialty_id_val}.`
    payload.bio_en = payload.bio_id
    payload.philosophy = 'Latihan konsisten kunci utama kebugaran.'

    const finalPayload = {
      ...payload,
      price: Number(payload.price),
      packages: payload.packages.slice(0, 6)
    }

    let result
    if (editing.value) {
      result = await admin.updateTrainer(editing.value.id, finalPayload)
    } else {
      result = await admin.addTrainer(finalPayload as Trainer)
    }
    
    if (!result.error) {
      toast.success(editing.value ? 'Pelatih diperbarui!' : 'Pelatih ditambahkan!')
      showModal.value = false
    } else {
      console.error('Save trainer error:', result.error)
      toast.error('Gagal menyimpan: ' + result.error.message)
    }
  } catch (err) {
    console.error('Save trainer runtime error:', err)
    toast.error('Error: ' + (err as Error).message)
  } finally {
    isSaving.value = false
  }
}

async function handleDelete(id: string) {
  console.log('Delete trainer ID:', id)
  if (!confirm('Hapus pelatih ini?')) return
  try {
    const { error } = await admin.deleteTrainer(id)
    if (!error) {
      toast.success('Pelatih dihapus.')
    } else {
      console.error('Delete trainer error:', error)
      toast.error('Gagal menghapus: ' + error.message)
    }
  } catch (err) {
    console.error('Delete trainer runtime error:', err)
    toast.error('Error: ' + (err as Error).message)
  }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }
</style>
