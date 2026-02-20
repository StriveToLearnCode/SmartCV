<template>
  <div
    v-if="job"
    class="job-detail-drawer fixed inset-y-0 right-0 w-[600px] z-50 border-l border-[var(--border)] flex flex-col shadow-drawer drawer-bg"
  >
    <!-- Header：关闭 + 公司名 -->
    <div class="h-14 border-b border-[var(--border)] flex items-center justify-between px-6 shrink-0">
      <div class="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
        <button type="button" class="hover:text-[var(--text-primary)] transition-colors" @click="$emit('close')">
          <ChevronDoubleRightIcon class="w-5 h-5" />
        </button>
        <span class="mx-1">/</span>
        <span>{{ job.company }}</span>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto px-8 py-8">
      <!-- 1️⃣ 基本信息区：标题 600 + meta 两行 + 右上 icon-only hover 淡入 -->
      <section class="title-block mb-6 group/title relative">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0 flex-1">
            <div v-if="job.icon" class="text-2xl mb-2 opacity-80">{{ job.icon }}</div>
            <h1 class="title-heading text-[28px] font-semibold text-[var(--text-primary)] leading-tight tracking-tight">
              {{ job.title }}
            </h1>
            <div class="mt-3 space-y-1.5">
              <div class="text-[13px] text-[var(--text-primary)]">{{ job.company }}</div>
              <div class="flex flex-wrap items-center gap-2 text-[13px] text-[var(--text-secondary)]">
                <span>📅 {{ formatDateDisplay(job.date ?? '') }}</span>
                <span
                  v-if="stageLabel"
                  class="status-badge inline-flex items-center px-2 py-0.5 rounded-md bg-[var(--bg-hover)] text-[12px]"
                >
                  {{ stageLabel }}
                </span>
                <span v-if="stageLabel && job.priority === 'high'" class="text-[var(--border)] text-[12px]">|</span>
                <span
                  v-if="job.priority === 'high'"
                  class="priority-badge inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[12px] bg-[var(--text-red)]/10 text-[var(--text-red)]"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-[var(--text-red)] shrink-0" aria-hidden="true" />
                  高优先级
                </span>
              </div>
            </div>
          </div>
          <div
            class="title-actions flex items-center gap-0.5 shrink-0 opacity-40 transition-opacity duration-150 group-hover/title:opacity-100"
          >
            <button
              type="button"
              class="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors"
              title="编辑"
            >
              <PencilSquareIcon class="w-4 h-4" />
            </button>
            <button
              type="button"
              class="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors"
              title="删除"
            >
              <TrashIcon class="w-4 h-4" />
            </button>
            <button
              type="button"
              class="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors"
              title="复制链接"
            >
              <LinkIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <!-- 2️⃣ JD 输入区：1px 虚线 40% 色 + hover/focus 动效 + padding 20–24 -->
      <section class="mb-5">
        <div class="flex items-center justify-between mb-2">
          <h3 class="section-title text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
            Job Description
          </h3>
          <div class="flex items-center gap-2 text-[12px]">
            <button type="button" class="text-[var(--primary)] hover:underline" @click="pasteJD">粘贴</button>
            <span class="text-[var(--border)]">|</span>
            <button type="button" class="text-[var(--text-secondary)] hover:underline" @click="clearJD">清空</button>
          </div>
        </div>
        <textarea
          :value="modelValue"
          class="jd-input w-full min-h-[160px] px-5 py-6 rounded-xl border border-dashed text-sm text-[var(--text-primary)] placeholder:text-[var(--text-dim)] focus:outline-none transition-all duration-150 resize-none"
          placeholder="粘贴职位描述（JD）&#10;或拖入 PDF / 文本文件"
          @input="onJdInput($event)"
        />
        <div class="jd-hints flex flex-wrap gap-x-6 gap-y-1.5 mt-3 text-[13px] text-[var(--text-secondary)]">
          <span class="flex items-center gap-1.5"><span class="text-[10px] opacity-80">✓</span> 自动提取关键词</span>
          <span class="flex items-center gap-1.5"><span class="text-[10px] opacity-80">✓</span> 匹配度评分</span>
          <span class="flex items-center gap-1.5"><span class="text-[10px] opacity-80">✓</span> 优化建议</span>
        </div>
      </section>

      <!-- 3️⃣ 信息提示条：浅蓝底 + 左竖条主色 -->
      <section
        class="info-tip mb-5 rounded-r-lg border-l-[3px] border-l-[var(--primary)] bg-[var(--primary)]/5 px-4 py-3 flex items-start gap-2"
      >
        <InformationCircleIcon class="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
        <p class="text-[13px] text-[var(--text-secondary)] leading-relaxed">
          粘贴 JD 后点击「开始匹配分析」，将基于当前简历生成匹配度与优化建议。
        </p>
      </section>

      <!-- 4️⃣ 主 CTA（max-w 480 居中 + hover 上浮 shadow）+ 次 CTA + 历史链接 -->
      <section class="mb-4 flex flex-col items-center gap-3">
        <button
          type="button"
          class="btn-primary w-full max-w-[400px] h-11 px-6 rounded-[10px] text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2 group"
          :disabled="!modelValue?.trim() || loading"
          @click="$emit('analyze')"
        >
          <SparklesIcon v-if="!loading" class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          <span
            v-if="loading"
            class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"
          />
          <span>{{ loading ? '分析中…' : '开始匹配分析' }}</span>
        </button>
        <div class="flex flex-wrap items-center justify-center gap-2 text-[13px]">
          <button
            type="button"
            class="btn-secondary text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] px-3 py-2 rounded-[10px] transition-colors"
            @click="$emit('useLastJd')"
          >
            使用上次 JD
          </button>
          <span class="text-[var(--text-dim)]">或</span>
          <button type="button" class="text-[var(--primary)] hover:underline" @click="$emit('historyJd')">
            历史 JD
          </button>
        </div>
      </section>

      <!-- 5️⃣ 结果区：有结果展示卡片 / 未分析时骨架条占位 -->
      <section class="mb-6">
        <h3 class="section-title text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
          分析结果
        </h3>
        <div
          v-if="matchResult"
          class="result-card card rounded-xl p-6 animate-fade-in border border-[var(--border)] mt-4"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div
                class="score-ball w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-lg"
              >
                {{ matchResult.score }}
              </div>
              <div>
                <div class="text-sm font-bold text-[var(--text-primary)]">简历匹配度分析</div>
                <div
                  class="meta-row flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[var(--text-secondary)] mt-0.5"
                >
                  <span v-if="matchResult.analyzedAt">{{ matchResult.analyzedAt }}</span>
                  <span v-if="matchResult.resumeVersion">基于 {{ matchResult.resumeVersion }}</span>
                  <span v-if="!matchResult.analyzedAt && !matchResult.resumeVersion">基于当前简历版本</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              class="btn-optimize text-xs border border-[var(--border)] bg-transparent text-[var(--text-primary)] px-3 py-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors flex items-center gap-1"
              @click="$emit('goOptimize')"
            >
              <span>去优化简历</span>
              <ArrowRightIcon class="w-3 h-3" />
            </button>
          </div>
          <div class="space-y-3">
            <div v-if="matchResult.missingSkills?.length">
              <div class="text-xs font-semibold text-[var(--text-red)] mb-1.5">❌ 缺失技能</div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="skill in matchResult.missingSkills"
                  :key="skill"
                  class="pill-missing text-xs px-2 py-1 rounded-md"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
            <div v-if="matchResult.goodMatch?.length">
              <div class="text-xs font-semibold text-[var(--text-green)] mb-1.5 mt-2">✅ 匹配亮点</div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="skill in matchResult.goodMatch"
                  :key="skill"
                  class="pill-match text-xs px-2 py-1 rounded-md"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
            <template v-if="showDetail">
              <div class="detail-block pt-2 border-t border-[var(--border)]">
                <div class="text-[11px] text-[var(--text-dim)]">完整关键词对比将在此展示</div>
              </div>
            </template>
            <button
              type="button"
              class="text-[11px] text-[var(--primary)] hover:underline mt-1"
              @click="showDetail = !showDetail"
            >
              {{ showDetail ? '收起详情' : '查看详情' }}
            </button>
          </div>
        </div>
        <div
          v-else
          class="result-placeholder rounded-xl border border-dashed border-[var(--border)]/60 bg-[var(--bg-secondary)]/50 px-5 py-6 min-h-[140px] flex flex-col justify-center mt-4"
        >
          <div class="flex flex-col items-center gap-3 text-center">
            <DocumentMagnifyingGlassIcon class="w-8 h-8 text-[var(--text-dim)]" />
            <p class="text-[13px] text-[var(--text-secondary)]">分析结果将在此展示</p>
            <div class="w-full max-w-[280px] space-y-2 text-left">
              <div class="skeleton-line flex items-center gap-2 text-[12px] text-[var(--text-dim)]">
                <span class="w-20 shrink-0">匹配度：</span>
                <span class="flex-1 h-3 rounded bg-[var(--border)]/50">——</span>
              </div>
              <div class="skeleton-line flex items-center gap-2 text-[12px] text-[var(--text-dim)]">
                <span class="w-20 shrink-0">关键词缺口：</span>
                <span class="flex-1 h-3 rounded bg-[var(--border)]/50">——</span>
              </div>
              <div class="skeleton-line flex items-center gap-2 text-[12px] text-[var(--text-dim)]">
                <span class="w-20 shrink-0">优化建议：</span>
                <span class="flex-1 h-3 rounded bg-[var(--border)]/50">——</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ChevronDoubleRightIcon,
  SparklesIcon,
  ArrowRightIcon,
  LinkIcon,
  PencilSquareIcon,
  TrashIcon,
  InformationCircleIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/vue/24/outline'

