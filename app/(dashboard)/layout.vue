<template>
  <div
    class="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-stone-200 selection:text-stone-900 overflow-x-hidden"
  >
    <!-- 顶部导航 (极简) -->
    <nav class="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
      <div class="pointer-events-auto cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
        <router-link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </router-link>
      </div>
      <div class="pointer-events-auto">
        <!-- User Profile or Settings could go here -->
        <div class="w-8 h-8 rounded-full bg-stone-200 border border-stone-300"></div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 pt-12 pb-24 min-h-screen flex flex-col">
      <!-- 1. 顶部欢迎语 -->
      <WelcomeHeader />

      <!-- 2. 中间 AI 对话框 -->
      <div class="grow flex flex-col justify-center my-8">
        <AIChat />
      </div>

      <!-- 3. 下方智能内容区 -->
      <SmartBoard />
    </main>
  </div>
</template>

<script setup lang="ts">
import WelcomeHeader from './components/WelcomeHeader.vue'
import AIChat from './components/AIChat.vue'
import SmartBoard from './components/SmartBoard.vue'
</script>

<style scoped>
/* 局部样式 */
</style>
