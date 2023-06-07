import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import progress from '@/plugins/progress'

import type { RouteRecordRaw } from 'vue-router'

const contentRoute: RouteRecordRaw[] = []

const files: any = import.meta.globEager('./*.ts')
Object.keys(files).forEach(fileName => {
  contentRoute.push(...files[fileName].default)
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Layout,
      children: contentRoute
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: () => import('@/views/404.vue'),
      meta: {
        keepAlive: true
      }
    }
  ]
})

// 总控
router.beforeEach((to, from, next) => {
  progress.start()
  // 滚回顶端
  window.scrollTo(0, 0)
  next()
})

router.afterEach(() => {
  progress.finish()
  // const app: any = document.body
  // app.className = to.path.slice(1).replace(/\//g, '-') || 'home-wrap'
})

export default router
