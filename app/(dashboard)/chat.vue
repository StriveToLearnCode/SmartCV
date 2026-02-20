<template>
  <div
    class="h-full min-h-0 flex flex-col overflow-hidden relative max-w-4xl mx-auto w-full font-sans text-[#111] dark:text-[#d4d4d4] bg-white dark:bg-[#111]"
  >
    <!-- 1. Initial State: 干净留白 -->
    <div v-if="messages.length === 0" class="flex-1 flex flex-col overflow-y-auto">
      <!-- 状态条：横排小标签，无灰盒 -->
      <div class="shrink-0 px-4 py-3 flex items-center gap-4 text-xs text-[#6B7280] dark:text-[#9b9b9b]">
        <span>匹配度 <span class="font-medium text-[var(--text-blue)]">78%</span></span>
        <span>ATS <span class="font-medium text-[var(--text-green)]">85%</span></span>
        <span>2 条待优化</span>
        <span>2 场待复盘</span>
      </div>

      <div class="flex-1 px-4 py-6 pb-20 max-w-2xl">
        <!-- 标题区：直接在白底上，无灰块 -->
        <div class="flex items-start gap-4 mb-8">
          <div ref="logoTriggerRef" class="relative shrink-0 group">
            <button type="button" class="block outline-none rounded-xl" @click="togglePersonalize">
              <div
                class="w-14 h-14 rounded-[12px] bg-[var(--bg-primary)] border border-[var(--border)] overflow-hidden relative flex items-center justify-center"
              >
                <img :src="logo" class="absolute inset-0 w-full h-full object-cover" alt="" />
                <span v-if="accessoryIcon" class="relative z-10 text-xl">{{ accessoryIcon }}</span>
              </div>
            </button>
            <button
              type="button"
              class="absolute -right-1 top-1/2 -translate-y-1/2 translate-x-full flex items-center gap-1 px-2 py-1 rounded-lg bg-[#f9fafb] dark:bg-[#2f2f2f] border border-[#E5E7EB] dark:border-[#3f3f3f] opacity-0 group-hover:opacity-100 transition-opacity text-[#6B7280] dark:text-[#9b9b9b] hover:text-[#111] dark:hover:text-[#d4d4d4] text-xs"
              @click="togglePersonalize"
            >
              <PencilSquareIcon class="w-3 h-3" />
              个性化
            </button>
          </div>
          <PersonalizeModal
            v-model="showPersonalizePopover"
            :base-logo="logo"
            v-model:name="aiAssistantName"
            v-model:description="aiAssistantDescription"
            v-model:accessory-id="selectedAccessoryId"
          />
          <div class="space-y-0.5 min-w-0">
            <h1 class="text-xl font-bold text-[#111] dark:text-[#d4d4d4]">智能求职分析中心</h1>
            <p class="text-sm text-[#6B7280] dark:text-[#9b9b9b]">分析简历 · 预测 JD 匹配度 · 模拟面试与路径规划</p>
          </div>
        </div>

        <!-- 输入框：视觉焦点 圆角 16px、极淡边框、hover 微阴影、右侧品牌色按钮 -->
        <div
          class="relative rounded-[12px] border border-[var(--border)] bg-[var(--bg-primary)] transition-all card"
          :class="showMentionPopover && !messages.length ? 'z-[100]' : 'z-10'"
        >
          <div class="p-3 relative overflow-visible">
            <span
              v-if="!input.trim()"
              class="pointer-events-none absolute left-3 top-3 text-[15px] leading-relaxed py-1 text-[#9CA3AF] dark:text-[#6e6e6e]"
            >
              输入问题… @引用素材库
            </span>
            <div
              ref="inputElRef"
              contenteditable="true"
              role="textbox"
              aria-multiline="true"
              class="w-full bg-transparent border-none focus:ring-0 outline-none text-[#111] dark:text-[#d4d4d4] resize-none text-[15px] leading-relaxed min-h-[44px] py-1 empty:before:content-['\00a0']"
              @input="onDivInput"
              @keyup="checkMentionDiv"
              @keydown="handleKeydown"
            />
            <div
              v-if="showMentionPopover && !messages.length"
              ref="mentionListRef"
              class="absolute left-0 right-0 top-full mt-1 max-h-52 overflow-y-auto rounded-[12px] border border-[var(--border)] bg-[var(--bg-primary)] z-50 py-1 min-w-[200px]"
            >
              <div class="px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-wider text-[#9CA3AF]">引用素材</div>
              <button
                v-for="(mat, i) in mentionFilteredList"
                :key="mat.id"
                type="button"
                :data-mention-index="i"
                class="w-full flex items-center gap-2 px-2.5 py-2 text-left rounded-lg transition-colors"
                :class="
                  selectedMentionIndex === i
                    ? 'bg-[#f3f4f6] dark:bg-[#2f2f2f]'
                    : 'hover:bg-[#f9fafb] dark:hover:bg-[#252525]'
                "
                @click="insertMaterialRef(mat, 'div')"
              >
                <span class="flex-1 min-w-0 truncate text-[13px] font-medium text-[#111] dark:text-[#d4d4d4]">{{
                  mat.title
                }}</span>
                <span class="shrink-0 text-[11px] text-[#9CA3AF]">{{ mat.category }}</span>
              </button>
              <p v-if="mentionFilteredList.length === 0" class="px-2.5 py-2 text-[13px] text-[#9CA3AF]">无匹配素材</p>
            </div>
          </div>
          <div class="px-3 py-2 flex items-center justify-between border-t border-[#E5E7EB] dark:border-[#2f2f2f]">
            <div class="flex items-center gap-2 text-[11px] text-[#9CA3AF] dark:text-[#6e6e6e]">
              <span>最近任务</span>
              <span>·</span>
              <button type="button" class="hover:text-[var(--text-blue)] transition-colors">JD 分析</button>
              <span>·</span>
              <button type="button" class="hover:text-[var(--text-blue)] transition-colors">简历优化</button>
            </div>
            <button
              @click="sendMessage"
              :disabled="!input.trim()"
              class="flex items-center justify-center w-9 h-9 rounded-[12px] bg-[var(--primary)] text-white disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0"
            >
              <ArrowUpIcon class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- 功能卡片：白底、无边框、hover 才阴影、左侧 icon，首卡略大+渐变主次 -->
        <div v-if="showSuggestedActions" class="mt-6">
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="(card, idx) in suggestionCards"
              :key="idx"
              @click="handleSuggestion({ title: card.title })"
              class="flex items-start gap-3 text-left p-4 rounded-[12px] card hover:bg-[var(--bg-hover)] transition-all min-h-0"
              :class="
                idx === 0 ? 'p-5 bg-gradient-to-br from-[#f8fafc] to-white dark:from-[#252525] dark:to-[#1a1a1a]' : ''
              "
            >
              <component
                :is="card.icon"
                class="w-5 h-5 shrink-0 text-[var(--text-blue)] dark:text-[var(--text-blue)] mt-0.5"
              />
              <div class="min-w-0">
                <div
                  class="font-medium text-[#111] dark:text-[#d4d4d4] text-sm mb-0.5"
                  :class="idx === 0 ? 'text-base' : ''"
                >
                  {{ card.title }}
                </div>
                <div class="text-[11px] text-[#6B7280] dark:text-[#9b9b9b] leading-relaxed">{{ card.desc }}</div>
              </div>
            </button>
          </div>
        </div>

        <!-- 最近 AI 记录 -->
        <div class="mt-8">
          <div class="text-[11px] font-medium uppercase tracking-wider text-[#9CA3AF] dark:text-[#6e6e6e] mb-2">
            最近操作
          </div>
          <ul class="space-y-1.5">
            <li
              v-for="(item, i) in recentAiRecords"
              :key="i"
              class="text-sm text-[#6B7280] dark:text-[#9b9b9b] flex items-center gap-2"
            >
              <span class="text-[var(--text-green)]">·</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 2. Chat View（整屏高度，仅消息区内部滚动） -->
    <ChatView
      v-else
      ref="chatViewRef"
      class="flex-1 min-h-0 flex flex-col"
      :messages="messages"
      :is-typing="isTyping"
      v-model="input"
      :materials="materials"
      :go-to-resume-edit="goToResumeEdit"
      @send="onChatSend"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowUpIcon,
  PencilSquareIcon,
  DocumentTextIcon,
  ChartBarIcon,
  MicrophoneIcon,
  MapIcon
} from '@heroicons/vue/24/outline'
import { useAiEngine } from '../composables/useAiEngine'
import { useMaterials, type Material } from '../composables/useMaterials'
import { useThemeStore } from '../../store/use-theme'
import PersonalizeModal from './_components/PersonalizeModal.vue'
import ChatView from './_components/ChatView.vue'
import { getAccessoryById } from './_composables/personalize-accessories'

