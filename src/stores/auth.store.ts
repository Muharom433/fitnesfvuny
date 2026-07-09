import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { User, Role } from '@/types/user'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => currentUser.value !== null)
  const role = computed<Role | null>(() => currentUser.value?.role ?? null)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')
  const isReceptionist = computed(() => currentUser.value?.role === 'receptionist')

  async function login(email: string, password: string): Promise<{ ok: boolean; message: string }> {
    error.value = null
    isLoading.value = true

    try {
      if (!isSupabaseConfigured) {
        return { ok: false, message: 'Supabase belum dikonfigurasi. Cek file .env Anda.' }
      }

      // Memanggil fungsi RPC kustom check_user_login di database
      const { data, error: rpcError } = await supabase.rpc('check_user_login', {
        p_email: email,
        p_password: password
      })

      if (rpcError) {
        return { ok: false, message: rpcError.message }
      }

      // RPC mengembalikan array. Jika kosong, login gagal
      if (!data || data.length === 0) {
        return { ok: false, message: 'Email atau password salah.' }
      }

      const profile = data[0] as User
      currentUser.value = profile
      
      // Simpan session secara lokal
      localStorage.setItem('fitnesuny_user_session', JSON.stringify(profile))
      return { ok: true, message: 'Login berhasil.' }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Terjadi kesalahan tidak dikenal.'
      return { ok: false, message: msg }
    } finally {
      isLoading.value = false
    }
  }

  async function logout(): Promise<void> {
    localStorage.removeItem('fitnesuny_user_session')
    currentUser.value = null
  }

  async function initAuth(): Promise<void> {
    isLoading.value = true
    try {
      const storedSession = localStorage.getItem('fitnesuny_user_session')
      if (storedSession) {
        currentUser.value = JSON.parse(storedSession) as User
      }
    } catch {
      currentUser.value = null
      localStorage.removeItem('fitnesuny_user_session')
    } finally {
      isLoading.value = false
    }
  }

  return {
    currentUser,
    isLoading,
    error,
    isAuthenticated,
    role,
    isAdmin,
    isReceptionist,
    login,
    logout,
    initAuth,
  }
})
