<template>
  <CrudPanel
    title="Kelola Produk"
    :items="admin.products"
    :columns="columns"
    @add="openAdd"
    @edit="openEdit"
    @delete="del"
  >
    <template #modal>
      <Transition name="modal">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 class="font-extrabold text-primary-900 text-sm">{{ editing ? 'Edit Produk' : 'Tambah Produk' }}</h3>
              <button @click="showModal = false" class="text-slate-400 hover:text-slate-700 transition-colors">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            <form @submit.prevent="save" class="p-6 space-y-4">
              <!-- Foto Produk (Upload dari Galeri) -->
              <ImageUploader 
                v-model="form.image"
                label="Foto Produk (Upload dari Galeri / File)"
                helpText="Pilih foto produk dari galeri HP/komputer."
              />

              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Produk</label>
                <input v-model="form.name_id" type="text" placeholder="Suplemen Protein" required
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all" />
              </div>

              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Harga (Rp)</label>
                <input v-model.number="form.price" type="number" placeholder="150000" required
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all" />
              </div>

              <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Harga Asli (Rp, opsional)</label>
                <input v-model.number="form.original_price" type="number" placeholder="200000"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all" />
              </div>

              <!-- Kategori Produk (Select or Type New Category) -->
              <div class="space-y-1.5">
                <div class="flex items-center justify-between">
                  <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kategori</label>
                  <button 
                    type="button" 
                    @click="toggleCategoryMode" 
                    class="text-[10px] text-accent-600 font-semibold hover:underline"
                  >
                    {{ isCustomCategory ? '← Pilih dari List' : '+ Ketik Kategori Baru' }}
                  </button>
                </div>

                <!-- Option A: Select from existing categories list -->
                <select 
                  v-if="!isCustomCategory" 
                  v-model="categorySelectValue" 
                  @change="onCategorySelectChange"
                  required 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
                >
                  <option value="" disabled>Pilih kategori...</option>
                  <option v-for="cat in availableCategories" :key="cat" :value="cat">
                    {{ cat }}
                  </option>
                  <option value="__NEW__" class="font-bold text-accent-600">+ Ketik / Tambah Kategori Baru...</option>
                </select>

                <!-- Option B: Type custom category -->
                <div v-else class="space-y-1">
                  <input 
                    v-model="form.category" 
                    type="text" 
                    placeholder="Ketik nama kategori baru..." 
                    required
                    class="w-full px-4 py-2.5 rounded-xl border-2 border-accent-400 text-sm text-primary-900 bg-accent-50/20 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all" 
                  />
                  <p class="text-[10px] text-slate-400">Kategori baru akan otomatis muncul di list pilihan selanjutnya.</p>
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
import { ref, reactive, computed } from 'vue'
import { useAdminStore } from '@/stores/admin.store'
import { useToast } from '@/composables/useToast'
import type { Product } from '@/types/booking'
import CrudPanel from './shared/CrudPanel.vue'
import ImageUploader from '@/components/common/ImageUploader.vue'

const admin = useAdminStore()
const toast = useToast()
const showModal = ref(false)
const editing = ref<Product | null>(null)
const isSaving = ref(false)
const isCustomCategory = ref(false)
const categorySelectValue = ref('')

const availableCategories = computed(() => {
  const defaults = ['Suplemen', 'Merchandise', 'Aksesoris', 'Minuman']
  const existing = admin.products.map(p => p.category).filter(Boolean)
  return Array.from(new Set([...defaults, ...existing]))
})

const columns = [
  { key: 'name_id', label: 'Nama Produk' },
  { key: 'category', label: 'Kategori' },
  { key: 'price', label: 'Harga', format: (v: number) => 'Rp ' + v.toLocaleString('id-ID') },
]

const form = reactive<Partial<Product>>({ id: '', name_id: '', name_en: '', price: 0, original_price: 0, category: '', image: '' })

function toggleCategoryMode() {
  isCustomCategory.value = !isCustomCategory.value
  if (!isCustomCategory.value) {
    categorySelectValue.value = form.category || ''
  } else {
    form.category = ''
  }
}

function onCategorySelectChange() {
  if (categorySelectValue.value === '__NEW__') {
    isCustomCategory.value = true
    form.category = ''
  } else {
    form.category = categorySelectValue.value
  }
}

function openAdd() {
  editing.value = null
  isCustomCategory.value = false
  categorySelectValue.value = ''
  Object.assign(form, { id: '', name_id: '', name_en: '', price: 0, original_price: 0, category: '', image: '' })
  showModal.value = true
}

function openEdit(item: unknown) {
  const prod = item as Product
  editing.value = prod
  Object.assign(form, prod)
  if (prod.category && !availableCategories.value.includes(prod.category)) {
    isCustomCategory.value = true
    categorySelectValue.value = ''
  } else {
    isCustomCategory.value = false
    categorySelectValue.value = prod.category || ''
  }
  showModal.value = true
}

async function save() {
  if (!form.category || !form.category.trim()) {
    toast.error('Kategori produk wajib diisi.')
    return
  }

  isSaving.value = true
  try {
    if (!form.id && !editing.value) {
      form.id = 'prod_' + (form.name_id || '').toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now().toString().slice(-4)
    }
    form.name_en = form.name_id
    form.image = form.image || 'assets/produk.png'
    form.category = form.category.trim()
    
    const payload = { ...form, price: Number(form.price), original_price: Number(form.original_price) } as Product
    const result = editing.value
      ? await admin.updateProduct(editing.value.id, payload)
      : await admin.addProduct(payload)
    
    if (!result.error) {
      toast.success(editing.value ? 'Produk diperbarui!' : 'Produk ditambahkan!')
      showModal.value = false
    } else {
      console.error('Save product error:', result.error)
      toast.error('Gagal menyimpan produk: ' + result.error.message)
    }
  } catch (err) {
    console.error('Save product runtime error:', err)
    toast.error('Error: ' + (err as Error).message)
  } finally {
    isSaving.value = false
  }
}

async function del(id: string) {
  console.log('Delete product ID:', id)
  if (!confirm('Hapus produk ini?')) return
  try {
    const { error } = await admin.deleteProduct(id)
    if (!error) {
      toast.success('Produk dihapus.')
    } else {
      console.error('Delete product error:', error)
      toast.error('Gagal menghapus: ' + error.message)
    }
  } catch (err) {
    console.error('Delete product runtime error:', err)
    toast.error('Error: ' + (err as Error).message)
  }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }
</style>
