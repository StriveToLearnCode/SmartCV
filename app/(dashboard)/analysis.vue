<template>
  <div class="h-full flex flex-col bg-white dark:bg-[#111] overflow-hidden">
    <!-- 第一步：顶部评分区（简洁，无大色块） -->
    <section class="shrink-0 px-6 pt-6 pb-5">
      <div class="max-w-2xl">
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-bold tabular-nums text-[var(--text-primary)]">{{ overview.score }}</span>
          <span class="text-lg text-[var(--text-secondary)]">/ 10</span>
        </div>
        <div class="flex items-center gap-2 mt-1.5 text-sm text-[var(--text-secondary)]">
          <span>通过率 {{ overview.passProbability }}</span>
          <span aria-hidden="true">·</span>
          <span
            class="font-medium tabular-nums"
            :class="overview.change >= 0 ? 'trend-positive' : 'text-[var(--text-secondary)]'"
          >
            {{ overview.change >= 0 ? '↑' : '↓' }}{{ Math.abs(overview.change) }}
          </span>
        </div>
      </div>
    </section>

    <!-- 主内容：可滚动 -->
    <div class="flex-1 min-h-0 flex">
      <!-- 第二步：左栏问题列表，hover 浅灰背景，选中仅左侧蓝线 -->
      <aside
        class="w-52 shrink-0 border-r border-[var(--border)] overflow-y-auto hidden lg:block bg-[var(--bg-primary)]"
      >
        <div class="p-3 space-y-0.5">
          <button
            v-for="(q, idx) in questions"
            :key="idx"
            type="button"
            class="w-full text-left rounded-md px-3 py-2.5 transition-colors relative border-l-4"
            :class="
              activeQuestionIndex === idx
                ? 'border-l-[var(--primary)] bg-transparent'
                : 'border-l-transparent hover:bg-[var(--bg-hover)]'
            "
            @click="activeQuestionIndex = idx"
          >
            <span class="absolute top-2 right-2 text-xs tabular-nums text-[var(--text-secondary)]"
              >{{ q.score }}/10</span
            >
            <span v-if="q.score < 6" class="inline-block label-num text-[var(--text-secondary)] mb-0.5">弱项</span>
            <span v-else-if="q.score >= 8" class="inline-block label-num text-[var(--text-success)] mb-0.5">强项</span>
            <span v-else class="inline-block mb-0.5 h-3 w-0 overflow-hidden"> </span>
            <span class="text-sm font-medium text-[var(--text-primary)] line-clamp-2 pr-8">{{ q.title }}</span>
          </button>
        </div>
      </aside>

      <!-- 第三步：中间 Insight Card 主视觉（去灰标题、左上 icon、每条卡片小块、数字加粗） -->
      <main class="flex-1 min-w-0 overflow-y-auto bg-white dark:bg-[#111]">
        <div class="max-w-2xl mx-auto px-6 py-6 space-y-8">
          <section>
            <h2 class="text-sm font-semibold text-[var(--text-primary)]">AI 洞察</h2>
            <div class="border-b border-[var(--border)] my-3" aria-hidden="true" />
            <div class="space-y-3">
              <div v-for="(insight, i) in coreInsights" :key="i" class="flex gap-3 text-sm leading-relaxed">
                <span class="text-sm font-bold tabular-nums text-[var(--primary)] shrink-0">{{
                  String(i + 1).padStart(2, '0')
                }}</span>
                <span class="text-[var(--text-primary)]">{{ insight }}</span>
              </div>
            </div>
          </section>

          <!-- 第五步：底部逐题分析 = 可钻取折叠卡片，选中高亮 -->
          <section>
            <div class="space-y-2">
              <details
                v-for="(qa, idx) in questions"
                :key="idx"
                class="group rounded-xl overflow-hidden transition-colors"
                :class="
                  activeQuestionIndex === idx
                    ? 'bg-[var(--bg-primary)] border border-[var(--border)]'
                    : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)]'
                "
                :open="activeQuestionIndex === idx"
                @toggle="(e) => setActiveQuestion(idx, e)"
              >
                <summary
                  class="flex items-center justify-between gap-3 px-4 py-3.5 cursor-pointer list-none transition-colors"
                >
                  <span class="text-sm font-medium text-[#111] dark:text-[#d4d4d4] line-clamp-1 pr-2">{{
                    qa.title
                  }}</span>
                  <span class="shrink-0 flex items-center gap-2">
                    <span class="text-xs text-[#6B7280] dark:text-[#9b9b9b]">{{ qa.score }}/10</span>
                    <ChevronDownIcon
                      class="w-4 h-4 text-[#6B7280] dark:text-[#9b9b9b] group-open:rotate-180 transition-transform"
                    />
                  </span>
                </summary>
                <div class="px-4 pb-5 pt-2 space-y-4 border-t border-[var(--border)]">
                  <div>
                    <div class="label-num font-medium text-[var(--text-secondary)] mb-1">原问题</div>
                    <p class="text-sm text-[#111] dark:text-[#d4d4d4]">{{ qa.originalQuestion }}</p>
                  </div>
                  <div>
                    <div class="text-[11px] font-medium text-[#9CA3AF] mb-1">你的回答摘要</div>
                    <p class="text-sm text-[#111] dark:text-[#d4d4d4] leading-relaxed">{{ qa.answerSummary }}</p>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="p-3 rounded-[12px] border border-[var(--border)] bg-[var(--bg-secondary)]">
                      <div class="label-num font-medium text-[var(--text-secondary)] mb-1">做得好的地方</div>
                      <p class="text-sm text-[var(--text-primary)] leading-relaxed">{{ qa.pros }}</p>
                    </div>
                    <div class="p-3 rounded-[12px] border border-[var(--border)] bg-[var(--bg-secondary)]">
                      <div class="label-num font-medium text-[var(--text-secondary)] mb-1">可补充的方向</div>
                      <p class="text-sm text-[var(--text-primary)] leading-relaxed">{{ qa.improveHint }}</p>
                    </div>
                  </div>
                  <div class="pt-3 border-t border-[var(--border)]">
                    <div class="label-num font-medium text-[var(--text-secondary)] mb-1">优化版回答</div>
                    <p class="text-sm text-[#111] dark:text-[#d4d4d4] leading-relaxed whitespace-pre-wrap">
                      {{ qa.optimizedAnswer }}
                    </p>
                  </div>
                </div>
              </details>
            </div>
          </section>
        </div>
      </main>

      <!-- 第四步：右侧只显示最低 2 维度，最弱项 ⚠，改进提示区 -->
      <aside
        class="w-56 shrink-0 border-l border-[var(--border)] overflow-y-auto hidden xl:block bg-[var(--bg-primary)]"
      >
        <div class="p-4 space-y-5">
          <div>
            <h3 class="text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF] dark:text-[#6e6e6e] mb-3">
              改进方向
            </h3>
            <div class="space-y-3">
              <div
                v-for="(d, i) in lowestTwoDimensions"
                :key="d.name"
                class="flex items-center gap-2 p-2.5 rounded-xl"
                :class="
                  i === 0
                    ? 'bg-[var(--bg-secondary)] border border-[var(--border)]'
                    : 'bg-[var(--bg-secondary)] border border-transparent'
                "
              >
                <ExclamationTriangleIcon v-if="i === 0" class="w-4 h-4 shrink-0 text-[var(--text-secondary)]" />
                <span v-else class="w-4 shrink-0" />
                <div class="min-w-0 flex-1">
                  <span class="text-xs font-medium text-[#111] dark:text-[#d4d4d4] block truncate">{{ d.name }}</span>
                  <span class="text-xs tabular-nums text-[#6B7280] dark:text-[#9b9b9b]">{{ d.score }}/10</span>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-4 border-t border-[var(--border)]">
            <h3 class="text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF] dark:text-[#6e6e6e] mb-2">
              行动
            </h3>
            <div class="space-y-1.5">
              <button
                type="button"
                class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-[#111] dark:text-[#d4d4d4] hover:bg-[#f5f5f5] dark:hover:bg-[#252525] transition-colors"
                @click="onAddToQuestionBank"
              >
                <BookmarkIcon class="w-4 h-4" />
                加入问题库
              </button>
              <button
                type="button"
                class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-[#111] dark:text-[#d4d4d4] hover:bg-[#f5f5f5] dark:hover:bg-[#252525] transition-colors"
                @click="onGeneratePractice"
              >
                <AcademicCapIcon class="w-4 h-4" />
                生成练习题
              </button>
              <button
                type="button"
                class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-[#111] dark:text-[#d4d4d4] hover:bg-[#f5f5f5] dark:hover:bg-[#252525] transition-colors"
                @click="onGenerateResumeParagraph"
              >
                <DocumentTextIcon class="w-4 h-4" />
                改进简历段落
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- 底部：移动端三项动作 -->
    <div class="xl:hidden shrink-0 border-t border-[var(--border)] bg-[var(--bg-primary)] p-4">
      <div class="flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)]/50"
          @click="onAddToQuestionBank"
        >
          <BookmarkIcon class="w-4 h-4" /> 加入问题库
        </button>
        <button
          type="button"
          class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)]/50"
          @click="onGeneratePractice"
        >
          <AcademicCapIcon class="w-4 h-4" /> 生成练习题
        </button>
        <button
          type="button"
          class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)]/50"
          @click="onGenerateResumeParagraph"
        >
          <DocumentTextIcon class="w-4 h-4" /> 改进简历段落
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  ChevronDownIcon,
  BookmarkIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  LightBulbIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import { useMaterials } from '../composables/useMaterials'

