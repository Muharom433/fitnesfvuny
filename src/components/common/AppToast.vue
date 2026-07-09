<template>
  <Teleport to="body">
    <div class="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
      <TransitionGroup name="toast" tag="div" class="flex flex-col gap-3">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-start gap-3 min-w-[300px] max-w-[420px] px-4 py-3 rounded-xl shadow-xl border backdrop-blur-md text-sm font-medium cursor-pointer transition-all"
          :class="toastClass(toast.type)"
          @click="remove(toast.id)"
        >
          <i :class="['mt-0.5 text-base', iconClass(toast.type)]"></i>
          <span class="flex-1 leading-snug">{{ toast.message }}</span>
          <button class="opacity-60 hover:opacity-100 transition-opacity ml-1 text-xs">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { toasts, remove } = useToast()

function toastClass(type: string) {
  switch (type) {
    case 'success': return 'bg-emerald-50/95 border-emerald-200 text-emerald-800'
    case 'error':   return 'bg-red-50/95 border-red-200 text-red-800'
    case 'warning': return 'bg-amber-50/95 border-amber-200 text-amber-800'
    default:        return 'bg-blue-50/95 border-blue-200 text-blue-800'
  }
}

function iconClass(type: string) {
  switch (type) {
    case 'success': return 'fa-solid fa-circle-check text-emerald-500'
    case 'error':   return 'fa-solid fa-circle-xmark text-red-500'
    case 'warning': return 'fa-solid fa-triangle-exclamation text-amber-500'
    default:        return 'fa-solid fa-circle-info text-blue-500'
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}
</style>
