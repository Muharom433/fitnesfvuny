<template>
  <CrudPanel
    title="Kelola Kelas Grup"
    :items="admin.classes"
    :columns="columns"
    @add="openAdd"
    @edit="openEdit"
    @delete="del"
  >
    <template #modal>
      <Transition name="modal">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 class="font-extrabold text-primary-900 text-sm">{{ editing ? 'Edit Kelas' : 'Tambah Kelas' }}</h3>
              <button @click="showModal = false" class="text-slate-400 hover:text-slate-700 transition-colors">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            <form @submit.prevent="save" class="p-6 space-y-4">
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Kelas</label>
                <input v-model="form.name_id" type="text" placeholder="Yoga Dasar / Fatloss Workout" required
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all" />
              </div>

              <!-- Durasi / Waktu Kelas -->
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Durasi / Waktu Kelas</label>
                <input v-model="form.duration" type="text" placeholder="45 Menit / 60 Menit" required
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all" />
              </div>

              <!-- Jenis Level Kelas -->
              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Jenis Level Kelas</label>
                <input v-model="form.level" type="text" placeholder="Semua Level / Pemula / Menengah" required
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all" />
              </div>

              <!-- Photo Upload (Galeri / File) -->
              <ImageUploader 
                v-model="form.photo" 
                :aspectRatio="1.5"
                label="Foto Kelas" 
                helpText="" 
              />

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="space-y-1.5">
                  <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex min-h-[34px] items-end pb-1">Tarif Tambahan (Rp)</label>
                  <input v-model.number="form.price" type="number" placeholder="50000" required
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all font-bold" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex min-h-[34px] items-end pb-1">Harga Coret (Rp, Opsional)</label>
                  <input v-model.number="form.original_price" type="number" placeholder="75000"
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 line-through focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all" />
                </div>
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
    </template>
  </CrudPanel>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAdminStore } from '@/stores/admin.store'
import { useToast } from '@/composables/useToast'
import type { GymClass } from '@/types/booking'
import CrudPanel from './shared/CrudPanel.vue'
import ImageUploader from '@/components/common/ImageUploader.vue'
import { formatImageUrl } from '@/lib/imageHelper'

const admin = useAdminStore()
const toast = useToast()
const showModal = ref(false)
const editing = ref<GymClass | null>(null)
const isSaving = ref(false)

const columns = [
  { key: 'name_id', label: 'Nama Kelas' },
  { key: 'duration', label: 'Durasi/Waktu' },
  { key: 'level', label: 'Jenis Level' },
  { key: 'price', label: 'Tarif Tambahan', format: (v: number) => 'Rp ' + v.toLocaleString('id-ID') },
]

const form = reactive<Partial<GymClass>>({
  id: '', name_id: '', name_en: '', duration: '45 Menit', level: 'Semua Level', icon: '', price: 0, original_price: null, desc_id: '', desc_en: '', photo: ''
})

function handleImgError(e: Event) {
  const target = e.target as HTMLImageElement
  if (target) target.style.display = 'none'
}

function openAdd() {
  editing.value = null
  Object.assign(form, { id: '', name_id: '', name_en: '', duration: '45 Menit', level: 'Semua Level', icon: '', price: 0, original_price: null, desc_id: '', desc_en: '', photo: '' })
  showModal.value = true
}
function openEdit(item: unknown) {
  const kelas = item as GymClass
  editing.value = kelas
  Object.assign(form, {
    ...kelas,
    duration: kelas.duration || '45 Menit',
    level: kelas.level || 'Semua Level',
    original_price: kelas.original_price != null ? kelas.original_price : null,
    photo: kelas.photo || ''
  })
  showModal.value = true
}
async function save() {
  isSaving.value = true
  try {
    const payload = { ...form }
    
    if (!payload.id) {
      const cleanSlug = (payload.name_id || '').toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 30)
      payload.id = 'class_' + cleanSlug + '_' + Date.now().toString().slice(-4)
    }

    payload.name_en = payload.name_id
    payload.duration = payload.duration || '45 Menit'
    payload.level = payload.level || 'Semua Level'
    payload.icon = 'fa-solid fa-users'
    payload.desc_id = `Kelas ${payload.name_id} di Fitness Center FV UNY.`
    payload.desc_en = payload.desc_id

    const finalPayload = {
      ...payload,
      price: Number(payload.price),
      original_price: payload.original_price ? Number(payload.original_price) : null
    } as GymClass

    const result = editing.value
      ? await admin.updateClass(editing.value.id, finalPayload)
      : await admin.addClass(finalPayload)
    
    if (!result.error) {
      toast.success(editing.value ? 'Kelas diperbarui!' : 'Kelas ditambahkan!')
      showModal.value = false
    } else {
      console.error('Save class error:', result.error)
      toast.error('Gagal menyimpan kelas: ' + result.error.message)
    }
  } catch (err) {
    console.error('Save class runtime error:', err)
    toast.error('Error: ' + (err as Error).message)
  } finally {
    isSaving.value = false
  }
}
async function del(id: string) {
  console.log('Delete class ID:', id)
  if (!confirm('Hapus kelas ini?')) return
  try {
    const { error } = await admin.deleteClass(id)
    if (!error) {
      toast.success('Kelas dihapus.')
    } else {
      console.error('Delete class error:', error)
      toast.error('Gagal menghapus: ' + error.message)
    }
  } catch (err) {
    console.error('Delete class runtime error:', err)
    toast.error('Error: ' + (err as Error).message)
  }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }
</style>
