<template>
  <div class="w-full relative py-4">
    <!-- Timeline Track: Hand Drawn Wiggle Line -->
    <div class="absolute top-9 left-0 w-full h-4 opacity-20 pointer-events-none overflow-hidden">
       <svg width="100%" height="100%" preserveAspectRatio="none">
         <!-- Sine wave like wiggle -->
         <path d="M0 8 Q 25 2 50 8 T 100 8 T 150 8 T 200 8 T 250 8 T 300 8 T 350 8 T 400 8 T 450 8 T 500 8" 
               fill="none" 
               stroke="currentColor" 
               stroke-width="2" 
               class="text-stone-600"
         />
       </svg>
    </div>

    <div class="relative flex items-start justify-between px-2">
      <div
        v-for="(node, index) in timeline"
        :key="index"
        class="relative flex flex-col items-center group cursor-pointer z-10"
        @click.stop="$emit('node-click', node)"
      >
        <!-- 1. Date Label (Top) -->
        <div class="h-6 mb-1 text-[10px] text-stone-400 font-mono opacity-60 group-hover:opacity-100 transition-opacity">
           {{ node.date || '...' }}
        </div>

        <!-- 2. Node Circle (The "Station") -->
        <div
          class="w-4 h-4 rounded-full border-2 transition-all duration-300 bg-[#fdfbf7] relative flex items-center justify-center group-hover:scale-125 shadow-sm"
          :class="[
            node.current
              ? 'border-stone-800 ring-2 ring-stone-100 ring-offset-1'
              : node.completed
                ? 'border-stone-800 bg-stone-800'
                : 'border-stone-300 bg-white'
          ]"
        >
           <!-- Current Pulse -->
           <div v-if="node.current" class="absolute w-full h-full rounded-full bg-stone-800 animate-ping opacity-20"></div>
           
           <!-- Inner Dot for Current -->
           <div v-if="node.current" class="w-1.5 h-1.5 bg-stone-800 rounded-full"></div>
           
           <!-- Checkmark for Completed -->
           <svg v-if="node.completed && !node.current" xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
             <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
           </svg>
        </div>

        <!-- 3. Stage Label (Bottom) -->
        <div class="mt-2 flex flex-col items-center gap-1">
           <span 
             class="text-xs font-bold font-serif whitespace-nowrap px-2 py-0.5 rounded-sm transition-all transform group-hover:-translate-y-0.5"
             :class="node.current ? 'text-stone-900 bg-stone-100' : 'text-stone-400 group-hover:text-stone-600'"
           >
             {{ node.stage }}
           </span>
        </div>

        <!-- 4. "Pull-down" Paper Slip (Detail Hint) -->
        <div 
          v-if="node.cheer || node.current" 
          class="absolute top-10 w-32 left-1/2 -translate-x-1/2 z-20 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform origin-top translate-y-2 group-hover:translate-y-0 pointer-events-none"
        >
           <!-- The Slip -->
           <div class="bg-white border border-stone-200 p-3 shadow-lg transform rotate-1 text-center relative rounded-b-sm">
              <!-- Tape -->
              <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-4 bg-stone-200/50 opacity-50 border-t border-white/50"></div>
              
              <p class="text-[10px] text-stone-600 leading-snug font-serif italic">
                "{{ node.cheer || (node.current ? '当前进度' : '已完成') }}"
              </p>
           </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TimelineNode, MainStage } from '../types'

defineProps<{
  timeline: TimelineNode[]
  progress: number
  currentMainStage: MainStage
}>()

defineEmits<{
  (e: 'node-click', node: TimelineNode): void
}>()
</script>