const router = useRouter()
const { materials } = useMaterials()
const { predictOutcome } = useAiEngine()
const input = ref('')
const inputElRef = ref<HTMLDivElement | null>(null)
const isTyping = ref(false)
const chatViewRef = ref<InstanceType<typeof ChatView> | null>(null)
const showMentionPopover = ref(false)
const mentionQuery = ref('')
const selectedMentionIndex = ref(0)
const pendingReferences = ref<Material[]>([])
const mentionListRef = ref<HTMLElement | null>(null)
const theme = useThemeStore()

const mentionFilteredList = computed(() => {
  const q = mentionQuery.value.trim().toLowerCase()
  if (!q) return materials.value
  return materials.value.filter((m) => m.title.toLowerCase().includes(q) || m.category.toLowerCase().includes(q))
})

const logo = computed(() => (theme.theme === 'light' ? '/assets/logo-light.svg' : '/assets/logo-dark.svg'))
const showPersonalizePopover = ref(false)
const logoTriggerRef = ref<HTMLElement | null>(null)
const aiAssistantName = ref('SmartCV AI')
const aiAssistantDescription = ref('')
const selectedAccessoryId = ref<string | null>(null)
const accessoryIcon = computed(() => getAccessoryById(selectedAccessoryId.value)?.icon ?? null)

