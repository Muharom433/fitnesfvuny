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
        class="bg-white rounded-2xl border border-slate-200/80 shadow-card p-5 hover:shadow-card-hover transition-shadow"
      >
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold uppercase tracking-widest text-accent-600 bg-accent-50 px-2.5 py-1 rounded-full">
            {{ t.specialty_id_val }}
          </span>
        </div>
        
        <div class="mt-3">
          <h4 class="font-extrabold text-primary-900 text-base">{{ t.name }}</h4>
          <div class="mt-2 text-sm font-bold text-primary-700">
            Rp {{ t.price.toLocaleString('id-ID') }} <span class="text-slate-400 text-xs font-normal">/sesi</span>
          </div>
        </div>

        <div class="flex gap-2 mt-5">
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
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
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

            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Harga/Sesi (Rp)</label>
              <input
                v-model.number="form.price"
                type="number"
                placeholder="150000"
                required
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
              />
            </div>

            <div class="flex gap-3 pt-2">
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
import type { Trainer } from '@/types/booking'

const admin = useAdminStore()
const toast = useToast()

const showModal = ref(false)
const editing = ref<Trainer | null>(null)
const isSaving = ref(false)

const form = reactive({
  id: '', name: '', specialty_id: '', specialty_id_val: '', specialty_en: '',
  bio_id: '', bio_en: '', philosophy: '', photo: 'assets/trainer_male.png',
  price: 0, quota_filled: 0, quota_max: 10,
})

function openAdd() {
  editing.value = null
  Object.assign(form, {
    id: '', name: '', specialty_id: '', specialty_id_val: '', specialty_en: '',
    bio_id: '', bio_en: '', philosophy: '', photo: 'assets/trainer_male.png',
    price: 0, quota_filled: 0, quota_max: 10
  })
  showModal.value = true
}

function openEdit(t: Trainer) {
  editing.value = t
  Object.assign(form, { ...t })
  showModal.value = true
}

async function saveTrainer() {
  isSaving.value = true
  try {
    const payload = { ...form }
    
    if (!payload.id) {
      payload.id = 'coach_' + payload.name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now().toString().slice(-4)
    }

    payload.specialty_id = 'trainer_' + payload.specialty_id_val.toLowerCase().replace(/[^a-z0-9]/g, '_')
    payload.specialty_en = payload.specialty_id_val
    payload.bio_id = `${payload.name} adalah pelatih profesional di bidang ${payload.specialty_id_val}.`
    payload.bio_en = payload.bio_id
    payload.philosophy = 'Latihan konsisten kunci utama kebugaran.'

    const finalPayload = { ...payload, price: Number(payload.price) }

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
