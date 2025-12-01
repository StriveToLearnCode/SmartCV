<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
    <div class="bg-stone-50 rounded-2xl max-w-3xl w-full shadow-2xl animate-slide-up overflow-hidden flex flex-col max-h-[90vh] relative">
      <!-- Paper Texture Background -->
      <div class="absolute inset-0 bg-paper-texture opacity-50 pointer-events-none"></div>

      <!-- Header -->
      <div class="relative z-10 px-6 py-4 border-b border-stone-200/60 flex justify-between items-center bg-white/80 backdrop-blur-md">
        <div>
          <h3 class="text-xl font-bold text-stone-800 font-serif flex items-center gap-2">
            <span>📝 面试复盘</span>
            <span class="text-sm font-normal text-stone-500 font-sans">| {{ job?.company }} - {{ job?.position }}</span>
          </h3>
          <p class="text-xs text-stone-400 mt-1">记录每一次对话，沉淀经验，下次更好。</p>
        </div>
        <button @click="close" class="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- Content: Review Cards List -->
      <div class="relative z-10 flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        
        <!-- Empty State -->
        <div v-if="reviewableNodes.length === 0" class="text-center py-12 text-stone-400">
          <p>暂无需要复盘的面试节点</p>
        </div>

        <!-- Cards (Collapsible Note Style) -->
        <div 
          v-for="(node, index) in reviewableNodes" 
          :key="node.id || index"
          class="bg-white shadow-[2px_2px_8px_rgba(0,0,0,0.05)] border border-stone-200 transition-all duration-500 ease-out overflow-hidden relative group"
          :class="expandedNodeId === node.id ? 'rounded-sm rotate-[0.5deg] z-10 ring-1 ring-stone-900/5' : 'rounded-xl hover:shadow hover:border-stone-300 hover:-rotate-1'"
        >
          <!-- Shredded Edge Top (Visual) -->
          <div v-if="expandedNodeId === node.id" class="absolute top-0 left-0 w-full h-1 bg-[url('data:image/svg+xml;base64,...')] opacity-50"></div>

          <!-- Card Header (Always Visible) -->
          <div 
            @click="toggleExpand(node.id!)"
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
                  <span v-if="node.date" class="text-xs text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">{{ node.date }}</span>
                  <span v-if="node.completed" class="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">已完成</span>
                </div>
                <div class="flex items-center gap-2 mt-1">
                  <!-- Tags Display (Summary) -->
                  <div v-if="node.tags && node.tags.length > 0" class="flex gap-1">
                    <span v-for="tag in node.tags" :key="tag" class="text-[10px] px-1.5 rounded bg-stone-100 text-stone-500">#{{ tag }}</span>
                  </div>
                  <span v-else class="text-[10px] text-stone-300 italic">点击展开填写复盘...</span>
                </div>
              </div>
            </div>

            <!-- Right: Score & Toggle -->
            <div class="flex items-center gap-4">
              <div v-if="node.growthStats" class="flex items-center gap-1">
                 <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                   🌱 成长 +{{ calculateTotalGrowth(node) }}%
                 </span>
              </div>
              <div v-if="node.selfScore" class="text-center">
                <div class="text-lg font-bold text-stone-800 font-serif">{{ node.selfScore }}<span class="text-xs text-stone-400 font-sans">/10</span></div>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 text-stone-400 transition-transform duration-300"
                :class="expandedNodeId === node.id ? 'rotate-180' : ''"
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Card Body (Expandable) -->
          <div v-if="expandedNodeId === node.id" class="p-6 border-t border-stone-100 animate-slide-down relative bg-[#fdfbf7]">
             <!-- Auto-save Indicator -->
            <div class="absolute top-4 right-4 transition-opacity duration-300" :class="(node.id && getState(node.id).status !== 'idle') ? 'opacity-100' : 'opacity-0'">
               <SaveStatusSticker
                 v-if="node.id"
                 :status="getState(node.id).status"
                 :timeAgo="getState(node.id).timeAgo"
                 :lastSavedTime="getState(node.id).lastSavedTime"
                 @retry="triggerAutoSave(node)"
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
                      @click="toggleTag(node, tag)"
                      class="px-3 py-1 text-xs rounded-full border transition-colors"
                      :class="node.tags?.includes(tag) ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'"
                    >
                      {{ tag }}
                    </button>
                    <button class="px-2 py-1 text-xs rounded-full border border-dashed border-stone-300 text-stone-400 hover:text-stone-600 hover:border-stone-400">
                      + 自定义
                    </button>
                  </div>
                </div>

                <!-- 2. Questions -->
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <label class="text-xs font-bold text-stone-500 uppercase">面试问题记录</label>
                    <div class="flex gap-2">
                      <button class="text-[10px] text-stone-400 hover:text-stone-600 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                        </svg>
                        添加附件
                      </button>
                      <button @click="applyTemplate(node)" class="text-[10px] text-indigo-500 hover:underline">使用模板</button>
                    </div>
                  </div>
                  <textarea 
                    v-model="node.questions"
                    @input="triggerAutoSave(node)"
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
                      @click="setScore(node, i)"
                      class="w-8 h-8 rounded-lg text-xs font-bold border transition-all"
                      :class="node.selfScore === i ? 'bg-stone-800 text-white border-stone-800 scale-110 shadow-md' : 'bg-white text-stone-400 border-stone-200 hover:border-stone-300 hover:text-stone-600'"
                    >
                      {{ i }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Right Column: AI Analysis & Improvement -->
              <div class="space-y-6">
                <!-- AI Suggestions Box -->
                <div class="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-100 rounded-xl p-5 relative overflow-hidden group">
                  <!-- Decorative Icon -->
                  <div class="absolute -right-4 -top-4 text-indigo-100/50 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                    </svg>
                  </div>

                  <div class="relative z-10">
                    <div class="flex items-center gap-2 mb-3">
                      <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                      <h4 class="text-sm font-bold text-indigo-900">AI 智能复盘助手</h4>
                    </div>
                    
                    <div v-if="!node.questions || node.questions.length < 10" class="text-xs text-stone-500 py-4">
                      请先填写左侧的“面试问题记录”，AI 将为您自动生成分析建议。
                    </div>
                    
                    <div v-else-if="!node.aiSummary" class="py-2">
                      <button 
                        @click="generateAIAnalysis(node)"
                        class="px-4 py-2 bg-white text-indigo-600 text-xs font-bold rounded-lg shadow-sm border border-indigo-100 hover:bg-indigo-50 transition-all flex items-center gap-2"
                      >
                        <span v-if="isGenerating[node.id!]">Thinking...</span>
                        <span v-else>✨ 生成分析建议</span>
                      </button>
                    </div>

                    <div v-else class="space-y-3 animate-fade-in">
                      <!-- Growth Report Sticker (Visualized Growth) -->
                      <div v-if="node.growthStats" class="bg-[#fffdf5] p-3 rounded-lg shadow-sm border border-yellow-100/50 rotate-[-1deg] mb-4 relative overflow-hidden">
                         <div class="absolute top-0 left-0 w-full h-1 bg-yellow-200/30"></div>
                         <div class="flex items-center justify-between mb-2">
                           <h5 class="text-xs font-bold text-stone-700 font-serif">成长报表</h5>
                           <span class="text-[10px] text-stone-400">{{ new Date().toLocaleDateString() }}</span>
                         </div>
                         <div class="space-y-2">
                           <div v-for="stat in node.growthStats" :key="stat.category" class="flex items-center justify-between text-xs">
                             <span class="text-stone-600">{{ stat.category }}</span>
                             <div class="flex items-center gap-2">
                               <div class="w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                                 <div class="h-full bg-emerald-400 rounded-full" :style="{ width: stat.score + '%' }"></div>
                               </div>
                               <span class="font-bold text-emerald-600 text-[10px]">+{{ stat.delta }}%</span>
                             </div>
                           </div>
                         </div>
                      </div>

                      <div>
                        <div class="text-[10px] font-bold text-indigo-400 uppercase mb-1">缺失技能 / 薄弱点</div>
                        <div class="flex flex-wrap gap-1">
                          <span v-for="point in node.aiSummary.weakPoints" :key="point" class="text-[10px] px-2 py-1 bg-white/60 border border-indigo-100 rounded text-stone-600">
                            {{ point }}
                          </span>
                        </div>
                      </div>
                      <div>
                         <div class="text-[10px] font-bold text-indigo-400 uppercase mb-1">改进建议</div>
                         <p class="text-xs text-stone-600 leading-relaxed">
                           {{ node.aiSummary.suggestions }}
                         </p>
                      </div>
                      
                      <!-- Feedback Loop Action -->
                      <button class="w-full mt-2 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                        </svg>
                        反哺优化简历
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Improvement Plan -->
                <div>
                  <label class="block text-xs font-bold text-stone-500 uppercase mb-2">行动计划 / 改进方案</label>
                  <div class="relative">
                    <textarea 
                      v-model="node.improvement"
                      @input="triggerAutoSave(node)"
                      placeholder="针对本次面试的不足，接下来准备如何改进？"
                      class="w-full h-24 p-3 text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-stone-400 outline-none transition-colors resize-none"
                    ></textarea>
                     <!-- Sync to Resume Checkbox -->
                    <div class="mt-2 flex items-center gap-2">
                       <input type="checkbox" :id="'sync-' + node.id" checked class="rounded text-stone-800 focus:ring-stone-800 border-stone-300">
                       <label :for="'sync-' + node.id" class="text-[10px] font-medium text-stone-500 cursor-pointer select-none">
                         同步至简历优化模块
                       </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
import type { JobApplication, TimelineNode, GrowthStat } from '../types'
import SaveStatusSticker from '../../components/SaveStatusSticker.vue'

const props = defineProps<{
  modelValue: boolean
  job: JobApplication | null
  initialNodeId?: string
}>()

const emit = defineEmits(['update:modelValue', 'save'])

// State
const expandedNodeId = ref<string | null>(null)
const isGenerating = ref<Record<string, boolean>>({})

interface NodeSaveState {
  status: 'idle' | 'saving' | 'saved' | 'error'
  lastSavedTime: Date | null
  timeAgo: string
}

const saveStatus = ref<Record<string, NodeSaveState>>({})
const lastSavedTime = ref('') // Global footer time (optional, keep for now)
const saveTimeout = ref<NodeJS.Timeout | null>(null)
let updateTimer: number | null = null

const getState = (id: string): NodeSaveState => {
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
    if (!state.lastSavedTime) continue
    
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
watch(() => props.modelValue, (val) => {
  if (val) {
    updateTimer = window.setInterval(updateTimeAgo, 1000)
  } else {
    if (updateTimer) {
      clearInterval(updateTimer)
      updateTimer = null
    }
  }
}, { immediate: true })

onUnmounted(() => {
  if (updateTimer) clearInterval(updateTimer)
})


// Computed
const reviewableNodes = computed(() => {
  if (!props.job) return []
  // Filter for nodes that are relevant for review (e.g. Interview stages)
  // Also sorting them by date desc (newest first)
  return props.job.timeline
    .filter(node => node.mainStage === 'Interview' || node.mainStage === 'Offer')
    .reverse()
})

// Watchers
watch(() => props.modelValue, (val) => {
  if (val) {
    // Open specific node if requested, otherwise first one
    if (props.initialNodeId) {
      expandedNodeId.value = props.initialNodeId
    } else if (reviewableNodes.value.length > 0) {
      // Auto expand the most recent one if incomplete review?
      // For now just collapse all or expand first
      expandedNodeId.value = reviewableNodes.value[0].id || null
    }
  }
})

// Methods
const close = () => {
  emit('update:modelValue', false)
}

const toggleExpand = (id: string) => {
  if (expandedNodeId.value === id) {
    expandedNodeId.value = null
  } else {
    expandedNodeId.value = id
  }
}

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

const toggleTag = (node: TimelineNode, tag: string) => {
  if (!node.tags) node.tags = []
  const index = node.tags.indexOf(tag)
  if (index > -1) {
    node.tags.splice(index, 1)
  } else {
    node.tags.push(tag)
  }
  triggerAutoSave(node)
}

const setScore = (node: TimelineNode, score: number) => {
  node.selfScore = score
  triggerAutoSave(node)
}

const applyTemplate = (node: TimelineNode) => {
  node.questions = `### 核心问题
1. 
2. 

### 追问环节
- 

### 反问环节
- 团队规模？
- 技术栈？`
  triggerAutoSave(node)
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
    
    // In real app, emit save event with job data
    emit('save', props.job) 
  }, 1000)
}

