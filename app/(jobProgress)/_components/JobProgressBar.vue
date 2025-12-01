<template>
  <div class="w-full relative select-none">
    <!-- Cheer Text Area -->
    <div class="mb-4 px-1 flex items-center gap-2 animate-fade-in">
      <div class="text-lg">
        <span v-if="currentCheer.emoji">{{ currentCheer.emoji }}</span>
        <span v-else>🌱</span>
      </div>
      <div class="text-sm text-stone-600 font-serif italic">
        “{{ currentCheer.text }}”
      </div>
    </div>

    <!-- Main 3-Stage Track -->
    <div class="relative pb-4">
      <!-- Background Line -->
      <div class="absolute top-3 left-0 w-full h-0.5 bg-stone-100"></div>

      <!-- Active Progress Line -->
      <div
        class="absolute top-3 left-0 h-0.5 bg-stone-800 transition-all duration-1000 ease-out"
        :style="{ width: `${overallProgress}%` }"
      ></div>

      <!-- 3 Main Stage Nodes -->
      <div class="relative flex justify-between z-10">
        <div
          v-for="stage in mainStages"
          :key="stage.id"
          class="flex flex-col items-center cursor-pointer group w-1/3 relative"
          @click="toggleStage(stage.id)"
        >
          <!-- Node Dot -->
          <div
            class="w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-500 z-10"
            :class="[
              getStageColor(stage.status),
              activeMainStage === stage.id ? 'scale-110 ring-2 ring-offset-2 ring-stone-100' : 'group-hover:scale-105'
            ]"
          >
             <div v-if="stage.status === 'completed'" class="text-[10px] text-stone-800 font-bold">✓</div>
             <div v-else-if="stage.status === 'active'" class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          </div>

          <!-- Stage Label -->
          <div
            class="mt-2 text-xs font-bold transition-colors duration-300 text-center font-serif"
            :class="stage.status === 'pending' ? 'text-stone-300' : 'text-stone-800'"
          >
            {{ stage.label }}
          </div>
          
          <!-- Active Indicator (Triangle) -->
          <div v-if="activeMainStage === stage.id" class="absolute top-8 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-stone-100 mt-3 animate-fade-in"></div>
        </div>
      </div>
    </div>

    <!-- Expanded Sub-nodes Area (Paper Note Style) -->
    <div
      v-if="activeMainStage"
      class="bg-[#fdfbf7] rounded-sm p-5 mt-1 animate-expand-height shadow-[2px_2px_8px_rgba(0,0,0,0.05)] border border-stone-200/60 relative overflow-hidden"
    >
      <!-- Paper Texture -->
      <div class="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none"></div>
      
      <!-- Tape Effect -->
      <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-[1px] border-l border-r border-white/60 rotate-1 opacity-60 shadow-sm"></div>

      <!-- Scrollable Nodes -->
      <div class="flex items-start gap-6 overflow-x-auto pb-2 custom-scrollbar relative z-10">
        <div
          v-for="(node, idx) in activeSubNodes"
          :key="idx"
          class="shrink-0 flex flex-col items-start gap-2 min-w-[120px] group"
        >
          <!-- Node Title & Status -->
          <div 
            class="flex items-center gap-2 cursor-pointer"
            @click="$emit('node-click', node)"
          >
            <div
              class="w-3 h-3 rounded-full border transition-all duration-300"
              :class="[
                node.current
                  ? 'bg-stone-800 border-stone-800'
                  : node.completed
                    ? 'bg-stone-400 border-stone-400'
                    : 'bg-white border-stone-300'
              ]"
            ></div>
            <span
              class="text-xs font-bold transition-colors"
              :class="node.current ? 'text-stone-800' : 'text-stone-500'"
            >
              {{ node.stage }}
            </span>
          </div>

          <!-- Sub-tasks List (Expandable) -->
          <div v-if="node.subEvents && node.subEvents.length > 0" class="pl-1.5 border-l border-stone-200 ml-1.5 space-y-2 mt-1">
             <div 
               v-for="event in node.subEvents" 
               :key="event.id"
               class="flex items-start gap-2 pl-3 text-[10px] text-stone-600 hover:text-stone-800 cursor-pointer transition-colors"
             >
               <div class="w-2 h-2 mt-0.5 border border-stone-300 rounded-sm" :class="{ 'bg-stone-800 border-stone-800': event.completed }"></div>
               <span :class="{ 'line-through text-stone-400': event.completed }">{{ event.title }}</span>
             </div>
          </div>
          <div v-else-if="node.current" class="pl-4 text-[10px] text-stone-400 italic mt-1">
             暂无子任务...
             <button class="text-amber-600 hover:underline ml-1">添加</button>
          </div>
        </div>

        <div v-if="activeSubNodes.length === 0" class="text-xs text-stone-400 w-full text-center py-2 italic">
          暂无详细记录
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { TimelineNode, MainStage } from '../types'

const props = defineProps<{
  timeline: TimelineNode[]
  progress: number // Overall progress 0-100
  currentMainStage?: MainStage
}>()

defineEmits(['node-click'])

const activeMainStage = ref<MainStage | null>(null)

// Initialize active stage based on prop
watch(
  () => props.currentMainStage,
  (val) => {
    if (val) activeMainStage.value = val
  },
  { immediate: true }
)

const mainStages = computed(() => {
  const stages: { id: MainStage; label: string; status: 'completed' | 'active' | 'pending'; cheer: { text: string, emoji: string } }[] = [
    { id: 'Applied', label: '已投递', status: 'pending', cheer: { text: '种下一颗种子，静待发芽。', emoji: '🌱' } },
    { id: 'Interview', label: '面试', status: 'pending', cheer: { text: '保持自信，你离 Offer 只差一步！', emoji: '✨' } },
    { id: 'Offer', label: 'Offer', status: 'pending', cheer: { text: '所有的努力，终将会有回报。', emoji: '🎁' } }
  ]

  const currentIndex = stages.findIndex((s) => s.id === props.currentMainStage)

  return stages.map((s, idx) => {
    if (idx < currentIndex) return { ...s, status: 'completed' }
    if (idx === currentIndex) return { ...s, status: 'active' }
    return { ...s, status: 'pending' }
  })
})

const currentCheer = computed(() => {
  const stage = mainStages.value.find(s => s.id === activeMainStage.value)
  return stage?.cheer || { text: '加油！', emoji: '💪' }
})

const activeSubNodes = computed(() => {
  if (!activeMainStage.value) return []
  return props.timeline.filter((n) => n.mainStage === activeMainStage.value)
})

const overallProgress = computed(() => {
  if (props.currentMainStage === 'Applied') return 20
  if (props.currentMainStage === 'Interview') return 60
  if (props.currentMainStage === 'Offer') return 100
  return 0
})

const toggleStage = (id: MainStage) => {
  if (activeMainStage.value !== id) {
    activeMainStage.value = id
  }
}

const getStageColor = (status: string) => {
  if (status === 'completed') return 'border-stone-800 text-stone-800'
  if (status === 'active') return 'border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.2)]'
  return 'border-stone-200'
}
</script>

<style scoped>
.animate-expand-height {
  animation: expand-height 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform-origin: top;
}

@keyframes expand-height {
  from {
    opacity: 0;
    transform: scaleY(0.95);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: scaleY(1);
    max-height: 300px; /* Enough for content */
  }
}

.animate-fade-in {
  animation: fade-in 0.4s ease-out forwards;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
}

.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e7e5e4;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #d6d3d1;
}
</style>
