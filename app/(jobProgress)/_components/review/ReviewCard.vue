<template>
  <div
    class="bg-white shadow-[2px_2px_8px_rgba(0,0,0,0.05)] border border-stone-200 transition-all duration-500 ease-out overflow-hidden relative group"
    :class="
      isExpanded
        ? 'rounded-sm rotate-[0.5deg] z-10 ring-1 ring-stone-900/5'
        : 'rounded-xl hover:shadow hover:border-stone-300 hover:-rotate-1'
    "
  >
    <!-- Shredded Edge Top (Visual) -->
    <div
      v-if="isExpanded"
      class="absolute top-0 left-0 w-full h-1 bg-[url('data:image/svg+xml;base64,...')] opacity-50"
    ></div>

    <!-- Card Header (Always Visible) -->
    <div
      @click="$emit('toggle-expand')"
      class="p-4 flex items-center justify-between cursor-pointer bg-[#fbfbf9] hover:bg-[#fdfdfc] transition-colors"
    >
      <div class="flex items-center gap-4">
        <!-- Status Icon -->
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm border border-white"
          :class="getStatusColor(node)"
        >
          {{ getStatusIcon(node) }}
        </div>

        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-stone-800 font-serif tracking-wide">{{ node.stage }}</h4>
            <span v-if="node.date" class="text-xs text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">{{
              node.date
            }}</span>
            <span
              v-if="node.completed"
              class="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100"
              >已完成</span
            >
          </div>
          <div class="flex items-center gap-2 mt-1">
            <!-- Tags Display (Summary) -->
            <div v-if="node.tags && node.tags.length > 0" class="flex gap-1">
              <span
                v-for="tag in node.tags"
                :key="tag"
                class="text-[10px] px-1.5 rounded bg-stone-100 text-stone-500"
                >#{{ tag }}</span
              >
            </div>
            <span v-else class="text-[10px] text-stone-300 italic">点击展开填写复盘...</span>
          </div>
        </div>
      </div>

      <!-- Right: Score & Toggle -->
      <div class="flex items-center gap-4">
        <div v-if="node.growthStats" class="flex items-center gap-1">
          <span
            class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100"
          >
            🌱 成长 +{{ calculateTotalGrowth(node) }}%
          </span>
        </div>
        <div v-if="node.selfScore" class="text-center">
          <div class="text-lg font-bold text-stone-800 font-serif">
            {{ node.selfScore }}<span class="text-xs text-stone-400 font-sans">/10</span>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-stone-400 transition-transform duration-300"
          :class="isExpanded ? 'rotate-180' : ''"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!-- Card Body (Expandable) -->
    <div
      v-if="isExpanded"
      class="p-6 border-t border-stone-100 animate-slide-down relative bg-[#fdfbf7]"
    >
      <!-- Auto-save Indicator -->
      <div
        class="absolute top-4 right-4 transition-opacity duration-300"
        :class="saveStatus.status !== 'idle' ? 'opacity-100' : 'opacity-0'"
      >
        <SaveStatusSticker
          :status="saveStatus.status"
          :timeAgo="saveStatus.timeAgo"
          :lastSavedTime="saveStatus.lastSavedTime"
          @retry="$emit('auto-save')"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column: Inputs -->
        <div class="space-y-6">
          <!-- 1. Tags -->
          <div>
            <label class="block text-xs font-bold text-stone-500 uppercase mb-2">面试标签</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in ['技术面', 'HR面', '行为面', '算法', '系统设计']"
                :key="tag"
                @click="toggleTag(tag)"
                class="px-3 py-1 text-xs rounded-full border transition-colors"
                :class="
                  node.tags?.includes(tag)
                    ? 'bg-stone-800 text-white border-stone-800'
                    : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'
                "
              >
                {{ tag }}
              </button>
              <button
                class="px-2 py-1 text-xs rounded-full border border-dashed border-stone-300 text-stone-400 hover:text-stone-600 hover:border-stone-400"
              >
                + 自定义
              </button>
            </div>
          </div>

          <!-- Audio Recording Section -->
          <ReviewAudioRecorder
            v-model="node.audioRecording"
            @change="$emit('auto-save')"
            @append="appendTranscript"
            @auto-save="$emit('auto-save')"
          />

          <!-- 2. Questions -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="text-xs font-bold text-stone-500 uppercase">面试问题记录</label>
              <div class="flex gap-2">
                <button class="text-[10px] text-stone-400 hover:text-stone-600 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  添加附件
                </button>
                <button @click="applyTemplate" class="text-[10px] text-indigo-500 hover:underline">
                  使用模板
                </button>
              </div>
            </div>
            <textarea
              v-model="node.questions"
              @input="$emit('auto-save')"
              placeholder="1. 请介绍一下你的项目难点...&#10;2. Vue3 的响应式原理是..."
              class="w-full h-40 p-3 text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-stone-400 outline-none transition-colors resize-none custom-scrollbar shadow-inner"
            ></textarea>
          </div>

          <!-- 3. Self Score -->
          <div>
            <label class="block text-xs font-bold text-stone-500 uppercase mb-2">自我表现评分</label>
            <div class="flex gap-1">
              <button
                v-for="i in 10"
                :key="i"
                @click="setScore(i)"
                class="w-8 h-8 rounded-lg text-xs font-bold border transition-all"
                :class="
                  node.selfScore === i
                    ? 'bg-stone-800 text-white border-stone-800 scale-110 shadow-md'
                    : 'bg-white text-stone-400 border-stone-200 hover:border-stone-300 hover:text-stone-600'
                "
              >
                {{ i }}
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: AI Analysis & Improvement -->
        <ReviewAiAnalysis :node="node" @auto-save="$emit('auto-save')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TimelineNode } from '../../types'
