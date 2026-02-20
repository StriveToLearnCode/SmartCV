<template>
  <div class="h-full min-h-0 flex flex-col relative">
    <!-- Messages Area -->
    <!-- 消息区：底部留白必须大于固定输入栏高度，避免最后一条被遮挡 -->
    <div
      ref="chatContainerRef"
      class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 pt-8 pb-[220px] space-y-8 scroll-smooth"
    >
      <div v-for="(msg, index) in messages" :key="index" class="w-full animate-fade-in-up group">
        <!-- User Message -->
        <div v-if="msg.role === 'user'" class="flex justify-end mb-2">
          <div class="max-w-[85%] flex flex-col items-end gap-1">
            <div
              class="bg-[#efefef] dark:bg-[#252525] text-[#37352f] dark:text-[#d4d4d4] px-4 py-2.5 rounded-lg text-[15px] leading-relaxed"
            >
              <p class="whitespace-pre-wrap">{{ msg.content }}</p>
            </div>
            <p v-if="msg.references?.length" class="text-xs text-[var(--text-secondary)]">
              引用 {{ msg.references.length }} 个素材
            </p>
          </div>
        </div>

        <!-- Bot Message -->
        <div v-else class="flex gap-4 mb-6">
          <div
            class="w-8 h-8 rounded-[12px] bg-[var(--bg-primary)] border border-[var(--border)] flex items-center justify-center shrink-0 text-sm"
          >
            ✨
          </div>
          <div class="flex-1 min-w-0 pt-1">
            <div class="prose prose-sm dark:prose-invert max-w-none text-[#37352f] dark:text-[#d4d4d4] leading-relaxed">
              <p class="whitespace-pre-wrap font-medium">{{ msg.content }}</p>
            </div>

            <!-- Action Card (Resume Generated) -->
            <div
              v-if="msg.actionType === 'resume-generated'"
              class="mt-4 p-3 rounded-[12px] border border-[var(--border)] bg-[var(--bg-secondary)] flex items-center justify-between transition-all"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded bg-white/60 flex items-center justify-center text-lg"></div>
                <div>
                  <h4 class="font-medium text-[#37352f] dark:text-[#d4d4d4] text-sm">Resume Draft</h4>
                  <p class="text-xs text-[#9b9b9b]">Ready for review</p>
                </div>
              </div>
              <button
                type="button"
                @click="goToResumeEdit('draft-001')"
                class="px-3 py-1.5 bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border)] rounded-[12px] text-xs font-medium hover:bg-[var(--bg-hover)] transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div v-if="isTyping" class="flex gap-4 animate-pulse">
        <div
          class="w-8 h-8 rounded bg-white dark:bg-[#202020] border border-[#e1e1e1] dark:border-[#2f2f2f] flex items-center justify-center shrink-0 text-sm shadow-sm"
        ></div>
        <div class="flex items-center gap-1 pt-3">
          <div class="w-1.5 h-1.5 bg-[#9b9b9b] rounded-full animate-bounce"></div>
          <div class="w-1.5 h-1.5 bg-[#9b9b9b] rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
          <div class="w-1.5 h-1.5 bg-[#9b9b9b] rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
        </div>
      </div>
    </div>

    <!-- Bottom Input Bar（固定到视口底部） -->
    <div class="fixed bottom-6 left-[var(--content-inset-left,0)] right-0 px-4 z-20">
      <div class="max-w-3xl mx-auto">
        <div
          class="card rounded-[12px] overflow-visible focus-within:ring-1 focus-within:ring-[var(--primary)]/20 transition-all"
        >
          <div class="p-3 relative overflow-visible">
            <span
              v-if="!localInput.trim()"
              class="pointer-events-none absolute left-3 top-3 text-[15px] leading-relaxed text-[#9b9b9b] dark:text-[#6e6e6e]"
            >
              Ask AI... 输入 @ 引用素材库
            </span>
            <div
              ref="chatInputElRef"
              contenteditable="true"
              role="textbox"
              aria-multiline="true"
              class="w-full min-h-6 max-h-32 overflow-y-auto bg-transparent border-none focus:ring-0 outline-none text-[#37352f] dark:text-[#d4d4d4] resize-none text-[15px] leading-relaxed py-1.5 empty:before:content-['\00a0']"
              @input="onChatDivInput"
              @keyup="checkMention"
              @keydown="handleKeydown"
            />
            <!-- @ 引用素材（在输入框上方打开，避免被屏幕底部遮挡） -->
            <div
              v-if="showMentionPopover"
              ref="mentionListRef"
              class="absolute left-0 right-0 bottom-full mb-1.5 max-h-56 overflow-y-auto rounded-[12px] border border-[var(--border)] bg-[var(--bg-primary)] z-50 py-1 min-w-[200px]"
            >
              <div
                class="px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[#9b9b9b] dark:text-[#6e6e6e]"
              >
                引用素材
              </div>
              <button
                v-for="(mat, i) in mentionFilteredList"
                :key="mat.id"
                type="button"
                :data-mention-index="i"
                class="w-full flex items-center gap-2 px-2.5 py-2 text-left rounded-md transition-colors"
                :class="
                  selectedMentionIndex === i
                    ? 'bg-[#f3f4f6] dark:bg-[#2f2f2f]'
                    : 'hover:bg-[#f9fafb] dark:hover:bg-[#252525]'
                "
                @click="insertMaterialRef(mat)"
              >
                <span class="flex-1 min-w-0 truncate text-[13px] font-medium text-[#37352f] dark:text-[#d4d4d4]">{{
                  mat.title
                }}</span>
                <span class="shrink-0 text-[11px] text-[#9b9b9b] dark:text-[#6e6e6e]">{{ mat.category }}</span>
              </button>
              <p
                v-if="mentionFilteredList.length === 0"
                class="px-2.5 py-2 text-[13px] text-[#9b9b9b] dark:text-[#6e6e6e]"
              >
                无匹配素材
              </p>
            </div>
          </div>
          <div class="px-2 py-1.5 flex justify-between items-center">
            <div class="flex gap-1">
              <button
                type="button"
                class="p-1 rounded hover:bg-[#efefef] dark:hover:bg-[#2f2f2f] text-[#9b9b9b] transition-colors"
              >
                <PaperClipIcon class="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              @click="doSend"
              :disabled="!localInput.trim()"
              class="p-1 rounded-md bg-[#37352f] dark:bg-[#d4d4d4] text-white dark:text-[#191919] disabled:opacity-0 hover:opacity-90 transition-all transform scale-90"
              :class="{ 'scale-100 opacity-100': localInput.trim() }"
            >
              <ArrowUpIcon class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { PaperClipIcon, ArrowUpIcon } from '@heroicons/vue/24/outline'
