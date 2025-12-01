<template>
  <div class="min-h-screen w-full bg-stone-50/50 font-sans text-stone-800 pb-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
      <!-- Header Area -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 class="text-2xl font-bold text-stone-800 font-serif flex items-center gap-2">
            求职看板
            <span
              class="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-sans font-bold uppercase tracking-wider"
              >Workspace</span
            >
          </h1>
          <p class="text-sm text-stone-500 mt-1">记录每一次投递，让求职进度有迹可循</p>
        </div>

        <div class="flex items-center gap-3 self-start md:self-auto">
          <!-- 1. 智能分析 (数据反馈) -->
          <button
            @click="showAnalysisModal = true"
            class="px-3 py-2 bg-white border border-stone-200 text-stone-600 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm hover:border-stone-300 hover:text-stone-900 transition-all group"
            title="查看求职数据分析"
          >
            <div
              class="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
                />
              </svg>
            </div>
            <span class="hidden sm:inline">进度复盘</span>
          </button>

          <!-- 2. 视图切换 -->
          <div class="bg-white p-1 rounded-xl border border-stone-200 flex gap-1 shadow-sm">
            <button
              @click="viewMode = 'kanban'"
              class="p-2 rounded-lg transition-all"
              :class="viewMode === 'kanban' ? 'bg-stone-100 text-stone-900' : 'text-stone-400 hover:text-stone-600'"
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
              class="p-2 rounded-lg transition-all"
              :class="viewMode === 'calendar' ? 'bg-stone-100 text-stone-900' : 'text-stone-400 hover:text-stone-600'"
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
          <div class="w-px h-8 bg-stone-200 mx-1"></div>

          <!-- 3. 核心操作区 (手动录入) -->
          <button
            @click="showImportModal = true"
            class="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
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
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <span class="hidden sm:inline">粘贴 JD</span>
          </button>

          <button
            @click="handleNewJob"
            class="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            新建投递
          </button>
        </div>
      </div>

      <!-- Up Next (War Room) -->
      <UpNext :jobs="allJobs" />

      <!-- Daily Focus -->
      <DailyFocus v-if="viewMode === 'kanban'" :jobs="allJobs" />

      <!-- Main Content -->
      <Transition name="fade" mode="out-in">
        <!-- KANBAN VIEW -->
        <div v-if="viewMode === 'kanban'" class="space-y-8">
          <!-- Main Stages Tabs -->
          <div class="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
            <div class="grid grid-cols-3 divide-x divide-stone-100">
              <button
                v-for="stage in mainStages"
                :key="stage.id"
                @click="currentMainStage = stage.id"
                class="py-6 relative group hover:bg-stone-50 transition-colors"
              >
                <div class="flex flex-col items-center gap-2">
                  <div
                    class="text-xs font-bold uppercase tracking-wider"
                    :class="currentMainStage === stage.id ? 'text-stone-800' : 'text-stone-400'"
                  >
                    {{ stage.label }}
                  </div>
                  <div
                    class="text-2xl font-bold font-serif"
                    :class="currentMainStage === stage.id ? 'text-stone-800' : 'text-stone-300'"
                  >
                    {{ stage.count }}
                  </div>
                </div>
                <!-- Active Indicator -->
                <div
                  class="absolute bottom-0 left-0 w-full h-1 transition-colors"
                  :class="currentMainStage === stage.id ? stage.colorClass : 'bg-transparent'"
                ></div>
              </button>
            </div>
          </div>

          <!-- Job List -->
          <div class="space-y-4 min-h-[400px]">
            <TransitionGroup name="list">
              <JobCard v-for="job in filteredJobs" :key="job.id" :job="job" @update:status="updateJobStatus" />
            </TransitionGroup>

            <!-- Empty State -->
            <div
              v-if="filteredJobs.length === 0"
              class="py-20 text-center border-2 border-dashed border-stone-100 rounded-2xl"
            >
              <div class="inline-block p-4 rounded-full bg-stone-50 text-stone-300 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <p class="text-stone-400 text-sm font-medium">这里空空如也</p>
              <button
                @click="handleNewJob"
                class="mt-4 text-xs font-bold text-stone-600 hover:text-stone-900 underline decoration-stone-300 underline-offset-4"
              >
                添加一条记录
              </button>
            </div>
          </div>
        </div>

        <!-- CALENDAR VIEW -->
        <div v-else>
          <JobCalendar :events="calendarEvents" />
        </div>
      </Transition>
    </div>

    <!-- MODALS -->
    <!-- 1. Analysis Modal -->
    <JobAnalysisModal v-if="showAnalysisModal" :jobs="allJobs" @close="showAnalysisModal = false" />

    <!-- 2. Add Job Modal -->
    <JobAddModal v-if="showAddModal" @close="showAddModal = false" @add="handleAddJob" />

    <!-- 3. Import Modal (解析文本) -->
    <div
      v-if="showImportModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm"
    >
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-slide-up relative">
        <button @click="showImportModal = false" class="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <h3 class="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
          <span class="w-1.5 h-6 bg-amber-400 rounded-full"></span>
          JD 智能解析
        </h3>
        <p class="text-xs text-stone-500 mb-4">
          粘贴职位描述（JD）或链接，我们将自动提取关键信息（公司、职位、薪资等）并创建记录。
        </p>
        <div class="space-y-4">
          <textarea
            class="w-full h-32 p-4 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-stone-400 resize-none placeholder:text-stone-400"
            placeholder="例如：字节跳动 高级前端工程师 25-40k 北京..."
          ></textarea>
          <div class="flex justify-end gap-3">
            <button
              @click="showImportModal = false"
              class="px-4 py-2 text-sm font-medium text-stone-500 hover:bg-stone-50 rounded-lg"
            >
              取消
            </button>
            <button
              @click="showImportModal = false"
              class="px-6 py-2 bg-stone-900 text-white text-sm font-bold rounded-lg hover:bg-stone-800"
            >
              一键生成
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
import UpNext from './_components/UpNext.vue'
import JobAnalysisModal from './_components/JobAnalysisModal.vue'
import JobAddModal from './_components/JobAddModal.vue'