function togglePersonalize() {
  showPersonalizePopover.value = !showPersonalizePopover.value
}

watch(input, (v) => {
  if (inputElRef.value && inputElRef.value.innerText !== v) inputElRef.value.innerText = v
})

interface Message {
  role: 'user' | 'bot'
  content: string
  references?: Material[]
  actionType?: 'resume-generated' | null
}

const messages = ref<Message[]>([])
const showSuggestedActions = ref(true)

const suggestionCards = [
  { title: '简历分析', desc: '匹配度 · ATS · 关键词', icon: DocumentTextIcon },
  { title: 'JD 匹配预测', desc: '预测匹配度与差距分析', icon: ChartBarIcon },
  { title: '模拟面试', desc: '技术 + 行为 + 实时反馈', icon: MicrophoneIcon },
  { title: '职业路径规划', desc: '技能图谱 · 目标拆解', icon: MapIcon }
]

const recentAiRecords = ['优化 Enterprise SaaS 项目', '分析 字节前端 JD', '生成 行为面试问题']

function onDivInput(e: Event) {
  const el = e.currentTarget as HTMLDivElement
  input.value = el.innerText
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

function getTextBeforeCursorDiv(): string {
  const el = inputElRef.value
  if (!el) return ''
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return ''
  const range = sel.getRangeAt(0).cloneRange()
  range.setStart(el, 0)
  range.setEnd(sel.anchorNode!, sel.anchorOffset)
  return range.toString()
}

function checkMentionDiv() {
  const textBefore = getTextBeforeCursorDiv()
  const match = textBefore.match(/@([^\s]*)$/)
  if (match) {
    showMentionPopover.value = true
    mentionQuery.value = match[1] ?? ''
    selectedMentionIndex.value = 0
  } else {
    showMentionPopover.value = false
  }
}

function insertMaterialRef(mat: Material, type: 'div' | 'chat') {
  if (type !== 'div') return
  const refText = `@《${mat.title}》`
  const el = inputElRef.value
  if (!el) return
  const sel = window.getSelection()
  if (sel && sel.rangeCount) {
    const textBefore = getTextBeforeCursorDiv()
    const atIndex = textBefore.lastIndexOf('@')
    if (atIndex >= 0) {
      const range = sel.getRangeAt(0).cloneRange()
      const len = textBefore.length - atIndex
      range.setStart(sel.anchorNode!, Math.max(0, sel.anchorOffset - len))
      range.setEnd(sel.anchorNode!, sel.anchorOffset)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }
  document.execCommand('insertText', false, refText)
  input.value = el.innerText
  if (!pendingReferences.value.find((r) => r.id === mat.id)) {
    pendingReferences.value.push(mat)
  }
  showMentionPopover.value = false
}

function handleKeydown(e: KeyboardEvent) {
  if (showMentionPopover.value && mentionFilteredList.value.length) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      selectedMentionIndex.value = Math.min(selectedMentionIndex.value + 1, mentionFilteredList.value.length - 1)
      scrollMentionSelectionIntoView()
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      selectedMentionIndex.value = Math.max(selectedMentionIndex.value - 1, 0)
      scrollMentionSelectionIntoView()
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const mat = mentionFilteredList.value[selectedMentionIndex.value]
      if (mat) insertMaterialRef(mat, messages.value.length ? 'chat' : 'div')
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      showMentionPopover.value = false
      return
    }
  }
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

function scrollMentionSelectionIntoView() {
  nextTick(() => {
    const list = mentionListRef.value
    if (!list) return
    const btn = list.querySelector(`[data-mention-index="${selectedMentionIndex.value}"]`)
    btn?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  })
}

const handleSuggestion = (suggestion: { title: string }) => {
  showSuggestedActions.value = false
  input.value = suggestion.title
  sendMessage()
}

const goToResumeEdit = (id: string) => {
  router.push(`/resume-edit/${id}`)
}

function runBotReply(rawContent: string) {
  isTyping.value = true
  setTimeout(async () => {
    isTyping.value = false

    let content = 'Noted. I have received your request.'
    let actionType: Message['actionType'] = null

    if (
      rawContent.toLowerCase().includes('resume') ||
      rawContent.toLowerCase().includes('analyze') ||
      rawContent.includes('简历') ||
      rawContent.includes('分析')
    ) {
      content =
        'I have analyzed your background information. Based on your project experience, I have generated a resume draft for you.\n\n**Highlights:**\n- Full-stack development capabilities emphasized\n- Project management certification highlighted\n\nYou can click the card below to edit.'
      actionType = 'resume-generated'
    } else if (
      rawContent.toLowerCase().includes('trend') ||
      rawContent.toLowerCase().includes('prediction') ||
      rawContent.includes('匹配预测') ||
      rawContent.includes('JD')
    ) {
      const prediction = await predictOutcome()
      content = `
**Market Trend & Prediction:**

- **Offer Probability:** ${prediction.offerProbability}% (${prediction.marketTrend === 'stable' ? 'Market Stable' : 'Hot Market'})
- **Success Rate:** ${prediction.interviewSuccessRate}% (Based on past interviews)

**Recommendation:**
${prediction.nextStepRecommendation}
      `
    } else {
      content =
        'That is a great question. As your AI assistant, I can help you organize your thoughts, optimize your expression, or provide specific interview advice.\n\nWhich aspect would you like to explore further?'
    }

    messages.value.push({
      role: 'bot',
      content,
      actionType
    })
    nextTick(() => chatViewRef.value?.scrollToBottom?.())
  }, 1000)
}

function onChatSend(payload: { content: string; references?: Material[] }) {
  messages.value.push({
    role: 'user',
    content: payload.content,
    references: payload.references
  })
  runBotReply(payload.content)
}

const sendMessage = () => {
  if (!input.value.trim()) return

  const rawContent = input.value
  const refs = pendingReferences.value.length ? [...pendingReferences.value] : undefined

  messages.value.push({ role: 'user', content: rawContent, references: refs })
  input.value = ''
  pendingReferences.value = []
  if (inputElRef.value) inputElRef.value.innerText = ''
  showMentionPopover.value = false

  runBotReply(rawContent)
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes fade-in {
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
  animation: fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.popover-enter-active,
.popover-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.popover-enter-from,
.popover-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .personalize-modal,
.modal-leave-active .personalize-modal {
  transition: transform 0.2s ease;
}
.modal-enter-from .personalize-modal,
.modal-leave-to .personalize-modal {
  transform: scale(0.95);
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}
</style>
