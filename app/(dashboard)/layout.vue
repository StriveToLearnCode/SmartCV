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
      <!-- Overview View: Default Dashboard -->
      <template v-if="currentTab === 'overview'">
        <!-- 1. 顶部欢迎语 -->
        <WelcomeHeader />

        <!-- 2. 中间 AI 对话框 -->
        <div class="grow flex flex-col justify-center my-8">
          <AIChat />
        </div>

        <!-- 3. 下方智能内容区 -->
        <SmartBoard />
      </template>

      <!-- Job Progress -->
      <template v-else-if="currentTab === 'progress'">
        <JobProgressView />
      </template>

      <!-- AI Suggestion -->
      <template v-else-if="currentTab === 'suggestion'">
        <AiSuggestionView />
      </template>

      <!-- Other Views (Placeholders for Navigation) -->
      <template v-else>
        <div class="grow flex flex-col items-center justify-center min-h-[60vh] opacity-50">
          <div class="w-16 h-16 bg-stone-200 rounded-full mb-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-stone-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.033a17.255 17.255 0 015.957 5.957l-3.033 2.496m-8.462-8.462A7.5 7.5 0 003 7.5c0 1.566.468 3.014 1.258 4.222m5.83-5.83a7.48 7.48 0 014.093-.929m0 0A7.5 7.5 0 0121 7.5a7.5 7.5 0 01-2.25 5.25m-5.83-5.83l-3.033 2.496a17.255 17.255 0 01-5.957 5.957l2.496 3.033"
              />
            </svg>
          </div>
          <h2 class="text-xl font-serif text-stone-600 mb-2 tracking-wide">
            {{ tabNameMap[currentTab] || 'Feature' }}
          </h2>
          <p class="text-stone-400 text-sm font-serif">正在施工中...</p>
        </div>
      </template>
    </main>

    <!-- 4. 悬浮 Tab 切换器 -->
    <FloatingCapsule v-model="currentTab" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WelcomeHeader from './_components/WelcomeHeader.vue'
import AIChat from './_components/AIChat.vue'
import SmartBoard from './_components/SmartBoard.vue'
import FloatingCapsule from './_components/FloatingCapsule.vue'
import JobProgressView from '../(jobProgress)/layout.vue'
import AiSuggestionView from '../(aiSuggestion)/layout.vue'
const currentTab = ref('overview')

const tabNameMap: Record<string, string> = {
  overview: '简历概览',
  progress: '求职进度',
  suggestion: 'AI 建议',
  templates: '模板管理'
}
</script>

<style scoped>
/* 局部样式 */
</style>
