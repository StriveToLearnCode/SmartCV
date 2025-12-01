<template>
  <main class="flex-1 min-w-0 space-y-8 pb-24">
    <div
      v-if="groupedSuggestions.length === 0"
      class="bg-white p-12 rounded-xl shadow-sm text-center border border-stone-200 border-dashed"
    >
      <div class="text-4xl mb-4">🎉</div>
      <h3 class="text-lg font-bold text-stone-800">太棒了！暂未发现明显问题</h3>
      <p class="text-stone-500 text-sm mt-2">你的简历已经非常完善，保持自信！</p>
    </div>

    <section
      v-for="group in groupedSuggestions"
      :key="group.category"
      :id="'section-' + group.category"
      class="scroll-mt-24"
    >
      <!-- 分类标题 -->
      <div class="flex items-center gap-3 mb-4">
        <h2 class="text-lg font-bold text-stone-800 flex items-center gap-2">
          {{ categoryMap[group.category] }}
          <span class="text-stone-400 text-sm font-normal">({{ group.items.length }})</span>
        </h2>
        <div class="h-px flex-1 bg-stone-200"></div>
      </div>

      <!-- 卡片列表 -->
      <div class="space-y-4">
        <SuggestionCard
          v-for="item in group.items"
          :key="item.id"
          :item="item"
          :is-active="activeSuggestionId === item.id"
          @apply="(i, a) => $emit('apply', i, a)"
          @undo="(i) => $emit('undo', i)"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { SuggestionItem, SuggestionAction } from '../types'
import SuggestionCard from './SuggestionCard.vue'

defineProps<{
  groupedSuggestions: {
    category: string
    items: SuggestionItem[]
    criticalCount: number
  }[]
  categoryMap: Record<string, string>
  activeSuggestionId: string | null
}>()

defineEmits<{
  (e: 'apply', item: SuggestionItem, action: SuggestionAction): void
  (e: 'undo', item: SuggestionItem): void
}>()
</script>

