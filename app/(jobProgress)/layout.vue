<template>
  <div class="w-full max-w-4xl mx-auto pb-24">
    <!-- 顶部标题区 -->
    <header class="mb-8 relative">
      <div class="flex justify-between items-end mb-2">
        <h1 class="text-3xl font-serif font-bold text-stone-800 flex items-center gap-3">
          <span class="relative inline-block">
            求职进度
            <span
              class="absolute -bottom-1 left-0 w-full h-3 bg-yellow-200/50 -z-10 rounded-sm transform -rotate-1"
            ></span>
          </span>
          <span
            class="text-sm font-sans font-normal text-stone-400 bg-stone-100 px-2 py-1 rounded-md border border-stone-200"
          >
            {{ applications.length }} 个活跃投递
          </span>
        </h1>

        <!-- 排序控件 -->
        <div class="flex items-center gap-2 text-xs text-stone-500">
          <span class="mr-1 font-serif italic text-stone-400">Sort by:</span>
          <button
            v-for="opt in sortOptions"
            :key="opt.value"
            @click="sortBy = opt.value"
            class="px-3 py-1 rounded-full border transition-all"
            :class="
              sortBy === opt.value
                ? 'bg-stone-800 text-white border-stone-800 shadow-sm'
                : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
            "
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <p class="text-stone-500 max-w-xl leading-relaxed text-sm">
        追踪你的每一次机会。每一个节点都是向理想职业迈进的一步。
      </p>
    </header>

    <!-- 统计概览卡片 (可选) -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div
        v-for="(stat, key) in stats"
        :key="key"
        class="bg-white p-4 rounded-xl border border-stone-100 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group"
      >
        <div class="absolute inset-0 bg-paper-texture opacity-20"></div>
        <div class="text-2xl font-bold text-stone-800 mb-1 relative z-10 group-hover:scale-110 transition-transform">
          {{ stat.count }}
        </div>
        <div class="text-xs text-stone-500 uppercase tracking-wider relative z-10">{{ stat.label }}</div>
        <div
          class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-30"
        ></div>
      </div>
    </div>

    <!-- 列表区域 -->
    <div class="space-y-6">
      <TransitionGroup name="list" tag="div" class="space-y-6">
        <JobCard v-for="app in sortedApplications" :key="app.id" :job="app" />
      </TransitionGroup>
    </div>

    <!-- 空状态 -->
    <div
      v-if="applications.length === 0"
      class="text-center py-20 bg-white rounded-xl border border-dashed border-stone-300"
    >
      <div class="w-16 h-16 bg-stone-100 rounded-full mx-auto mb-4 flex items-center justify-center text-stone-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-stone-600">暂无投递记录</h3>
      <p class="text-stone-400 text-sm mt-1">开始添加你的第一个求职申请吧</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { JobApplication, JobPriority } from './types'
import JobCard from './_components/JobCard.vue'

type SortOption = 'progress' | 'priority' | 'deadline' | 'interview'

const sortBy = ref<SortOption>('priority')

const sortOptions: { label: string; value: SortOption }[] = [
  { label: '重视程度', value: 'priority' },
  { label: '面试时间', value: 'interview' },
  { label: '进度', value: 'progress' },
  { label: '截止日期', value: 'deadline' }
]

