<template>
  <div>
    <!-- 状态切换 -->
    <div class="flex justify-center mb-8">
      <div class="inline-flex bg-[#fdfbf7] p-1.5 rounded-full border border-stone-200 shadow-sm relative">
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
              :class="currentMainStage === stage.id ? 'bg-stone-200 text-stone-600' : 'bg-stone-100 text-stone-300'"
            >
              {{ stage.count }}
            </span>
          </span>
        </button>
      </div>
    </div>

    <!-- 投递列表 -->
    <div class="space-y-6 min-h-[400px]">
      <TransitionGroup name="list">
        <JobCard v-for="job in filteredJobs" :key="job.id" :job="job" @update:status="updateJobStatus" />
      </TransitionGroup>

      <!-- 空状态 -->
      <div
        v-if="filteredJobs.length === 0"
        class="py-24 text-center border-2 border-dashed border-stone-200 rounded-sm relative overflow-hidden group cursor-pointer"
        @click="handleNewJob"
      >
        <div class="relative z-10">
          <div class="text-4xl mb-4 opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500">🍃</div>
          <p class="text-stone-400 text-sm font-serif italic mb-4">这里很安静，像是暴风雨前的宁静...</p>
          <span
            class="inline-block px-4 py-2 bg-white border border-stone-200 text-stone-600 text-xs font-bold rounded-full shadow-sm group-hover:scale-105 transition-transform"
          >
            添加第一条记录
          </span>
        </div>
        <!-- 噪点纹理 -->
        <div class="absolute inset-0 bg-stone-50 opacity-50 pointer-events-none"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import JobCard from './JobCard.vue'
import type { MainStage } from '../types'
import { useJobStore } from '@/composables/useJobStore'

const { allJobs } = useJobStore()
const currentMainStage = ref<MainStage>('Applied')
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
</script>

<style scoped></style>
