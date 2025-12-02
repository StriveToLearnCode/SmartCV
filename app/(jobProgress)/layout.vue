<template>
  <div class="min-h-screen w-full bg-[#f7f5f2] bg-paper-texture font-sans text-stone-800 pb-32 relative">
    <!-- Header Area -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-8 mb-12">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <!-- Logo/Title with hand-drawn underline -->
          <div class="relative inline-block">
            <h1 class="text-3xl font-bold text-stone-800 font-serif tracking-tight">求职看板</h1>
            <svg
              class="absolute -bottom-2 left-0 w-full h-3 text-yellow-300 -z-10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" stroke-width="6" opacity="0.6" />
            </svg>
          </div>
          <p class="text-sm text-stone-500 mt-3 font-serif italic">"记录每一次投递，让求职进度有迹可循。"</p>
        </div>

        <div class="flex items-center gap-4 self-start md:self-auto">
          <!-- 1. 智能分析 (贴纸风格按钮) -->
          <button
            @click="showAnalysisModal = true"
            class="group relative px-4 py-2 bg-white border-2 border-stone-200 rounded-sm text-xs font-bold text-stone-600 hover:border-stone-400 hover:text-stone-900 transition-all shadow-sm hover:-rotate-1"
            title="查看求职数据分析"
          >
            <div class="flex items-center gap-2">
              <span class="text-lg">📊</span>
              <span class="hidden sm:inline">进度复盘</span>
            </div>
            <!-- 装饰胶带 -->
            <div
              class="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-stone-100/50 rotate-2 border border-white/50"
            ></div>
          </button>

          <!-- Resume Detective Wall (New) -->
          <button
            class="group relative px-4 py-2 bg-white border-2 border-stone-200 rounded-sm text-xs font-bold text-stone-600 hover:border-red-300 hover:text-red-900 transition-all shadow-sm hover:rotate-1"
            title="查看简历族谱"
          >
            <div class="flex items-center gap-2">
              <span class="text-lg">🕵️</span>
              <span class="hidden sm:inline">简历侦探墙</span>
            </div>
            <!-- Red String Decoration -->
            <svg class="absolute top-1/2 -right-2 w-6 h-12 text-red-800/30 pointer-events-none" viewBox="0 0 10 20">
              <path d="M0 10 Q 5 15 10 5" fill="none" stroke="currentColor" stroke-width="1" />
            </svg>
          </button>

          <!-- 2. 视图切换 (极简) -->
          <div class="bg-white/50 p-1 rounded-lg border border-stone-200/50 flex gap-1 backdrop-blur-sm">
            <button
              @click="viewMode = 'kanban'"
              class="p-2 rounded transition-all"
              :class="
                viewMode === 'kanban' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-400 hover:text-stone-600'
              "
              title="看板视图"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
            </button>
            <button
              @click="viewMode = 'calendar'"
              class="p-2 rounded transition-all"
              :class="
                viewMode === 'calendar' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-400 hover:text-stone-600'
              "
              title="日历视图"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>

          <!-- Separator -->
          <div class="w-px h-8 bg-stone-300/30 mx-1"></div>

          <!-- 3. 核心操作区 -->
          <button
            @click="showImportModal = true"
            class="px-4 py-2 bg-[#fefce8] border border-stone-200 text-stone-600 hover:bg-[#fff7ed] hover:border-orange-200 hover:text-orange-700 rounded-sm text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <span>📝</span>
            <span class="hidden sm:inline">粘贴 JD</span>
          </button>

          <button
            @click="handleNewJob"
            class="px-5 py-2.5 bg-stone-800 text-[#f7f5f2] rounded-sm text-xs font-bold shadow-[3px_3px_0px_0px_rgba(28,25,23,0.2)] hover:translate-y-px hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,0.2)] active:translate-y-[3px] active:shadow-none border-2 border-stone-800 transition-all flex items-center gap-2"
          >
            <span>+</span>
            新建投递
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- 1. Daily Focus: The "Most Important Thing" (Always visible in Kanban) -->
      <DailyFocus v-if="viewMode === 'kanban'" :jobs="allJobs" />

      <!-- 2. Up Next (War Room) - Only if strictly needed, otherwise DailyFocus covers it -->
      <!-- Merged concept: DailyFocus is the "Today" view. UpNext is the "War Room". 
           User requested "Top prominent 'Today's Most Important Thing'". 
           I will keep DailyFocus as the primary "Today" view. -->

      <Transition name="fade" mode="out-in">
        <!-- KANBAN VIEW -->
        <div v-if="viewMode === 'kanban'" class="space-y-8 mt-8">
          <!-- Stage Filter Tabs (Hand-drawn Style) -->
          <div class="flex justify-center mb-8">
            <div class="inline-flex bg-[#fdfbf7] p-1.5 rounded-full border border-stone-200 shadow-sm relative">
              <!-- Hand-drawn underline decoration for container -->
              <svg
                class="absolute -bottom-2 left-0 w-full h-2 text-stone-300 opacity-50 pointer-events-none"
                viewBox="0 0 100 5"
                preserveAspectRatio="none"
              >
                <path d="M0 2 Q 50 5 100 2" fill="none" stroke="currentColor" stroke-width="1" />
              </svg>

              <button
                v-for="stage in mainStages"
                :key="stage.id"
                @click="currentMainStage = stage.id"
                class="px-6 py-2 rounded-full text-sm font-bold transition-all relative overflow-hidden group"
                :class="
                  currentMainStage === stage.id
                    ? 'text-stone-800 bg-stone-100/80 shadow-inner'
                    : 'text-stone-400 hover:text-stone-600'
                "
              >
                <span class="relative z-10 flex items-center gap-2">
                  {{ stage.label }}
                  <span
                    class="text-[10px] px-1.5 py-0.5 rounded-full transition-colors"
                    :class="
                      currentMainStage === stage.id ? 'bg-stone-200 text-stone-600' : 'bg-stone-100 text-stone-300'
                    "
                  >
                    {{ stage.count }}
                  </span>
                </span>
              </button>
            </div>
          </div>

          <!-- Job List -->
          <div class="space-y-6 min-h-[400px]">
            <TransitionGroup name="list">
              <JobCard v-for="job in filteredJobs" :key="job.id" :job="job" @update:status="updateJobStatus" />
            </TransitionGroup>

            <!-- Empty State -->
            <div
              v-if="filteredJobs.length === 0"
              class="py-24 text-center border-2 border-dashed border-stone-200 rounded-sm relative overflow-hidden group cursor-pointer"
              @click="handleNewJob"
            >
              <div class="relative z-10">
                <div class="text-4xl mb-4 opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500">
                  🍃
                </div>
                <p class="text-stone-400 text-sm font-serif italic mb-4">这里很安静，像是暴风雨前的宁静...</p>
                <span
                  class="inline-block px-4 py-2 bg-white border border-stone-200 text-stone-600 text-xs font-bold rounded-full shadow-sm group-hover:scale-105 transition-transform"
                >
                  添加第一条记录
                </span>
              </div>
              <!-- Noise Texture -->
              <div class="absolute inset-0 bg-stone-50 opacity-50 pointer-events-none"></div>
            </div>
          </div>
        </div>

        <!-- CALENDAR VIEW -->
        <div v-else class="mt-8">
          <JobCalendar :events="calendarEvents" />
        </div>
      </Transition>
    </div>

    <!-- MODALS -->
    <JobAnalysisModal v-if="showAnalysisModal" :jobs="allJobs" @close="showAnalysisModal = false" />
    <JobAddModal v-if="showAddModal" @close="showAddModal = false" @add="handleAddJob" />

    <!-- Interview First Aid Kit (Floating Button) -->
    <Teleport to="body">
      <div v-if="upcomingInterviewJob" class="fixed bottom-8 right-8 z-40 animate-bounce-slow group">
        <!-- Tooltip -->
        <div
          class="absolute bottom-full mb-2 right-0 whitespace-nowrap bg-stone-800 text-white text-xs px-3 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          面试前 24h 开启
          <div class="absolute top-full right-6 border-4 border-transparent border-t-stone-800"></div>
        </div>

        <button
          @click="openCheatSheet(upcomingInterviewJob)"
          class="w-14 h-14 rounded-full bg-[#fefce8] border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(28,25,23,0.2)] flex items-center justify-center text-2xl hover:scale-110 transition-transform active:scale-95 active:shadow-none"
        >
          💊
        </button>
      </div>
    </Teleport>

    <InterviewCheatSheet v-if="currentCheatSheetJob" v-model="showCheatSheet" :data="currentCheatSheetJob.cheatSheet" />

    <!-- Import Modal (JD Parsing) -->
    <div
      v-if="showImportModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/20 backdrop-blur-sm"
    >
      <div class="bg-[#fdfbf7] rounded-sm max-w-lg w-full p-8 shadow-2xl border border-stone-200 relative rotate-1">
        <!-- Top Tape -->
        <div
          class="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 border border-white/60 shadow-sm -rotate-2 backdrop-blur-sm z-20"
        ></div>

        <button @click="showImportModal = false" class="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          ×
        </button>

        <h3 class="text-xl font-bold text-stone-800 mb-2 font-serif flex items-center gap-2">
          <span class="text-2xl">✂️</span>
          JD 剪报夹
        </h3>
        <p class="text-xs text-stone-500 mb-6 font-serif italic">"把看到的职位描述贴在这里，我会帮你整理成卡片。"</p>

        <div class="space-y-4">
          <textarea
            class="w-full h-40 p-4 rounded-sm bg-white border-2 border-dashed border-stone-200 text-sm focus:outline-none focus:border-stone-400 resize-none placeholder:text-stone-300 font-mono leading-relaxed"
            placeholder="在此处粘贴..."
          ></textarea>
          <div class="flex justify-end gap-3 pt-2">
            <button
              @click="showImportModal = false"
              class="px-4 py-2 text-xs font-bold text-stone-400 hover:text-stone-600 uppercase tracking-wider"
            >
              算了
            </button>
            <button
              @click="showImportModal = false"
              class="px-6 py-2 bg-stone-800 text-[#f7f5f2] text-xs font-bold rounded-sm shadow-md hover:bg-stone-700 transform hover:-translate-y-0.5 transition-all"
            >
              整理并保存
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { JobApplication, MainStage } from './types'
import JobCard from './_components/JobCard.vue'
import JobCalendar from './_components/JobCalendar.vue'
import DailyFocus from './_components/DailyFocus.vue'
// UpNext removed as it is merged into DailyFocus concept or replaced by First Aid Kit
import JobAnalysisModal from './_components/JobAnalysisModal.vue'
import JobAddModal from './_components/JobAddModal.vue'
import InterviewCheatSheet from './_components/InterviewCheatSheet.vue'

