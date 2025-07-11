const routes = [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/templates/LoginTemplate.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/components/templates/LayoutTemplate.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/components/organisms/Dashboard.vue'),
        },
        {
          path: '/students',
          name: 'Students',
          component: () => import('@/components/organisms/Students.vue'),
        },
        {
          path: '/students/register',
          name: 'RegisterStudent',
          component: () => import('@/components/molecules/StudentForm.vue'),
        },
        {
          path: '/students/edit/:id',
          name: 'EditStudent',
          component: () => import('@/components/molecules/StudentForm.vue'),
        }
      ],
      meta: { requiresAuth: true }
    }
  ]

export { routes };