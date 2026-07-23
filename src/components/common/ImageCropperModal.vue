<template>
  <div v-if="show" class="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-slate-100 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Header -->
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 class="font-extrabold text-slate-800 text-sm flex items-center gap-2">
          <i class="fa-solid fa-crop text-accent-500"></i> Sesuaikan Posisi Foto
        </h3>
        <button @click="$emit('close')" class="text-slate-400 hover:text-slate-650 transition-colors p-1">
          <i class="fa-solid fa-xmark text-base"></i>
        </button>
      </div>

      <!-- Crop Area -->
      <div class="p-6 flex flex-col items-center justify-center bg-slate-50/50 relative">
        <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3">Geser foto untuk memindahkan posisi</span>
        
        <!-- Viewport Container with Mask Overlay -->
        <div 
          ref="containerRef"
          class="relative overflow-hidden bg-slate-200 border-2 border-accent-500/30 rounded-xl shadow-inner select-none flex items-center justify-center"
          :style="{
            width: viewportWidth + 'px',
            height: viewportHeight + 'px'
          }"
          @mousedown="startDrag"
          @touchstart.passive="startDrag"
          @mousemove="onDrag"
          @touchmove.passive="onDrag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
          @touchend="endDrag"
        >
          <!-- Loaded Image inside Crop Box -->
          <img 
            v-if="imageSrc"
            ref="imageRef"
            :src="imageSrc"
            alt="To Crop"
            class="max-w-none max-h-none pointer-events-none select-none"
            :style="{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${zoom})`,
              width: baseWidth + 'px',
              height: baseHeight + 'px'
            }"
            @load="onImageLoaded"
          />

          <!-- Dimmed Outer Overlay & Crop Border -->
          <div class="absolute inset-0 border-2 border-white rounded-xl pointer-events-none shadow-[0_0_0_9999px_rgba(15,23,42,0.45)]"></div>
        </div>
      </div>

      <!-- Controls Slider -->
      <div class="px-5 py-4 border-t border-slate-100 space-y-4">
        <div class="space-y-1">
          <div class="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <span>Perbesar / Perkecil</span>
            <span class="text-accent-600 font-extrabold">{{ Math.round(zoom * 100) }}%</span>
          </div>
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-magnifying-glass-minus text-slate-400 text-xs"></i>
            <input 
              v-model.number="zoom" 
              type="range" 
              min="1" 
              max="4" 
              step="0.02" 
              class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accent-500 focus:outline-none"
            />
            <i class="fa-solid fa-magnifying-glass-plus text-slate-400 text-xs"></i>
          </div>
        </div>

        <!-- Buttons -->
        <div class="grid grid-cols-2 gap-3 pt-1">
          <button 
            type="button" 
            @click="$emit('close')"
            class="py-2.5 border border-slate-200 hover:bg-slate-50 font-bold text-xs rounded-xl text-slate-600 active:scale-[0.98] transition-all"
          >
            Batal
          </button>
          <button 
            type="button" 
            @click="cropAndSave"
            class="py-2.5 bg-accent-500 text-white font-bold text-xs rounded-xl hover:bg-accent-600 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <i class="fa-solid fa-circle-check"></i> Potong &amp; Simpan
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = withDefaults(defineProps<{
  show: boolean
  imageSrc: string
  aspectRatio: number
}>(), {
  show: false,
  imageSrc: '',
  aspectRatio: 1
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'crop', base64: string): void
}>()

// Fixed base viewport dimensions on screen
const viewportWidth = 280
const viewportHeight = computed(() => 280 / props.aspectRatio)

// Image states
const imageRef = ref<HTMLImageElement | null>(null)
const baseWidth = ref(0)
const baseHeight = ref(0)
const naturalW = ref(0)
const naturalH = ref(0)

// Translation and scale transforms
const zoom = ref(1.0)
const translateX = ref(0)
const translateY = ref(0)

// Drag interactions
const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const initialX = ref(0)
const initialY = ref(0)

// Reset state when modal is toggled
watch(() => props.show, (newVal) => {
  if (newVal) {
    zoom.value = 1.0
    translateX.value = 0
    translateY.value = 0
  }
})

function onImageLoaded(e: Event) {
  const img = e.target as HTMLImageElement
  naturalW.value = img.naturalWidth
  naturalH.value = img.naturalHeight

  // Calculate base width and height to fit as object-cover inside viewport
  const fitScale = Math.max(viewportWidth / img.naturalWidth, viewportHeight.value / img.naturalHeight)
  baseWidth.value = img.naturalWidth * fitScale
  baseHeight.value = img.naturalHeight * fitScale
}

function startDrag(e: MouseEvent | TouchEvent) {
  isDragging.value = true
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
  
  startX.value = clientX
  startY.value = clientY
  initialX.value = translateX.value
  initialY.value = translateY.value
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!isDragging.value) return
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

  const dx = clientX - startX.value
  const dy = clientY - startY.value

  translateX.value = initialX.value + dx
  translateY.value = initialY.value + dy
}

function endDrag() {
  isDragging.value = false
}

// Generate the cropped image via HTML5 Canvas
function cropAndSave() {
  if (!imageRef.value) return

  const canvas = document.createElement('canvas')
  // Export dimensions (target crisp, high-density resolution)
  const targetWidth = 600
  const targetHeight = 600 / props.aspectRatio
  
  canvas.width = targetWidth
  canvas.height = targetHeight

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Fill background white in case of transparent images
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, targetWidth, targetHeight)

  // Scale factor between screen cropbox viewport and exported target resolution
  const resScale = targetWidth / viewportWidth

  // Compute zoomed sizes at export resolution
  const exportBaseWidth = baseWidth.value * resScale
  const exportBaseHeight = baseHeight.value * resScale
  const exportZoomWidth = exportBaseWidth * zoom.value
  const exportZoomHeight = exportBaseHeight * zoom.value

  // Compute translation offsets at export resolution
  const exportTX = translateX.value * resScale
  const exportTY = translateY.value * resScale

  // Top-left coordinates of the drawn image relative to the export canvas
  const dx = targetWidth / 2 - exportZoomWidth / 2 + exportTX
  const dy = targetHeight / 2 - exportZoomHeight / 2 + exportTY

  // Draw the image
  ctx.drawImage(imageRef.value, dx, dy, exportZoomWidth, exportZoomHeight)

  // Export as high-quality lightweight JPEG
  const croppedBase64 = canvas.toDataURL('image/jpeg', 0.85)
  emit('crop', croppedBase64)
}
</script>

<style scoped>
/* Slider Track Styling for custom appeal */
input[type="range"]::-webkit-slider-runnable-track {
  background: transparent;
}
</style>