// State
const viewMode = ref<'kanban' | 'calendar'>('kanban')
const currentMainStage = ref<MainStage>('Applied')
const showImportModal = ref(false)
const showAnalysisModal = ref(false)
const showAddModal = ref(false)
const showCheatSheet = ref(false)
const currentCheatSheetJob = ref<JobApplication | null>(null)

// Mock Data (Preserved structure, simplified for example)
const allJobs = ref<JobApplication[]>([
  {
    id: '1',
    position: '高级前端工程师',
    company: 'TechVision',
    currentMainStage: 'Applied',
    currentSubStage: 'waiting',
    status: 'Applying',
    priority: 'High',
    progress: 30,
    applyPlatform: 'Boss直聘',
    applyDate: '11/24',
    waitingDays: 7,
    updatedAt: '2023-11-24',
    timeline: [
      {
        id: 't1',
        mainStage: 'Applied',
        stage: '投递',
        date: '11/24',
        completed: true,
        current: false,
        subEvents: []
      },
      {
        id: 't2',
        mainStage: 'Applied',
        stage: '等待回音',
        date: '11/25',
        completed: true,
        current: true,
        cheer: '已送达HR，建议2天后跟进',
        subEvents: []
      },
      { id: 't3', mainStage: 'Interview', stage: '一面', completed: false, current: false },
      { id: 't4', mainStage: 'Interview', stage: '二面', completed: false, current: false },
      { id: 't5', mainStage: 'Offer', stage: 'Offer', completed: false, current: false }
    ],
    aiInsight: {
      avgResponseTime: '2-4 天',
      successTrend: '中等',
      nextAction: '该岗位已等待 7 天，建议主动跟进。'
    }
  },
  // Add a job with upcoming interview for demo
  {
    id: '2',
    position: '产品设计师',
    company: 'CreativeInc',
    currentMainStage: 'Interview',
    currentSubStage: 'first_round',
    status: 'Interviewing',
    priority: 'Urgent',
    progress: 50,
    applyPlatform: '拉勾',
    applyDate: '11/20',
    nextInterview: '初面',
    nextInterviewDate: '2025-12-03 14:00', // Tomorrow relative to user date Dec 2
    timeline: [
      { id: 't1', mainStage: 'Applied', stage: '投递', completed: true, current: false },
      {
        id: 't2',
        mainStage: 'Interview',
        stage: '一面',
        completed: false,
        current: true,
        cheer: '面试官: Alex (Design Lead)'
      }
    ],
    cheatSheet: {
      interviewer: { name: 'Alex', role: 'Design Lead' },
      stories: ['主导过 SaaS 改版', '建立了 Design System'],
      questions: ['设计团队在产品决策中的话语权如何？'],
      keywords: ['UX Research', 'Figma', 'Design Systems']
    }
  }
])

