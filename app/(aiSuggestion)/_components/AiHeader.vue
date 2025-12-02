<template>
  <header
    class="bg-white/80 backdrop-blur-md border-b border-stone-200/60 sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm"
  >
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-3">
        <!-- Logo 区域：手写风格 -->
        <div class="w-10 h-10 bg-yellow-100 rounded-sm flex items-center justify-center border border-stone-200 transform -rotate-2 shadow-sm">
          <span class="text-xl">💡</span>
        </div>
        <div>
          <h1 class="text-lg font-bold text-stone-800 tracking-tight font-serif">AI 军师</h1>
          <p class="text-xs text-stone-500 font-serif italic">
            "正在陪你优化: {{ name || '未命名简历' }}"
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <!-- 情感化反馈 -->
      <div class="hidden md:flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-100">
         <span class="text-sm">🧘🏻‍♀️</span>
         <span class="text-xs text-stone-600 font-serif">深呼吸，我们已经解决了 <strong class="text-stone-900">{{ fixedCount || 0 }}</strong> 个问题</span>
      </div>

      <router-link
        to="/edit"
        class="group relative px-5 py-2 bg-stone-800 text-[#fefce8] text-sm font-bold tracking-wide hover:bg-stone-700 transition-all rounded-sm shadow-sm flex items-center gap-2"
      >
        <span>继续编辑</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  name?: string
  totalIssues: number
  fixedCount?: number // Add support for tracking progress
}>()
</script>
