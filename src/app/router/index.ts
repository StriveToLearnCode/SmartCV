import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: () => import('@/app/(landingPage)/layout.vue') }]
})

export default router
