<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors duration-200"
    :class="statusClasses"
  >
    <span class="w-1.5 h-1.5 mr-1.5 rounded-full" :class="dotClasses"></span>
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { JobStatus } from '../types'

const props = defineProps<{
  status: JobStatus
}>()

const label = computed(() => {
  switch (props.status) {
    case 'Applying': return '申请中'
    case 'Interviewing': return '面试中'
    case 'Offer': return '已录用'
    case 'Rejected': return '已拒绝'
    default: return '未知'
  }
})

const statusClasses = computed(() => {
  switch (props.status) {
    case 'Applying':
      return 'bg-sky-50 text-sky-700 border-sky-200'
    case 'Interviewing':
      return 'bg-amber-50 text-amber-700 border-amber-200'
    case 'Offer':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'Rejected':
      return 'bg-stone-100 text-stone-600 border-stone-200'
    default:
      return 'bg-gray-50 text-gray-600 border-gray-200'
  }
})

const dotClasses = computed(() => {
  switch (props.status) {
    case 'Applying': return 'bg-sky-400'
    case 'Interviewing': return 'bg-amber-400'
    case 'Offer': return 'bg-emerald-400'
    case 'Rejected': return 'bg-stone-400'
    default: return 'bg-gray-400'
  }
})
</script>

