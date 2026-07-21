export type BookingStatus = 'Pending' | 'Approved' | 'Cancelled'
export type BookingCategory = 'Member' | 'Insidental'
export type CivitasStatus = 'Mahasiswa' | 'Alumni' | 'Umum'

export interface Booking {
  id?: string
  user_id?: string | null
  name: string
  phone: string
  status_civitas: string
  category: BookingCategory
  duration?: string | null
  trainer_id?: string | null
  class_id?: string | null
  equipment_id?: string | null
  preferred_time: string
  estimated_price: number
  status: BookingStatus
  created_at?: string
}

export interface TrainerPackage {
  name: string
  price: number
}

export interface Trainer {
  id: string
  name: string
  specialty_id: string
  specialty_id_val: string
  specialty_en: string
  quota_filled: number
  quota_max: number
  bio_id: string
  bio_en: string
  photo: string
  philosophy: string
  price: number
  packages?: TrainerPackage[]
  created_at?: string
}

export interface GymClass {
  id: string
  name_id: string
  name_en: string
  duration: string
  level: string
  desc_id: string
  desc_en: string
  icon: string
  price: number
  photo?: string
  created_at?: string
}

export interface Equipment {
  id: string
  name_id: string
  name_en: string
  desc_id?: string
  desc_en?: string
  icon: string
  price: number
  photo?: string
  items?: EquipmentItem[]
  created_at?: string
}

export interface EquipmentItem {
  id?: number
  parent_id: string
  name_id: string
  name_en: string
  desc_id?: string
  desc_en?: string
  icon: string
}

export interface Product {
  id: string
  name_id: string
  name_en: string
  price: number
  original_price?: number | null
  image: string
  category: string
  created_at?: string
}

export interface Pricing {
  id: string
  category_name_id: string
  category_name_en: string
  registration_fee: number
  incidental_fee: number
  membership_tariffs: Record<string, number>
  updated_at?: string
}

export interface KasirTransaction {
  id: string
  date: string
  time: string
  name: string
  phone: string
  civitas: string
  category: string
  duration?: string
  trainer?: string
  kelas?: string
  alat?: string
  nim?: string
  amount: number
  paymentMethod: string
  status: string
  type: 'visit' | 'product_sale'
  token?: string
}

export interface ProductSale {
  id: string
  date: string
  productName: string
  qty: number
  price: number
  total: number
  paymentMethod: string
}