export interface JobDetailJob {
  id: string
  title: string
  company: string
  city?: string
  date: string
  priority?: 'high' | 'medium' | 'low'
  icon?: string
  stageId?: string
}

export interface MatchResult {
  score: number
  missingSkills: string[]
  goodMatch: string[]
  /** 分析时间，用于展示「分析于 X 分钟前」 */
  analyzedAt?: string
  /** 简历版本，用于展示「基于简历 v3」 */
  resumeVersion?: string
}

const props = defineProps<{
  job: JobDetailJob | null
  modelValue: string
  matchResult: MatchResult | null
  loading: boolean
}>()

const emit = defineEmits<{
  close: []
  'update:modelValue': [value: string]
  analyze: []
  useLastJd: []
  historyJd: []
  goOptimize: []
}>()

const stageLabels: Record<string, string> = {
  applied: '已投递',
  screening: '筛选中',
  interview: '面试中',
  offer: 'Offer'
}

const stageLabel = computed(() => (props.job?.stageId ? (stageLabels[props.job.stageId] ?? '') : ''))
const showDetail = ref(false)

function formatDateDisplay(dateStr: string): string {
  const m: Record<string, string> = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12'
  }
  const parts = dateStr.trim().split(/\s+/)
  const monthKey = parts[0]
  const month = monthKey ? m[monthKey] : undefined
  const day = parts[1]
  if (month && day) return `2024.${month}.${day.padStart(2, '0')}`
  return dateStr
}

