import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      meta: { requiresRole: 'admin' },
    },
    {
      path: '/resepsionis',
      name: 'resepsionis',
      component: () => import('@/views/ReceptionistView.vue'),
      meta: { requiresRole: 'receptionist' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  // Wait for initial auth check
  if (auth.isLoading) {
    await new Promise<void>((resolve) => {
      const stop = setInterval(() => {
        if (!auth.isLoading) {
          clearInterval(stop)
          resolve()
        }
      }, 50)
    })
  }

  // Guest-only routes (login page): redirect if already logged in
  if (to.meta.requiresGuest && auth.isAuthenticated) {
    const role = auth.role
    if (role === 'admin') return { name: 'admin' }
    if (role === 'receptionist') return { name: 'resepsionis' }
  }

  // Role-protected routes
  if (to.meta.requiresRole) {
    if (!auth.isAuthenticated) return { name: 'login' }
    if (auth.role !== to.meta.requiresRole) {
      // Wrong role — redirect to correct dashboard
      if (auth.role === 'admin') return { name: 'admin' }
      if (auth.role === 'receptionist') return { name: 'resepsionis' }
      return { name: 'login' }
    }
  }

  return true
})

export default router
