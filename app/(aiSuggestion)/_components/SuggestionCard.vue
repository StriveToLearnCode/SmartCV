<template>
  <div
    class="bg-white rounded-xl border shadow-sm transition-all duration-300 overflow-hidden"
    :class="[
      item.isFixed
        ? 'border-green-200 bg-green-50/30'
        : 'border-stone-200 hover:shadow-md hover:border-stone-300',
      isActive ? 'ring-2 ring-stone-900 ring-offset-2' : ''
    ]"
  >
    <!-- 卡片主体 -->
    <div class="p-5 flex gap-4">
      <!-- 左侧图标 -->
      <div class="shrink-0 pt-1">
        <div
          v-if="item.isFixed"
          class="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div
          v-else
          class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-inner"
          :class="item.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'"
        >
          !
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-bold text-stone-900 text-sm">
            {{ item.title }}
            <span
              v-if="item.isFixed"
              class="ml-2 text-green-600 text-xs font-normal bg-green-100 px-2 py-0.5 rounded-full"
              >已修复</span
            >
          </h3>
          <span
            class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border"
            :class="
              item.severity === 'high'
                ? 'bg-red-50 border-red-100 text-red-600'
                : 'bg-amber-50 border-amber-100 text-amber-600'
            "
          >
            {{ item.severity === 'high' ? '必改' : '建议' }}
          </span>
        </div>

        <p class="text-sm text-stone-600 mb-3 leading-relaxed">{{ item.message }}</p>

        <!-- 原文引用 -->
        <div
          v-if="item.originalText && !item.isFixed"
          class="mb-4 p-3 bg-stone-50 rounded border border-stone-200/60 text-xs text-stone-500 font-mono line-clamp-2 italic"
        >
          "{{ item.originalText }}"
        </div>

        <!-- 修复选项 (未修复时显示) -->
        <div v-if="!item.isFixed && item.actions" class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <button
            v-for="(action, idx) in item.actions"
            :key="idx"
            @click="$emit('apply', item, action)"
            class="text-left p-3 rounded-lg border border-stone-200 bg-white hover:border-stone-400 hover:shadow-sm transition-all group/btn relative"
          >
            <div
              class="text-[10px] font-bold text-stone-400 uppercase mb-1 group-hover/btn:text-stone-800 transition-colors"
            >
              {{ action.label }}
            </div>
            <div class="text-sm text-stone-800 font-medium leading-snug">
              {{ action.preview || action.value }}
            </div>
            <div class="absolute top-3 right-3 opacity-0 group-hover/btn:opacity-100 transition-opacity">
              <span class="bg-stone-900 text-white text-[10px] font-bold px-2 py-1 rounded">应用</span>
            </div>
          </button>
        </div>

        <!-- 撤销按钮 (已修复时显示) -->
        <div v-if="item.isFixed" class="mt-2">
          <button @click="$emit('undo', item)" class="text-xs text-stone-400 hover:text-stone-600 underline">
            撤销修改
          </button>
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

