<template>
  <div class="job-board flex flex-col relative overflow-y-auto">
    <div class="max-w-[1120px] mx-auto w-full px-6 py-6 flex flex-col">
      <!-- 状态区：主 KPI 总投递 + 右侧两卡弱化 -->
      <section class="mb-6">
        <h2 class="label-num font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">状态一览</h2>
        <div class="flex gap-4">
          <div class="card stats-main rounded-xl p-5 flex-1 min-w-0">
            <div class="text-[32px] font-bold tabular-nums text-[var(--text-primary)] leading-tight">
              {{ stats.totalApplied }}
            </div>
            <div class="text-[13px] text-[var(--text-secondary)] mt-1">总投递</div>
          </div>
          <div class="flex gap-4 shrink-0">
            <div class="card rounded-xl p-4 w-[140px] stats-secondary">
              <div class="text-[20px] font-semibold tabular-nums text-[var(--text-primary)]">
                {{ stats.inInterview }}
              </div>
              <div class="text-[12px] text-[var(--text-secondary)] mt-0.5">面试中</div>
            </div>
            <div class="card rounded-xl p-4 w-[140px] stats-secondary">
              <div class="text-[20px] font-semibold tabular-nums text-[var(--text-primary)]">
                {{ stats.offerCount }}
              </div>
              <div class="text-[12px] text-[var(--text-secondary)] mt-0.5">Offer</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 趋势区：轻底色、减少边框感 -->
      <section class="mb-6">
        <h2 class="label-num font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
          求职能力变化趋势
        </h2>
        <div class="card rounded-xl p-5 bg-[var(--bg-secondary)] border border-[var(--border-light)]">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
            <div>
              <div class="label-num text-[var(--text-secondary)] mb-1">面试率趋势</div>
              <div class="flex items-baseline gap-2">
                <span class="num-secondary text-[var(--text-primary)]">{{ trend.interviewRate.current }}%</span>
                <span
                  class="text-sm font-medium"
                  :class="trend.interviewRate.delta >= 0 ? 'text-[var(--text-green)]' : 'text-[var(--text-red)]'"
                >
                  {{ trend.interviewRate.delta >= 0 ? '↑' : '↓' }} {{ Math.abs(trend.interviewRate.delta) }}%
                </span>
              </div>
              <div class="text-[10px] text-[var(--text-secondary)] mt-0.5">较上周</div>
              <div class="mt-2 flex items-end gap-1 h-8">
                <div
                  v-for="(v, i) in trend.interviewRate.history"
                  :key="i"
                  class="flex-1 min-w-0 rounded-t bg-[var(--primary)]/20 transition-all"
                  :style="{ height: Math.max(4, (v / 100) * 32) + 'px' }"
                />
              </div>
              <div class="flex justify-between text-[10px] text-[var(--text-secondary)] mt-1">
                <span>4 周前</span>
                <span>本周</span>
              </div>
            </div>
            <div>
              <div class="label-num text-[var(--text-secondary)] mb-1">Offer 率趋势</div>
              <div class="flex items-baseline gap-2">
                <span class="num-secondary text-[var(--text-primary)]">{{ trend.offerRate.current }}%</span>
                <span
                  class="text-sm font-medium"
                  :class="trend.offerRate.delta >= 0 ? 'text-[var(--text-green)]' : 'text-[var(--text-red)]'"
                >
                  {{ trend.offerRate.delta >= 0 ? '↑' : '↓' }} {{ Math.abs(trend.offerRate.delta) }}%
                </span>
              </div>
              <div class="text-[10px] text-[var(--text-secondary)] mt-0.5">较上周</div>
              <div class="mt-2 flex items-end gap-1 h-8">
                <div
                  v-for="(v, i) in trend.offerRate.history"
                  :key="i"
                  class="flex-1 min-w-0 rounded-t bg-[var(--text-success)]/30 transition-all"
                  :style="{ height: Math.max(4, (v / 100) * 32) + 'px' }"
                />
              </div>
              <div class="flex justify-between text-[10px] text-[var(--text-secondary)] mt-1">
                <span>4 周前</span>
                <span>本周</span>
              </div>
            </div>
            <div>
              <div class="label-num text-[var(--text-secondary)] mb-1">面试评分趋势</div>
              <div class="flex items-baseline gap-2">
                <span class="num-secondary text-[var(--text-primary)]">{{ trend.score.current }}</span>
                <span
                  class="text-sm font-medium"
                  :class="trend.score.delta >= 0 ? 'text-[var(--text-green)]' : 'text-[var(--text-red)]'"
                >
                  {{ trend.score.delta >= 0 ? '↑' : '↓' }} {{ trend.score.deltaLabel }}
                </span>
              </div>
              <div class="text-[10px] text-[var(--text-secondary)] mt-0.5">较上周</div>
              <div class="mt-2 flex items-end gap-1 h-6">
                <div
                  v-for="(s, i) in trend.score.history"
                  :key="i"
                  class="flex-1 min-w-0 rounded-t bg-[var(--border)] transition-all"
                  :style="{ height: (s / 5) * 100 + '%', minHeight: '4px' }"
                />
              </div>
              <div class="flex justify-between text-[10px] text-[var(--text-secondary)] mt-1">
                <span>4 周前</span>
                <span>本周</span>
              </div>
            </div>
          </div>
          <div class="pt-4 mt-4">
            <div class="text-xs text-[var(--text-secondary)] mb-2">近 4 周投递量</div>
            <div class="flex items-end gap-2 h-10">
              <div
                v-for="(val, i) in trend.applicationsHistory"
                :key="i"
                class="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  class="w-full max-w-8 rounded-t bg-[var(--primary)]/20 transition-all"
                  :style="{ height: (val / Math.max(...trend.applicationsHistory)) * 32 + 'px', minHeight: '4px' }"
                />
                <span class="text-[10px] text-[var(--text-secondary)]">{{ trend.weekLabels[i] }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 行动条：1 主建议 + 2 次建议（高度 120–160） -->
      <section class="mb-6 action-bar">
        <h2 class="label-num font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">下一步建议</h2>
        <div class="flex gap-4 items-stretch">
          <!-- 主建议卡 -->
          <RouterLink
            v-if="stats.inInterview > 0"
            :to="{ path: '/dashboard/analysis' }"
            class="action-card-main card flex items-center gap-3 p-4 rounded-xl flex-1 min-w-0 group"
          >
            <div
              class="action-card-icon shrink-0 w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-lg"
            >
              🎙️
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-[15px] font-semibold text-[var(--text-primary)]">
                有 {{ stats.inInterview }} 场面试待复盘
              </div>
              <div class="text-[12px] text-[var(--text-secondary)] mt-0.5">复盘可发现盲区，提升下次表现</div>
            </div>
            <div class="shrink-0 flex items-center gap-2">
              <span class="text-xs font-medium text-white bg-[var(--primary)] px-2.5 py-1 rounded-md">去复盘</span>
              <span
                class="text-[11px] font-semibold text-[var(--text-secondary)] bg-[var(--bg-hover)] px-2 py-0.5 rounded"
                >{{ stats.inInterview }}</span
              >
              <ChevronRightIcon
                class="w-4 h-4 text-[var(--text-secondary)] group-hover:translate-x-0.5 transition-transform"
              />
            </div>
          </RouterLink>
          <!-- 次建议 1 -->
          <RouterLink
            to="/resume-edit"
            class="action-card-secondary card flex items-center gap-2.5 p-3 rounded-xl min-w-0 group"
          >
            <span class="text-base shrink-0 opacity-80">📄</span>
            <div class="min-w-0 flex-1 text-[13px] text-[var(--text-primary)]">建议优化简历，微调关键词</div>
            <span class="text-[12px] text-[var(--primary)] shrink-0 group-hover:underline">立即优化</span>
            <ChevronRightIcon
              class="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:translate-x-0.5 transition-transform shrink-0"
            />
          </RouterLink>
          <!-- 次建议 2 -->
          <div class="action-card-secondary card flex items-center gap-2.5 p-3 rounded-xl min-w-0">
            <span class="text-base shrink-0 opacity-80">📈</span>
            <div class="min-w-0 flex-1 text-[13px] text-[var(--text-secondary)]">
              今日计划 <span class="font-medium text-[var(--text-primary)]">2</span> 个投递
            </div>
          </div>
        </div>
      </section>

      <!-- Kanban：列头标准 + 列内滚动 -->
      <section class="flex-1 min-h-0 flex flex-col">
        <div class="flex items-center justify-between mb-3">
          <h2 class="label-num font-semibold text-[var(--text-secondary)] uppercase tracking-wider">阶段</h2>
          <button
            class="text-sm bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-3 py-1.5 rounded-xl transition-colors"
          >
            新增投递
          </button>
        </div>

        <div class="kanban-scroll flex-1 min-h-0 overflow-x-auto overflow-y-hidden pb-4">
          <div class="flex gap-4 min-h-full">
            <div
              v-for="stage in stages"
              :key="stage.id"
              class="kanban-column flex-shrink-0 flex flex-col"
              :class="{ 'kanban-column--collapsed': columnCollapsed[stage.id] }"
            >
              <!-- 列头：subtle 底色 + 标题 + ● count + 操作 -->
              <div
                class="kanban-col-header flex items-center justify-between gap-2 mb-2 px-2.5 py-1.5 rounded-lg bg-[var(--bg-secondary)]/80"
              >
                <div class="flex items-center gap-1.5 min-w-0">
                  <span class="text-[13px] font-medium text-[var(--text-primary)] truncate">{{ stage.name }}</span>
                  <span
                    class="kanban-count shrink-0 flex items-center gap-1 text-[12px] font-semibold text-[var(--text-primary)]"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" aria-hidden="true"></span>
                    {{ stage.jobs.length }}
                  </span>
                </div>
                <div class="flex items-center gap-0.5 shrink-0">
                  <button
                    type="button"
                    class="p-1 rounded text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors"
                    title="在此列新增"
                    @click.stop="addToColumn(stage.id)"
                  >
                    <PlusIcon class="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    class="p-1 rounded text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors"
                    title="列设置"
                    @click.stop="toggleColumnCollapse(stage.id)"
                  >
                    <EllipsisHorizontalIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <!-- 列内容：可纵向滚动 -->
              <div
                v-show="!columnCollapsed[stage.id]"
                class="kanban-col-body flex-1 min-h-0 overflow-y-auto space-y-2 px-1"
              >
                <div
                  v-for="job in stage.jobs"
                  :key="job.id"
                  class="kanban-card group/card relative card rounded-xl p-3.5 cursor-pointer select-none border-l-[3px] border border-transparent transition-all duration-150"
                  :class="[
                    priorityBarClass(job.priority),
                    { 'border-l-transparent': !job.priority || job.priority === 'low' }
                  ]"
                  @click="openJobDetail(job)"
                >
                  <div class="flex items-start gap-2">
                    <div class="min-w-0 flex-1 pr-8">
                      <div class="text-[14px] font-semibold text-[var(--text-primary)] truncate leading-tight">
                        {{ job.title }}
                      </div>
                      <div class="text-[12px] text-[var(--text-secondary)] truncate mt-1">
                        {{ job.company }}{{ job.city ? ` · ${job.city}` : '' }}
                      </div>
                      <div
                        class="flex items-center justify-between gap-2 mt-2 text-[12px] text-[var(--text-secondary)]"
                      >
                        <span>{{ formatDateShort(job.date) }}</span>
                        <span
                          v-if="job.interviewScore"
                          class="text-[11px] font-medium px-1.5 py-0.5 rounded bg-[var(--bg-hover)] text-[var(--text-primary)]"
                        >
                          {{ job.interviewScore }}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="kanban-card-more p-1 rounded opacity-0 group-hover/card:opacity-100 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-all absolute top-2 right-2"
                      @click.stop
                    >
                      <EllipsisHorizontalIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  class="flex items-center gap-2 w-full text-[12px] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] py-2 px-2 rounded-lg transition-colors"
                  @click.stop="addToColumn(stage.id)"
                >
                  <PlusIcon class="w-4 h-4 shrink-0" /> 添加
                </button>
              </div>
              <!-- 折叠时只显示标题 + count -->
              <div
                v-show="columnCollapsed[stage.id]"
                class="py-2 px-1 text-[12px] text-[var(--text-secondary)] truncate"
              >
                {{ stage.name }} · {{ stage.jobs.length }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Job Detail SlideOver（抽出组件） -->
    <transition name="slide-over">
      <JobDetailSlideOver
        v-if="selectedJob"
        :job="selectedJob"
        v-model="jdContent"
        :match-result="matchResult"
        :loading="isAnalyzing"
        @close="closeJobDetail"
        @analyze="analyzeJD"
        @use-last-jd="onUseLastJd"
        @history-jd="onHistoryJd"
        @go-optimize="goOptimize"
      />
    </transition>

    <!-- Overlay -->
    <div
      v-if="selectedJob"
      @click="closeJobDetail"
      class="fixed inset-0 bg-black/20 z-40 backdrop-blur-[1px] transition-opacity"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
import { PlusIcon, EllipsisHorizontalIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import JobDetailSlideOver from './_components/JobDetailSlideOver.vue'

interface Job {
  id: string
  title: string
  company: string
  city?: string
  date: string
  priority?: 'high' | 'medium' | 'low'
  icon?: string
  source?: string
  result?: string
  interviewScore?: string
  stageId?: string
}

interface Stage {
  id: string
  name: string
  colorClass: string
  jobs: Job[]
}

const stages = ref<Stage[]>([
  {
    id: 'applied',
    name: '已投递',
    colorClass: 'pill',
    jobs: [
      {
        id: '1',
        title: '高级前端工程师',
        company: '字节跳动',
        city: '北京',
        date: 'Feb 10',
        priority: 'high',
        icon: '',
        source: 'Boss直聘',
        stageId: 'applied'
      },
      { id: '2', title: 'Vue.js 开发', company: '腾讯', date: 'Feb 08', icon: '', source: '内推', stageId: 'applied' }
    ]
  },
  {
    id: 'screening',
    name: '筛选中',
    colorClass: 'pill',
    jobs: [
      {
        id: '3',
        title: 'React 工程师',
        company: '阿里巴巴',
        date: 'Feb 05',
        priority: 'high',
        icon: '',
        source: '官网',
        stageId: 'screening'
      }
    ]
  },
  {
    id: 'interview',
    name: '面试中',
    colorClass: 'pill',
    jobs: [
      {
        id: '4',
        title: '前端架构师',
        company: '美团',
        date: 'Feb 01',
        icon: '',
        interviewScore: 'B+',
        source: '猎头',
        stageId: 'interview'
      },
      {
        id: '5',
        title: 'Full Stack Dev',
        company: '小红书',
        date: 'Jan 28',
        priority: 'medium',
        icon: '',
        interviewScore: 'A-',
        source: 'Boss直聘',
        stageId: 'interview'
      }
    ]
  },
  {
    id: 'offer',
    name: 'Offer',
    colorClass: 'pill',
    jobs: []
  }
])

/** 求职能力变化趋势（示例数据，后续可对接真实复盘与投递数据） */
const trend = ref({
  interviewRate: { current: 33, delta: 5, history: [20, 25, 28, 33] },
  offerRate: { current: 0, delta: 0, history: [0, 5, 8, 0] },
  score: {
    current: 'B+',
    delta: 0.3,
    deltaLabel: 'B→B+',
    history: [3, 3.2, 3.5, 3.8]
  },
  applicationsHistory: [6, 8, 5, 7],
  weekLabels: ['4 周前', '3 周前', '2 周前', '本周']
})

/** 状态可视化 + 转化分析：从数据自动计算 */
const stats = computed(() => {
  const applied = stages.value.find((s) => s.id === 'applied')?.jobs.length ?? 0
  const screening = stages.value.find((s) => s.id === 'screening')?.jobs.length ?? 0
  const inInterview = stages.value.find((s) => s.id === 'interview')?.jobs.length ?? 0
  const offerCount = stages.value.find((s) => s.id === 'offer')?.jobs.length ?? 0
  const totalApplied = applied + screening + inInterview + offerCount
  const toInterview = inInterview + offerCount
  const interviewRate = totalApplied ? Math.round((toInterview / totalApplied) * 100) : 0
  const offerRate = totalApplied ? Math.round((offerCount / totalApplied) * 100) : 0
  const passInterviewRate = toInterview ? Math.round((offerCount / toInterview) * 100) : 0
  return {
    totalApplied,
    inInterview,
    offerCount,
    interviewRate,
    offerRate,
    passInterviewRate
  }
})

const isInterviewStage = (stageId?: string) => stageId === 'interview'

// Job Detail Logic
const selectedJob = ref<Job | null>(null)
const jdContent = ref('')
const isAnalyzing = ref(false)
const matchResult = ref<{ score: number; missingSkills: string[]; goodMatch: string[] } | null>(null)

const openJobDetail = (job: Job) => {
  selectedJob.value = job
  jdContent.value = '' // Reset
  matchResult.value = null // Reset
}

const closeJobDetail = () => {
  selectedJob.value = null
}

const analyzeJD = () => {
  if (!jdContent.value.trim()) return

  isAnalyzing.value = true
  setTimeout(() => {
    isAnalyzing.value = false
    matchResult.value = {
      score: 85,
      missingSkills: ['Next.js App Router', 'GraphQL', 'Large Scale System Design'],
      goodMatch: ['Vue 3 Source Code', 'Frontend Performance Optimization', 'Team Leadership']
    }
  }, 1500)
}

function onUseLastJd() {
  // TODO: 从历史或上次分析恢复 JD
}
function onHistoryJd() {
  // TODO: 打开历史 JD 选择
}

function goOptimize() {
  router.push({ path: '/resume-edit', query: { context: 'jd' } })
}

const getMatchScoreColor = (score: number) => {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}

const columnCollapsed = ref<Record<string, boolean>>({})

function addToColumn(_stageId: string) {
  // TODO: 打开新增投递并预填阶段
}

function toggleColumnCollapse(stageId: string) {
  columnCollapsed.value = { ...columnCollapsed.value, [stageId]: !columnCollapsed.value[stageId] }
}

function formatDateShort(dateStr: string): string {
  const m: Record<string, string> = {
    Jan: '1',
    Feb: '2',
    Mar: '3',
    Apr: '4',
    May: '5',
    Jun: '6',
    Jul: '7',
    Aug: '8',
    Sep: '9',
    Oct: '10',
    Nov: '11',
    Dec: '12'
  }
  const parts = dateStr.split(' ')
  const month = parts[0] && m[parts[0]]
  if (parts.length >= 2 && month) return `${month}/${parts[1]}`
  return dateStr
}

function priorityBarClass(priority?: string): string {
  if (priority === 'high') return 'border-l-[var(--primary)]'
  if (priority === 'medium') return 'border-l-[var(--border)]'
  return 'border-l-transparent'
}
</script>

<style scoped>
.job-board {
  min-height: 100%;
}

/* 行动条：高度控制在 120–160，主卡 hover/click 反馈 */
.action-bar {
  max-height: 160px;
}
.action-card-main {
  transition:
    box-shadow 0.12s ease,
    border-color 0.12s ease,
    transform 0.08s ease-out;
}
.action-card-main:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-color: var(--border);
}
.action-card-main:active {
  transform: scale(0.99);
}
.action-card-secondary {
  flex: 0 1 200px;
  transition: background-color 0.12s ease;
}

/* Kanban：列宽 280–320，列间距 16，滚动条淡化 */
.kanban-scroll {
  scrollbar-gutter: stable;
}
.kanban-scroll::-webkit-scrollbar {
  height: 6px;
}
.kanban-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.kanban-scroll::-webkit-scrollbar-thumb {
  background: rgba(155, 155, 155, 0.15);
  border-radius: 3px;
}
.kanban-scroll:hover::-webkit-scrollbar-thumb {
  background: rgba(155, 155, 155, 0.35);
}
.kanban-column {
  width: 300px;
}
.kanban-column--collapsed {
  width: 56px;
  min-width: 56px;
}
.kanban-col-body::-webkit-scrollbar {
  width: 4px;
}
.kanban-col-body::-webkit-scrollbar-track {
  background: transparent;
}
.kanban-col-body::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 2px;
}
.kanban-column:hover .kanban-col-body::-webkit-scrollbar-thumb {
  background: rgba(155, 155, 155, 0.25);
}
.kanban-card {
  transition:
    background-color 0.15s ease,
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;
}
.kanban-card:hover {
  background: var(--bg-hover);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border-color: rgba(37, 99, 235, 0.25);
  transform: translateY(-1px);
}
.kanban-card:active {
  transform: translateY(0) scale(0.99);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
}

.slide-over-enter-active,
.slide-over-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-over-enter-from,
.slide-over-leave-to {
  transform: translateX(100%);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