import SaveStatusSticker from '../../../components/SaveStatusSticker.vue'
import ReviewAudioRecorder from './ReviewAudioRecorder.vue'
import ReviewAiAnalysis from './ReviewAiAnalysis.vue'

const props = defineProps<{
  node: TimelineNode
  isExpanded: boolean
  saveStatus: {
    status: 'idle' | 'saving' | 'saved' | 'error'
    lastSavedTime: Date | null
    timeAgo: string
  }
}>()

const emit = defineEmits(['toggle-expand', 'auto-save'])

const getStatusColor = (node: TimelineNode) => {
  if (node.completed) return 'bg-emerald-100 text-emerald-600 border-emerald-200'
  if (node.current) return 'bg-amber-100 text-amber-600 border-amber-200'
  return 'bg-stone-100 text-stone-400 border-stone-200'
}

const getStatusIcon = (node: TimelineNode) => {
  if (node.completed) return '✓'
  if (node.current) return '⚡'
  return '○'
}

const calculateTotalGrowth = (node: TimelineNode) => {
  if (!node.growthStats) return 0
  return node.growthStats.reduce((acc, curr) => acc + curr.delta, 0)
}

const toggleTag = (tag: string) => {
  if (!props.node.tags) props.node.tags = []
  const index = props.node.tags.indexOf(tag)
  if (index > -1) {
    props.node.tags.splice(index, 1)
  } else {
    props.node.tags.push(tag)
  }
  emit('auto-save')
}

const setScore = (score: number) => {
  props.node.selfScore = score
  emit('auto-save')
}

const applyTemplate = () => {
  props.node.questions = `### 核心问题
1. 
2. 

### 追问环节
- 

### 反问环节
- 团队规模？
- 技术栈？`
  emit('auto-save')
}

const appendTranscript = (text: string) => {
  const formattedText = `\n\n### 🎙️ 录音转录摘要\n${text}`
  props.node.questions = (props.node.questions || '') + formattedText
  emit('auto-save')
}
</script>

<style scoped>
.animate-slide-down {
  animation: slide-down 0.3s ease-out forwards;
}
@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 600px;
  }
}
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
</style>

