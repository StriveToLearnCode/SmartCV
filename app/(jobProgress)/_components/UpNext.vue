<template>
  <div v-if="upcomingJob" class="mb-8">
    <div class="flex items-center justify-between mb-3 px-1">
      <h2 class="text-xs font-bold text-stone-400 flex items-center gap-2 uppercase tracking-widest">
        <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
        24h 战情室
      </h2>
    </div>

    <!-- 战情室卡片：深色模式，强调紧迫感但充满力量 -->
    <div
      class="bg-[#1c1917] rounded-sm p-6 text-[#f7f5f2] relative overflow-hidden shadow-xl group transform hover:-translate-y-1 transition-all duration-300"
    >
      <!-- Background Texture -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-10 pointer-events-none"></div>
      <div class="absolute -right-20 -top-20 w-64 h-64 bg-stone-700/30 rounded-full blur-3xl"></div>

      <!-- Top Right Label -->
      <div class="absolute top-4 right-4">
        <span class="inline-block px-2 py-1 rounded border border-stone-700 text-[10px] font-mono text-stone-400">
          UPCOMING
        </span>
      </div>

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <!-- Left Info -->
        <div class="space-y-4 flex-1">
          <div>
            <div class="text-amber-400 font-handwriting text-xl transform -rotate-1 mb-2">
              Don't panic! You got this.
            </div>
            <h3 class="text-3xl font-bold font-serif tracking-tight">
              {{ upcomingJob.nextInterview }}
              <br />
              <span class="text-stone-400 font-sans text-lg font-normal">@ {{ upcomingJob.company }}</span>
            </h3>
          </div>

          <div class="flex gap-4 text-sm font-mono text-stone-400">
            <div class="flex items-center gap-2">
              <span>🕒</span> {{ formatTime(upcomingJob.nextInterviewDate || '') }}
            </div>
            <div v-if="upcomingJob.location" class="flex items-center gap-2">
              <span>📍</span> {{ upcomingJob.location }}
            </div>
          </div>
        </div>

        <!-- Right Countdown & Action -->
        <div class="flex flex-col items-end gap-4">
          <div class="text-right">
            <div class="text-[10px] text-stone-500 uppercase tracking-widest mb-1">倒计时</div>
            <div class="text-4xl font-bold font-mono text-[#fefce8] tabular-nums tracking-tighter">
              {{ timeRemaining }}
            </div>
          </div>

          <button
            class="px-6 py-3 bg-[#fefce8] text-stone-900 font-bold rounded-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2 uppercase tracking-wider text-xs"
          >
            <span>🚀</span> 进入面试模式
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { JobApplication } from '../types'

const props = defineProps<{
  jobs: JobApplication[]
}>()

const timeRemaining = ref('')

const upcomingJob = computed(() => {
  const now = new Date().getTime()
  // const twentyFourHoursLater = now + 24 * 60 * 60 * 1000

  // Filter jobs with nextInterviewDate within next 24h
  const candidates = props.jobs.filter((job) => {
    if (!job.nextInterviewDate) return false
    // Mock date parsing for demo if string is just '14:00' etc, assume today/tomorrow logic handled in parent
    // For real usage, ensure nextInterviewDate is a valid date string
    return true
  })

  return candidates[0] // simplified for demo
})

const formatTime = (dateStr: string) => {
  return dateStr // simplified
}

const updateTimer = () => {
  // Mock countdown
  timeRemaining.value = '03:24:15'
}

onMounted(() => {
  updateTimer()
})
</script>
