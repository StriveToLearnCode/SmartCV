<template>
  <div class="resume-edit-page h-full flex flex-col bg-white text-[#111] relative">
    <!-- Top Bar：纯白、无灰栏 -->
    <div class="shrink-0 h-11 flex items-center justify-between px-4 bg-white z-20">
      <div class="flex items-center gap-3 text-sm">
        <button @click="$router.back()" class="p-1 rounded text-[#6B7280] hover:text-[#111] transition-colors">
          <ChevronLeftIcon class="w-4 h-4" />
        </button>
        <button @click="showMaterialDrawer = true" class="px-2 py-1 text-[#6B7280] hover:text-[#111] transition-colors">
          素材
        </button>
        <input v-model="resumeTitle" class="bg-transparent font-medium outline-none w-48 text-[#111]" />
        <div
          v-if="optimizationContext === 'jd'"
          class="flex items-center gap-2 px-2 py-0.5 text-xs text-[var(--text-blue)]"
        >
          <BriefcaseIcon class="w-3.5 h-3.5" />
          <span>Targeting: Senior Frontend @ ByteDance</span>
          <button class="hover:opacity-80"><XMarkIcon class="w-3 h-3" /></button>
        </div>
      </div>

      <div class="flex items-center gap-2 text-sm">
        <span class="text-[#6B7280] flex items-center gap-1"><CloudArrowUpIcon class="w-3.5 h-3.5" /> 已保存</span>
        <span class="text-[var(--border)]">|</span>
        <button
          type="button"
          class="px-2 py-1 text-[#6B7280] hover:text-[#111] transition-colors"
          @click="showTemplateDrawer = true"
        >
          模板
        </button>
        <span class="text-[#9CA3AF]">·</span>
        <button type="button" class="px-2 py-1 text-[#6B7280] hover:text-[#111] transition-colors">版本</button>
        <span class="text-[#9CA3AF]">·</span>
        <button type="button" class="px-2 py-1 text-[#6B7280] hover:text-[#111] transition-colors">导出</button>
      </div>
    </div>

    <!-- 顶部状态条（关键）：JD 匹配度 + ATS + 优化建议，三系统联动，点开展开浮层；滚动时闪动 -->
    <div
      class="status-bar shrink-0 px-4 py-2.5 flex items-center justify-center gap-3 text-xs text-[#6B7280] cursor-pointer hover:text-[var(--text-blue)] transition-colors"
      :class="{ 'status-bar-flash': statusBarFlash }"
      @click="showAIPanel = true"
    >
      <span class="font-medium text-[var(--text-blue)] flex items-center gap-0.5">
        JD 匹配度 {{ displayMatchPct }}%
        <ArrowTrendingUpIcon class="w-3.5 h-3.5" />
      </span>
      <span>·</span>
      <span
        >ATS <span class="font-medium text-[var(--text-green)]">{{ atsPct }}%</span></span
      >
      <span>·</span>
      <span>{{ suggestionCount }} 条优化建议</span>
    </div>

    <!-- Main: 纯白舞台，中间悬浮纸 -->
    <div ref="scrollAreaRef" class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-white" @click="focusEditor">
      <div class="max-w-[820px] mx-auto my-10">
        <!-- 悬浮纸：微阴影、圆角 8px -->
        <div class="resume-paper rounded-lg min-h-[1100px] flex flex-col relative bg-white px-12 py-10">
          <!-- 名字：40px、更大胆、更靠左 -->
          <div class="pb-8">
            <h1 contenteditable="true" class="text-[40px] font-bold text-[#111] mb-2 outline-none leading-tight">
              张三
            </h1>
            <div class="flex flex-wrap gap-3 text-sm text-[#6B7280]">
              <span contenteditable>zhangsan@email.com</span> • <span contenteditable>138-0000-0000</span> •
              <span contenteditable>github.com/zhangsan</span>
            </div>
          </div>

          <!-- Section：字重+间距；来源关联（素材库·使用次数·成功率） -->
          <div class="space-y-10 flex-1">
            <section class="space-y-3">
              <h2 class="text-base font-semibold text-[#111]">Summary</h2>
              <ResumeBlock
                v-model="summaryBlock"
                :match-hint="false"
                :optimize-hint="false"
                @ai-action="(type) => handleAiAction(summaryBlock, type)"
              />
            </section>

            <section ref="experienceSectionRef" class="space-y-3">
              <div class="flex justify-between items-center">
                <div>
                  <h2 class="text-base font-semibold text-[#111]">Experience</h2>
                  <p class="text-[10px] text-[#9CA3AF] mt-0.5">来源：素材库 · 使用 8 次 · 成功率 63%</p>
                </div>
                <button class="text-[#6B7280] hover:text-[#111] p-0.5"><PlusIcon class="w-4 h-4" /></button>
              </div>
              <div class="space-y-4">
                <ResumeBlock
                  v-for="(block, idx) in experienceBlocks"
                  :key="block.id"
                  v-model="experienceBlocks[idx]"
                  :is-strong-match="checkMatch(block)"
                  :match-hint="checkMatch(block)"
                  :optimize-hint="!checkMatch(block)"
                  :source="block.source"
                  @ai-action="(type) => handleAiAction(block, type)"
                />
              </div>
            </section>

            <section ref="projectsSectionRef" class="space-y-3">
              <div class="flex justify-between items-center">
                <div>
                  <h2 class="text-base font-semibold text-[#111]">Projects</h2>
                  <p class="text-[10px] text-[#9CA3AF] mt-0.5">来源：素材库 · 使用 5 次 · 成功率 71%</p>
                </div>
              </div>
              <div class="space-y-4">
                <ResumeBlock
                  v-for="(block, idx) in projectBlocks"
                  :key="block.id"
                  v-model="projectBlocks[idx]"
                  :is-strong-match="checkMatch(block)"
                  :match-hint="checkMatch(block)"
                  :optimize-hint="true"
                  :source="block.source"
                  @ai-action="(type) => handleAiAction(block, type)"
                />
              </div>
            </section>
          </div>

          <div
            v-if="isDragging"
            class="absolute inset-0 bg-[var(--text-blue)]/5 border-2 border-dashed border-[var(--text-blue)] rounded-lg pointer-events-none z-10 flex items-center justify-center"
          >
            <span class="text-[var(--text-blue)] font-medium text-sm">Drop block here to add to resume</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 左侧抽屉：素材库，半透明遮罩，默认关闭 -->
    <Teleport to="body">
      <transition name="drawer">
        <div v-if="showMaterialDrawer" class="fixed inset-0 z-50 flex">
          <div class="drawer-overlay absolute inset-0 bg-black/20" @click="showMaterialDrawer = false" />
          <div class="drawer-panel relative w-64 bg-white border border-[var(--border)] flex flex-col" @click.stop>
            <div class="py-2.5 px-3 flex justify-between items-center border-b border-[#E5E7EB]">
              <span class="text-xs font-medium text-[#111]">素材库</span>
              <button @click="showMaterialDrawer = false" class="text-[#6B7280] hover:text-[#111] p-1">
                <XMarkIcon class="w-4 h-4" />
              </button>
            </div>
            <div class="flex-1 overflow-y-auto px-2 py-2 space-y-2">
              <div v-for="category in assetCategories" :key="category.name">
                <div class="px-1.5 py-0.5 text-[10px] text-[#6B7280]">{{ category.name }}</div>
                <div class="space-y-0">
                  <div
                    v-for="item in category.items"
                    :key="item.id"
                    draggable="true"
                    @dragstart="onDragStart($event, item)"
                    class="px-2 py-1.5 rounded cursor-grab text-[12px] text-[#111] truncate hover:bg-[#F2F2F2] transition-colors"
                  >
                    {{ item.title }}
                  </div>
                </div>
              </div>
            </div>
            <div class="py-2.5 px-3 border-t border-[#E5E7EB]">
              <div class="flex justify-between items-end mb-0.5">
                <span class="text-[10px] text-[#6B7280]">ATS</span>
                <span class="text-xs font-semibold text-[var(--text-green)]">85%</span>
              </div>
              <div class="w-full bg-[#E5E7EB] h-0.5 rounded-full overflow-hidden">
                <div class="h-full rounded-full bg-[var(--text-success)]" style="width: 85%"></div>
              </div>
              <div class="mt-1 text-[10px] text-[#6B7280]">Missing: GraphQL, Docker</div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- 右侧抽屉：选择模板（模板 · 版本 · 导出 → 模板） -->
    <Teleport to="body">
      <transition name="slide-right">
        <div
          v-if="showTemplateDrawer"
          class="fixed top-0 right-0 bottom-0 w-[320px] bg-white z-[60] flex flex-col border-l border-[var(--border)]"
        >
          <div class="shrink-0 flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <h2 class="text-sm font-semibold text-[var(--text-primary)]">选择模板</h2>
            <button
              type="button"
              class="p-2 rounded hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]"
              aria-label="关闭"
              @click="showTemplateDrawer = false"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            <div class="space-y-3">
              <label
                v-for="opt in templateOptions"
                :key="opt.id"
                class="flex items-start gap-3 p-3 rounded-[12px] border cursor-pointer transition-colors"
                :class="
                  selectedTemplateId === opt.id
                    ? 'border-[var(--primary)] border-l-4'
                    : 'border-[var(--border)] hover:bg-[var(--bg-hover)]'
                "
                @click="selectedTemplateId = opt.id"
              >
                <span
                  class="mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                  :class="
                    selectedTemplateId === opt.id
                      ? 'border-[var(--primary)] bg-[var(--primary)]'
                      : 'border-[var(--border)]'
                  "
                >
                  <span v-if="selectedTemplateId === opt.id" class="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
                <div class="min-w-0 flex-1">
                  <span class="text-sm font-medium text-[var(--text-primary)]">{{ opt.name }}</span>
                  <span v-if="opt.isDefault" class="text-xs text-[var(--text-secondary)] ml-1">默认</span>
                  <!-- 预览缩略图占位 -->
                  <div
                    class="mt-2 h-16 rounded border border-[var(--border)] bg-[var(--bg-secondary)] flex items-center justify-center text-[10px] text-[var(--text-dim)]"
                  >
                    {{ opt.previewLabel }}
                  </div>
                </div>
              </label>
            </div>
            <button
              type="button"
              class="w-full py-2.5 text-sm font-medium text-white rounded-[12px] bg-[var(--primary)] hover:opacity-90 transition-opacity"
              @click="applyTemplate"
            >
              应用模板
            </button>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- 右侧浮层：智能分析，点顶部状态条展开，无底部输入框 -->
    <Teleport to="body">
      <transition name="slide-right">
        <div
          v-if="showAIPanel"
          class="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-40 flex flex-col border-l border-[var(--border)]"
        >
          <div class="h-11 flex items-center justify-between px-3 border-b border-[#E5E7EB]">
            <span class="text-xs font-medium text-[#111]">匹配度 78%</span>
            <button @click="showAIPanel = false" class="text-[#6B7280] hover:text-[#111] p-1">
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-4 space-y-6">
            <div class="w-full bg-[#E5E7EB] h-1 rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-[var(--primary)]" style="width: 78%"></div>
            </div>
            <div>
              <div class="text-[10px] font-medium text-[#6B7280] mb-2">建议</div>
              <ul class="space-y-2 text-sm text-[#111]">
                <li class="flex items-start gap-2">
                  <span class="text-[var(--text-green)] mt-0.5">·</span>
                  <span>上移 <strong>Enterprise SaaS</strong></span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-[var(--text-green)] mt-0.5">·</span>
                  <span>强调 <strong>Vue3 性能优化</strong></span>
                </li>
              </ul>
            </div>
            <div v-if="activeAiTask" class="p-2.5 border border-[#E5E7EB] rounded-md">
              <div class="flex items-center gap-1.5 mb-1.5 text-[var(--text-blue)] text-[11px] font-medium">
                <BoltIcon class="w-3 h-3" /> 处理中
              </div>
              <p class="text-xs text-[#111] mb-2">{{ activeAiTask.prompt }}</p>
              <div class="p-1.5 bg-[#F9FAFB] rounded text-[11px] text-[#6B7280] mb-2 min-h-8">
                {{ activeAiTask.context }}
              </div>
              <div class="flex gap-1.5">
                <button class="flex-1 bg-[var(--text-blue)] text-white text-[11px] py-1.5 rounded hover:opacity-90">
                  应用
                </button>
                <button @click="activeAiTask = null" class="px-2 text-[#6B7280] hover:text-[#111] text-[11px] py-1.5">
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import ResumeBlock, { BlockData } from '@/app/components/resume/ResumeBlock.vue'
import {
  ChevronLeftIcon,
  CloudArrowUpIcon,
  BriefcaseIcon,
  XMarkIcon,
  PlusIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  AcademicCapIcon,
  CodeBracketIcon
} from '@heroicons/vue/24/outline'

