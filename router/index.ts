import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/app/(landingPage)/layout.vue') },
    { path: '/login', component: () => import('@/app/(landingPage)/login.vue') },
    { path: '/register', component: () => import('@/app/(landingPage)/register.vue') },
    {
      path: '/dashboard',
      component: () => import('@/app/(dashboard)/layout.vue'),
      children: [
        { path: '', redirect: '/dashboard/job-board' },
        { path: 'job-board', component: () => import('@/app/(dashboard)/job-board.vue') },
        { path: 'analysis', component: () => import('@/app/(dashboard)/analysis.vue') },
        { path: 'chat', component: () => import('@/app/(dashboard)/chat.vue') },
        { path: 'knowledge', component: () => import('@/app/(dashboard)/knowledge.vue') }
      ]
    },
    { path: '/resume-edit/:id?', component: () => import('@/app/(resumeEdit)/resume-edit.vue') },
    {
      path: '/interview-input',
      component: () => import('@/app/(dashboard)/interview-input.vue')
    },
    {
      path: '/interview-review',
      component: () => import('@/app/(dashboard)/interview-review.vue')
    }
  ]
})

export default router
