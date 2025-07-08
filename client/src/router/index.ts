import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAuthStore } from '@/store/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'router-link-active'
})

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()
  await authStore.initAuth()
  
  const LOGIN_ROUTE = 'Login'
  const DASHBOARD_ROUTE = 'Dashboard'
  
  const isAuthenticated = authStore.isLoggedIn
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    const tokenRenewed = await authStore.refreshToken()

    if (!tokenRenewed) { 
      next({ name: LOGIN_ROUTE })
      return
    }
  }
  
  if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: DASHBOARD_ROUTE })
    return
  }
  
  if (to.name === LOGIN_ROUTE && isAuthenticated) {
    next({ name: DASHBOARD_ROUTE })
    return
  }
  
  next()
})

export default router 