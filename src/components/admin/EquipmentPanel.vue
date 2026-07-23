<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-extrabold text-primary-900">Kelola Alat-Alat Gym</h2>
        <p class="text-slate-400 text-xs">{{ admin.equipment.length }} kategori alat terdaftar</p>
      </div>
      <button @click="addNewCategory" class="flex items-center gap-2 px-4 py-2.5 bg-accent-500 text-white rounded-xl text-xs font-bold hover:bg-accent-600 transition-colors shadow-sm">
        <i class="fa-solid fa-plus"></i> Tambah Kategori Alat
      </button>
    </div>

    <!-- Category Boxes -->
    <div class="space-y-6">
      <div v-for="(cat, catIdx) in admin.equipment" :key="cat.id"
        class="bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 relative"
      >
        <!-- Delete Category Button -->
        <button
          type="button"
          class="absolute top-5 right-5 text-red-500 hover:text-red-700 transition-colors text-sm font-semibold flex items-center gap-1.5"
          @click="handleDeleteCategory(cat.id)"
        >
          <i class="fa-solid fa-trash"></i> Hapus Kategori
        </button>

        <div class="text-xs font-extrabold text-accent-500 uppercase tracking-widest mb-4">
          {{ catIdx + 1 }} - Informasi Alat Gym
        </div>

        <div class="space-y-4">
          <!-- Photo Upload (Galeri / File) -->
          <ImageUploader 
            v-model="cat.photo" 
            :aspectRatio="1.5"
            @update:model-value="handleUpdateCategory(cat.id, { photo: cat.photo })"
            label="Foto Alat (Upload dari Galeri / File)" 
            helpText="Foto ini akan otomatis muncul di beranda depan." 
          />

          <!-- Deskripsi Alat -->
          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Deskripsi Alat (Tampil untuk Publik)</label>
            <textarea
              v-model="cat.desc_id"
              @blur="handleUpdateCategory(cat.id, { desc_id: cat.desc_id, desc_en: cat.desc_id })"
              rows="3"
              placeholder="Tuliskan deskripsi/penjelasan lengkap mengenai alat tersebut..."
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
            ></textarea>
            <p class="text-[10px] text-slate-400">Deskripsi dan foto ini akan otomatis tampil di halaman depan utama agar publik dapat membaca info penjelasannya.</p>
          </div>
        </div>

        <!-- Equipment Items Sub-list -->
        <div class="mt-6 pt-5 border-t border-slate-100">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-xs font-bold text-primary-900 uppercase tracking-wider">Daftar Peralatan</h4>
            <button
              type="button"
              class="flex items-center gap-1 px-3 py-1.5 border border-primary-200 text-primary-700 rounded-lg text-[10px] font-bold hover:bg-primary-50 transition-colors"
              @click="handleAddItem(cat.id)"
            >
              <i class="fa-solid fa-plus"></i> Tambah Item
            </button>
          </div>

          <!-- Items Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div v-for="(item, itemIdx) in cat.items" :key="item.id"
              class="border border-slate-100 bg-slate-50/50 rounded-xl p-4 relative"
            >
              <!-- Delete Item Button -->
              <button
                type="button"
                class="absolute top-3.5 right-4 text-red-500 hover:text-red-700 text-xs font-medium"
                @click="handleDeleteItem(item.id!, cat.id)"
              >
                Hapus
              </button>

              <div class="text-[10px] font-bold text-slate-400 mb-2">
                Alat {{ itemIdx + 1 }}: {{ item.name_id || 'Baru' }}
              </div>

              <div class="space-y-1">
                <label class="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Nama Alat</label>
                <input
                  type="text"
                  v-model="item.name_id"
                  @blur="handleUpdateItem(item.id!, { name_id: item.name_id, name_en: item.name_id })"
                  required
                  class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-primary-900 bg-white focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
                />
              </div>
            </div>
            <div v-if="!cat.items || cat.items.length === 0" class="col-span-full text-center py-4 text-slate-400 text-xs">
              Belum ada peralatan terdaftar di kategori ini.
            </div>
          </div>
        </div>
      </div>

      <div v-if="admin.equipment.length === 0" class="text-center py-16 text-slate-400">
        <i class="fa-solid fa-dumbbell text-4xl block mb-3 text-slate-200"></i>
        Belum ada data kategori alat.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAdminStore } from '@/stores/admin.store'
