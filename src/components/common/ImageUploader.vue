<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between">
      <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
        {{ label }}
      </label>
      <button 
        type="button" 
        @click="showUrlInput = !showUrlInput"
        class="text-[10px] text-accent-600 hover:text-accent-700 font-semibold underline focus:outline-none"
      >
        {{ showUrlInput ? 'Gunakan Upload Galeri' : 'Gunakan Link URL (Opsional)' }}
      </button>
    </div>

    <!-- Mode 1: File Upload / Gallery Selection (Primary) -->
    <div v-if="!showUrlInput">
      <!-- Hidden file input -->
      <input 
        ref="fileInputRef" 
        type="file" 
        accept="image/*" 
        class="hidden" 
        @change="handleFileChange"
      />

      <!-- Has Selected Image Preview -->
      <div v-if="modelValue && formatImageUrl(modelValue)" class="relative bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between gap-3 group">
        <div class="flex items-center gap-3.5 min-w-0">
          <img 
            :src="formatImageUrl(modelValue)" 
            alt="Preview" 
            class="w-16 h-16 rounded-lg object-cover border border-slate-200 shadow-xs flex-shrink-0 bg-white" 
            @error="handleImgError"
          />
          <div class="min-w-0">
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-250">
              <i class="fa-solid fa-check text-[9px]"></i> Foto Siap
            </span>
            <p class="text-xs font-bold text-slate-700 mt-1">Foto Berhasil Dipilih</p>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-shrink-0">
          <button 
            type="button" 
            @click="openCropperWithCurrent"
            class="px-2.5 py-1.5 bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 hover:border-slate-350 font-semibold text-xs rounded-lg transition-all flex items-center gap-1 shadow-2xs"
            title="Geser atau ubah zoom foto"
          >
            <i class="fa-solid fa-crop text-accent-500"></i> Atur Posisi
          </button>
          <button 
            type="button" 
            @click="triggerFilePicker"
            class="px-2.5 py-1.5 bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 font-semibold text-xs rounded-lg transition-all flex items-center gap-1 shadow-2xs"
          >
            <i class="fa-solid fa-image text-slate-400"></i> Ganti
          </button>
          <button 
            type="button" 
            @click="clearPhoto"
            class="p-1.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition-all"
            title="Hapus foto"
          >
            <i class="fa-solid fa-trash-can text-sm"></i>
          </button>
        </div>
      </div>

      <!-- No Image Selected Drop / Click Area -->
      <div 
        v-else 
        @click="triggerFilePicker"
        class="border-2 border-dashed border-slate-300 hover:border-accent-400 bg-slate-50/70 hover:bg-accent-50/30 rounded-xl p-4 text-center cursor-pointer transition-all duration-200 group"
      >
        <div class="w-10 h-10 mx-auto rounded-full bg-accent-100 text-accent-600 flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-200 mb-2">
          <i class="fa-solid fa-cloud-arrow-up"></i>
        </div>
        <p class="text-xs font-extrabold text-slate-700 group-hover:text-accent-700">
          Klik untuk Pilih Foto dari Galeri
        </p>
        <p class="text-[10px] text-slate-400 mt-0.5">
          Mendukung JPG, PNG, WEBP dari perangkat HP / Komputer
        </p>
      </div>
    </div>

    <!-- Mode 2: Link URL Input (Fallback) -->
    <div v-else class="space-y-2">
      <input 
        :value="modelValue" 
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        type="text" 
        placeholder="https://... (Link Foto / Google Drive)" 
        class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
      />
      <div v-if="modelValue && formatImageUrl(modelValue)" class="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
        <img :src="formatImageUrl(modelValue)" alt="Preview" class="w-12 h-12 rounded-lg object-cover border border-slate-200" @error="handleImgError" />
        <span class="text-xs text-slate-500 font-semibold">Preview Link Foto</span>
      </div>
    </div>

    <p v-if="helpText" class="text-[10px] text-slate-400 leading-tight">
      {{ helpText }}
    </p>

    <!-- Interactive Image Cropper Modal -->
    <ImageCropperModal
      :show="showCropper"
      :image-src="cropperImageSrc"
      :aspect-ratio="aspectRatio"
      @close="showCropper = false"
      @crop="onCropped"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatImageUrl } from '@/lib/imageHelper'
import ImageCropperModal from '@/components/common/ImageCropperModal.vue'

const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  helpText?: string
  aspectRatio?: number
}>(), {
  modelValue: '',
  label: 'Foto (Upload dari Galeri)',
  helpText: '',
  aspectRatio: 1
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const showUrlInput = ref(false)

// Cropper refs & states
const showCropper = ref(false)
const cropperImageSrc = ref('')

function triggerFilePicker() {
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
    fileInputRef.value.click()
  }
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    cropperImageSrc.value = e.target?.result as string
    showCropper.value = true
  }
  reader.readAsDataURL(file)
}

function openCropperWithCurrent() {
  if (props.modelValue) {
    cropperImageSrc.value = formatImageUrl(props.modelValue)
    showCropper.value = true
  }
}

function onCropped(base64: string) {
  emit('update:modelValue', base64)
  showCropper.value = false
}

function clearPhoto() {
  emit('update:modelValue', '')
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

function handleImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = '/assets/logo.png'
}
</script>
