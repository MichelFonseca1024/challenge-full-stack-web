const routes = [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/templates/LoginTemplate.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/components/templates/DashboardTemplate.vue'), 
      meta: { requiresAuth: true }
    }
  ]

export { routes };