<template>
  <div class="flex items-center justify-center">
    <div
      class="animate-spin rounded-full border-4 border-primary-100 border-t-accent-500"
      :style="{ width: size + 'px', height: size + 'px' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ size?: number }>()
</script>
