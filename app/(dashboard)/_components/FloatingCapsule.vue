<template>
  <div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-end gap-4 pointer-events-none">
    
    <!-- 1. Interview First Aid Kit (Floating Button) -->
    <!-- Only appears when 'showFirstAid' is true (mocked) -->
    <Motion
      v-if="showFirstAid"
      class="pointer-events-auto relative"
      :initial="{ y: 100, rotate: 10 }"
      :animate="{ y: 0, rotate: 0 }"
      :transition="{ type: 'spring', delay: 1 }"
    >
       <div 
         class="relative group"
         @click="toggleCheatSheet"
       >
          <!-- The Button -->
          <div class="w-14 h-14 rounded-full bg-white border-2 border-stone-800 shadow-sticky flex items-center justify-center cursor-pointer hover:scale-110 transition-transform bg-paper-texture z-20 relative">
             <span class="text-2xl">🚑</span>
          </div>
          
          <!-- Badge -->
          <div class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center border border-white z-30 animate-pulse">
            1
          </div>

          <!-- Tooltip -->
          <div class="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-stone-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            面试急救包
          </div>
       </div>

       <!-- The Cheat Sheet Modal (Pop-up) -->
       <Motion
         v-if="isCheatSheetOpen"
         class="absolute bottom-20 left-1/2 -translate-x-1/2 w-[300px] md:w-[360px] origin-bottom"
         :initial="{ scale: 0.8, opacity: 0, y: 20 }"
         :animate="{ scale: 1, opacity: 1, y: 0 }"
         :exit="{ scale: 0.8, opacity: 0, y: 20 }"
       >
          <div class="bg-[#fff] border-2 border-stone-800 rounded-sm shadow-2xl overflow-hidden relative">
             <!-- Header -->
             <div class="bg-red-50 p-4 border-b border-stone-100 flex justify-between items-center">
                <h3 class="font-bold text-stone-800 font-serif">面试小抄 · 2:00 PM</h3>
                <button @click.stop="isCheatSheetOpen = false" class="text-stone-400 hover:text-stone-800">×</button>
             </div>

             <!-- Content -->
             <div class="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
                <!-- Who -->
                <div>
                   <div class="text-[10px] font-bold text-stone-400 uppercase mb-1">面试官 (WHO)</div>
                   <div class="text-lg font-bold">Sarah Lin <span class="font-normal text-sm text-stone-500">· Design Lead</span></div>
                </div>

                <!-- Say -->
                <div class="bg-yellow-50 p-3 rounded border border-yellow-100 relative">
                   <div class="absolute -top-2 -right-2 text-xl">📌</div>
                   <div class="text-[10px] font-bold text-yellow-600 uppercase mb-1">记得说 (SAY)</div>
                   <ul class="text-sm text-stone-700 space-y-1 list-disc list-inside">
                      <li>SaaS 平台重构经验</li>
                      <li>设计系统搭建能力</li>
                      <li class="bg-yellow-200/50 inline-block px-1">数据驱动：效率提升 30%</li>
                   </ul>
                </div>

                <!-- Ask -->
                <div>
                   <div class="text-[10px] font-bold text-stone-400 uppercase mb-1">反问 (ASK)</div>
                   <p class="text-sm text-stone-600 italic">"团队目前最大的挑战是什么？"</p>
                </div>
             </div>
             
             <!-- Footer -->
             <div class="bg-stone-50 p-3 text-center text-xs text-stone-400 border-t border-stone-100">
                深呼吸，你可以的。
             </div>
          </div>
       </Motion>
    </Motion>

    <!-- 2. Main Navigation Capsule -->
    <Motion
      class="pointer-events-auto bg-[#fdfbf7] bg-paper-texture border border-stone-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full p-1 flex items-center backdrop-blur-sm"
      :initial="{ y: 20, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="selectTab(tab.id)"
        class="relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 group flex items-center gap-2 outline-none"
        :class="modelValue === tab.id ? 'text-stone-800' : 'text-stone-500 hover:text-stone-700'"
      >
        <!-- Active Background -->
        <Motion
          v-if="modelValue === tab.id"
          layoutId="capsule-active"
          class="absolute inset-0 bg-stone-100 border border-stone-200 rounded-full shadow-sm"
          :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
        />
        
        <!-- Content -->
        <span class="relative z-10 flex items-center gap-2 font-serif tracking-wide">
           <span>{{ tab.icon }}</span>
           <span v-if="modelValue === tab.id || isHovered" class="hidden md:inline">{{ tab.label }}</span>
        </span>
      </button>
    </Motion>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Motion } from 'motion-v'

interface Tab {
  id: string
  label: string
  icon: string
}

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const showFirstAid = ref(true) // Mock: Always show for demo
const isCheatSheetOpen = ref(false)
const isHovered = ref(false)

const tabs: Tab[] = [
  { id: 'overview', label: '概览', icon: '🏠' },
  { id: 'progress', label: '进度', icon: '🗺️' }, // Changed to map icon
  { id: 'suggestion', label: '建议', icon: '💡' },
  { id: 'templates', label: '模板', icon: '🎨' }
]

const selectTab = (id: string) => {
  emit('update:modelValue', id)
}

const toggleCheatSheet = () => {
  isCheatSheetOpen.value = !isCheatSheetOpen.value
}
</script>

<style scoped>
.shadow-sticky {
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
}
</style>
