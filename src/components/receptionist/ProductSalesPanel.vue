<template>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-5">
    <!-- Form -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-card p-6">
      <h3 class="font-extrabold text-primary-900 text-sm mb-5">
        <i class="fa-solid fa-bag-shopping text-accent-500 mr-2"></i>Kasir Produk
      </h3>
      <form @submit.prevent="submitSale" class="space-y-4">
        <!-- Product Dropdown -->
        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pilih Produk</label>
          <select v-model="selectedProductId" required class="input-field">
            <option value="">-- Pilih Produk --</option>
            <option v-for="p in adminStore.products" :key="p.id" :value="p.id">
              {{ p.name_id }} - Rp {{ p.price.toLocaleString('id-ID') }}
            </option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Harga Satuan (Rp)</label>
          <input :value="form.price" type="text" readonly class="input-field bg-slate-100 cursor-not-allowed" />
        </div>

        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Jumlah</label>
          <input v-model.number="form.qty" type="number" min="1" required class="input-field" />
        </div>

        <div class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Metode Bayar</label>
          <select v-model="form.paymentMethod" required class="input-field">
            <option value="Tunai">Tunai</option>
            <option value="Transfer Bank">Transfer Bank</option>
            <option value="QRIS">QRIS</option>
          </select>
        </div>

        <!-- Bank Select (if Transfer Bank) -->
        <div v-if="form.paymentMethod === 'Transfer Bank'" class="space-y-1.5">
          <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pilih Bank</label>
          <select v-model="form.selectedBank" required class="input-field">
            <option value="">-- Pilih Bank --</option>
            <option v-for="b in bankList" :key="b.key" :value="`${b.name} (${b.number})`">
              {{ b.name }} - {{ b.number }}
            </option>
            <option v-if="bankList.length === 0" disabled>Belum ada bank diatur admin</option>
          </select>
        </div>

        <div class="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
          <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Pembayaran</p>
          <p class="text-xl font-extrabold text-primary-900">Rp {{ (form.price * form.qty).toLocaleString('id-ID') }}</p>
        </div>

        <button type="submit" class="w-full py-3 bg-accent-500 text-white font-bold text-sm rounded-xl hover:bg-accent-600 transition-colors shadow-sm">
          <i class="fa-solid fa-circle-check mr-2"></i>Proses Penjualan
        </button>
      </form>
    </div>

    <!-- Sales Log -->
    <div class="xl:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100">
        <h3 class="font-extrabold text-primary-900 text-sm">Log Penjualan Produk</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="bg-slate-50">
              <th class="px-5 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Produk</th>
              <th class="px-5 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Qty</th>
              <th class="px-5 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Harga</th>
              <th class="px-5 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Total</th>
              <th class="px-5 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Metode</th>
              <th class="px-5 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Tanggal</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="s in recStore.productSales" :key="s.id" class="hover:bg-slate-50/60 transition-colors">
              <td class="px-5 py-3 font-semibold text-primary-900">{{ s.productName }}</td>
              <td class="px-5 py-3 text-slate-500">{{ s.qty }}x</td>
              <td class="px-5 py-3 text-slate-500">Rp {{ s.price.toLocaleString('id-ID') }}</td>
              <td class="px-5 py-3 font-bold text-emerald-600">Rp {{ s.total.toLocaleString('id-ID') }}</td>
              <td class="px-5 py-3 text-slate-500">{{ s.paymentMethod }}</td>
              <td class="px-5 py-3 text-slate-400">{{ s.date }}</td>
            </tr>
            <tr v-if="recStore.productSales.length === 0">
              <td colspan="6" class="text-center py-12 text-slate-400">
                <i class="fa-solid fa-bag-shopping text-3xl block mb-2 text-slate-200"></i>
                Belum ada penjualan produk.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useReceptionistStore } from '@/stores/receptionist.store'
import { useAdminStore } from '@/stores/admin.store'
import { useToast } from '@/composables/useToast'
import type { ProductSale } from '@/types/booking'

const recStore = useReceptionistStore()
const adminStore = useAdminStore()
const toast = useToast()

const selectedProductId = ref('')
const bankList = ref<{ key: string; name: string; number: string }[]>([])

const form = reactive({
  productName: '',
  price: 0,
  qty: 1,
  paymentMethod: 'Tunai',
  selectedBank: ''
})

// Load banks from localStorage
onMounted(() => {
  adminStore.fetchAll()
  const stored = localStorage.getItem('fit_uny_banks')
  if (stored) {
    try {
      bankList.value = JSON.parse(stored)
    } catch {
      bankList.value = []
    }
  }
})

// Automatically set product details when a product is selected
const selectedProduct = computed(() =>
  adminStore.products.find(p => p.id === selectedProductId.value)
)

watch(selectedProduct, (prod) => {
  if (prod) {
    form.productName = prod.name_id
    form.price = prod.price
  } else {
    form.productName = ''
    form.price = 0
  }
})

function submitSale() {
  if (!form.productName) {
    toast.error('Silakan pilih produk terlebih dahulu!')
    return
  }

  const finalMethod = form.paymentMethod === 'Transfer Bank' && form.selectedBank
    ? `Transfer Bank - ${form.selectedBank}`
    : form.paymentMethod

  const sale: ProductSale = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('id-ID'),
    productName: form.productName,
    qty: form.qty,
    price: form.price,
    total: form.price * form.qty,
    paymentMethod: finalMethod,
  }

  recStore.addProductSale(sale)
  toast.success(`Penjualan ${form.productName} (${form.qty}x) berhasil dicatat!`)
  
  // Reset form
  selectedProductId.value = ''
  Object.assign(form, {
    productName: '',
    price: 0,
    qty: 1,
    paymentMethod: 'Tunai',
    selectedBank: ''
  })
}
</script>
