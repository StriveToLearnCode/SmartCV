<template>
  <header
    class="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50 px-6 py-3 flex items-center justify-between shadow-sm"
  >
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-stone-900 rounded flex items-center justify-center text-white font-serif font-bold">
          Ai
        </div>
        <div>
          <h1 class="text-sm font-bold text-stone-900 tracking-tight">智能诊断报告</h1>
          <p class="text-[10px] text-stone-500 font-mono uppercase">
            For: {{ name || '未命名简历' }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div class="text-xs text-stone-500 mr-2">
        发现 <strong class="text-red-500">{{ totalIssues }}</strong> 个可优化项
      </div>
      <router-link
        to="/edit"
        class="bg-white border border-stone-300 text-stone-700 text-xs font-bold px-4 py-2 rounded-lg hover:bg-stone-50 hover:border-stone-400 transition-all"
      >
        返回编辑器
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  name?: string
  totalIssues: number
}>()
</script>

