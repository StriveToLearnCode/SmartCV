import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/(landingPage)/layout.vue') },
    { path: '/dashboard', component: () => import('@/(dashboard)/layout.vue') },
    { path: '/edit', component: () => import('@/(edit)/layout.vue') }
  ]
})

export default router
