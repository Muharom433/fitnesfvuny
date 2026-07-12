import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import type { KasirTransaction, ProductSale } from '@/types/booking'

export const useReceptionistStore = defineStore('receptionist', () => {
  const transactions = ref<KasirTransaction[]>([])
  const productSales = ref<ProductSale[]>([])
  const isLoading = ref(false)

  // Computed total pendapatan hari ini
  const todayRevenue = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return transactions.value
      .filter(t => t.date === today)
      .reduce((sum, t) => sum + t.amount, 0)
  })

  const todayVisitors = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return transactions.value.filter(t => t.date === today && t.type === 'visit').length
  })

  function loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem('fitnesuny_kasir_transactions')
      if (stored) transactions.value = JSON.parse(stored)
      const storedSales = localStorage.getItem('fitnesuny_product_sales')
      if (storedSales) productSales.value = JSON.parse(storedSales)
    } catch {
      // ignore
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem('fitnesuny_kasir_transactions', JSON.stringify(transactions.value))
    localStorage.setItem('fitnesuny_product_sales', JSON.stringify(productSales.value))
  }

  function addTransaction(tx: KasirTransaction) {
    transactions.value.unshift(tx)
    saveToLocalStorage()
  }

  function addProductSale(sale: ProductSale) {
    productSales.value.unshift(sale)
    saveToLocalStorage()
  }

  function removeTransaction(id: string) {
    transactions.value = transactions.value.filter(t => t.id !== id)
    saveToLocalStorage()
  }

  function removeProductSale(id: string) {
    productSales.value = productSales.value.filter(s => s.id !== id)
    saveToLocalStorage()
  }

  async function fetchBookings() {
    isLoading.value = true
    try {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200)
      return data
    } finally {
      isLoading.value = false
    }
  }

  return {
    transactions,
    productSales,
    isLoading,
    todayRevenue,
    todayVisitors,
    loadFromLocalStorage,
    addTransaction,
    addProductSale,
    removeTransaction,
    removeProductSale,
    fetchBookings,
  }
})