// State
const viewMode = ref<'kanban' | 'calendar'>('kanban')
const currentMainStage = ref<MainStage>('Applied')
const showImportModal = ref(false)
const showAnalysisModal = ref(false)
const showAddModal = ref(false)

// Mock Data
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
        subEvents: [
          { id: 'e1', title: '完善简历内容', completed: true, type: 'task' },
          { id: 'e2', title: '提交申请表', completed: true, type: 'task' }
        ]
      },
      {
        id: 't2',
        mainStage: 'Applied',
        stage: '等待回音',
        date: '11/25',
        completed: true,
        current: true,
        cheer: '已送达HR，建议2天后跟进',
        subEvents: [
          { id: 'e3', title: '查看邮件反馈', completed: false, type: 'email' },
          { id: 'e4', title: '准备作品集', completed: false, type: 'task' }
        ]
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
  {
    id: '2',
    position: '产品设计师',
    company: 'Creative Studio',
    currentMainStage: 'Interview',
    currentSubStage: 'tech1',
    status: 'Interviewing',
    priority: 'Medium',
    progress: 60,
    applyPlatform: '官网',
    applyDate: '11/28',
    waitingDays: 1,
    updatedAt: '2023-11-28',
    nextInterview: '技术一面',
    nextInterviewDate: '2023-11-28 14:00',
    timeline: [
      { id: 't2-1', mainStage: 'Applied', stage: '投递', date: '11/15', completed: true, current: false },
      { id: 't2-2', mainStage: 'Interview', stage: '初筛', date: '11/20', completed: true, current: false },
      {
        id: 't2-3',
        mainStage: 'Interview',
        stage: '一面',
        date: '11/28',
        completed: false,
        current: true,
        cheer: '面试官比较看重项目细节，加油！',
        subEvents: [
          { id: 'e1', title: '准备作品集演示', completed: true, type: 'task' },
          { id: 'e2', title: '调试视频面试设备', completed: false, type: 'task' },
          { id: 'e3', title: '阅读面经 & 模拟', completed: false, type: 'task' }
        ]
      },
      { id: 't2-4', mainStage: 'Offer', stage: 'Offer', completed: false, current: false }
    ],
    aiInsight: {
      avgResponseTime: '3-5 天',
      successTrend: '高',
      nextAction: '面试前请准备好作品集。'
    }
  }
])

// Computed
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
  const jobs = allJobs.value.filter((job) => job.currentMainStage === currentMainStage.value)

  const priorityMap: Record<string, number> = {
    Urgent: 4,
    High: 3,
    Medium: 2,
    Low: 1
  }

  return jobs.sort((a, b) => {
    const pA = priorityMap[a.priority] || 0
    const pB = priorityMap[b.priority] || 0

    // 1. Priority
    if (pA !== pB) return pB - pA

    // 2. Interview Date (if exists)
    if (a.nextInterviewDate && b.nextInterviewDate) {
      return new Date(a.nextInterviewDate).getTime() - new Date(b.nextInterviewDate).getTime()
    }
    if (a.nextInterviewDate) return -1 // a comes first
    if (b.nextInterviewDate) return 1

    return 0
  })
})

const calendarEvents = computed(() => {
  // Map jobs to calendar events
  const events: {
    id: string
    title: string
    time: string
    date: string
    type: 'interview' | 'deadline' | 'offer'
    company: string
  }[] = []
  for (const job of allJobs.value) {
    if (job.nextInterviewDate) {
      const parts = job.nextInterviewDate.split(' ')
      if (parts.length >= 2) {
        events.push({
          id: job.id + '_int',
          title: `${job.nextInterview || '面试'} - ${job.position}`,
          time: parts[1] || '',
          date: parts[0] || '',
          type: 'interview',
          company: job.company
        })
      }
    }
    if (job.deadline) {
      events.push({
        id: job.id + '_dl',
        title: `截止投递 - ${job.position}`,
        time: '23:59',
        date: job.deadline,
        type: 'deadline',
        company: job.company
      })
    }
  }
  return events
})

// Actions
const updateJobStatus = (jobId: string, newStatus: string) => {
  console.log('Update status', jobId, newStatus)
}

const handleNewJob = () => {
  showAddModal.value = true
}

const handleAddJob = (formData: any) => {
  // Map status to main stage
  let mainStage: MainStage = 'Applied'
  let progress = 10

  if (formData.status === 'Interviewing') {
    mainStage = 'Interview'
    progress = 50
  }
  if (formData.status === 'Offer') {
    mainStage = 'Offer'
    progress = 100
  }
  if (formData.status === 'Rejected') {
    mainStage = 'Applied' // Keep in applied or move to a specific rejected list if implemented
    progress = 100
  }

  const newJob: JobApplication = {
    id: Date.now().toString(),
    ...formData,
    currentMainStage: mainStage,
    currentSubStage: 'manual',
    progress: progress,
    updatedAt: new Date().toISOString().split('T')[0],
    applyDate: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
    timeline: [
      {
        id: 't-init',
        mainStage: mainStage,
        stage: '手动添加',
        date: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
        completed: true,
        current: true
      }
    ]
  }

  allJobs.value.push(newJob)

  // Switch to the tab of the new job
  currentMainStage.value = mainStage
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.animate-slide-up {
  animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Custom Scrollbar for modals if needed */
</style>