import { useToast } from '@/composables/useToast'
import ImageUploader from '@/components/common/ImageUploader.vue'
import { formatImageUrl } from '@/lib/imageHelper'

const admin = useAdminStore()
const toast = useToast()

function handleImgError(e: Event) {
  const target = e.target as HTMLImageElement
  if (target) target.style.display = 'none'
}

onMounted(() => {
  if (admin.equipment.length === 0) {
    admin.fetchAll()
  }
})

async function addNewCategory() {
  const newCatId = 'equip_' + Date.now().toString()
  const payload = {
    id: newCatId,
    name_id: 'Kategori Baru',
    name_en: 'Kategori Baru',
    desc_id: 'Deskripsi kategori alat...',
    desc_en: 'Deskripsi kategori alat...',
    icon: 'fa-dumbbell',
    price: 20000,
    photo: ''
  }
  try {
    const { error } = await admin.addEquipmentCategory(payload)
    if (!error) {
      toast.success('Kategori baru ditambahkan!')
    } else {
      console.error('Add category error:', error)
      toast.error('Gagal menambahkan kategori: ' + error.message)
    }
  } catch (err) {
    console.error('Add category runtime error:', err)
    toast.error('Error: ' + (err as Error).message)
  }
}

async function handleUpdateCategory(id: string, updates: Record<string, unknown>) {
  const { error } = await admin.updateEquipmentCategory(id, updates)
  if (error) {
    console.error('Update category error:', error)
    toast.error('Gagal memperbarui kategori.')
  }
}

async function handleDeleteCategory(id: string) {
  console.log('Delete category ID:', id)
  if (!confirm('Apakah Anda yakin ingin menghapus kategori alat beserta seluruh isinya?')) return
  try {
    const { error } = await admin.deleteEquipmentCategory(id)
    if (!error) {
      toast.success('Kategori berhasil dihapus.')
    } else {
      console.error('Delete category error:', error)
      toast.error('Gagal menghapus kategori: ' + error.message)
    }
  } catch (err) {
    console.error('Delete category runtime error:', err)
    toast.error('Error: ' + (err as Error).message)
  }
}

async function handleAddItem(parentId: string) {
  const payload = {
    parent_id: parentId,
    name_id: 'Alat Baru',
    name_en: 'Alat Baru',
    icon: 'fa-dumbbell'
  }
  try {
    const { error } = await admin.addEquipmentItem(payload)
    if (!error) {
      toast.success('Item alat ditambahkan!')
    } else {
      console.error('Add item error:', error)
      toast.error('Gagal menambahkan item: ' + error.message)
    }
  } catch (err) {
    console.error('Add item runtime error:', err)
    toast.error('Error: ' + (err as Error).message)
  }
}

async function handleUpdateItem(itemId: number, updates: { name_id: string, name_en: string }) {
  const { error } = await admin.updateEquipmentItem(itemId, updates)
  if (error) {
    console.error('Update item error:', error)
    toast.error('Gagal memperbarui item.')
  }
}

async function handleDeleteItem(itemId: number, parentId: string) {
  console.log('Delete item ID:', itemId, 'parentId:', parentId)
  if (!confirm('Hapus item alat ini?')) return
  try {
    const { error } = await admin.deleteEquipmentItem(itemId, parentId)
    if (!error) {
      toast.success('Item alat dihapus.')
    } else {
      console.error('Delete item error:', error)
      toast.error('Gagal menghapus item: ' + error.message)
    }
  } catch (err) {
    console.error('Delete item runtime error:', err)
    toast.error('Error: ' + (err as Error).message)
  }
}
</script>