import { useAiEngine } from '@/app/composables/useAiEngine'

const route = useRoute()
const showAIPanel = ref(false)
const showMaterialDrawer = ref(false)
const showTemplateDrawer = ref(false)

/** 模板选项（展示方式，非内容） */
const templateOptions = [
  { id: 'minimal', name: '极简', isDefault: true, previewLabel: '极简预览' },
  { id: 'professional', name: '专业', isDefault: false, previewLabel: '专业预览' },
  { id: 'tech', name: '技术风', isDefault: false, previewLabel: '技术风预览' },
  { id: 'two-column', name: '双栏', isDefault: false, previewLabel: '双栏预览' }
]
const selectedTemplateId = ref('minimal')

function applyTemplate() {
  // 后续可在此切换简历纸样式 class / 布局
  showTemplateDrawer.value = false
}
const resumeTitle = ref('我的简历 2026 - Master')
const aiNotifications = ref(1)
const isDragging = ref(false)
const activeAiTask = ref<{ prompt: string; context: string } | null>(null)

// 顶部状态条：三系统联动 + 滚动触发动效
const displayMatchPct = ref(78)
const atsPct = ref(85)
const suggestionCount = ref(2)
const statusBarFlash = ref(false)
const scrollAreaRef = ref<HTMLElement | null>(null)
const projectsSectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
let flashTimeout: ReturnType<typeof setTimeout> | null = null

