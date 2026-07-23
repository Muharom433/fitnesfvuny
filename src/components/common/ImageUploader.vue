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
            :class="['w-16 h-16 rounded-lg object-cover border border-slate-200 shadow-xs flex-shrink-0 bg-white transition-all duration-300', getImagePositionClass(modelValue)]"
            @error="handleImgError"
          />
          <div class="min-w-0">
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-250">
              <i class="fa-solid fa-check text-[9px]"></i> Foto Siap
            </span>
            <p class="text-xs font-bold text-slate-700 truncate mt-1">Foto Berhasil Dipilih</p>
            <div class="mt-1.5 flex flex-col gap-1">
              <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Posisi Fokus Tampilan:</span>
              <div class="flex gap-1.5">
                <button
                  v-for="pos in ['top', 'center', 'bottom']"
                  :key="pos"
                  type="button"
                  @click="setPosition(pos)"
                  :class="[
                    'px-2 py-1 text-[9px] font-bold rounded-lg border transition-all active:scale-[0.98]',
                    currentPosition === pos
                      ? 'bg-accent-500 text-white border-accent-500 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  ]"
                >
                  {{ pos === 'top' ? 'Atas' : pos === 'bottom' ? 'Bawah' : 'Tengah' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-shrink-0">
          <button 
            type="button" 
            @click="triggerFilePicker"
            class="px-2.5 py-1.5 bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 font-semibold text-xs rounded-lg transition-all flex items-center gap-1 shadow-2xs"
          >
            <i class="fa-solid fa-image text-accent-500"></i> Ganti
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatImageUrl, getImagePositionClass, cleanImageUrl } from '@/lib/imageHelper'

const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  helpText?: string
}>(), {
  modelValue: '',
  label: 'Foto (Upload dari Galeri)',
  helpText: 'Pilih foto dari galeri HP/komputer. Foto langsung otomatis muncul di beranda depan.'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const currentPosition = computed(() => {
  if (!props.modelValue) return 'center'
  if (props.modelValue.startsWith('[POS:top]:')) return 'top'
  if (props.modelValue.startsWith('[POS:bottom]:')) return 'bottom'
  return 'center'
})

function setPosition(pos: string) {
  const clean = cleanImageUrl(props.modelValue)
  if (!clean) return
  emit('update:modelValue', `[POS:${pos}]:${clean}`)
}

const fileInputRef = ref<HTMLInputElement | null>(null)
const showUrlInput = ref(false)

function triggerFilePicker() {
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
    fileInputRef.value.click()
  }
}

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  try {
    const base64Data = await compressImage(file)
    emit('update:modelValue', base64Data)
  } catch (err) {
    console.error('Failed to compress/read image:', err)
    alert('Gagal memproses gambar. Silakan coba file gambar lainnya.')
  }
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

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        const maxDim = 900 // Max width/height 900px for crisp details & lightweight payload
        
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width)
            width = maxDim
          } else {
            width = Math.round((width * maxDim) / height)
            height = maxDim
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height)
          // Compress to JPEG format with 0.82 quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.82)
          resolve(dataUrl)
        } else {
          resolve(e.target?.result as string)
        }
      }
      img.onerror = () => reject(new Error('Gagal memuat gambar'))
      img.src = e.target?.result as string
    }
    reader.onerror = (err) => reject(err)
    reader.readAsDataURL(file)
  })
}
</script>
