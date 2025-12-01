<template>
  <div v-if="upcomingJob" class="mb-6">
    <div class="flex items-center justify-between mb-2 px-1">
      <h2 class="text-sm font-bold text-stone-500 flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        UP NEXT
      </h2>
      <span class="text-xs font-mono text-stone-400">24H 战情室</span>
    </div>

    <div class="bg-white rounded-2xl p-1 shadow-sm border border-stone-200">
      <div class="bg-stone-900 rounded-xl p-6 text-white relative overflow-hidden">
        <!-- Background Pattern -->
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none"
        ></div>

        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <!-- Left: Info -->
          <div class="space-y-4 flex-1">
            <div>
              <div class="text-stone-400 text-xs font-bold uppercase tracking-wider mb-1">即将开始</div>
              <h3 class="text-2xl font-bold font-serif flex items-center gap-2">
                {{ upcomingJob.nextInterview }}
                <span class="text-stone-500 font-sans font-normal text-lg">@ {{ upcomingJob.company }}</span>
              </h3>
            </div>

            <div class="flex flex-wrap gap-3">
              <div class="px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm flex items-center gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="font-mono">{{ formatTime(upcomingJob.nextInterviewDate!) }}</span>
              </div>

              <div
                v-if="upcomingJob.location"
                class="px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm flex items-center gap-2 text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{{ upcomingJob.location }}</span>
              </div>
            </div>
          </div>

          <!-- Right: Action / Countdown -->
          <div class="flex flex-col items-end gap-3">
            <div class="text-right">
              <div class="text-xs text-stone-400 mb-1">距离开始还有</div>
              <div class="text-3xl font-mono font-bold text-amber-400 tracking-tight">
                {{ timeRemaining }}
              </div>
            </div>

            <button
              class="px-6 py-2 bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold rounded-lg transition-colors shadow-lg flex items-center gap-2 w-full md:w-auto justify-center"
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
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              进入面试/会议
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { JobApplication } from '../types'

const props = defineProps<{
  jobs: JobApplication[]
}>()

const timeRemaining = ref('')
let timer: number | null = null

const upcomingJob = computed(() => {
  const now = new Date().getTime()
  const twentyFourHoursLater = now + 24 * 60 * 60 * 1000

  // Filter jobs with nextInterviewDate within next 24h
  const candidates = props.jobs.filter((job) => {
    if (!job.nextInterviewDate) return false
    const interviewTime = new Date(job.nextInterviewDate).getTime()
    return interviewTime > now && interviewTime <= twentyFourHoursLater
  })

  // Sort by soonest
  return candidates.sort((a, b) => {
    return new Date(a.nextInterviewDate!).getTime() - new Date(b.nextInterviewDate!).getTime()
  })[0]
})

const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  // Format: Today 14:00 or Tomorrow 09:30
  const today = new Date()
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()

  const timeStr = date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  return `${isToday ? '今天' : '明天'} ${timeStr}`
}

const updateTimer = () => {
  if (!upcomingJob.value || !upcomingJob.value.nextInterviewDate) return

  const now = new Date().getTime()
  const target = new Date(upcomingJob.value.nextInterviewDate).getTime()
  const diff = target - now

  if (diff <= 0) {
    timeRemaining.value = 'Now'
    return
  }

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  timeRemaining.value = `${hours}小时 ${minutes}分`
}

onMounted(() => {
  updateTimer()
  timer = window.setInterval(updateTimer, 60000) // Update every minute
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
