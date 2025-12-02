<template>
  <div class="mb-10">
    <!-- Section Header with Date -->
    <div class="flex items-end justify-between mb-4 px-1">
      <div>
        <h2 class="text-2xl font-bold text-stone-800 font-serif tracking-tight relative inline-block">
          今日待办
          <!-- Hand-drawn underline -->
          <svg
            class="absolute -bottom-1 left-0 w-full h-2 text-yellow-300/60 -z-10"
            viewBox="0 0 100 5"
            preserveAspectRatio="none"
          >
            <path d="M0 2 Q 50 5 100 2" fill="none" stroke="currentColor" stroke-width="4" />
          </svg>
        </h2>
        <p class="text-sm text-stone-500 font-serif italic mt-1">{{ dateStr }}</p>
      </div>
    </div>

    <div v-if="primaryTask" class="relative group">
      <!-- Main Sticker Card -->
      <div
        class="bg-white rounded-sm border-2 border-stone-800 p-6 shadow-[4px_4px_0px_0px_rgba(28,25,23,0.1)] transform rotate-0 hover:-rotate-1 transition-all duration-300 relative overflow-hidden"
      >
        <!-- Background Texture -->
        <div class="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none"></div>

        <!-- Tape Decoration -->
        <div
          class="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-stone-100/80 border border-stone-200 rotate-1 shadow-sm z-10"
        ></div>

        <div class="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <!-- Left: Task Info -->
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <span
                class="px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest border border-stone-200"
                :class="{
                  'bg-rose-50 text-rose-600 border-rose-200': primaryTask.priority === 'Urgent',
                  'bg-amber-50 text-amber-600 border-amber-200': primaryTask.priority === 'High',
                  'bg-stone-50 text-stone-600': primaryTask.priority === 'Medium'
                }"
              >
                {{ primaryTask.typeLabel }}
              </span>
              <!-- Warm Countdown Capsule -->
              <div
                v-if="primaryTask.countdown"
                class="flex items-center gap-1.5 px-2 py-1 bg-yellow-100 rounded-full text-yellow-800 text-xs font-bold animate-pulse-slow"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                <span>{{ primaryTask.countdown }}</span>
              </div>
            </div>

            <h3 class="text-xl font-bold text-stone-800 mb-2 font-serif leading-tight">
              {{ primaryTask.title }}
              <span class="text-stone-400 font-sans font-normal text-base block sm:inline sm:ml-2"
                >@ {{ primaryTask.company }}</span
              >
            </h3>

            <!-- Companion Message -->
            <div
              class="flex items-start gap-2 mt-3 text-stone-500 text-sm font-serif italic bg-stone-50 p-3 rounded-sm border-l-2 border-stone-300"
            >
              <span class="text-lg not-italic">💡</span>
              <p>{{ primaryTask.suggestion }}</p>
            </div>
          </div>

          <!-- Right: Action -->
          <div class="flex flex-col items-end gap-3 shrink-0">
            <button
              class="px-6 py-3 bg-stone-800 text-[#f7f5f2] text-sm font-bold rounded-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all flex items-center gap-2"
            >
              <span>👉</span>
              <span>{{ primaryTask.actionLabel || '开始处理' }}</span>
            </button>
            <p class="text-[10px] text-stone-400 text-center w-full">
              {{ primaryTask.timeStr }}
            </p>
          </div>
        </div>
      </div>

      <!-- Stack effect if more tasks -->
      <div
        v-if="otherTasksCount > 0"
        class="absolute top-2 left-2 right-2 h-full bg-white rounded-sm border border-stone-200 shadow-sm -z-10 rotate-1"
      ></div>
      <div
        v-if="otherTasksCount > 0"
        class="absolute top-4 left-4 right-4 h-full bg-white rounded-sm border border-stone-200 shadow-sm -z-20 rotate-2"
      ></div>
    </div>

    <!-- Empty State: Coffee Break -->
    <div
      v-else
      class="bg-white rounded-sm p-8 border-2 border-dashed border-stone-200 text-center relative overflow-hidden group"
    >
      <div class="relative z-10">
        <div class="text-5xl mb-4 opacity-80 transform group-hover:scale-110 transition-transform duration-500">☕️</div>
        <h3 class="text-lg font-bold text-stone-800 font-serif mb-2">暂时没有紧急事项</h3>
        <p class="text-stone-500 text-sm font-serif italic max-w-md mx-auto">
          "有时候，停下来喝杯咖啡也是求职的一部分。正如 GPS 显示路况畅通，你可以去学习充电。"
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { JobApplication } from '../types'

const props = defineProps<{
  jobs: JobApplication[]
}>()

const dateStr = new Date().toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })

// Helper to calculate countdown
const getCountdown = (dateStr?: string) => {
  if (!dateStr) return null
  // Mock calculation
  return '还有 3 小时'
}

const primaryTask = computed(() => {
  // 1. Find Interview Today/Tomorrow (Highest Priority)
  const interview = props.jobs.find((j) => j.priority === 'Urgent' && j.nextInterviewDate)
  if (interview) {
    return {
      id: interview.id,
      type: 'interview',
      typeLabel: '准备出发',
      priority: 'Urgent',
      title: `面试：${interview.position}`,
      company: interview.company,
      suggestion: '深呼吸，别忘了带上你的笑容和面试急救包。',
      countdown: getCountdown(interview.nextInterviewDate),
      actionLabel: '进入战情室',
      timeStr: interview.nextInterviewDate?.split(' ')[1] || '全天'
    }
  }

  // 2. Find Follow-up needed
  const followup = props.jobs.find((j) => j.waitingDays && j.waitingDays > 5 && j.currentMainStage === 'Applied')
  if (followup) {
    return {
      id: followup.id,
      type: 'followup',
      typeLabel: '建议跟进',
      priority: 'High',
      title: `投递已过 ${followup.waitingDays} 天`,
      company: followup.company,
      suggestion: '主动询问进度能增加 20% 的回复率，要不要试试？',
      actionLabel: '写封邮件',
      timeStr: '建议下午发送'
    }
  }

  return null
})

const otherTasksCount = computed(() => {
  return 0 // Simplified for demo
})
</script>

<style scoped>
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z' /%3E%3C/g%3E%3C/svg%3E");
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}
.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
</style>
