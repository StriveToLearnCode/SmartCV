<template>
  <div class="w-full py-4 relative select-none">
    <!-- 进度条背景线 -->
    <div class="absolute top-1/2 left-0 w-full h-0.5 bg-stone-200 -translate-y-1/2 rounded-full overflow-hidden">
      <!-- 进度填充 -->
      <div 
        class="h-full bg-stone-800 transition-all duration-1000 ease-out rounded-full"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>

    <!-- 节点容器 -->
    <div class="relative flex justify-between w-full">
      <div 
        v-for="(node, index) in timeline" 
        :key="index"
        class="flex flex-col items-center group cursor-pointer"
        @mouseenter="hoverNode = index"
        @mouseleave="hoverNode = null"
      >
        <!-- 节点圆点 -->
        <div 
          class="w-4 h-4 rounded-full border-2 transition-all duration-300 relative z-10 bg-white flex items-center justify-center"
          :class="[
            getNodeColor(node, index),
            hoverNode === index ? 'scale-150 shadow-md' : 'scale-100'
          ]"
        >
          <!-- 内心实心圆 (当前或已完成) -->
          <div 
            v-if="node.completed || node.current"
            class="w-1.5 h-1.5 rounded-full bg-current transition-all duration-300"
          ></div>
        </div>

        <!-- 节点文本 -->
        <div 
          class="mt-3 text-xs font-medium transition-colors duration-300 text-center absolute top-4 w-20"
          :class="[
            node.current ? 'text-stone-800 font-bold' : 'text-stone-400',
            hoverNode === index ? 'text-stone-900 scale-105' : ''
          ]"
        >
          {{ node.stage }}
          <div v-if="node.date" class="text-[10px] font-normal text-stone-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {{ node.date }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TimelineNode } from '../types'

const props = defineProps<{
  timeline: TimelineNode[]
  progress: number
}>()

const hoverNode = ref<number | null>(null)

const getNodeColor = (node: TimelineNode, index: number) => {
  if (node.current) return 'border-stone-800 text-stone-800 ring-4 ring-stone-100'
  if (node.completed) return 'border-stone-600 text-stone-600'
  return 'border-stone-300 text-transparent' // 未完成为空心
}
</script>

