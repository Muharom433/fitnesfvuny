<template>
  <div class="space-y-1.5">
    <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{{ label }}</label>
    <input
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      :required="required"
      class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  modelValue?: string | number
  placeholder?: string
  type?: string
  required?: boolean
}>()
const emit = defineEmits<{ (e: 'update:modelValue', val: string): void }>()
</script>