async function pasteJD() {
  try {
    const t = await navigator.clipboard?.readText()
    if (t != null) emit('update:modelValue', t)
  } catch {}
}
function clearJD() {
  emit('update:modelValue', '')
}

function onJdInput(e: Event) {
  const t = e.target as HTMLTextAreaElement
  if (t) emit('update:modelValue', t.value)
}
</script>

<style scoped>
.shadow-drawer {
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.04);
}
.drawer-bg {
  background: #fafbfc;
}
@media (prefers-color-scheme: dark) {
  .drawer-bg {
    background: var(--bg-primary);
  }
}

.title-heading {
  letter-spacing: -0.02em;
}

.section-title {
  letter-spacing: 0.06em;
}

/* JD 输入：虚线更淡，hover 轻微背景变化，focus 蓝色外发光 */
.jd-input {
  border: 1px dashed rgba(55, 53, 47, 0.12);
  background: var(--bg-secondary);
}
.jd-input:hover {
  border-color: rgba(55, 53, 47, 0.2);
  background: var(--bg-primary);
}
.jd-input:focus {
  border: 1px solid var(--primary);
  background: var(--bg-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

/* 主按钮：hover 上浮+阴影，active 缩小 */
.btn-primary {
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background-color 0.15s ease;
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.45);
}
.btn-primary:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

/* 分数球：渐变 + 外发光 */
.score-ball {
  background: linear-gradient(135deg, #4f7cff, #3a5dff);
  box-shadow: 0 8px 20px rgba(79, 124, 255, 0.25);
}

/* 缺失技能：浅红底 + 红字 */
.pill-missing {
  background: rgba(220, 53, 69, 0.12);
  color: var(--text-red);
}

/* 匹配亮点：浅绿底 + 深绿字 */
.pill-match {
  background: rgba(34, 197, 94, 0.12);
  color: var(--text-green);
}
</style>