import type { Material } from '../../composables/useMaterials'

export interface ChatMessage {
  role: 'user' | 'bot'
  content: string
  references?: Material[]
  actionType?: 'resume-generated' | null
}

const props = withDefaults(
  defineProps<{
    messages: ChatMessage[]
    isTyping: boolean
    modelValue: string
    materials: Material[]
    goToResumeEdit: (id: string) => void
  }>(),
  {}
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  send: [payload: { content: string; references?: Material[] }]
}>()

const chatContainerRef = ref<HTMLElement | null>(null)
const chatInputElRef = ref<HTMLDivElement | null>(null)
const mentionListRef = ref<HTMLElement | null>(null)

const showMentionPopover = ref(false)
const mentionQuery = ref('')
const selectedMentionIndex = ref(0)
const pendingReferences = ref<Material[]>([])

const localInput = computed({
  get: () => props.modelValue,
  set: (v: string) => emit('update:modelValue', v)
})

const mentionFilteredList = computed(() => {
  const q = mentionQuery.value.trim().toLowerCase()
  if (!q) return props.materials
  return props.materials.filter((m) => m.title.toLowerCase().includes(q) || m.category.toLowerCase().includes(q))
})

watch(
  () => props.modelValue,
  (v) => {
    if (chatInputElRef.value && chatInputElRef.value.innerText !== v) {
      chatInputElRef.value.innerText = v
    }
  }
)

function getTextBeforeCursor(): string {
  const el = chatInputElRef.value
  if (!el) return ''
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return ''
  const range = sel.getRangeAt(0).cloneRange()
  range.setStart(el, 0)
  range.setEnd(sel.anchorNode!, sel.anchorOffset)
  return range.toString()
}

function onChatDivInput(e: Event) {
  const el = e.currentTarget as HTMLDivElement
  localInput.value = el.innerText
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 128) + 'px'
}

function checkMention() {
  const textBefore = getTextBeforeCursor()
  const match = textBefore.match(/@([^\s]*)$/)
  if (match) {
    showMentionPopover.value = true
    mentionQuery.value = match[1] ?? ''
    selectedMentionIndex.value = 0
  } else {
    showMentionPopover.value = false
  }
}

function insertMaterialRef(mat: Material) {
  const refText = `@《${mat.title}》`
  const el = chatInputElRef.value
  if (!el) return
  const sel = window.getSelection()
  if (sel && sel.rangeCount) {
    const textBefore = getTextBeforeCursor()
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
  localInput.value = el.innerText
  if (!pendingReferences.value.find((r) => r.id === mat.id)) {
    pendingReferences.value.push(mat)
  }
  showMentionPopover.value = false
}

function scrollMentionIntoView() {
  nextTick(() => {
    const list = mentionListRef.value
    if (!list) return
    const btn = list.querySelector(`[data-mention-index="${selectedMentionIndex.value}"]`)
    btn?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  })
}

function handleKeydown(e: KeyboardEvent) {
  if (showMentionPopover.value && mentionFilteredList.value.length) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      selectedMentionIndex.value = Math.min(selectedMentionIndex.value + 1, mentionFilteredList.value.length - 1)
      scrollMentionIntoView()
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      selectedMentionIndex.value = Math.max(selectedMentionIndex.value - 1, 0)
      scrollMentionIntoView()
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const mat = mentionFilteredList.value[selectedMentionIndex.value]
      if (mat) insertMaterialRef(mat)
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
    doSend()
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainerRef.value) {
      chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight
    }
  })
}

function doSend() {
  const content = localInput.value.trim()
  if (!content) return
  const refs = pendingReferences.value.length ? [...pendingReferences.value] : undefined
  emit('send', { content, references: refs })
  localInput.value = ''
  pendingReferences.value = []
  if (chatInputElRef.value) chatInputElRef.value.innerText = ''
  showMentionPopover.value = false
  scrollToBottom()
}

defineExpose({
  scrollToBottom
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
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