// 模拟数据
const applications = ref<JobApplication[]>([
  {
    id: '1',
    position: '高级前端工程师',
    company: 'TechVision Inc.',
    location: '上海 · 徐汇',
    salary: '35k-50k',
    status: 'Interviewing',
    priority: 'Urgent',
    progress: 66,
    deadline: '2023-12-15',
    updatedAt: '2023-11-28',
    description: `1. 负责公司核心SaaS平台的前端架构升级。
    2. 深度参与产品需求讨论，提供技术可行性分析。
    3. 指导初级工程师，进行代码Review。
    
    要求：
    - 精通Vue3, TypeScript, Vite。
    - 有大型复杂系统开发经验优先。`,
    nextInterview: '2023-12-01 14:00 (复试)',
    nextInterviewDate: '2023-12-01T14:00:00',
    notes: '技术栈非常匹配，团队氛围好。记得复习一下Webpack原理和性能优化案例。',
    contacts: [
      { name: 'Sarah Li', role: 'HR Manager', email: 'sarah@techvision.com' },
      { name: 'David Chen', role: 'Tech Lead' }
    ],
    files: [
      { name: 'MyResume_v3.pdf', size: '2.4MB', type: 'pdf', uploadDate: '2023-11-20' },
      { name: 'Portfolio_2023.pdf', size: '15MB', type: 'pdf', uploadDate: '2023-11-20' }
    ],
    timeline: [
      { stage: '投递', date: '11/20', completed: true, current: false },
      { stage: 'HR筛选', date: '11/22', completed: true, current: false },
      { stage: '初试', date: '11/25', completed: true, current: false, detail: '通过，面试官评价不错' },
      { stage: '复试', date: '12/01', completed: false, current: true, detail: '等待面试' },
      { stage: 'Offer', completed: false, current: false }
    ]
  },
  {
    id: '2',
    position: '全栈开发专家',
    company: 'Nebula Studio',
    location: '远程',
    salary: '30k-45k',
    status: 'Applying',
    priority: 'High',
    progress: 25,
    updatedAt: '2023-11-29',
    description: '寻找富有创造力的全栈开发者，参与新一代设计工具的研发。技术栈：React, Node.js, WebGL。',
    contacts: [{ name: 'Recruiting Team', email: 'jobs@nebula.studio' }],
    timeline: [
      { stage: '投递', date: '11/29', completed: true, current: false },
      { stage: 'HR筛选', completed: false, current: true, detail: 'HR查看了你的简历' },
      { stage: '面试', completed: false, current: false },
      { stage: '测试', completed: false, current: false },
      { stage: 'Offer', completed: false, current: false }
    ]
  },
  {
    id: '3',
    position: '产品设计师 (UI/UX)',
    company: 'Creative Co.',
    location: '杭州',
    salary: '25k-35k',
    status: 'Offer',
    priority: 'Medium',
    progress: 100,
    deadline: '2023-11-30',
    updatedAt: '2023-11-15',
    description: '负责B端产品的用户体验设计。',
    notes: '薪资谈到了期望值，准备入职材料。',
    files: [{ name: 'Offer_Letter.pdf', size: '500KB', type: 'pdf', uploadDate: '2023-11-15' }],
    timeline: [
      { stage: '投递', date: '11/01', completed: true, current: false },
      { stage: '作品集', date: '11/03', completed: true, current: false },
      { stage: '面谈', date: '11/08', completed: true, current: false },
      { stage: 'Offer', date: '11/15', completed: true, current: true, detail: '已发放，待入职' }
    ]
  },
  {
    id: '4',
    position: '前端架构师',
    company: 'FinTech Corp',
    location: '北京',
    salary: '50k-70k',
    status: 'Rejected',
    priority: 'Low',
    progress: 100,
    updatedAt: '2023-10-20',
    description: '负责金融交易系统的前端架构设计。',
    notes: 'HC冻结，遗憾未通过。',
    timeline: [
      { stage: '投递', date: '10/15', completed: true, current: false },
      { stage: '初试', date: '10/18', completed: true, current: false },
      { stage: '复试', date: '10/20', completed: true, current: false, detail: '未通过' },
      { stage: 'Offer', completed: false, current: false }
    ]
  }
])

// 优先级权重映射
const priorityWeight: Record<JobPriority, number> = {
  Urgent: 4,
  High: 3,
  Medium: 2,
  Low: 1
}

const sortedApplications = computed(() => {
  return [...applications.value].sort((a, b) => {
    if (sortBy.value === 'priority') {
      return priorityWeight[b.priority] - priorityWeight[a.priority]
    } else if (sortBy.value === 'progress') {
      return b.progress - a.progress
    } else if (sortBy.value === 'deadline') {
      if (!a.deadline) return 1
      if (!b.deadline) return -1
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    } else if (sortBy.value === 'interview') {
      const now = new Date().getTime()
      // 有面试时间且是未来的优先
      const getScore = (app: JobApplication) => {
        if (!app.nextInterviewDate) return Infinity
        const t = new Date(app.nextInterviewDate).getTime()
        if (t < now) return Infinity // 过去的面试放最后
        return t
      }
      return getScore(a) - getScore(b)
    }
    return 0
  })
})

const stats = computed(() => {
  const total = applications.value.length
  const interviewing = applications.value.filter((a) => a.status === 'Interviewing').length
  const offers = applications.value.filter((a) => a.status === 'Offer').length
  const applying = applications.value.filter((a) => a.status === 'Applying').length

  return [
    { label: '投递总数', count: total },
    { label: '面试中', count: interviewing },
    { label: '已获Offer', count: offers },
    { label: '申请中', count: applying }
  ]
})
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
