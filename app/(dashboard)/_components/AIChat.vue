<template>
  <div class="w-full max-w-3xl mx-auto mb-12">
    <!-- 核心对话框 -->
    <div
      class="bg-white rounded-sm border-2 border-stone-200 p-6 md:p-8 transition-all duration-500 group relative shadow-[4px_4px_0px_0px_rgba(28,25,23,0.1)]"
      :class="{
        'border-stone-400 translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(28,25,23,0.1)]': isFocused,
      }"
    >
      <!-- 装饰：左上角胶带 -->
      <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-stone-100/80 rotate-[-1deg] shadow-sm backdrop-blur-sm z-20 border border-white/50"></div>

      <!-- @ Mention Menu -->
      <div
        v-if="showMentionMenu"
        class="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-sm border border-stone-200 shadow-lg z-50 max-h-60 overflow-y-auto"
      >
        <div class="p-2 text-xs text-stone-400 font-serif italic border-b border-stone-100">
          你想讨论哪个？
        </div>
        
        <!-- Resumes -->
        <div v-if="mentionOptions.resumes.length > 0">
          <div class="px-3 py-1 text-xs text-stone-400 font-bold bg-stone-50 uppercase tracking-wider">简历</div>
          <button
            v-for="item in mentionOptions.resumes"
            :key="item.id"
            @click="selectMention(item)"
            class="w-full text-left px-3 py-2 hover:bg-stone-100 text-sm text-stone-700 flex items-center gap-2"
          >
            <span>📄</span>
            {{ item.label }}
          </button>
        </div>

        <!-- Jobs -->
        <div v-if="mentionOptions.jobs.length > 0">
          <div class="px-3 py-1 text-xs text-stone-400 font-bold bg-stone-50 uppercase tracking-wider border-t border-stone-100">岗位</div>
          <button
            v-for="item in mentionOptions.jobs"
            :key="item.id"
            @click="selectMention(item)"
            class="w-full text-left px-3 py-2 hover:bg-stone-100 text-sm text-stone-700 flex items-center gap-2"
          >
            <span>💼</span>
            <div class="flex flex-col">
              <span class="font-medium">{{ item.label }}</span>
              <span class="text-xs text-stone-400">{{ item.subLabel }}</span>
            </div>
          </button>
        </div>

        <div v-if="mentionOptions.resumes.length === 0 && mentionOptions.jobs.length === 0" class="p-3 text-sm text-stone-400 text-center">
          未找到匹配项
        </div>
      </div>

      <div class="flex flex-col min-h-[160px] relative">
        <!-- 引导语 -->
        <div v-if="!prompt && !isFocused && selectedContexts.length === 0" class="absolute top-0 left-0 w-full pointer-events-none select-none z-10 mt-2">
          <p class="text-stone-400 font-handwriting text-xl md:text-2xl transform -rotate-1">
            "今天面试感觉怎么样？或者...需要我帮你改改简历吗？"
          </p>
        </div>

        <!-- Selected Context Chip -->
        <div v-if="selectedContexts.length > 0" class="flex items-center gap-2 mb-2 flex-wrap">
          <div 
            v-for="(ctx, index) in selectedContexts" 
            :key="ctx.id"
            class="bg-[#fefce8] border border-stone-200 rounded-full px-3 py-1 text-xs text-stone-600 flex items-center gap-1 shadow-sm animate-in fade-in zoom-in duration-200"
          >
            <span>{{ ctx.type === 'resume' ? '📄' : '💼' }}</span>
            <span class="font-bold">{{ ctx.label }}</span>
            <button @click="removeContext(index)" class="ml-1 hover:text-red-500 rounded-full p-0.5 hover:bg-stone-100 transition-colors">×</button>
          </div>
        </div>

        <textarea
          ref="textareaRef"
          v-model="prompt"
          class="w-full h-full resize-none outline-none text-stone-700 text-lg placeholder:text-transparent font-serif bg-transparent relative z-10 leading-relaxed mt-2"
          placeholder="在这里输入... (输入 @ 关联简历或岗位)"
          @focus="isFocused = true"
          @blur="handleBlur"
          @keydown.enter.prevent="handleEnter"
          @input="handleInput"
        ></textarea>

        <div class="mt-auto flex justify-between items-end pt-4">
          <!-- 情感化小提示 -->
          <span class="text-xs text-stone-400 font-serif italic" v-if="isFocused">
            输入 @ 可以引用多个简历或岗位
          </span>
          <span v-else></span>

          <button
            @click="sendMessage"
            class="p-3 rounded-full bg-stone-800 text-[#fefce8] hover:bg-stone-700 transition-all duration-300 transform active:scale-95 shadow-sm flex items-center gap-2 px-6"
            :disabled="!prompt.trim() && selectedContexts.length === 0"
          >
            <span class="text-sm font-bold tracking-wide">发送</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 快捷指令区: 便利贴风格 -->
    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <Motion
        v-for="(cmd, index) in commands"
        :key="cmd.text"
        is="button"
        @click="useCommand(cmd.text)"
        :initial="{ y: 20, opacity: 0, rotate: 5 }"
        :animate="{ y: 0, opacity: 1, rotate: (index % 2 === 0 ? -2 : 2) + (Math.random() * 2 - 1) }"
        :hover="{ y: -5, rotate: 0, scale: 1.05, zIndex: 10 }"
        :tap="{ scale: 0.95 }"
        :transition="{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: index * 0.1
        }"
        class="relative p-4 w-40 h-40 flex flex-col items-center justify-center text-center shadow-md transition-shadow duration-300 font-handwriting text-lg leading-tight group"
        :class="cmd.color"
      >
        <!-- 顶部胶带 -->
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/30 rotate-90"></div>
        
        <span class="text-stone-700 group-hover:text-stone-900">{{ cmd.text }}</span>
        
        <div class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-stone-500 font-sans">
          ↗
        </div>
      </Motion>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { Motion } from 'motion-v'
