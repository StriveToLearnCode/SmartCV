<template>
  <section class="py-12 lg:py-20 bg-[#FFFFFF]">
    <div class="mx-auto max-w-[1160px] px-6 lg:px-8">
      <h2 class="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#111827] mb-2">Core features</h2>
      <p class="text-[14px] text-[#525866] leading-relaxed mb-10 max-w-xl">Resume. Pipeline. Post-mortem. One loop.</p>

      <!-- 第一行：2 个大卡，高度 240–280px，淡背景图 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <RouterLink
          v-for="card in bigCards"
          :key="card.title"
          :to="card.to"
          class="group relative flex flex-col p-6 rounded-[16px] border border-[#E9EBEF] bg-white hover:border-[#d1d5db] hover:shadow-[0_8px_30px_rgba(17,24,39,0.08)] hover:-translate-y-0.5 transition-all duration-200 text-left min-h-[260px] overflow-hidden"
        >
          <div class="absolute inset-0 opacity-[0.04] pointer-events-none" :class="card.bgPattern" aria-hidden="true" />
          <div class="relative z-10 flex flex-col flex-1 min-h-0">
            <div
              class="w-11 h-11 rounded-full bg-[#F7F8FA] flex items-center justify-center text-[#525866] group-hover:text-[#111827] mb-5"
            >
              <component :is="card.icon" class="w-5 h-5" />
            </div>
            <h3 class="text-[17px] font-bold text-[#111827] mb-2">{{ card.title }}</h3>
            <p class="text-[13px] text-[#525866] leading-relaxed mb-4 flex-1">{{ card.desc }}</p>
            <p class="text-[12px] text-[#8A8F98] leading-relaxed mb-4">{{ card.extra }}</p>
            <span class="self-end text-[#8A8F98] group-hover:text-[#111827]" aria-hidden="true">
              <ArrowRightIcon class="w-5 h-5" />
            </span>
          </div>
        </RouterLink>
      </div>

      <!-- 第二行：2 个小卡，同样加高 + 淡背景 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <RouterLink
          v-for="card in smallCards"
          :key="card.title"
          :to="card.to"
          class="group relative flex flex-col p-5 rounded-[16px] border border-[#E9EBEF] bg-white hover:border-[#d1d5db] hover:shadow-[0_8px_30px_rgba(17,24,39,0.08)] hover:-translate-y-0.5 transition-all duration-200 text-left min-h-[240px] overflow-hidden"
        >
          <div
            class="absolute inset-0 opacity-[0.035] pointer-events-none"
            :class="card.bgPattern"
            aria-hidden="true"
          />
          <div class="relative z-10 flex flex-col flex-1 min-h-0">
            <div
              class="w-9 h-9 rounded-full bg-[#F7F8FA] flex items-center justify-center text-[#525866] group-hover:text-[#111827] mb-3"
            >
              <component :is="card.icon" class="w-4 h-4" />
            </div>
            <h3 class="text-[16px] font-bold text-[#111827] mb-1.5">{{ card.title }}</h3>
            <p class="text-[13px] text-[#525866] leading-relaxed mb-3 flex-1">{{ card.desc }}</p>
            <p class="text-[12px] text-[#8A8F98] leading-relaxed mb-4">{{ card.extra }}</p>
            <span class="self-end text-[#8A8F98] group-hover:text-[#111827]" aria-hidden="true">
              <ArrowRightIcon class="w-4 h-4" />
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DocumentTextIcon, Squares2X2Icon, ChartBarIcon, BookOpenIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

const bigCards = [
  {
    title: 'Resume Assistant',
    desc: 'ATS-friendly editor with live JD match score and one-click PDF export. Build from your existing resume or LinkedIn.',
    extra: 'Keywords, sections, and formatting tuned for applicant systems.',
    icon: DocumentTextIcon,
    to: '/resume-edit',
    bgPattern: 'feature-bg-doc'
  },
  {
    title: 'Job Pipeline',
    desc: 'One board for Applied, Interview, and Offer. Track every application and see where you stand at a glance.',
    extra: 'Stage columns, dates, and company notes in one place.',
    icon: Squares2X2Icon,
    to: '/dashboard/job-board',
    bgPattern: 'feature-bg-kanban'
  }
]

const smallCards = [
  {
    title: 'Post-mortem',
    desc: 'Structured review after each interview. Blind spots, scores, and an action checklist so you improve every time.',
    extra: 'Save highlights and fixes to your library.',
    icon: ChartBarIcon,
    to: '/dashboard/analysis',
    bgPattern: 'feature-bg-chart'
  },
  {
    title: 'Asset Library',
    desc: 'Reusable bullets and stories. @ mention them in your resume so every application uses your best material.',
    extra: 'Success rate and versions per asset.',
    icon: BookOpenIcon,
    to: '/dashboard/knowledge',
    bgPattern: 'feature-bg-lib'
  }
]
</script>

<style scoped>
/* 文档轮廓淡底 */
.feature-bg-doc {
  background: url("data:image/svg+xml,%3Csvg width='200' height='260' viewBox='0 0 200 260' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='20' y='20' width='160' height='220' rx='4' stroke='%23111827' stroke-width='1' fill='none' opacity='0.5'/%3E%3Cline x1='32' y1='52' x2='168' y2='52' stroke='%23111827' stroke-width='0.8' opacity='0.4'/%3E%3Cline x1='32' y1='72' x2='140' y2='72' stroke='%23111827' stroke-width='0.8' opacity='0.4'/%3E%3Cline x1='32' y1='92' x2='160' y2='92' stroke='%23111827' stroke-width='0.8' opacity='0.4'/%3E%3C/svg%3E")
    center/contain no-repeat;
}

/* Kanban 淡底 */
.feature-bg-kanban {
  background: url("data:image/svg+xml,%3Csvg width='240' height='200' viewBox='0 0 240 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='16' y='24' width='64' height='160' rx='6' stroke='%23111827' stroke-width='1' fill='none' opacity='0.4'/%3E%3Crect x='88' y='24' width='64' height='160' rx='6' stroke='%23111827' stroke-width='1' fill='none' opacity='0.4'/%3E%3Crect x='160' y='24' width='64' height='160' rx='6' stroke='%23111827' stroke-width='1' fill='none' opacity='0.4'/%3E%3Crect x='24' y='40' width='48' height='32' rx='4' fill='%23111827' fill-opacity='0.06'/%3E%3Crect x='96' y='40' width='48' height='32' rx='4' fill='%23111827' fill-opacity='0.06'/%3E%3C/svg%3E")
    center/contain no-repeat;
}

.feature-bg-chart {
  background: radial-gradient(ellipse 80% 60% at 80% 50%, #111827 0%, transparent 70%);
}

.feature-bg-lib {
  background: radial-gradient(ellipse 60% 80% at 20% 50%, #111827 0%, transparent 70%);
}
</style>
