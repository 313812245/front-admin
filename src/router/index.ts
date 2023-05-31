import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
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
      path: '/:pathMatch(.*)',
      name: '404',
      component: () => import('@/views/404.vue'),
      meta: {
        keepAlive: true,
        fullScreen: true
      }
    }
  ]
})

// 总控
router.beforeEach((to, from, next) => {
  // 滚回顶端
  window.scrollTo(0, 0)
  next()
})

// router.afterEach(to => {
//   const app: any = document.body
//   app.className = to.path.slice(1).replace(/\//g, '-') || 'home-wrap'
// })

export default router
