<template>
  <div 
    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border transition-colors"
    :class="priorityClasses"
    title="重视程度"
  >
    <!-- Icon Indicator -->
    <svg v-if="priority === 'Urgent'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
    <svg v-else-if="priority === 'High'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
    <span v-else-if="priority === 'Medium'" class="w-2 h-2 rounded-full bg-current opacity-60"></span>
    <span v-else class="w-2 h-2 rounded-full border border-current opacity-40"></span>

    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { JobPriority } from '../types'

const props = defineProps<{
  priority: JobPriority
}>()

const label = computed(() => {
  switch (props.priority) {
    case 'Urgent': return '紧急'
    case 'High': return '高关注'
    case 'Medium': return '一般'
    case 'Low': return '低优'
    default: return '一般'
  }
})

const priorityClasses = computed(() => {
  switch (props.priority) {
    case 'Urgent':
      return 'bg-red-50 text-red-700 border-red-200'
    case 'High':
      return 'bg-orange-50 text-orange-700 border-orange-200'
    case 'Medium':
      return 'bg-blue-50 text-blue-700 border-blue-200'
    case 'Low':
      return 'bg-stone-100 text-stone-500 border-stone-200'
    default:
      return 'bg-gray-50 text-gray-500 border-gray-200'
  }
})
</script>

