<template>
  <main class="flex-1 min-w-0 space-y-12 pb-32">
    
    <!-- Empty State / Success State -->
    <div
      v-if="groupedSuggestions.length === 0"
      class="bg-white p-12 rounded-sm shadow-sm text-center border-2 border-dashed border-stone-200 mt-8 relative overflow-hidden"
    >
      <div class="relative z-10">
        <div class="text-6xl mb-6 animate-bounce">🎉</div>
        <h3 class="text-2xl font-serif font-bold text-stone-800 mb-3">太棒了！没发现明显问题</h3>
        <p class="text-stone-500 text-lg font-serif">你的简历已经非常完善，保持这份自信去投递吧！</p>
      </div>
      <!-- Confetti decoration (CSS only for simplicity) -->
      <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,...')]"></div>
    </div>

    <section
      v-for="group in groupedSuggestions"
      :key="group.category"
      :id="'section-' + group.category"
      class="scroll-mt-32"
    >
      <!-- 分类标题: 书签风格 -->
      <div class="flex items-end gap-4 mb-6 border-b border-stone-200 pb-2">
        <h2 class="text-2xl font-serif font-bold text-stone-800 relative">
          {{ categoryMap[group.category] }}
          <!-- 手绘下划线 -->
          <svg class="absolute -bottom-2 left-0 w-full h-3 text-stone-300" viewBox="0 0 100 10" preserveAspectRatio="none">
             <path d="M0 5 Q 50 8 100 5" fill="none" stroke="currentColor" stroke-width="2" />
          </svg>
        </h2>
        <span class="font-handwriting text-stone-400 text-lg pb-1">
           (还有 {{ group.items.length }} 个优化点)
        </span>
      </div>

      <!-- 卡片列表 -->
      <div class="space-y-6">
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
    
    <!-- Bottom Encouragement -->
    <div v-if="groupedSuggestions.length > 0" class="text-center mt-16">
       <p class="font-handwriting text-2xl text-stone-400 transform rotate-1">
         "每一个小修改，都是向 Offer 迈进的一大步！"
       </p>
    </div>

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
