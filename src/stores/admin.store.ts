import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { Trainer, GymClass, Equipment, EquipmentItem, Product, Booking, Pricing } from '@/types/booking'

export const useAdminStore = defineStore('admin', () => {
  const trainers = ref<Trainer[]>([])
  const classes = ref<GymClass[]>([])
  const equipment = ref<Equipment[]>([])
  const products = ref<Product[]>([])
  const bookings = ref<Booking[]>([])
  const pricing = ref<Pricing[]>([])
  const isLoading = ref(false)

  async function fetchAll() {
    isLoading.value = true
    try {
      const [t, c, e, p, b, pr] = await Promise.all([
        supabase.from('trainers').select('*').order('name'),
        supabase.from('classes').select('*').order('name_id'),
        supabase.from('equipment').select('*, equipment_items(*)').order('name_id'),
        supabase.from('products').select('*').order('name_id'),
        supabase.from('bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('pricing').select('*'),
      ])
      if (t.data) trainers.value = t.data as Trainer[]
      if (c.data) classes.value = c.data as GymClass[]
      if (e.data) {
        // Map equipment_items to items
        equipment.value = (e.data as any[]).map(row => ({
          ...row,
          items: row.equipment_items ?? [],
        })) as Equipment[]
      }
      if (p.data) products.value = p.data as Product[]
      if (b.data) bookings.value = b.data as Booking[]
      if (pr.data) {
        pricing.value = (pr.data as any[]).map(row => ({
          id: row.profile,
          category_name_id: row.profile === 'student' ? 'UNY (MAHASISWA, TENDIK/DOSEN)' : row.profile === 'alumni' ? 'ALUMNI UNY' : 'UMUM',
          category_name_en: row.profile === 'student' ? 'UNY Student' : row.profile === 'alumni' ? 'UNY Alumni' : 'General Public',
          registration_fee: Number(row.registration_fee),
          incidental_fee: Number(row.incidental_fee),
          membership_tariffs: {
            '1': Number(row.member_1_month_fee),
            '3': Number(row.member_3_month_fee)
          },
          updated_at: row.updated_at
        })) as Pricing[]
      }
    } catch (err) {
      console.error('fetchAll error:', err)
    } finally {
      isLoading.value = false
    }
  }

  // =====================
  // TRAINERS CRUD (Optimistic)
  // =====================
  async function addTrainer(trainer: Omit<Trainer, 'created_at'>) {
    trainers.value.push(trainer as Trainer)
    const { data, error } = await supabase.from('trainers').insert(trainer).select().single()
    if (error) {
      trainers.value = trainers.value.filter(t => t.id !== trainer.id)
      console.error('addTrainer db error:', error)
    } else if (data) {
      const idx = trainers.value.findIndex(t => t.id === trainer.id)
      if (idx !== -1) trainers.value[idx] = data as Trainer
    }
    return { data, error }
  }

  async function updateTrainer(id: string, updates: Partial<Trainer>) {
    const idx = trainers.value.findIndex(t => t.id === id)
    let oldVal: Trainer | null = null
    if (idx !== -1) {
      oldVal = { ...trainers.value[idx] }
      trainers.value[idx] = { ...trainers.value[idx], ...updates }
    }
    const { data, error } = await supabase.from('trainers').update(updates).eq('id', id).select().single()
    if (error) {
      if (idx !== -1 && oldVal) trainers.value[idx] = oldVal
      console.error('updateTrainer db error:', error)
    } else if (data && idx !== -1) {
      trainers.value[idx] = data as Trainer
    }
    return { data, error }
  }

  async function deleteTrainer(id: string) {
    const backup = [...trainers.value]
    trainers.value = trainers.value.filter(t => t.id !== id)
    const { error } = await supabase.from('trainers').delete().eq('id', id)
    if (error) {
      trainers.value = backup
      console.error('deleteTrainer db error:', error)
    }
    return { error }
  }

  // =====================
  // CLASSES CRUD (Optimistic)
  // =====================
  async function addClass(kelas: Omit<GymClass, 'created_at'>) {
    classes.value.push(kelas as GymClass)
    const { data, error } = await supabase.from('classes').insert(kelas).select().single()
    if (error) {
      classes.value = classes.value.filter(c => c.id !== kelas.id)
      console.error('addClass db error:', error)
    } else if (data) {
      const idx = classes.value.findIndex(c => c.id === kelas.id)
      if (idx !== -1) classes.value[idx] = data as GymClass
    }
    return { data, error }
  }

  async function updateClass(id: string, updates: Partial<GymClass>) {
    const idx = classes.value.findIndex(c => c.id === id)
    let oldVal: GymClass | null = null
    if (idx !== -1) {
      oldVal = { ...classes.value[idx] }
      classes.value[idx] = { ...classes.value[idx], ...updates }
    }
    const { data, error } = await supabase.from('classes').update(updates).eq('id', id).select().single()
    if (error) {
      if (idx !== -1 && oldVal) classes.value[idx] = oldVal
      console.error('updateClass db error:', error)
    } else if (data && idx !== -1) {
      classes.value[idx] = data as GymClass
    }
    return { data, error }
  }

  async function deleteClass(id: string) {
    const backup = [...classes.value]
    classes.value = classes.value.filter(c => c.id !== id)
    const { error } = await supabase.from('classes').delete().eq('id', id)
    if (error) {
      classes.value = backup
      console.error('deleteClass db error:', error)
    }
    return { error }
  }

  // =====================
  // PRODUCTS CRUD (Optimistic)
  // =====================
  async function addProduct(product: Omit<Product, 'created_at'>) {
    products.value.push(product as Product)
    const { data, error } = await supabase.from('products').insert(product).select().single()
    if (error) {
      products.value = products.value.filter(p => p.id !== product.id)
      console.error('addProduct db error:', error)
    } else if (data) {
      const idx = products.value.findIndex(p => p.id === product.id)
      if (idx !== -1) products.value[idx] = data as Product
    }
    return { data, error }
  }

  async function updateProduct(id: string, updates: Partial<Product>) {
    const idx = products.value.findIndex(p => p.id === id)
    let oldVal: Product | null = null
    if (idx !== -1) {
      oldVal = { ...products.value[idx] }
      products.value[idx] = { ...products.value[idx], ...updates }
    }
    const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single()
    if (error) {
      if (idx !== -1 && oldVal) products.value[idx] = oldVal
      console.error('updateProduct db error:', error)
    } else if (data && idx !== -1) {
      products.value[idx] = data as Product
    }
    return { data, error }
  }

  async function deleteProduct(id: string) {
    const backup = [...products.value]
    products.value = products.value.filter(p => p.id !== id)
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      products.value = backup
      console.error('deleteProduct db error:', error)
    }
    return { error }
  }

  // =====================
  // BOOKINGS
  // =====================
  async function updateBookingStatus(id: string, status: 'Approved' | 'Cancelled') {
    const idx = bookings.value.findIndex(b => b.id === id)
    let oldVal: Booking | null = null
    if (idx !== -1) {
      oldVal = { ...bookings.value[idx] }
      bookings.value[idx] = { ...bookings.value[idx], status }
    }
    const { data, error } = await supabase.from('bookings').update({ status }).eq('id', id).select().single()
    if (error) {
      if (idx !== -1 && oldVal) bookings.value[idx] = oldVal
      console.error('updateBookingStatus db error:', error)
    }
    return { data, error }
  }

  // =====================
  // EQUIPMENT CRUD (Optimistic)
  // =====================
  async function addEquipmentCategory(cat: Record<string, unknown>) {
    const newCat: Equipment = { ...(cat as any), items: [] }
    equipment.value.push(newCat)
    const { id, name_id, name_en, desc_id, desc_en, icon, price } = cat as any
    const { data, error } = await supabase.from('equipment').insert({ id, name_id, name_en, desc_id, desc_en, icon, price }).select().single()
    if (error) {
      equipment.value = equipment.value.filter(e => e.id !== (cat as any).id)
      console.error('addEquipmentCategory db error:', error)
    } else if (data) {
      const idx = equipment.value.findIndex(e => e.id === (cat as any).id)
      if (idx !== -1) equipment.value[idx] = { ...data, items: [] } as Equipment
    }
    return { data, error }
  }

  async function updateEquipmentCategory(id: string, updates: Partial<Equipment>) {
    const idx = equipment.value.findIndex(e => e.id === id)
    if (idx !== -1) {
      equipment.value[idx] = { ...equipment.value[idx], ...updates }
    }
    const { name_id, name_en, price } = updates as any
    const payload: Record<string, unknown> = {}
    if (name_id !== undefined) { payload.name_id = name_id; payload.name_en = name_en ?? name_id }
    if (price !== undefined) payload.price = price
    const { data, error } = await supabase.from('equipment').update(payload).eq('id', id).select().single()
    if (error) {
      console.error('updateEquipmentCategory db error:', error)
    }
    return { data, error }
  }

  async function deleteEquipmentCategory(id: string) {
    const backup = JSON.parse(JSON.stringify(equipment.value))
    equipment.value = equipment.value.filter(e => e.id !== id)
    const { error } = await supabase.from('equipment').delete().eq('id', id)
    if (error) {
      equipment.value = backup
      console.error('deleteEquipmentCategory db error:', error)
    }
    return { error }
  }

  async function addEquipmentItem(item: { parent_id: string, name_id: string, name_en: string, icon: string }) {
    const tempId = -Math.round(Math.random() * 1000000)
    const cat = equipment.value.find(e => e.id === item.parent_id)
    if (cat) {
      if (!cat.items) cat.items = []
      cat.items.push({ id: tempId, name_id: item.name_id, name_en: item.name_en, icon: item.icon, parent_id: item.parent_id })
    }
    const { data, error } = await supabase.from('equipment_items').insert(item).select().single()
    if (error) {
      if (cat && cat.items) cat.items = cat.items.filter(i => i.id !== tempId)
      console.error('addEquipmentItem db error:', error)
    } else if (data && cat && cat.items) {
      const idx = cat.items.findIndex(i => i.id === tempId)
      if (idx !== -1) cat.items[idx] = data as EquipmentItem
    }
    return { data, error }
  }

  async function updateEquipmentItem(id: number, updates: { name_id: string, name_en: string }) {
    let foundCat: Equipment | null = null
    let foundIdx = -1
    let oldVal: EquipmentItem | null = null
    for (const cat of equipment.value) {
      if (cat.items) {
        const idx = cat.items.findIndex(item => item.id === id)
        if (idx !== -1) {
          oldVal = { ...cat.items[idx] }
          cat.items[idx] = { ...cat.items[idx], ...updates }
          foundCat = cat
          foundIdx = idx
          break
        }
      }
    }
    const { data, error } = await supabase.from('equipment_items').update(updates).eq('id', id).select().single()
    if (error) {
      if (foundCat && foundIdx !== -1 && oldVal) foundCat.items![foundIdx] = oldVal
      console.error('updateEquipmentItem db error:', error)
    }
    return { data, error }
  }

  async function deleteEquipmentItem(id: number, parent_id: string) {
    const cat = equipment.value.find(e => e.id === parent_id)
    const backup: EquipmentItem[] = cat?.items ? [...cat.items] : []
    if (cat && cat.items) {
      cat.items = cat.items.filter(item => item.id !== id)
    }
    const { error } = await supabase.from('equipment_items').delete().eq('id', id)
    if (error) {
      if (cat) cat.items = backup
      console.error('deleteEquipmentItem db error:', error)
    }
    return { error }
  }

  // =====================
  // PRICING
  // =====================
  async function updatePricing(id: string, updates: Partial<Pricing>) {
    const idx = pricing.value.findIndex(p => p.id === id)
    let oldVal: Pricing | null = null
    if (idx !== -1) {
      oldVal = JSON.parse(JSON.stringify(pricing.value[idx]))
      pricing.value[idx] = { ...pricing.value[idx], ...updates }
    }

    const dbPayload: any = {}
    if (updates.registration_fee !== undefined) dbPayload.registration_fee = Number(updates.registration_fee)
    if (updates.incidental_fee !== undefined) dbPayload.incidental_fee = Number(updates.incidental_fee)
    if (updates.membership_tariffs !== undefined) {
      dbPayload.member_1_month_fee = Number(updates.membership_tariffs['1'] ?? 0)
      dbPayload.member_3_month_fee = Number(updates.membership_tariffs['3'] ?? 0)
    }

    const { data, error } = await supabase
      .from('pricing')
      .update(dbPayload)
      .eq('profile', id)
      .select()

    if (error) {
      if (idx !== -1 && oldVal) pricing.value[idx] = oldVal
      console.error('updatePricing db error:', error)
    }
    return { data, error }
  }

  async function addPricingCategory(profileName: string, payload: { registration_fee: number; incidental_fee: number; member_1_month_fee: number; member_3_month_fee: number }) {
    const profileId = profileName.toLowerCase().trim().replace(/\s+/g, '_')
    const { data, error } = await supabase.from('pricing').insert({
      profile: profileId,
      registration_fee: Number(payload.registration_fee),
      incidental_fee: Number(payload.incidental_fee),
      member_1_month_fee: Number(payload.member_1_month_fee),
      member_3_month_fee: Number(payload.member_3_month_fee)
    }).select()
    if (!error) {
      await fetchAll()
    }
    return { data, error }
  }

  async function deletePricingCategory(profile: string) {
    const { error } = await supabase.from('pricing').delete().eq('profile', profile)
    if (!error) {
      await fetchAll()
    }
    return { error }
  }

  return {
    trainers, classes, equipment, products, bookings, pricing, isLoading,
    fetchAll,
    addTrainer, updateTrainer, deleteTrainer,
    addClass, updateClass, deleteClass,
    addProduct, updateProduct, deleteProduct,
    addEquipmentCategory, updateEquipmentCategory, deleteEquipmentCategory,
    addEquipmentItem, updateEquipmentItem, deleteEquipmentItem,
    updatePricing,
    addPricingCategory,
    deletePricingCategory,
    updateBookingStatus,
  }
})
