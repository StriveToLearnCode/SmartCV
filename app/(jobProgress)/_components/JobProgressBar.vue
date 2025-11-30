<template>
  <div class="w-full relative select-none">
    <!-- Main 3-Stage Track -->
    <div class="relative pt-8 pb-4">
      <!-- Background Line -->
      <div class="absolute top-10 left-0 w-full h-1 bg-stone-100 rounded-full"></div>

      <!-- Active Progress Line (Simplified for Main Stages) -->
      <div
        class="absolute top-10 left-0 h-1 bg-stone-800 transition-all duration-500 rounded-full"
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
            class="w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 z-10"
            :class="[
              getStageColor(stage.status),
              activeMainStage === stage.id ? 'scale-125 ring-4 ring-stone-50' : 'group-hover:scale-110'
            ]"
          >
            <div v-if="stage.status === 'completed'" class="w-2.5 h-2.5 bg-stone-800 rounded-full"></div>
            <div
              v-else-if="stage.status === 'active'"
              class="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse"
            ></div>
          </div>

          <!-- Stage Label -->
          <div
            class="absolute -top-6 text-xs font-bold transition-colors duration-300 text-center uppercase tracking-wider"
            :class="stage.status === 'pending' ? 'text-stone-300' : 'text-stone-800'"
          >
            {{ stage.label }}
          </div>

          <!-- Sub-nodes Connector (Vertical Line) -->
          <div v-if="activeMainStage === stage.id" class="absolute top-5 h-6 w-px bg-stone-200 animate-grow-down"></div>
        </div>
      </div>
    </div>

    <!-- Expanded Sub-nodes Area -->
    <div
      v-if="activeMainStage"
      class="bg-stone-50 rounded-xl p-4 mt-2 animate-fade-in border border-stone-100 relative"
    >
      <!-- Little Triangle -->
      <div
        class="absolute -top-1.5 w-3 h-3 bg-stone-50 border-t border-l border-stone-100 rotate-45 transition-all duration-300"
        :style="{ left: getTriangleLeft(activeMainStage) }"
      ></div>

      <div class="flex items-start gap-2 overflow-x-auto py-2 px-1 custom-scrollbar">
        <div
          v-for="(node, idx) in activeSubNodes"
          :key="idx"
          class="shrink-0 flex flex-col items-center gap-2 cursor-pointer group min-w-[60px]"
          @click="$emit('node-click', node)"
        >
          <div
            class="w-3 h-3 rounded-full border transition-all duration-300"
            :class="[
              node.current
                ? 'bg-stone-800 border-stone-800 scale-110'
                : node.completed
                  ? 'bg-stone-400 border-stone-400'
                  : 'bg-white border-stone-300'
            ]"
          ></div>
          <span
            class="text-[10px] font-medium text-center px-2 py-1 rounded-md transition-colors truncate max-w-[80px]"
            :class="node.current ? 'bg-stone-200 text-stone-800' : 'text-stone-500 group-hover:text-stone-700'"
          >
            {{ node.stage }}
          </span>
        </div>

        <div v-if="activeSubNodes.length === 0" class="text-xs text-stone-400 w-full text-center py-2">
          暂无进度记录
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
  const stages: { id: MainStage; label: string; status: 'completed' | 'active' | 'pending' }[] = [
    { id: 'Applied', label: '已投递', status: 'pending' },
    { id: 'Interview', label: '面试', status: 'pending' },
    { id: 'Offer', label: 'Offer', status: 'pending' }
  ]

  // Logic to determine status of each main stage
  // This is simplified; real logic would check if ALL nodes in previous stage are done, etc.
  // Here we rely on currentMainStage or deduce from timeline.

  // Find index of current main stage
  const currentIndex = stages.findIndex((s) => s.id === props.currentMainStage)

  return stages.map((s, idx) => {
    if (idx < currentIndex) return { ...s, status: 'completed' }
    if (idx === currentIndex) return { ...s, status: 'active' }
    return { ...s, status: 'pending' }
  })
})

const activeSubNodes = computed(() => {
  if (!activeMainStage.value) return []
  return props.timeline.filter((n) => n.mainStage === activeMainStage.value)
})

const overallProgress = computed(() => {
  // Visual progress for the top bar (0, 50, 100 roughly)
  if (props.currentMainStage === 'Applied') return 20
  if (props.currentMainStage === 'Interview') return 60
  if (props.currentMainStage === 'Offer') return 100
  return 0
})

const toggleStage = (id: MainStage) => {
  if (activeMainStage.value === id) {
    // Optional: collapse if clicking same?
    // activeMainStage.value = null
  } else {
    activeMainStage.value = id
  }
}

const getStageColor = (status: string) => {
  if (status === 'completed') return 'border-stone-800'
  if (status === 'active') return 'border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.4)]'
  return 'border-stone-200'
}

const getTriangleLeft = (id: string) => {
  if (id === 'Applied') return '16.5%'
  if (id === 'Interview') return '50%'
  if (id === 'Offer') return '83.5%'
  return '50%'
}
</script>

<style scoped>
.animate-grow-down {
  animation: grow-down 0.3s ease-out forwards;
  transform-origin: top;
}

@keyframes grow-down {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
</style>
