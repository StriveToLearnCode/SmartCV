<template>
  <div class="h-full flex flex-col bg-[var(--bg-primary)] overflow-hidden">
    <!-- 页头 -->
    <div class="shrink-0 pt-8 px-8 pb-4 border-b border-[var(--border)] bg-[var(--bg-primary)] z-10">
      <div
        class="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-4 cursor-pointer hover:text-[var(--text-primary)] transition-colors"
        @click="$router.push('/dashboard/analysis')"
      >
        <ArrowLeftIcon class="w-4 h-4" /> 返回面试统计
      </div>
      <div class="flex items-center gap-3 mb-2">
        <span class="text-4xl">🎙️</span>
        <div>
          <h1 class="text-2xl font-bold text-[var(--text-primary)]">{{ record.company }} · {{ record.round }}</h1>
          <div class="flex items-center gap-2 mt-1">
            <span class="pill label-num" :class="record.typeClass">
              {{ record.typeLabel }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容：可滚动 · 五区结构 -->
    <div class="flex-1 overflow-y-auto">
      <div class="max-w-5xl mx-auto p-8 space-y-8">
        <!-- ① 结果总览区（第一屏情绪入口） -->
        <section class="card rounded-[12px] p-6">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div class="flex items-baseline gap-3">
              <span class="num-primary text-[var(--text-primary)]">{{ overallScore }}</span>
              <span class="num-secondary text-[var(--text-secondary)]">/ 10</span>
              <span
                class="pill text-sm font-medium"
                :class="overallScore >= 7 ? '!text-[var(--text-success)] !bg-[var(--bg-green)]' : ''"
              >
                {{ overallScore >= 7 ? '通过' : overallScore >= 5 ? '待定' : '未通过' }}
              </span>
            </div>
            <div class="flex items-center gap-4 text-sm">
              <span class="text-[var(--text-secondary)]">{{ record.typeLabel }} · {{ record.round }}</span>
              <span
                v-if="scoreDiff !== null"
                class="font-medium"
                :class="scoreDiff >= 0 ? 'text-[var(--text-green)]' : 'text-[var(--text-red)]'"
              >
                比上场 {{ scoreDiff >= 0 ? '+' : '' }}{{ scoreDiff }}
              </span>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div v-for="dim in scoreDimensions" :key="dim.name" class="flex items-center gap-2">
              <div class="score-bar flex-1 min-w-0">
                <div class="score-bar-fill" :style="{ width: dim.score * 10 + '%' }" />
              </div>
              <span class="label-num text-[var(--text-secondary)] shrink-0">{{ dim.name }} {{ dim.score }}</span>
            </div>
          </div>
        </section>

        <!-- ② 核心问题区（3 条核心洞察，成长语言） -->
        <section>
          <h2 class="label-num font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">核心洞察</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="card p-4 rounded-[12px]">
              <div class="text-lg mb-2">✅</div>
              <div class="text-sm font-medium text-[var(--text-primary)] mb-1">你哪里做得好？</div>
              <p class="text-sm text-[var(--text-secondary)] leading-relaxed">{{ threeAnswers.doneWell }}</p>
            </div>
            <div class="card p-4 rounded-[12px]">
              <div class="text-lg mb-2">📌</div>
              <div class="text-sm font-medium text-[var(--text-primary)] mb-1">可以补充的方向</div>
              <p class="text-sm text-[var(--text-secondary)] leading-relaxed">{{ threeAnswers.lostPoints }}</p>
            </div>
            <div class="card p-4 rounded-[12px]">
              <div class="text-lg mb-2">🎯</div>
              <div class="text-sm font-medium text-[var(--text-primary)] mb-1">下次怎么答？</div>
              <p class="text-sm text-[var(--text-secondary)] leading-relaxed">{{ threeAnswers.nextTime }}</p>
            </div>
          </div>
        </section>

        <!-- 三个关键动作 -->
        <section class="flex flex-wrap gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
          >
            <BookmarkIcon class="w-4 h-4" /> 一键加入问题库
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
          >
            <DocumentTextIcon class="w-4 h-4" /> 生成练习题
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2383e2] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            @click="$router.push('/resume-edit')"
          >
            生成改进版简历段落
          </button>
        </section>

        <!-- ③ 逐题分析区：左侧问题列表 + 中间可折叠逐题（分析+优化合一） -->
        <section>
          <h2 class="label-num font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">逐题分析</h2>
          <div class="flex flex-col lg:flex-row gap-6">
            <!-- 左侧：问题列表 -->
            <div class="lg:w-56 shrink-0 space-y-1">
              <div
                v-for="(qa, idx) in analysisList"
                :key="idx"
                class="rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors"
                :class="
                  activeQuestionIndex === idx
                    ? 'border-[#2383e2] bg-[#2383e2]/10 text-[var(--text-primary)]'
                    : 'border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                "
                @click="activeQuestionIndex = idx"
              >
                <span class="text-[var(--text-secondary)]">Q{{ idx + 1 }}</span>
                <span class="line-clamp-2 ml-1">{{ qa.question }}</span>
                <span class="block mt-1 label-num font-medium">{{ qa.questionScore }}/10</span>
              </div>
            </div>
            <!-- 右侧：当前问题的分析 + 优化（可折叠列表也可） -->
            <div class="flex-1 min-w-0 space-y-4">
              <template v-for="(qa, idx) in analysisList" :key="idx">
                <div
                  v-show="activeQuestionIndex === idx"
                  class="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--bg-primary)]"
                >
                  <div class="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between gap-2">
                    <h3 class="text-base font-semibold text-[var(--text-primary)] truncate">{{ qa.question }}</h3>
                    <span class="px-2 py-0.5 rounded label-num shrink-0" :class="qa.typeClass">{{
                      qa.questionType
                    }}</span>
                  </div>
                  <div class="p-4 space-y-4">
                    <p class="text-sm text-[var(--text-secondary)]">{{ qa.answerSummary }}</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div class="p-3 rounded-[12px] border border-[var(--border)] bg-[var(--bg-secondary)]">
                        <div class="label-num font-medium text-[var(--text-green)] mb-1">优点</div>
                        <p class="text-sm text-[var(--text-primary)]">{{ qa.pros }}</p>
                      </div>
                      <div class="p-3 rounded-lg bg-[var(--bg-red)]/20 border border-red-500/20">
                        <div class="label-num font-medium text-[var(--text-red)] mb-1">可改进</div>
                        <p class="text-sm text-[var(--text-primary)]">{{ qa.cons }}</p>
                      </div>
                    </div>
                    <div class="flex flex-wrap gap-3 label-num text-[var(--text-secondary)]">
                      <span>结构 {{ qa.structure }}/10</span>
                      <span>逻辑 {{ qa.logic }}/10</span>
                      <span>量化 {{ qa.quantify }}/10</span>
                      <span>关键词 {{ qa.keywords }}/10</span>
                      <span class="font-semibold text-[var(--text-primary)]">本题 {{ qa.questionScore }}/10</span>
                    </div>
                    <!-- 本题优化版（直接嵌在逐题里） -->
                    <div v-if="getOptimization(qa.question)" class="pt-3 border-t border-[var(--border)]">
                      <div class="label-num font-semibold text-[var(--text-green)] uppercase tracking-wider mb-2">
                        优化版回答（可直接背）
                      </div>
                      <p class="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
                        {{ getOptimization(qa.question)?.optimizedAnswer }}
                      </p>
                      <div class="mt-2 label-num text-[var(--text-secondary)]">
                        <span class="font-medium">推荐结构：</span
                        >{{ getOptimization(qa.question)?.recommendedStructure }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </section>

        <!-- ④ 优化建议区：表达结构模板 -->
        <section class="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5">
          <h2 class="label-num font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
            推荐表达结构
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div class="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)]">
              <div class="font-medium text-[var(--text-primary)] mb-2">STAR 结构（行为/项目题）</div>
              <p class="text-[var(--text-secondary)] leading-relaxed">
                <strong>S</strong> 情境 → <strong>T</strong> 任务 → <strong>A</strong> 行动 →
                <strong>R</strong> 结果（加数字）
              </p>
            </div>
            <div class="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)]">
              <div class="font-medium text-[var(--text-primary)] mb-2">技术原理题</div>
              <p class="text-[var(--text-secondary)] leading-relaxed">
                原理 → 关键 API/机制 → 与旧方案对比 → 可补充性能/边界数据
              </p>
            </div>
          </div>
        </section>

        <!-- ⑤ 能力趋势区：最近几场表现 -->
        <section>
          <h2 class="label-num font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">能力趋势</h2>
          <div class="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5">
            <div class="flex items-end gap-2 h-16 mb-4">
              <div v-for="(v, i) in trendScores" :key="i" class="flex-1 min-w-0 flex flex-col items-center gap-1">
                <div
                  class="w-full rounded-t min-h-[4px] bg-[var(--primary)] transition-all"
                  :style="{ height: Math.max(8, v * 6) + 'px' }"
                />
                <span class="label-num text-[var(--text-secondary)]">第{{ i + 1 }}场</span>
              </div>
            </div>
            <p class="label-num text-[var(--text-secondary)]">
              最近 {{ trendScores.length }} 场面试平均分：<span class="num-secondary text-[var(--text-primary)]">{{
                trendAverage
              }}</span>
              / 10
            </p>
          </div>
        </section>

        <!-- 第四层：沉淀层 - 长期资产（个人问题库） -->
        <section>
          <h2 class="label-num font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
            第四层 · 沉淀层
          </h2>
          <p class="label-num text-[var(--text-secondary)] mb-4">
            每个问题进入个人问题库：原回答、优化回答、出现公司、是否通过 → 形成属于你的面试知识图谱。
          </p>
          <div class="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5">
            <div class="flex items-center gap-2 mb-4">
              <BookmarkIcon class="w-5 h-5 text-[var(--text-secondary)]" />
              <span class="text-sm font-medium text-[var(--text-primary)]">个人问题库</span>
            </div>
            <div class="space-y-4">
              <div
                v-for="(item, idx) in precipitationList"
                :key="idx"
                class="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] p-4 space-y-3"
              >
                <div class="font-medium text-[var(--text-primary)]">{{ item.question }}</div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <div class="label-num font-medium text-[var(--text-secondary)] mb-1">原回答</div>
                    <p class="text-[var(--text-primary)]/90 leading-relaxed line-clamp-2">{{ item.originalAnswer }}</p>
                  </div>
                  <div>
                    <div class="label-num font-medium text-[var(--text-green)] mb-1">优化回答</div>
                    <p class="text-[var(--text-primary)]/90 leading-relaxed line-clamp-2">{{ item.optimizedAnswer }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 label-num">
                  <span class="text-[var(--text-secondary)]"
                    >出现公司 · <strong class="text-[var(--text-primary)]">{{ item.company }}</strong></span
                  >
                  <span
                    class="px-1.5 py-0.5 rounded"
                    :class="
                      item.passed
                        ? 'bg-[var(--bg-green)] text-[var(--text-green)]'
                        : 'bg-[var(--bg-red)] text-[var(--text-red)]'
                    "
                  >
                    本场{{ item.passed ? '通过' : '未通过' }}
                  </span>
                </div>
              </div>
            </div>
            <p class="label-num text-[var(--text-secondary)] mt-4">
              久而久之，形成属于你的面试知识图谱，这才是护城河。
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeftIcon, BookmarkIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'

// 相比上场分数变化（可为 null 表示首场）
const scoreDiff = ref<number | null>(0.8)

// 逐题分析当前选中的题目索引
const activeQuestionIndex = ref(0)

// 能力趋势：最近 N 场分数（示例，含本场）
const trendScores = ref([6.2, 6.8, 7.0, 7.2, 7.2])
const trendAverage = computed(() => {
  const list = trendScores.value
  if (!list.length) return '0'
  return (list.reduce((a, b) => a + b, 0) / list.length).toFixed(1)
})

// 根据问题文本取对应的优化建议（逐题分析区用）
function getOptimization(question: string) {
  return optimizationList.value.find((o) => o.question === question) ?? null
}

// 记录层数据
const record = ref({
  company: '某大厂',
  round: '技术一面',
  typeLabel: '技术',
  typeClass: 'pill',
  selfRating: '整体还行，系统设计答得不好',
  questions: ['请简单介绍一下你自己', 'Vue 3 的响应式系统是如何实现的？', '如果后端接口很慢，前端如何优化用户体验？']
})

// 评分模型：5 维度 1-10
const scoreDimensions = ref([
  { name: '结构清晰度', score: 8 },
  { name: '逻辑完整度', score: 7 },
  { name: '表达流畅度', score: 8 },
  { name: '量化能力', score: 6 },
  { name: '深度', score: 7 }
])

const overallScore = computed(() => {
  const sum = scoreDimensions.value.reduce((a, d) => a + d.score, 0)
  return Math.round((sum / 5) * 10) / 10
})

// 复盘三问
const threeAnswers = ref({
  doneWell: '对 Vue 3 原理、Event Loop 解释清晰；项目描述用了 STAR，有结构。',
  lostPoints: '系统设计缺乏宏观视角；HTTP 状态码 301/302 记忆模糊。',
  nextTime: '系统设计先搭框架再细节；背熟常用状态码与缓存头。'
})

// 分析层：每问拆解
const analysisList = ref([
  {
    question: 'Vue 3 的响应式系统是如何实现的？',
    questionType: '技术原理',
    typeClass: 'pill',
    answerSummary: '用户从 Proxy、依赖收集与派发更新角度回答。',
    pros: '概念正确，能说出 Proxy 与 defineProperty 的差异。',
    cons: '未提 Reflect、WeakMap 与具体性能数据。',
    structure: 8,
    logic: 9,
    quantify: 5,
    keywords: 8,
    questionScore: 8
  },
  {
    question: '如果后端接口很慢，前端如何优化用户体验？',
    questionType: '系统设计',
    typeClass: 'pill',
    answerSummary: '提到 Loading、骨架屏、缓存。',
    pros: '有基础优化意识。',
    cons: '缺少分层（交互/网络/策略）和具体场景。',
    structure: 5,
    logic: 6,
    quantify: 4,
    keywords: 5,
    questionScore: 6
  }
])

// 优化层：具体改进
const optimizationList = ref([
  {
    question: 'Vue 3 的响应式系统是如何实现的？',
    optimizedAnswer:
      'Vue 3 用 Proxy 替代 Object.defineProperty 做响应式。在 get 里用 track 做依赖收集，在 set 里用 trigger 派发更新；配合 Reflect 保证 this 正确，用 WeakMap 存依赖避免内存泄漏。相比 Vue 2 在新增/删除属性和数组下标上更完善，性能也更好。',
    recommendedStructure: '原理 → 关键 API（Proxy/Reflect/WeakMap）→ 与 Vue 2 对比 → 可补充性能数据。',
    suggestedData: '建议增加具体指标，例如“依赖收集耗时降低约 X%”或“支持 Map/Set 等集合类型”。'
  },
  {
    question: '如果后端接口很慢，前端如何优化用户体验？',
    optimizedAnswer:
      '可以从三层说：1）交互层：骨架屏、乐观 UI、Loading 分级；2）网络层：HTTP 缓存、Service Worker、BFF 聚合接口；3）策略层：预加载、降级、超时重试。再按场景区分首屏 vs 操作反馈。',
    recommendedStructure: '分层（交互/网络/策略）→ 每层 2–3 个手段 → 结合业务场景举例。',
    suggestedData: '建议增加具体指标，例如“首屏接口 P99 从 2s 降到 800ms”或“骨架屏使感知等待时间降低约 30%”。'
  }
])

// 沉淀层：个人问题库（原回答、优化回答、出现公司、是否通过）
const precipitationList = ref([
  {
    question: 'Vue 3 的响应式系统是如何实现的？',
    originalAnswer: 'Vue 3 主要使用 Proxy。在 getter 中 track 依赖收集，在 setter 中 trigger 派发更新。',
    optimizedAnswer:
      'Vue 3 用 Proxy 替代 defineProperty，get 里 track、set 里 trigger，配合 Reflect 与 WeakMap，相比 Vue 2 更完善。',
    company: '某大厂',
    passed: true
  },
  {
    question: '如果后端接口很慢，前端如何优化用户体验？',
    originalAnswer: '加 Loading、骨架屏，然后做缓存。',
    optimizedAnswer:
      '交互层（骨架屏、乐观 UI）→ 网络层（HTTP 缓存、BFF 聚合）→ 策略层（预加载、降级），并补充具体指标。',
    company: '某大厂',
    passed: false
  }
])
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}
</style>