const generateAIAnalysis = (node: TimelineNode) => {
  if (!node.id) return
  isGenerating.value[node.id] = true
  
  // Mock AI Latency
  setTimeout(() => {
    node.aiSummary = {
      feedback: "整体表现良好，但在深挖底层原理时显得略有犹豫。",
      weakPoints: ["Vue3 响应式源码细节", "浏览器渲染机制", "TypeScript 高级类型"],
      suggestions: "建议重新阅读 Vue3 源码中关于 Proxy 和 Reflect 的部分；加强对浏览器 Event Loop 的理解。项目描述中可以使用 STAR 法则更清晰地表述。"
    }
    
    // Generate Growth Stats
    node.growthStats = [
      { category: '算法表现', score: 85, delta: 10 },
      { category: '沟通表达', score: 92, delta: 6 },
      { category: '项目深度', score: 78, delta: 15 }
    ]
    
    isGenerating.value[node.id!] = false
    triggerAutoSave(node)
  }, 2000)
}

const calculateTotalGrowth = (node: TimelineNode) => {
  if (!node.growthStats) return 0
  return node.growthStats.reduce((acc, curr) => acc + curr.delta, 0)
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

.animate-slide-down {
  animation: slide-down 0.3s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.4s ease-out forwards;
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes slide-down {
  from { opacity: 0; transform: translateY(-10px); max-height: 0; }
  to { opacity: 1; transform: translateY(0); max-height: 600px; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Paper texture background for growth sticker */
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
}
</style>
