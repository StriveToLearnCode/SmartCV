<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm"
  >
    <div
      class="bg-stone-50 rounded-2xl max-w-3xl w-full shadow-2xl animate-slide-up overflow-hidden flex flex-col max-h-[90vh] relative"
    >
      <!-- Paper Texture Background -->
      <div class="absolute inset-0 bg-paper-texture opacity-50 pointer-events-none"></div>

      <!-- Header -->
      <div
        class="relative z-10 px-6 py-4 border-b border-stone-200/60 flex justify-between items-center bg-white/80 backdrop-blur-md"
      >
        <div>
          <h3 class="text-xl font-bold text-stone-800 font-serif flex items-center gap-2">
            <span>📝 面试复盘</span>
            <span class="text-sm font-normal text-stone-500 font-sans">| {{ job?.company }} - {{ job?.position }}</span>
          </h3>
          <p class="text-xs text-stone-400 mt-1">记录每一次对话，沉淀经验，下次更好。</p>
        </div>
        <button
          @click="close"
          class="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Content: Review Cards List -->
      <div class="relative z-10 flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        <!-- Empty State -->
        <div v-if="reviewableNodes.length === 0" class="text-center py-12 text-stone-400">
          <p>暂无需要复盘的面试节点</p>
        </div>

        <!-- Cards -->
        <ReviewCard
          v-for="(node, index) in reviewableNodes"
          :key="node.id || index"
          :node="node"
          :isExpanded="expandedNodeId === node.id"
          :saveStatus="getState(node.id)"
          @toggle-expand="toggleExpand(node.id)"
          @auto-save="triggerAutoSave(node)"
        />
      </div>

      <!-- Footer -->
      <div class="p-4 bg-white border-t border-stone-100 flex justify-between items-center relative z-10">
        <span class="text-xs text-stone-400" v-if="lastSavedTime">上次保存: {{ lastSavedTime }}</span>
        <span class="text-xs text-stone-400" v-else>自动保存已启用</span>

        <button
          @click="close"
          class="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white text-sm font-bold rounded-xl shadow-lg transition-all active:scale-95"
        >
          完成
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onUnmounted } from 'vue'
import type { JobApplication, TimelineNode } from '../types'
import ReviewCard from './review/ReviewCard.vue'

const props = defineProps<{
  modelValue: boolean
  job: JobApplication | null
  initialNodeId?: string
}>()

const emit = defineEmits(['update:modelValue', 'save'])

// State
const expandedNodeId = ref<string | null>(null)

interface NodeSaveState {
  status: 'idle' | 'saving' | 'saved' | 'error'
  lastSavedTime: Date | null
  timeAgo: string
}

const saveStatus = ref<Record<string, NodeSaveState>>({})
const lastSavedTime = ref('')
const saveTimeout = ref<any>(null)
let updateTimer: number | null = null

const getState = (id?: string): NodeSaveState => {
  if (!id) return { status: 'idle', lastSavedTime: null, timeAgo: '' }
  if (!saveStatus.value[id]) {
    saveStatus.value[id] = { status: 'idle', lastSavedTime: null, timeAgo: '' }
  }
  return saveStatus.value[id]
}

// Time Ago Updater
const updateTimeAgo = () => {
  const now = new Date()
  for (const id in saveStatus.value) {
    const state = saveStatus.value[id]
    if (!state || !state.lastSavedTime) continue

    const diff = Math.floor((now.getTime() - state.lastSavedTime.getTime()) / 1000)
    if (diff < 10) {
      state.timeAgo = '刚刚'
    } else if (diff < 60) {
      state.timeAgo = `${diff}秒前`
    } else {
      const minutes = Math.floor(diff / 60)
      state.timeAgo = `${minutes}分钟前`
    }
  }
}

// Start timer when mounted/visible
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      updateTimer = window.setInterval(updateTimeAgo, 1000)
    } else {
      if (updateTimer) {
        clearInterval(updateTimer)
        updateTimer = null
      }
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  if (updateTimer) clearInterval(updateTimer)
})

// Computed
const reviewableNodes = computed(() => {
  if (!props.job) return []
  return props.job.timeline.filter((node) => node.mainStage === 'Interview' || node.mainStage === 'Offer').reverse()
})

// Watchers
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      if (props.initialNodeId) {
        expandedNodeId.value = props.initialNodeId
      } else if (reviewableNodes.value.length > 0) {
        expandedNodeId.value = reviewableNodes.value[0].id || null
      }
    }
  }
)

// Methods
const close = () => {
  emit('update:modelValue', false)
}

const toggleExpand = (id?: string) => {
  if (!id) return
  if (expandedNodeId.value === id) {
    expandedNodeId.value = null
  } else {
    expandedNodeId.value = id
  }
}

const triggerAutoSave = (node: TimelineNode) => {
  if (!node.id) return

  const state = getState(node.id)
  state.status = 'saving'

  if (saveTimeout.value) clearTimeout(saveTimeout.value)

  saveTimeout.value = setTimeout(() => {
    // Mock Save
    state.status = 'saved'
    state.lastSavedTime = new Date()
    state.timeAgo = '刚刚'

    emit('save', props.job)
  }, 1000)
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(120, 113, 108, 0.2);
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(120, 113, 108, 0.4);
}

.animate-slide-up {
  animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
}
</style>
