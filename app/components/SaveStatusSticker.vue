<template>
  <div
    class="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm transition-all duration-300 select-none"
    :class="containerClasses"
    :title="fullTime"
  >
    <!-- Loading Spinner -->
    <svg
      v-if="status === 'saving'"
      class="animate-spin h-3.5 w-3.5 text-stone-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>

    <!-- Success Icon -->
    <span v-if="status === 'saved'" class="text-emerald-600 text-xs font-bold">✔</span>

    <!-- Error Icon -->
    <span v-if="status === 'error'" class="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>

    <!-- Text Content -->
    <span class="text-[11px] font-serif font-bold tracking-wide text-stone-700">
      <template v-if="status === 'saving'">正在保存...</template>
      <template v-else-if="status === 'saved'">
        已自动保存 <span class="text-stone-400 font-sans font-normal ml-0.5">{{ timeAgo }}</span>
      </template>
      <template v-else-if="status === 'error'">
        未保存
      </template>
    </span>

    <!-- Retry Button -->
    <button
      v-if="status === 'error'"
      @click="$emit('retry')"
      class="ml-1 px-1.5 py-0.5 bg-white border border-stone-200 rounded hover:bg-stone-50 text-[10px] text-stone-600 font-sans shadow-sm transition-colors"
    >
      重试
    </button>

    <!-- Sticker Effect (Tape) -->
    <div 
      class="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-white/40 backdrop-blur-[1px] border-l border-r border-white/60 rotate-1 opacity-60 pointer-events-none"
      style="box-shadow: 0 1px 2px rgba(0,0,0,0.05);"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SaveStatus } from '../composables/useAutoSave'

const props = defineProps<{
  status: SaveStatus
  timeAgo?: string
  lastSavedTime?: Date | null
}>()

defineEmits(['retry'])

const fullTime = computed(() => {
  if (!props.lastSavedTime) return ''
  return props.lastSavedTime.toLocaleString()
})

const containerClasses = computed(() => {
  switch (props.status) {
    case 'saving':
      return 'bg-stone-100 border border-stone-200 text-stone-500 shadow-sm opacity-80'
    case 'saved':
      // 纸质贴纸风格：淡黄色背景，微倾斜，阴影
      return 'bg-[#fdfbf7] border border-stone-200/60 text-stone-800 shadow-[2px_2px_6px_rgba(0,0,0,0.04)] rotate-[-1deg] border-b-2 border-b-stone-200/80'
    case 'error':
      return 'bg-red-50 border border-red-100 text-red-700 shadow-sm'
    default:
      return 'opacity-0 pointer-events-none'
  }
})
</script>

<style scoped>
/* 可以添加一些纹理效果 */
</style>

