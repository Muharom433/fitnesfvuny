<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-extrabold text-primary-900">{{ title }}</h2>
        <p class="text-slate-400 text-xs">{{ items.length }} item terdaftar</p>
      </div>
      <button @click="emit('add')" class="flex items-center gap-2 px-4 py-2.5 bg-accent-500 text-white rounded-xl text-xs font-bold hover:bg-accent-600 transition-colors shadow-sm">
        <i class="fa-solid fa-plus"></i> Tambah
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="bg-slate-50">
              <th v-for="col in columns" :key="col.key" class="px-5 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">
                {{ col.label }}
              </th>
              <th class="px-5 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="item in items" :key="(item as any).id" class="hover:bg-slate-50/60 transition-colors">
              <td v-for="col in columns" :key="col.key" class="px-5 py-3 text-slate-700">
                {{ col.format ? col.format((item as any)[col.key]) : (item as any)[col.key] }}
              </td>
              <td class="px-5 py-3">
                <div class="flex gap-1.5">
                  <button @click="emit('edit', item)" class="text-[10px] font-bold px-2.5 py-1 border border-primary-200 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors">
                    <i class="fa-solid fa-pen-to-square mr-1"></i>Edit
                  </button>
                  <button @click="emit('delete', (item as any).id)" class="text-[10px] font-bold px-2.5 py-1 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="items.length === 0">
              <td :colspan="columns.length + 1" class="text-center py-12 text-slate-400">
                <i class="fa-solid fa-inbox text-3xl block mb-2 text-slate-200"></i>
                Belum ada data. Klik "Tambah" untuk menambahkan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal slot — always rendered, v-if is handled by child component -->
    <slot name="modal" />
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string
  label: string
  format?: (v: any) => string
}

defineProps<{
  title: string
  items: unknown[]
  columns: Column[]
}>()

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'edit', item: unknown): void
  (e: 'delete', id: string): void
}>()
</script>
