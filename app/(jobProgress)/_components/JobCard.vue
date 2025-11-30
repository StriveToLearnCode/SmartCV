<template>
  <div
    class="bg-white rounded-2xl transition-all duration-500 ease-out border border-stone-200/60 overflow-visible group relative"
    :class="[
      expanded
        ? 'shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-stone-900/5 z-10'
        : 'shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-stone-300'
    ]"
  >
    <!-- Card Main Area -->
    <div class="p-6 relative">
      <!-- Paper Texture Overlay -->
      <div class="absolute inset-0 bg-paper-texture opacity-40 pointer-events-none rounded-2xl"></div>

      <div class="relative z-10">
        <!-- Header Row -->
        <div class="flex justify-between items-start mb-2 cursor-pointer" @click="toggleExpand">
          <div class="flex-1">
            <div class="flex items-center gap-3 flex-wrap mb-1.5">
              <h3
                class="text-lg font-bold text-stone-800 font-serif tracking-tight group-hover:text-stone-600 transition-colors"
              >
                {{ job.position }}
              </h3>
              <PriorityBadge :priority="job.priority" />
            </div>
            <div class="flex items-center gap-x-3 gap-y-1 text-stone-500 text-xs flex-wrap">
              <span class="font-bold text-stone-600">{{ job.company }}</span>
              <span v-if="job.location" class="w-0.5 h-0.5 rounded-full bg-stone-300"></span>
              <span v-if="job.location">{{ job.location }}</span>
              <span v-if="job.salary" class="w-0.5 h-0.5 rounded-full bg-stone-300"></span>
              <span v-if="job.salary" class="font-medium text-stone-600">{{ job.salary }}</span>
            </div>
          </div>
          <StatusBadge :status="job.status" class="shrink-0 ml-2" />
        </div>

        <!-- Next Interview & Countdown (If scheduled) -->
        <div
          v-if="job.nextInterviewDate"
          class="mt-3 flex items-center gap-3 cursor-pointer"
          @click.stop="openScheduleModal"
        >
          <div
            class="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg flex items-center gap-2 hover:bg-white hover:shadow-sm transition-all group/date"
          >
            <div class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </div>
            <span class="text-xs font-bold text-stone-700">下次面试：{{ job.nextInterview }}</span>
            <span
              class="text-[10px] text-stone-400 group-hover/date:text-stone-500 border-l border-stone-200 pl-2 ml-1"
            >
              {{ formatCountdown(job.nextInterviewDate) }}
            </span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mt-4">
          <JobProgressBar
            :timeline="job.timeline"
            :progress="job.progress"
            :current-main-stage="job.currentMainStage"
            @node-click="handleNodeClick"
          />
        </div>

        <!-- Dynamic Quick Action Capsule (Collapsed Only) -->
        <div
          v-if="!expanded"
          class="mt-4 pt-4 border-t border-dashed border-stone-100 flex justify-start animate-fade-in"
        >
          <!-- Folded Capsule: Expands on hover -->
          <div
            class="group/capsule flex items-center bg-stone-50 border border-stone-200 rounded-full p-1 pr-4 transition-all duration-300 ease-out hover:shadow-sm hover:bg-white hover:border-stone-300 cursor-default max-w-[40px] hover:max-w-[400px] overflow-hidden whitespace-nowrap"
          >
            <!-- Icon Trigger -->
            <div
              class="w-8 h-8 rounded-full bg-white border border-stone-100 flex items-center justify-center shrink-0 text-stone-400 group-hover/capsule:text-stone-600 group-hover/capsule:border-stone-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            <!-- Action Buttons (Revealed on Hover) -->
            <div
              class="flex items-center gap-2 ml-3 opacity-0 group-hover/capsule:opacity-100 transition-opacity duration-300 delay-75"
            >
              <button
                v-for="action in stageActions"
                :key="action.label"
                @click.stop="action.handler"
                class="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
              >
                <span>{{ action.icon }}</span>
                <span>{{ action.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed View (Expandable) -->
    <div
      v-if="expanded"
      class="bg-stone-50/50 border-t border-stone-100 animate-slide-down rounded-b-2xl overflow-hidden relative"
    >
      <!-- Auto-save Feedback -->
      <div
        v-if="saveStatus"
        class="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/80 backdrop-blur px-2 py-1 rounded-md shadow-sm border border-stone-100 transition-opacity duration-500"
        :class="saveStatus.visible ? 'opacity-100' : 'opacity-0'"
      >
        <span v-if="saveStatus.type === 'success'" class="text-emerald-500">✔</span>
        <span v-else class="text-amber-500">⚠</span>
        <span class="text-[10px] font-medium text-stone-600">{{ saveStatus.msg }}</span>
      </div>

      <!-- If a specific node is selected, show Node Details -->
      <div v-if="selectedNode" class="p-6 relative">
        <div class="absolute inset-0 bg-paper-texture opacity-20 pointer-events-none"></div>

        <div class="flex justify-between items-center mb-4">
          <h3 class="text-sm font-bold text-stone-800 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-stone-800"></span>
            {{ selectedNode.stage }} 详情
          </h3>
          <button @click="selectedNode = null" class="text-xs text-stone-400 hover:text-stone-600">返回概览</button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left: Input / Info -->
          <div class="space-y-4">
            <!-- Time Info -->
            <div class="bg-white p-3 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <div class="text-[10px] text-stone-400 uppercase font-bold">时间</div>
                <div class="text-sm font-bold text-stone-800">{{ selectedNode.date || '待定' }}</div>
              </div>
              <div
                v-if="!selectedNode.completed"
                class="text-xs font-medium text-amber-500 bg-amber-50 px-2 py-1 rounded"
              >
                进行中
              </div>
            </div>

            <!-- Form Fields -->
            <div class="space-y-3">
              <div>
                <label class="text-[10px] font-bold text-stone-500 uppercase mb-1 block">面试官 / 联系人</label>
                <input
                  type="text"
                  class="input-field"
                  placeholder="姓名/职位..."
                  :value="selectedNode.interviewer"
                  @input="markDirty"
                  @blur="autoSave"
                />
              </div>
              <div>
                <label class="text-[10px] font-bold text-stone-500 uppercase mb-1 block">面试形式</label>
                <select class="input-field" @change="markDirty" @blur="autoSave">
                  <option>线上会议</option>
                  <option>现场面试</option>
                  <option>电话面试</option>
                </select>
              </div>
              <div>
                <label class="text-[10px] font-bold text-stone-500 uppercase mb-1 block">面试题记录 / 备注</label>
                <textarea
                  class="input-field h-32 resize-none"
                  placeholder="记录被问到的核心问题..."
                  @input="markDirty"
                  @blur="autoSave"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Right: AI Analysis -->
          <div class="space-y-4">
            <div class="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 relative overflow-hidden">
              <div class="flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-indigo-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-xs font-bold text-indigo-600">AI 自动总结 & 建议</span>
              </div>
              <div class="space-y-2">
                <p class="text-xs text-stone-600 leading-relaxed">
                  <span class="font-bold">复盘建议：</span>根据记录，暂无数据可分析。填写面试题后可生成建议。
                </p>
              </div>
            </div>

            <!-- Self Score -->
            <div class="bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
              <div class="text-[10px] font-bold text-stone-400 uppercase mb-2">自我评分</div>
              <div class="flex gap-1">
                <button
                  v-for="i in 10"
                  :key="i"
                  class="w-6 h-6 rounded hover:bg-stone-100 text-xs font-medium text-stone-400 border border-transparent hover:border-stone-200 transition-all"
                >
                  {{ i }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- General Job Info (Default Expanded View) -->
      <div v-else class="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        <div class="absolute inset-0 bg-paper-texture opacity-20 pointer-events-none"></div>

        <div class="lg:col-span-2 space-y-4">
          <div>
            <h4 class="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">职位详情</h4>
            <p class="text-xs text-stone-600 leading-relaxed bg-white p-4 rounded-xl border border-stone-100">
              {{ job.description || '暂无描述...' }}
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <div v-if="job.aiInsight">
            <h4 class="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">AI 洞察</h4>
            <div class="bg-stone-100 rounded-xl p-3 text-xs text-stone-600">
              {{ job.aiInsight.nextAction }}
            </div>
          </div>
        </div>
      </div>

      <!-- Explicit Save & Collapse Actions -->
      <div class="p-4 border-t border-stone-200 bg-white flex justify-between items-center">
        <button
          @click="attemptCollapse"
          class="px-4 py-2 text-xs font-bold text-stone-500 hover:bg-stone-50 rounded-lg transition-colors"
        >
          收起面板
        </button>
        <button
          @click="manualSave"
          class="px-5 py-2 bg-stone-900 text-white text-xs font-bold rounded-lg hover:bg-stone-800 shadow-md active:scale-95 transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293z"
            />
          </svg>
          保存记录
        </button>
      </div>
    </div>

    <!-- Unsaved Changes Dialog -->
    <div
      v-if="showUnsavedDialog"
      class="absolute inset-0 z-30 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-2xl p-6 animate-fade-in"
    >
      <div class="bg-white border border-stone-200 shadow-xl rounded-xl p-6 max-w-xs text-center">
        <h4 class="font-bold text-stone-800 mb-2">是否保存更改？</h4>
        <p class="text-xs text-stone-500 mb-4">你刚才修改的内容尚未保存到云端。</p>
        <div class="flex gap-2 justify-center">
          <button
            @click="discardAndClose"
            class="px-3 py-2 text-xs font-medium text-stone-500 hover:bg-stone-50 rounded-lg"
          >
            不保存
          </button>
          <button
            @click="saveAndClose"
            class="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-lg shadow-md hover:bg-stone-800"
          >
            保存并收起
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modals -->
  <ScheduleModal v-model="showScheduleModal" @save="handleScheduleSave" />
  <ReviewModal v-model="showReviewModal" :job="job" @save="handleReviewSave" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { JobApplication, TimelineNode } from '../types'
import StatusBadge from './StatusBadge.vue'
import JobProgressBar from './JobProgressBar.vue'
import PriorityBadge from './PriorityBadge.vue'
import ScheduleModal from './ScheduleModal.vue'
import ReviewModal from './ReviewModal.vue'

const props = defineProps<{
  job: JobApplication
}>()

const emit = defineEmits(['update:status', 'update:job'])

// State
const expanded = ref(false)
const selectedNode = ref<TimelineNode | null>(null)
const isDirty = ref(false)
const showUnsavedDialog = ref(false)
const showScheduleModal = ref(false)
const showReviewModal = ref(false)

// Auto-save Feedback State
const saveStatus = ref<{ visible: boolean; type: 'success' | 'error'; msg: string } | null>(null)

// Dynamic Actions based on Stage
const stageActions = computed(() => {
  const actions: { label: string; icon: string; handler: () => void }[] = []
  const currentTimelineNode = props.job.timeline.find((n) => n.current)

  if (props.job.currentMainStage === 'Applied') {
    actions.push({ label: '添加备注', icon: '✍', handler: toggleExpand })
    actions.push({ label: '感兴趣', icon: '♥', handler: () => emit('update:status', props.job.id, 'Interested') })
    actions.push({ label: '导入JD', icon: '⬇', handler: () => console.log('Import JD') })
    actions.push({ label: '调整优先级', icon: '🏷', handler: () => console.log('Priority') })
  } else if (props.job.currentMainStage === 'Interview') {
    // Context-aware: Check if it is 'Screening' (初筛)
    const isScreening =
      props.job.currentSubStage === 'screening' || (currentTimelineNode && currentTimelineNode.stage.includes('初筛'))

    if (isScreening) {
      actions.push({ label: '安排初筛', icon: '📞', handler: openScheduleModal })
      actions.push({ label: '记录反馈', icon: '📝', handler: toggleExpand })
    } else {
      actions.push({ label: '预约面试', icon: '📅', handler: openScheduleModal })
      actions.push({
        label: '面试复盘',
        icon: '⭐',
        handler: () => {
          showReviewModal.value = true
        }
      })
      actions.push({ label: '上传材料', icon: '📎', handler: () => console.log('Upload') })
    }
  } else if (props.job.currentMainStage === 'Offer') {
    actions.push({ label: '接受Offer', icon: '🎉', handler: () => emit('update:status', props.job.id, 'Accepted') })
    actions.push({ label: '谈薪', icon: '💰', handler: toggleExpand })
    actions.push({ label: '分享Offer', icon: '🔗', handler: () => console.log('Share') })
    actions.push({ label: '婉拒', icon: '👋', handler: () => emit('update:status', props.job.id, 'Declined') })
  }

  return actions
})

// Actions
const toggleExpand = () => {
  if (expanded.value) {
    attemptCollapse()
  } else {
    expanded.value = true
  }
}

const attemptCollapse = () => {
  if (isDirty.value) {
    showUnsavedDialog.value = true
  } else {
    expanded.value = false
    selectedNode.value = null
  }
}

const markDirty = () => {
  isDirty.value = true
}

const autoSave = () => {
  if (!isDirty.value) return

  // Mock Async Save
  setTimeout(() => {
    isDirty.value = false
    showSaveFeedback('success', '已自动保存 · 刚刚')
  }, 800)
}

const manualSave = () => {
  // Mock Save
  isDirty.value = false
  showSaveFeedback('success', '保存成功')
}

const showSaveFeedback = (type: 'success' | 'error', msg: string) => {
  saveStatus.value = { visible: true, type, msg }
  setTimeout(() => {
    if (saveStatus.value) saveStatus.value.visible = false
  }, 3000)
}

const saveAndClose = () => {
  manualSave()
  showUnsavedDialog.value = false
  expanded.value = false
}

const discardAndClose = () => {
  isDirty.value = false
  showUnsavedDialog.value = false
  expanded.value = false
}

const handleNodeClick = (node: TimelineNode) => {
  selectedNode.value = node
  if (!expanded.value) {
    expanded.value = true
  }
}

// Schedule Logic
const openScheduleModal = () => {
  showScheduleModal.value = true
}

const handleScheduleSave = () => {
  // Mock: Update local job data
  showSaveFeedback('success', '已安排 · 已加入你的日历')
  // Real world: Emit event to parent to update data store
}

const handleReviewSave = () => {
  showSaveFeedback('success', '复盘已提交 · 建议生成中')
}

const formatCountdown = (dateStr?: string) => {
  if (!dateStr) return ''
  // Mock countdown logic
  return '1天 3小时'
}
</script>

<style scoped>
.input-field {
  width: 100%;
  font-size: 0.75rem; /* text-xs */
  line-height: 1rem;
  padding: 0.5rem; /* p-2 */
  border-radius: 0.25rem; /* rounded */
  border-width: 1px; /* border */
  border-color: #e7e5e4; /* border-stone-200 */
  background-color: white; /* bg-white */
  outline: none; /* outline-none */
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke; /* transition-colors */
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.input-field:focus {
  border-color: #a8a29e; /* focus:border-stone-400 */
}
.animate-slide-down {
  animation: slide-down 0.3s ease-out forwards;
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
