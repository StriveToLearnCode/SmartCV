<template>
  <div class="min-h-screen w-full bg-stone-50/50 font-sans text-stone-800 pb-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
      <!-- 0. Auto Collection Banner (New Feature) -->
      <div
        class="mb-6 bg-gradient-to-r from-stone-900 to-stone-800 rounded-2xl p-1 shadow-lg text-white overflow-hidden relative"
      >
        <!-- Glow Effect -->
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"
        ></div>

        <div
          class="bg-stone-900/50 backdrop-blur-sm rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-stone-900 shrink-0 animate-pulse"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div class="font-bold text-lg flex items-center gap-2">
                自动化数据采集
                <span class="text-[10px] bg-amber-400 text-stone-900 px-1.5 py-0.5 rounded font-bold">NEW</span>
              </div>
              <div class="text-sm text-stone-400">懒得手动录入？试试一键同步投递记录</div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button
              @click="showPluginModal = true"
              class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 border border-white/10"
            >
              <span>💾 浏览器插件</span>
            </button>
            <button
              @click="showImportModal = true"
              class="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-bold rounded-lg transition-colors shadow-md flex items-center gap-2"
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
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              JD 智能解析
            </button>
          </div>
        </div>
      </div>

      <!-- 1. Header & View Switcher -->
      <div class="flex flex-col sm:flex-row items-end justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-stone-800 font-serif">求职看板</h1>
          <p class="text-sm text-stone-500 mt-1">管理你的求职进度与面试安排</p>
        </div>

        <!-- View Switcher -->
        <div class="bg-white p-1 rounded-xl border border-stone-200 flex gap-1 shadow-sm">
          <button
            @click="viewMode = 'kanban'"
            class="px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
            :class="viewMode === 'kanban' ? 'bg-stone-800 text-white shadow-md' : 'text-stone-500 hover:bg-stone-100'"
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
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
            看板视图
          </button>
          <button
            @click="viewMode = 'calendar'"
            class="px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
            :class="viewMode === 'calendar' ? 'bg-stone-800 text-white shadow-md' : 'text-stone-500 hover:bg-stone-100'"
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
            日历视图
          </button>
        </div>
      </div>

      <!-- 2. Main Content Area -->
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

            <div v-if="filteredJobs.length === 0" class="py-20 text-center">
              <div class="inline-block p-4 rounded-full bg-stone-100 text-stone-300 mb-4">
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
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414a1 1 0 00-.707-.293H4"
                  />
                </svg>
              </div>
              <p class="text-stone-400 text-sm font-medium">该阶段暂无岗位</p>
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
    <!-- 1. Plugin Modal -->
    <div
      v-if="showPluginModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm"
    >
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-slide-up relative">
        <button @click="showPluginModal = false" class="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div class="text-center mb-6">
          <div
            class="w-16 h-16 bg-stone-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <span class="text-2xl font-bold">S</span>
          </div>
          <h3 class="text-lg font-bold text-stone-800">安装 SmartCV 助手</h3>
          <p class="text-sm text-stone-500 mt-2">支持 Boss直聘、拉勾、智联、前程无忧 一键采集</p>
        </div>
        <div class="space-y-3">
          <button
            class="w-full py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
              />
            </svg>
            前往 Chrome 商店安装
          </button>
          <div class="text-[10px] text-center text-stone-400">v1.0.2 | 安全检测通过</div>
        </div>
      </div>
    </div>

    <!-- 2. Import Modal -->
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
        <div class="space-y-4">
          <textarea
            class="w-full h-32 p-4 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-stone-400 resize-none"
            placeholder="请粘贴 JD 全文或 职位链接..."
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
              开始解析
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

// State
const viewMode = ref<'kanban' | 'calendar'>('kanban')
const currentMainStage = ref<MainStage>('Applied')
const showPluginModal = ref(false)
const showImportModal = ref(false)

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
      { id: 't1', mainStage: 'Applied', stage: '投递', date: '11/24', completed: true, current: false },
      { id: 't2', mainStage: 'Applied', stage: 'HR查看', date: '11/25', completed: true, current: true },
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
        subEvents: [
          { id: 'e1', title: '准备作品集', completed: false, type: 'task' },
          { id: 'e2', title: '视频面试链接', completed: false, type: 'meeting' }
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
  return allJobs.value.filter((job) => job.currentMainStage === currentMainStage.value)
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
          title: `${job.nextInterview} - ${job.position}`,
          time: parts[1],
          date: parts[0],
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
</style>