// ① 结果总览
const overview = ref({
  score: 7.2,
  interviewType: '技术',
  typeClass: 'pill',
  company: '某大厂',
  round: '技术一面',
  change: 0.8,
  trendLabel: '表现稳定',
  passProbability: '65%'
})

// ② 核心问题区：3 条
const coreInsights = ref([
  '行为问题回答可以更多用数字收尾，便于面试官抓重点。',
  '技术原理解释结构较清晰，能区分 Proxy 与 defineProperty。',
  '表达略长，可先给结论再展开，减少冗余。'
])

// 评分维度（右侧 + 趋势）
const scoreDimensions = ref([
  { name: '结构清晰度', score: 8 },
  { name: '逻辑完整度', score: 7 },
  { name: '表达流畅度', score: 8 },
  { name: '量化能力', score: 6 },
  { name: '深度', score: 7 }
])

// ③ 逐题分析
const activeQuestionIndex = ref(0)
const questions = ref([
  {
    title: 'Vue 3 的响应式系统是如何实现的？',
    originalQuestion: 'Vue 3 的响应式系统是如何实现的？',
    questionType: '技术原理',
    typeClass: 'pill',
    answerSummary: '从 Proxy、依赖收集与派发更新角度回答，概念正确。',
    pros: '能说出 Proxy 与 defineProperty 的差异，逻辑清晰。',
    improveHint: '可以补充 Reflect、WeakMap 与性能数据，让回答更完整。',
    optimizedAnswer:
      'Vue 3 用 Proxy 替代 Object.defineProperty 做响应式。在 get 里用 track 做依赖收集，在 set 里用 trigger 派发更新；配合 Reflect 保证 this 正确，用 WeakMap 存依赖避免内存泄漏。相比 Vue 2 在新增/删除属性和数组下标上更完善。',
    score: 8
  },
  {
    title: '如果后端接口很慢，前端如何优化用户体验？',
    originalQuestion: '如果后端接口很慢，前端如何优化用户体验？',
    questionType: '系统设计',
    typeClass: 'pill',
    answerSummary: '提到了 Loading、骨架屏、缓存，有基础优化意识。',
    pros: '有分层优化思路。',
    improveHint: '可以补充分层（交互/网络/策略）和具体场景与数据。',
    optimizedAnswer:
      '可以从三层说：1）交互层：骨架屏、乐观 UI、Loading 分级；2）网络层：HTTP 缓存、Service Worker、BFF 聚合；3）策略层：预加载、降级、超时重试。再按场景区分首屏 vs 操作反馈，并补充具体指标。',
    score: 6
  },
  {
    title: '请简单介绍一下你自己',
    originalQuestion: '请简单介绍一下你自己',
    questionType: '行为',
    typeClass: 'pill',
    answerSummary: '从教育、项目经历到求职意向做了连贯介绍。',
    pros: '时间线清晰，有 STAR 意识。',
    improveHint: '可以加 1～2 个量化结果，如「负责的模块使首屏提升 20%」。',
    optimizedAnswer:
      '用 1 分钟版本：学校/专业 + 当前角色 + 2 个与岗位最相关的项目（各用 STAR 一句话，带数字）+ 为什么投贵司。',
    score: 7
  }
])

