<template>
  <div
    class="inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium border transition-all duration-200 cursor-default relative group"
    :class="statusClasses"
  >
    <!-- Paper Texture Overlay -->
    <div class="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none rounded-sm"></div>
    
    <!-- Dot -->
    <span 
      class="w-1.5 h-1.5 mr-2 rounded-full relative z-10" 
      :class="dotClasses"
    ></span>
    
    <!-- Text -->
    <span class="relative z-10 font-serif tracking-wide">{{ label }}</span>
    
    <!-- Sketch Border Effect (Bottom) -->
    <div 
      class="absolute bottom-0 left-0 w-full h-[1px] opacity-50" 
      :class="borderClasses"
    ></div>

    <!-- Tooltip for "Action" (e.g. Suggest tomorrow) -->
    <div 
      v-if="actionTip"
      class="absolute left-0 -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-stone-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 pointer-events-none"
    >
      {{ actionTip }}
      <div class="absolute -top-1 left-4 w-2 h-2 bg-stone-800 rotate-45"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { JobStatus } from '../types'

const props = defineProps<{
  status: JobStatus
  // Optional: Override context if needed
  lastUpdated?: string
}>()

// Companion-style Labels
const label = computed(() => {
  switch (props.status) {
    case 'Applying': return '等待回音'
    case 'Interviewing': return '正在接触'
    case 'Offer': return '好运达成'
    case 'Rejected': return '暂且搁置'
    default: return '未定义'
  }
})

// Action Tips (Dynamic based on status)
const actionTip = computed(() => {
  switch (props.status) {
    case 'Applying': return '建议 3 天后跟进'
    case 'Interviewing': return '记得准备面试材料'
    case 'Offer': return '恭喜！去庆祝一下吧'
    case 'Rejected': return '没关系，更好的在后面'
    default: return ''
  }
})

const statusClasses = computed(() => {
  switch (props.status) {
    case 'Applying':
      return 'bg-[#f0f9ff] text-sky-800 border-transparent hover:bg-[#e0f2fe]' // Sky
    case 'Interviewing':
      return 'bg-[#fffbeb] text-amber-800 border-transparent hover:bg-[#fef3c7]' // Amber
    case 'Offer':
      return 'bg-[#ecfdf5] text-emerald-800 border-transparent hover:bg-[#d1fae5]' // Emerald
    case 'Rejected':
      return 'bg-[#f5f5f4] text-stone-500 border-transparent hover:bg-[#e7e5e4]' // Stone
    default:
      return 'bg-gray-50 text-gray-600 border-gray-200'
  }
})

const dotClasses = computed(() => {
  switch (props.status) {
    case 'Applying': return 'bg-sky-400'
    case 'Interviewing': return 'bg-amber-400 animate-pulse'
    case 'Offer': return 'bg-emerald-400'
    case 'Rejected': return 'bg-stone-300'
    default: return 'bg-gray-400'
  }
})

const borderClasses = computed(() => {
  switch (props.status) {
    case 'Applying': return 'bg-sky-200'
    case 'Interviewing': return 'bg-amber-200'
    case 'Offer': return 'bg-emerald-200'
    case 'Rejected': return 'bg-stone-200'
    default: return 'bg-gray-200'
  }
})
</script>

<style scoped>
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E");
}
</style>