const { isAnalyzing, optimizeText, analyzeMatch } = useAiEngine()

// --- Mock Data: Blocks ---
const summaryBlock = ref<BlockData>({
  id: 'sum-1',
  type: 'summary',
  title: 'Professional Summary',
  subtitle: '',
  date: '',
  content: '3 years of frontend experience, specializing in Vue 3 and Engineering.',
  isVisible: true,
  tags: ['Frontend', 'Vue', 'General']
})

const experienceBlocks = ref<BlockData[]>([
  {
    id: 'exp-1',
    type: 'experience',
    title: 'Senior Frontend Engineer',
    subtitle: 'Tech Corp | Beijing',
    date: '2024.01 - Present',
    content:
      '<ul><li>Led the migration from Vue 2 to Vue 3, improving render performance by 50%.</li><li>Mentored 3 junior developers.</li></ul>',
    isVisible: true,
    tags: ['Vue 3', 'Performance', 'Leadership'],
    source: 'material'
  },
  {
    id: 'exp-2',
    type: 'experience',
    title: 'Frontend Developer',
    subtitle: 'Startup Inc | Hangzhou',
    date: '2022.06 - 2023.12',
    content:
      '<ul><li>Built the company website from scratch using Nuxt.js.</li><li>Implemented responsive design for mobile users.</li></ul>',
    isVisible: true,
    tags: ['Nuxt', 'Responsive', '0-1'],
    source: 'review'
  }
])

