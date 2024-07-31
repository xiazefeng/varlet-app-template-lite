import { routes } from 'vue-router/auto-routes'
import NotFound from '@/exception/NotFound.vue';
import { createRouter, createWebHashHistory, Router } from 'vue-router'

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    }
  ]
})

export default router
