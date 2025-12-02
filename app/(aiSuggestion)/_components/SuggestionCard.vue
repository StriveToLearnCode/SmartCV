<template>
  <div
    class="relative transition-all duration-300 group perspective-1000"
    :class="[
      isActive ? 'z-20 scale-[1.01]' : 'z-0 hover:scale-[1.005]'
    ]"
  >
    <!-- 纸张背景 -->
    <div 
      class="bg-white rounded-sm border transition-all duration-300 overflow-hidden relative"
      :class="[
        item.isFixed
          ? 'border-green-200/60 shadow-sm'
          : 'border-stone-200 shadow-paper',
        isActive ? 'shadow-paper-float border-stone-300' : ''
      ]"
    >
      <!-- 装饰：已修复印章 -->
      <div v-if="item.isFixed" class="absolute top-4 right-8 opacity-20 rotate-[-15deg] pointer-events-none z-0">
         <div class="w-24 h-24 rounded-full border-4 border-green-600 flex items-center justify-center">
            <span class="text-green-600 font-serif font-bold text-xl uppercase tracking-widest">Fixed</span>
         </div>
      </div>

      <!-- 装饰：左侧颜色条 (代替原有的边框颜色) -->
      <div class="absolute left-0 top-0 bottom-0 w-1.5 z-10"
           :class="[
             item.isFixed ? 'bg-green-400' : 
             item.severity === 'high' ? 'bg-orange-400' : 'bg-yellow-400'
           ]">
      </div>

      <!-- 卡片主体 -->
      <div class="p-6 pl-8 flex gap-5 relative z-10">
        
        <!-- 内容区 -->
        <div class="flex-1 min-w-0 space-y-4">
          <!-- 头部 -->
          <div class="flex justify-between items-start">
            <h3 class="font-serif font-bold text-stone-800 text-lg leading-tight relative inline-block">
              {{ item.title }}
              <!-- 高亮下划线 (仅未修复时) -->
              <svg v-if="!item.isFixed" class="absolute -bottom-1 left-0 w-full h-2 text-yellow-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" stroke-width="8" />
              </svg>
            </h3>
            
            <!-- 状态标签 -->
            <span
              v-if="!item.isFixed"
              class="font-handwriting text-sm px-2 py-1 transform rotate-2"
              :class="item.severity === 'high' ? 'text-orange-600 bg-orange-50' : 'text-yellow-600 bg-yellow-50'"
            >
              {{ item.severity === 'high' ? '建议优先改哦' : '如果能优化...' }}
            </span>
          </div>

          <!-- 建议内容 (手写风格批注) -->
          <div class="relative">
             <p class="text-stone-600 font-serif leading-relaxed">
               {{ item.message }}
             </p>
             <!-- 装饰：手绘圈圈 -->
             <svg v-if="!item.isFixed && item.severity === 'high'" class="absolute -top-2 -left-4 w-[105%] h-[140%] text-orange-200/30 pointer-events-none -z-10" viewBox="0 0 200 80" preserveAspectRatio="none">
                <path d="M10 40 Q 80 10 190 30 Q 180 70 20 50 Q 0 45 10 40" fill="none" stroke="currentColor" stroke-width="2" />
             </svg>
          </div>

          <!-- 原文引用 (便利贴样式) -->
          <div
            v-if="item.originalText && !item.isFixed"
            class="p-3 bg-[#fdfbf7] border border-stone-200 rounded-sm relative mt-2 transform -rotate-1"
          >
            <span class="absolute -top-2 left-2 text-stone-300 text-2xl leading-none">“</span>
            <p class="text-sm text-stone-500 font-serif italic px-2 line-clamp-2">{{ item.originalText }}</p>
            <span class="absolute -bottom-4 right-2 text-stone-300 text-2xl leading-none rotate-180">“</span>
          </div>

          <!-- 修复选项 -->
          <div v-if="!item.isFixed && item.actions" class="mt-6 space-y-3">
            <p class="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 font-serif">试着这样写：</p>
            <div class="grid grid-cols-1 gap-3">
              <button
                v-for="(action, idx) in item.actions"
                :key="idx"
                @click="$emit('apply', item, action)"
                class="text-left p-4 rounded-sm border-2 border-dashed border-stone-200 bg-white hover:border-stone-400 hover:bg-stone-50 transition-all group/btn relative"
              >
                <div class="flex items-center justify-between mb-1">
                   <span class="font-handwriting text-stone-500 text-sm">{{ action.label }}</span>
                   <span class="opacity-0 group-hover/btn:opacity-100 transition-opacity text-xs font-bold bg-stone-800 text-white px-2 py-0.5 rounded-sm">采用</span>
                </div>
                <div class="text-base text-stone-800 font-serif font-medium leading-relaxed">
                  {{ action.preview || action.value }}
                </div>
              </button>
            </div>
          </div>

          <!-- 撤销按钮 -->
          <div v-if="item.isFixed" class="mt-4 flex justify-end">
            <button @click="$emit('undo', item)" class="text-sm text-stone-400 hover:text-stone-600 underline decoration-dashed underline-offset-4 font-serif">
              我想撤销这个修改
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SuggestionItem, SuggestionAction } from '../types'

defineProps<{
  item: SuggestionItem
  isActive: boolean
}>()

defineEmits<{
  (e: 'apply', item: SuggestionItem, action: SuggestionAction): void
  (e: 'undo', item: SuggestionItem): void
}>()
</script>

<style scoped>
.shadow-paper {
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.shadow-paper-float {
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
}
.perspective-1000 {
  perspective: 1000px;
}
</style>