const projectBlocks = ref<BlockData[]>([
  {
    id: 'proj-1',
    type: 'project',
    title: 'Enterprise SaaS Platform',
    subtitle: 'Vue 3, TypeScript, WebSocket',
    date: '2023',
    content:
      '<ul><li>Designed a block-based editor similar to Notion.</li><li>Handled real-time collaboration using CRDT algorithms.</li></ul>',
    isVisible: true,
    tags: ['Complex System', 'WebSockets', 'Strong Match'],
    source: 'ai'
  }
])

// --- Mock Data: Asset Library ---
const assetCategories = [
  {
    name: 'Experience',
    icon: BriefcaseIcon,
    items: [
      { id: 'h-1', title: 'Internship @ ByteDance' },
      { id: 'h-2', title: 'Freelance Web Dev' }
    ]
  },
  {
    name: 'Projects',
    icon: CodeBracketIcon,
    items: [
      { id: 'p-3', title: 'E-commerce Dashboard' },
      { id: 'p-4', title: 'AI Chatbot Wrapper' }
    ]
  },
  {
    name: 'Education',
    icon: AcademicCapIcon,
    items: [{ id: 'e-1', title: 'BS Computer Science' }]
  }
]

// --- Logic ---

const optimizationContext = computed(() => route.query.context as string)

