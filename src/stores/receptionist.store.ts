import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import type { KasirTransaction, ProductSale } from '@/types/booking'

export const useReceptionistStore = defineStore('receptionist', () => {
  const transactions = ref<KasirTransaction[]>([])
  const productSales = ref<ProductSale[]>([])
  const isLoading = ref(false)

  // Computed total pendapatan hari ini (Kunjungan + Penjualan Produk)
  const todayRevenue = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    const visitRev = transactions.value
      .filter(t => t.date === today && t.category !== 'Member (Token)')
      .reduce((sum, t) => sum + t.amount, 0)
    const productRev = productSales.value
      .filter(s => s.date === today)
      .reduce((sum, s) => sum + s.total, 0)
    return visitRev + productRev
  })

  const todayVisitors = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return transactions.value.filter(t => t.date === today && t.type === 'visit' && t.category !== 'Member (Token)').length
  })

  // ── LocalStorage helpers (cache/fallback only) ──────────────────────────
  function _cacheToLocalStorage() {
    try {
      localStorage.setItem('fitnesuny_kasir_transactions', JSON.stringify(transactions.value))
      localStorage.setItem('fitnesuny_product_sales', JSON.stringify(productSales.value))
    } catch { /* ignore quota errors */ }
  }

  function loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem('fitnesuny_kasir_transactions')
      if (stored) transactions.value = JSON.parse(stored)
      const storedSales = localStorage.getItem('fitnesuny_product_sales')
      if (storedSales) productSales.value = JSON.parse(storedSales)
    } catch { /* ignore */ }
  }

  // ── Supabase persistence ────────────────────────────────────────────────
  async function fetchTransactionsFromSupabase() {
    try {
      const { data, error } = await supabase
        .from('kasir_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500)
      if (error) throw error
      if (data) {
        // Map snake_case DB columns to camelCase KasirTransaction interface
        transactions.value = data.map((row: any) => ({
          id: row.id,
          date: row.date,
          time: row.time,
          name: row.name,
          phone: row.phone,
          civitas: row.civitas,
          category: row.category,
          duration: row.duration,
          trainer: row.trainer,
          kelas: row.kelas,
          alat: row.alat,
          nim: row.nim,
          amount: row.amount,
          paymentMethod: row.payment_method,
          status: row.status,
          type: row.type,
          token: row.token,
        }))
        _cacheToLocalStorage()
      }
    } catch (err) {
      console.warn('Supabase fetch failed, using localStorage cache:', err)
      loadFromLocalStorage()
    }
  }

  async function fetchProductSalesFromSupabase() {
    try {
      const { data, error } = await supabase
        .from('product_sales')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500)
      if (error) throw error
      if (data) {
        productSales.value = data.map((row: any) => ({
          id: row.id,
          date: row.transaction_date || row.date,
          productName: row.product_name,
          qty: row.qty,
          price: row.price,
          total: row.qty * row.price,
          paymentMethod: row.bank_name || row.payment_method,
        }))
        _cacheToLocalStorage()
      }
    } catch (err) {
      console.warn('Supabase product sales fetch failed, using cache:', err)
    }
  }

  async function addTransaction(tx: KasirTransaction) {
    // Add to local state immediately (optimistic)
    transactions.value.unshift(tx)
    _cacheToLocalStorage()

    // Persist to Supabase
    try {
      await supabase.from('kasir_transactions').upsert({
        id: tx.id,
        date: tx.date,
        time: tx.time,
        name: tx.name,
        phone: tx.phone,
        civitas: tx.civitas,
        category: tx.category,
        duration: tx.duration,
        trainer: tx.trainer,
        kelas: tx.kelas,
        alat: tx.alat,
        nim: tx.nim,
        amount: tx.amount,
        payment_method: tx.paymentMethod,
        status: tx.status,
        type: tx.type,
        token: tx.token || null,
      })
    } catch (err) {
      console.warn('Failed to persist transaction to Supabase:', err)
    }
  }

  async function addProductSale(sale: ProductSale) {
    productSales.value.unshift(sale)
    _cacheToLocalStorage()

    try {
      await supabase.from('product_sales').upsert({
        id: sale.id,
        invoice_id: 'INV-' + Date.now(),
        buyer_name: 'Walk-in Buyer',
        buyer_phone: '-',
        product_name: sale.productName,
        qty: sale.qty,
        price: sale.price,
        bank_name: sale.paymentMethod,
        transaction_date: sale.date,
        delivery_method: 'Direct'
      })
    } catch (err) {
      console.warn('Failed to persist product sale to Supabase:', err)
    }
  }

  async function removeTransaction(id: string) {
    transactions.value = transactions.value.filter(t => t.id !== id)
    _cacheToLocalStorage()
    try {
      await supabase.from('kasir_transactions').delete().eq('id', id)
    } catch (err) {
      console.warn('Failed to delete transaction from Supabase:', err)
    }
  }

  async function removeProductSale(id: string) {
    productSales.value = productSales.value.filter(s => s.id !== id)
    _cacheToLocalStorage()
    try {
      await supabase.from('product_sales').delete().eq('id', id)
    } catch (err) {
      console.warn('Failed to delete product sale from Supabase:', err)
    }
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
    fetchTransactionsFromSupabase,
    fetchProductSalesFromSupabase,
    addTransaction,
    addProductSale,
    removeTransaction,
    removeProductSale,
    fetchBookings,
  }
})
