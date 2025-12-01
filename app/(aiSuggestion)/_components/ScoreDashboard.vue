<template>
  <aside class="w-64 shrink-0 sticky top-24 hidden md:block">
    <!-- 评分卡片 -->
    <div class="bg-white border border-stone-200 rounded-xl p-6 shadow-sm mb-6 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-400 via-yellow-400 to-green-400"></div>

      <div class="text-center mb-4">
        <div class="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">简历健康分</div>
        <div class="text-5xl font-serif font-bold text-stone-900 tracking-tighter" :class="scoreColor">
          {{ score }}
        </div>
      </div>

      <div class="space-y-3">
        <div
          v-for="(count, category) in issueCounts"
          :key="category"
          class="flex items-center justify-between text-xs"
        >
          <span class="text-stone-600 font-medium">{{ categoryMap[category] || category }}</span>
          <span class="px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-bold">{{ count }}</span>
        </div>
      </div>
    </div>

    <!-- 快速导航 -->
    <nav class="space-y-1">
      <h3 class="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3 px-2">问题列表</h3>
      <a
        v-for="group in groupedSuggestions"
        :key="group.category"
        @click.prevent="$emit('scroll-to', group.category)"
        href="#"
        class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
      >
        <span class="text-sm text-stone-600 font-bold group-hover:text-stone-900">{{
          categoryMap[group.category]
        }}</span>
        <div class="flex gap-1">
          <span v-if="group.criticalCount > 0" class="w-2 h-2 rounded-full bg-red-500"></span>
          <span v-if="group.items.length > 0" class="text-xs text-stone-400">{{ group.items.length }}</span>
        </div>
      </a>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import type { SuggestionItem } from '../types'

defineProps<{
  score: number
  scoreColor: string
  issueCounts: Record<string, number>
  categoryMap: Record<string, string>
  groupedSuggestions: {
    category: string
    items: SuggestionItem[]
    criticalCount: number
  }[]
}>()

defineEmits<{
  (e: 'scroll-to', category: string): void
}>()
</script>

