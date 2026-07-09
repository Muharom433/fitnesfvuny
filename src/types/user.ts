// TypeScript types for User model
export type Role = 'admin' | 'receptionist' | 'member'

export interface User {
  id: string
  name: string
  email: string
  phone?: string | null
  gender?: 'Pria' | 'Wanita' | null
  birthdate?: string | null
  identity_type?: string | null
  identity_number?: string | null
  address?: string | null
  role: Role
  created_at?: string
}

export interface AuthSession {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}