// Simulate JD matching logic
const checkMatch = (block: BlockData) => {
  if (optimizationContext.value !== 'jd') return false
  // Mock logic: if block has 'Performance' or 'Complex System', it's a match
  return block.tags.includes('Performance') || block.tags.includes('Complex System') || block.tags.includes('Vue 3')
}

const focusEditor = () => {}

// 滚动到 Projects 时：顶部匹配度轻微闪动更新，让系统“活着”
onMounted(() => {
  const root = scrollAreaRef.value
  const el = projectsSectionRef.value
  if (!root || !el) return
  observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting) return
      if (flashTimeout) clearTimeout(flashTimeout)
      statusBarFlash.value = true
      displayMatchPct.value = 82
      flashTimeout = setTimeout(() => {
        displayMatchPct.value = 78
        statusBarFlash.value = false
        flashTimeout = null
      }, 800)
    },
    { root, threshold: 0.2 }
  )
  observer.observe(el)
})
onUnmounted(() => {
  if (flashTimeout) clearTimeout(flashTimeout)
  observer?.disconnect()
})

const handleAiAction = async (block: BlockData, type: string) => {
  showAIPanel.value = true
  let prompt = ''
  let optimizedContent = ''

  if (type === 'star') prompt = 'Rewrite this bullet point using the STAR method.'
  if (type === 'quantify') prompt = 'Add quantifiable metrics to this achievement.'
  if (type === 'action-verb') prompt = 'Replace weak verbs with strong action verbs.'

  // Show "Analyzing" state in UI (simulated by isAnalyzing from composable)
  activeAiTask.value = {
    prompt: 'AI is thinking...',
    context: 'Please wait...'
  }

  // Call Engine
  optimizedContent = await optimizeText({ text: block.content, type: type as any })

  activeAiTask.value = {
    prompt,
    context: optimizedContent // In real app, show diff or result
  }
}

const onDragStart = (event: DragEvent, item: any) => {
  isDragging.value = true
  // Logic to handle drag data
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
    event.dataTransfer.effectAllowed = 'copy'
    event.dataTransfer.setData('application/json', JSON.stringify(item))
  }
}

// In a real app, we would add drop listeners to the container
</script>

<style scoped>
.resume-paper {
  border: 1px solid var(--border);
  border-radius: 12px;
}

.drawer-enter-active .drawer-overlay,
.drawer-leave-active .drawer-overlay {
  transition: opacity 0.2s ease;
}
.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel {
  transition: transform 0.25s ease;
}
.drawer-enter-from .drawer-overlay,
.drawer-leave-to .drawer-overlay {
  opacity: 0;
}
.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel {
  transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.25s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.status-bar-flash {
  animation: status-flash 0.6s ease;
}
@keyframes status-flash {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>
