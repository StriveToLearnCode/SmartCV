<template>
  <aside class="w-72 shrink-0 sticky top-24 hidden md:block">
    <!-- 核心评分卡片：草稿纸风格 -->
    <div class="bg-[#fefce8] border border-stone-200 rounded-sm p-6 shadow-paper mb-8 relative transform rotate-1">
      <!-- 顶部胶带 -->
      <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 border border-white/60 shadow-sm rotate-[-2deg] backdrop-blur-sm z-20"></div>
      
      <div class="text-center mb-6 relative z-10">
        <div class="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 font-serif">当前完善度</div>
        
        <!-- 温度计式评分展示 -->
        <div class="relative h-4 w-full bg-stone-200 rounded-full overflow-hidden mb-2">
           <div 
             class="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
             :class="scoreColorClass"
             :style="{ width: score + '%' }"
           ></div>
        </div>
        
        <div class="flex justify-between items-baseline">
           <span class="font-handwriting text-3xl font-bold text-stone-800">{{ score }}%</span>
           <span class="text-xs text-stone-500 font-serif">
             {{ getScoreFeedback(score) }}
           </span>
        </div>
      </div>

      <!-- 手写笔记列表 -->
      <div class="space-y-3 font-handwriting text-stone-700 text-sm relative z-10">
        <div
          v-for="(count, category) in issueCounts"
          :key="category"
          class="flex items-center justify-between border-b border-stone-200/50 pb-1 border-dashed"
        >
          <span>{{ categoryMap[category] || category }}</span>
          <span class="px-2 rounded-full bg-white border border-stone-200 text-xs font-sans" :class="count > 0 ? 'text-orange-500 font-bold' : 'text-stone-400'">
            {{ count > 0 ? `还有 ${count} 个建议` : '✨ 完美' }}
          </span>
        </div>
      </div>
      
      <!-- 装饰：右下角折角 -->
      <div class="absolute bottom-0 right-0 w-8 h-8 bg-stone-100 shadow-sm border-t border-l border-stone-200 z-20" 
           style="border-radius: 4px 0 0 0; background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%);">
      </div>
    </div>

    <!-- 快速导航：便利贴堆叠 -->
    <nav class="space-y-4 px-2">
      <h3 class="text-xs font-bold text-stone-400 uppercase tracking-widest px-2 font-serif">优化清单</h3>
      
      <div class="space-y-2">
        <a
          v-for="(group, index) in groupedSuggestions"
          :key="group.category"
          @click.prevent="$emit('scroll-to', group.category)"
          href="#"
          class="block relative group transition-transform hover:-translate-y-1"
        >
           <!-- 便利贴背景 -->
           <div 
             class="absolute inset-0 rounded-sm shadow-sm border border-stone-200 transition-colors"
             :class="[
               index % 3 === 0 ? 'bg-yellow-50' : index % 3 === 1 ? 'bg-blue-50' : 'bg-green-50',
               'group-hover:shadow-md'
             ]"
             :style="{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }"
           ></div>

           <div class="relative z-10 px-4 py-3 flex items-center justify-between">
              <span class="text-sm font-serif font-bold text-stone-700">{{ categoryMap[group.category] }}</span>
              <span v-if="group.items.length > 0" class="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center text-[10px] text-stone-600 font-bold shadow-sm">
                {{ group.items.length }}
              </span>
              <span v-else class="text-green-600 text-xs">✔</span>
           </div>
        </a>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SuggestionItem } from '../types'

const props = defineProps<{
  score: number
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

const scoreColorClass = computed(() => {
  if (props.score >= 90) return 'bg-green-400'
  if (props.score >= 70) return 'bg-yellow-400'
  return 'bg-orange-400'
})

const getScoreFeedback = (s: number) => {
  if (s >= 90) return '随时可以投递！🚀'
  if (s >= 70) return '再优化一点点就好 💪'
  return '别急，我们慢慢来 ☕️'
}
</script>

<style scoped>
.shadow-paper {
  box-shadow: 2px 4px 12px rgba(0,0,0,0.08);
}
</style>
