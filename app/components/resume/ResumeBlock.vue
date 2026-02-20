<template>
  <div
    class="group relative pl-8 pr-4 py-2 hover:bg-[var(--bg-hover)]/40 rounded-md transition-colors border border-transparent hover:border-[var(--border)]"
    :class="{
      'opacity-50 grayscale': !modelValue.isVisible,
      'border-[var(--text-success)]': isStrongMatch
    }"
  >
    <!-- Drag Handle & Actions (Left Gutter) -->
    <div
      class="absolute left-1 top-3 opacity-0 group-hover:opacity-100 flex flex-col items-center gap-1 transition-opacity"
    >
      <div class="cursor-grab p-0.5 hover:bg-[var(--bg-hover)] rounded text-[var(--text-secondary)]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
          <path
            fill-rule="evenodd"
            d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <button @click="toggleVisibility" class="p-0.5 hover:bg-[var(--bg-hover)] rounded text-[var(--text-secondary)]">
        <EyeIcon v-if="modelValue.isVisible" class="w-4 h-4" />
        <EyeSlashIcon v-else class="w-4 h-4" />
      </button>
    </div>

    <!-- Strong Match Indicator -->
    <div v-if="isStrongMatch" class="absolute right-2 top-2">
      <span class="text-[10px] font-medium flex items-center gap-1 pill">
        <SparklesIcon class="w-3 h-3" /> JD Match
      </span>
    </div>

    <!-- Content Area -->
    <div class="relative">
      <!-- Block Header + 系统提示点（🔵 匹配度高 🟡 可优化） -->
      <div class="flex items-baseline justify-between mb-1 flex-wrap gap-x-2 gap-y-1">
        <div class="flex items-center gap-1.5 min-w-0 flex-1">
          <input
            v-model="modelValue.title"
            class="bg-transparent font-bold text-lg text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)] w-full min-w-0"
            :placeholder="titlePlaceholder"
          />
          <span v-if="matchHint" class="shrink-0 text-[10px] text-[var(--text-blue)] whitespace-nowrap">匹配度高</span>
          <span v-if="optimizeHint" class="shrink-0 text-[10px] text-[#D97706] whitespace-nowrap">可优化</span>
        </div>
        <div class="relative group/version ml-2 shrink-0">
          <button
            class="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[var(--bg-hover)] transition-colors"
          >
            <ClockIcon class="w-3 h-3" />
            <span>v1.0</span>
          </button>
        </div>
      </div>
      <!-- 系统来源标识：来自素材库 / 复盘优化 / AI 建议 -->
      <div v-if="sourceLabel" class="flex items-center gap-1 mb-1.5 text-[10px] text-[#9CA3AF]">
        <component :is="sourceIcon" class="w-3 h-3 shrink-0" />
        <span>{{ sourceLabel }}</span>
      </div>

      <div class="flex items-center justify-between mb-2">
        <input
          v-model="modelValue.subtitle"
          class="bg-transparent text-sm text-[var(--text-secondary)] outline-none w-full font-medium"
          :placeholder="subtitlePlaceholder"
        />
        <input
          v-model="modelValue.date"
          class="bg-transparent text-sm text-[#9CA3AF] outline-none text-right w-32 font-mono"
          placeholder="2023 - Present"
        />
      </div>

      <!-- Rich Text / Bullet Points -->
      <div
        contenteditable="true"
        class="text-sm text-[var(--text-primary)] leading-relaxed outline-none min-h-[20px] empty:before:content-[attr(placeholder)] empty:before:text-[var(--text-secondary)]/50"
        :placeholder="contentPlaceholder"
        @input="updateContent"
        v-html="modelValue.content"
      ></div>

      <!-- AI Tools (Contextual) -->
      <div class="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          @click="$emit('ai-action', 'star')"
          class="text-[10px] flex items-center gap-1 px-2 py-1 rounded bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <SparklesIcon class="w-3 h-3" /> STAR 优化
        </button>
        <button
          @click="$emit('ai-action', 'quantify')"
          class="text-[10px] flex items-center gap-1 px-2 py-1 rounded bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ChartBarIcon class="w-3 h-3" /> 数字化建议
        </button>
        <button
          @click="$emit('ai-action', 'action-verb')"
          class="text-[10px] flex items-center gap-1 px-2 py-1 rounded bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <BoltIcon class="w-3 h-3" /> 动词增强
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  EyeIcon,
  EyeSlashIcon,
  ClockIcon,
  SparklesIcon,
  ChartBarIcon,
  BoltIcon,
  FolderIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

export interface BlockData {
  id: string
  type: 'experience' | 'project' | 'education' | 'skill' | 'summary'
  title: string
  subtitle: string
  date: string
  content: string
  isVisible: boolean
  tags: string[]
  /** 系统来源：素材库 / 复盘优化 / AI 建议 */
  source?: 'material' | 'review' | 'ai'
}

const props = defineProps<{
  modelValue: BlockData
  isStrongMatch?: boolean
  /** 标题旁轻提示：匹配度高 */
  matchHint?: boolean
  /** 标题旁轻提示：可优化 */
  optimizeHint?: boolean
  /** 覆盖 modelValue.source 用于展示 */
  source?: 'material' | 'review' | 'ai'
}>()

const emit = defineEmits(['update:modelValue', 'ai-action'])

const toggleVisibility = () => {
  const updated = { ...props.modelValue, isVisible: !props.modelValue.isVisible }
  emit('update:modelValue', updated)
}

const updateContent = (e: Event) => {
  const target = e.target as HTMLElement
  emit('update:modelValue', { ...props.modelValue, content: target.innerHTML })
}

const titlePlaceholder = computed(() => {
  switch (props.modelValue.type) {
    case 'experience':
      return 'Job Title'
    case 'project':
      return 'Project Name'
    case 'education':
      return 'School / Degree'
    default:
      return 'Title'
  }
})

const subtitlePlaceholder = computed(() => {
  switch (props.modelValue.type) {
    case 'experience':
      return 'Company | Location'
    case 'project':
      return 'Tech Stack | Role'
    case 'education':
      return 'Major | GPA'
    default:
      return 'Subtitle'
  }
})

const contentPlaceholder = computed(() => {
  return "Type '/' for commands or paste your bullet points..."
})

const source = computed(() => props.source ?? props.modelValue.source)

const sourceLabel = computed(() => {
  if (!source.value) return ''
  const map = { material: '来自素材库', review: '来自复盘优化', ai: 'AI 建议修改' } as const
  return map[source.value]
})

const sourceIcon = computed(() => {
  if (!source.value) return FolderIcon
  const map = {
    material: FolderIcon,
    review: ArrowPathIcon,
    ai: SparklesIcon
  } as const
  return map[source.value]
})
</script>