// ⑤ 能力趋势：最近 5 场
const trendScores = ref([6.4, 6.8, 7.0, 6.6, 7.2])
const trendAverage = computed(() => {
  const arr = trendScores.value
  if (!arr.length) return '—'
  return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)
})
const abilityDims = ref([
  { name: '技术能力', value: 7.2 },
  { name: '行为能力', value: 6.8 },
  { name: '量化表达', value: 6.0 }
])

// 右侧只显示最低 2 维度（改进提示区）
const lowestTwoDimensions = computed(() => {
  return [...scoreDimensions.value].sort((a, b) => a.score - b.score).slice(0, 2)
})

function setActiveQuestion(idx: number, e: Event) {
  if ((e.target as HTMLDetailsElement).open) activeQuestionIndex.value = idx
}

const { addMaterial } = useMaterials()

function onAddToQuestionBank() {
  const ts = Date.now()
  questions.value.forEach((q, idx) => {
    addMaterial({
      id: `mat-review-${ts}-${idx}`,
      title: q.title,
      category: '面试问答',
      content: q.optimizedAnswer,
      tags: {
        role: ['通用'],
        tech: q.questionType === '技术原理' ? ['原理'] : q.questionType === '系统设计' ? ['系统设计'] : [],
        scenario: ['模拟面试', '面试复盘'],
        difficulty: q.score >= 8 ? '高' : q.score >= 6 ? '中' : '初'
      },
      versions: [
        { id: 'v1', label: '原回答', content: q.answerSummary, updatedAt: new Date().toISOString().slice(0, 10) },
        { id: 'v2', label: 'AI 优化版本', content: q.optimizedAnswer, updatedAt: new Date().toISOString().slice(0, 10) }
      ],
      useCount: 0,
      passCount: 0
    })
  })
  // 可配合 toast：已加入素材库，可在写简历 / 聊天中 @ 引用
}
function onGeneratePractice() {
  // TODO: 生成练习题
}
function onGenerateResumeParagraph() {
  // TODO: 生成改进版简历段落
}
</script>