import { useRouter } from 'vue-router'
import { useJobStore } from '../../composables/useJobStore'
import { useResume } from '../../(edit)/composables/useResume'

const router = useRouter()
const prompt = ref('')
const isFocused = ref(false)
const showMentionMenu = ref(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

interface ContextItem {
  id: string
  type: 'resume' | 'job'
  label: string
  subLabel?: string
  data: any
}

const selectedContexts = ref<ContextItem[]>([])

// Data Sources
const { allJobs } = useJobStore()
// Note: useResume provides a single resume object, not a list. We mock a list here.
// In a real app, you'd have a useResumeList store.
const { } = useResume() // Just init to make sure it works if needed later

const mockResumes = [
  { id: 'r1', name: '默认简历 (V1.0)', updated: '今天 10:30' },
  { id: 'r2', name: '英文版简历', updated: '昨天' },
]

const mentionOptions = computed(() => {
  // Filter based on query if needed, currently showing all
  const jobs = allJobs.value.map(job => ({
    id: job.id,
    type: 'job' as const,
    label: job.position,
    subLabel: job.company,
    data: job
  }))

  const resumes = mockResumes.map(res => ({
    id: res.id,
    type: 'resume' as const,
    label: res.name,
    subLabel: res.updated,
    data: res
  }))

  return { jobs, resumes }
})

const handleInput = (e: Event) => {
  const val = prompt.value
  // Check if last character is @
  if (val.endsWith('@')) {
    showMentionMenu.value = true
  } else if (showMentionMenu.value && val.includes('@')) {
    // Simple check: keep menu open if @ is recent
    // A better impl would track cursor position relative to @
    const lastAtIndex = val.lastIndexOf('@')
    if (lastAtIndex === -1 || val.slice(lastAtIndex).includes(' ')) {
      showMentionMenu.value = false
    }
  } else {
    showMentionMenu.value = false
  }
}

const selectMention = (item: ContextItem) => {
  // Remove the @ query
  const lastAtIndex = prompt.value.lastIndexOf('@')
  if (lastAtIndex !== -1) {
    prompt.value = prompt.value.slice(0, lastAtIndex)
  }
  
  // Add to context if not already present
  if (!selectedContexts.value.find(c => c.id === item.id)) {
    selectedContexts.value.push(item)
  }
  
  showMentionMenu.value = false
  
  // Focus back
  nextTick(() => {
    textareaRef.value?.focus()
  })
}

const removeContext = (index: number) => {
  selectedContexts.value.splice(index, 1)
}

const handleBlur = () => {
  // Delay hiding menu to allow click
  setTimeout(() => {
    isFocused.value = false
    showMentionMenu.value = false
  }, 200)
}

const handleEnter = (e: KeyboardEvent) => {
  if (showMentionMenu.value) {
    // If we implemented keyboard nav for menu, enter would select
    // For now, let it send message if menu is just open but not navigating
    // Or maybe close menu?
    showMentionMenu.value = false
    return
  }
  sendMessage()
}

const commands = [
  { text: '帮我优化这段经历', color: 'bg-yellow-100' },
  { text: '面试会被问什么？', color: 'bg-blue-50' },
  { text: '我很焦虑，聊聊？', color: 'bg-green-50' }, // Emotional support
  { text: '生成本周计划', color: 'bg-orange-50' }
]

const useCommand = (cmd: string) => {
  prompt.value = cmd
  isFocused.value = true
  textareaRef.value?.focus()
}

const sendMessage = () => {
  if (!prompt.value.trim() && selectedContexts.value.length === 0) return
  
  console.log('Sending Message:', {
    text: prompt.value,
    context: selectedContexts.value
  })
  
  // In a real app, this would trigger AI response with context
  prompt.value = ''
  selectedContexts.value = []
  isFocused.value = false
}
</script>

<style scoped>
/* Add any specific scoped styles here if needed */
</style>
