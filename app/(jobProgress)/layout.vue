<template>
  <div class="min-h-screen w-full bg-[#f7f5f2] bg-paper-texture font-sans text-stone-800 pb-32 relative">
    <!-- Header Area -->
    <JobBoardHeader
      v-model:viewMode="viewMode"
      @show-analysis="showAnalysisModal = true"
      @show-import="showImportModal = true"
      @new-job="handleNewJob"
    />

    <!-- Main Content Container -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- 1. Daily Focus: The "Most Important Thing" (Always visible in Kanban) -->
      <DailyFocus v-if="viewMode === 'kanban'" :jobs="allJobs" />

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
    <JobImportModal v-model="showImportModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { JobApplication, MainStage } from './types'
import { useJobStore } from '../../composables/useJobStore'
import JobCard from './_components/JobCard.vue'
import JobCalendar from './_components/JobCalendar.vue'
import DailyFocus from './_components/DailyFocus.vue'
import JobAnalysisModal from './_components/JobAnalysisModal.vue'
import JobAddModal from './_components/JobAddModal.vue'
import InterviewCheatSheet from './_components/InterviewCheatSheet.vue'
import JobBoardHeader from './_components/JobBoardHeader.vue'
import JobImportModal from './_components/JobImportModal.vue'

// State
const viewMode = ref<'kanban' | 'calendar'>('kanban')
const currentMainStage = ref<MainStage>('Applied')
const showImportModal = ref(false)
const showAnalysisModal = ref(false)
const showAddModal = ref(false)
const showCheatSheet = ref(false)
const currentCheatSheetJob = ref<JobApplication | null>(null)

const { allJobs, addJob, updateJobStatus } = useJobStore()

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
// updateJobStatus is now imported from store

const handleNewJob = () => {
  showAddModal.value = true
}

const handleAddJob = (formData: any) => {
  // Simplified logic for demo
  console.log('Add job', formData)
  addJob({
    ...formData, // In real app, map form data to JobApplication
    id: Date.now().toString(),
    currentMainStage: 'Applied',
    timeline: []
  })
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