// Computed
const upcomingInterviewJob = computed(() => {
  // Logic: Find job with interview in next 24h
  // For demo, we just pick the one with 'Urgent' and valid date close to now
  return allJobs.value.find((j) => j.id === '2') // Hardcoded for demo visualization
})

const mainStages = computed(() => [
  {
    id: 'Applied' as MainStage,
    label: '已投递',
    count: allJobs.value.filter((j) => j.currentMainStage === 'Applied').length,
    colorClass: 'bg-blue-500'
  },
  {
    id: 'Interview' as MainStage,
    label: '面试中',
    count: allJobs.value.filter((j) => j.currentMainStage === 'Interview').length,
    colorClass: 'bg-amber-500'
  },
  {
    id: 'Offer' as MainStage,
    label: 'Offer',
    count: allJobs.value.filter((j) => j.currentMainStage === 'Offer').length,
    colorClass: 'bg-emerald-500'
  }
])

const filteredJobs = computed(() => {
  return allJobs.value.filter((job) => job.currentMainStage === currentMainStage.value)
})

const calendarEvents = computed(() => []) // Placeholder

// Actions
const updateJobStatus = (jobId: string, newStatus: string) => {
  console.log('Update status', jobId, newStatus)
}

const handleNewJob = () => {
  showAddModal.value = true
}

const handleAddJob = (formData: any) => {
  // Simplified logic for demo
  console.log('Add job', formData)
  showAddModal.value = false
}

const openCheatSheet = (job: JobApplication) => {
  currentCheatSheetJob.value = job
  showCheatSheet.value = true
}
</script>

<style scoped>
/* Existing styles... */
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z' /%3E%3C/g%3E%3C/svg%3E");
}

/* Add bounce animation for FAB */
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 3s infinite;
}

/* ... (Keep other styles) */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
