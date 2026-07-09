<template>
  <div class="flex gap-3 pt-2">
    <button type="button" @click="emit('cancel')" class="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">Batal</button>
    <button type="submit" :disabled="saving" class="flex-1 py-2.5 rounded-xl bg-accent-500 text-white text-sm font-bold hover:bg-accent-600 transition-colors disabled:opacity-60">
      {{ saving ? 'Menyimpan...' : 'Simpan' }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ saving?: boolean }>()
const emit = defineEmits<{ (e: 'cancel'): void }>()
</script>
