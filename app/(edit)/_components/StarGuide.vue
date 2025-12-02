<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  initialValue?: string
}>()

const emit = defineEmits(['update:modelValue', 'close'])

const form = ref({
  situation: '',
  task: '',
  action: '',
  result: ''
})

const isGenerating = ref(false)

// Mock AI Generation
const generateDescription = async () => {
  isGenerating.value = true
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simple template combining with professional phrasing
  const s = form.value.situation || ''
  const t = form.value.task || ''
  const a = form.value.action || ''
  const r = form.value.result || ''

  // 简单的组合逻辑，实际应用中可接入大模型 API
  let generated = ''

  if (s && t && a && r) {
    generated = `在${s}项目中，面对${t}的挑战，我通过${a}，最终取得了${r}的成果。`
  } else {
    // Fallback for partial inputs
    const parts = []
    if (s) parts.push(`基于${s}背景`)
    if (t) parts.push(`为了解决${t}挑战`)
    if (a) parts.push(`采用${a}方案`)
    if (r) parts.push(`达成${r}成效`)
    generated = parts.join('，') + '。'
  }

  emit('update:modelValue', generated)
  isGenerating.value = false
  emit('close')
}
</script>

<template>
  <div
    class="bg-[#fefce8] border border-amber-200/60 rounded-sm p-6 shadow-lg relative overflow-hidden my-4 transform rotate-1 transition-all max-w-lg mx-auto"
  >
    <!-- "Tape" visual -->
    <div
      class="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-amber-100/80 border border-white/40 -rotate-1 shadow-sm pointer-events-none z-10 backdrop-blur-sm"
    ></div>

    <!-- Header -->
    <div class="flex justify-between items-start mb-6 mt-2">
      <div>
        <h3 class="text-lg font-bold text-stone-800 flex items-center gap-2 font-handwriting tracking-wide">
          <span class="text-xl">✨</span> 让我来陪你理清思路
        </h3>
        <p class="text-xs text-stone-500 mt-1 font-serif ml-1">别担心文采，像聊天一样告诉我发生了什么，我帮你整理。</p>
      </div>
      <button @click="$emit('close')" class="text-stone-400 hover:text-stone-600 transition-colors p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Step by Step Inputs -->
    <div class="space-y-5 relative">
      <!-- Vertical Guide Line -->
      <div class="absolute left-[7px] top-2 bottom-2 w-0.5 bg-amber-200/50 rounded-full"></div>

      <!-- Situation -->
      <div class="group relative pl-6">
        <div
          class="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-amber-300 flex items-center justify-center text-[8px] font-bold text-amber-600 z-10"
        >
          1
        </div>
        <label class="block text-xs font-bold text-stone-600 mb-1.5">当时是什么情况？(Situation)</label>
        <input
          v-model="form.situation"
          placeholder="例如：双十一大促期间，流量突然暴涨了3倍..."
          class="w-full bg-white/60 border-b-2 border-amber-100 focus:border-amber-400 outline-none text-sm py-2 px-2 text-stone-700 placeholder:text-stone-400/60 transition-colors font-serif rounded-t-sm hover:bg-white/80"
        />
      </div>

      <!-- Task -->
      <div class="group relative pl-6">
        <div
          class="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-amber-300 flex items-center justify-center text-[8px] font-bold text-amber-600 z-10"
        >
          2
        </div>
        <label class="block text-xs font-bold text-stone-600 mb-1.5">遇到了什么难题？(Task)</label>
        <input
          v-model="form.task"
          placeholder="例如：服务器响应变慢，用户开始投诉下单失败..."
          class="w-full bg-white/60 border-b-2 border-amber-100 focus:border-amber-400 outline-none text-sm py-2 px-2 text-stone-700 placeholder:text-stone-400/60 transition-colors font-serif rounded-t-sm hover:bg-white/80"
        />
      </div>

      <!-- Action -->
      <div class="group relative pl-6">
        <div
          class="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-amber-300 flex items-center justify-center text-[8px] font-bold text-amber-600 z-10"
        >
          3
        </div>
        <label class="block text-xs font-bold text-stone-600 mb-1.5">你做了什么关键动作？(Action)</label>
        <input
          v-model="form.action"
          placeholder="例如：我快速定位了慢查询，引入了Redis缓存..."
          class="w-full bg-white/60 border-b-2 border-amber-100 focus:border-amber-400 outline-none text-sm py-2 px-2 text-stone-700 placeholder:text-stone-400/60 transition-colors font-serif rounded-t-sm hover:bg-white/80"
        />
      </div>

      <!-- Result -->
      <div class="group relative pl-6">
        <div
          class="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-amber-300 flex items-center justify-center text-[8px] font-bold text-amber-600 z-10"
        >
          4
        </div>
        <label class="block text-xs font-bold text-stone-600 mb-1.5">结果怎么样？(Result)</label>
        <input
          v-model="form.result"
          placeholder="例如：响应时间降低了50%，零客诉..."
          class="w-full bg-white/60 border-b-2 border-amber-100 focus:border-amber-400 outline-none text-sm py-2 px-2 text-stone-700 placeholder:text-stone-400/60 transition-colors font-serif rounded-t-sm hover:bg-white/80"
        />
      </div>
    </div>

    <!-- Footer Action -->
    <div class="mt-8 flex items-center justify-between gap-4">
      <div class="text-[10px] text-amber-700/60 italic font-serif max-w-[60%]">
        "放心，我会把这些变成面试官喜欢听的专业表达。"
      </div>
      <button
        @click="generateDescription"
        :disabled="isGenerating"
        class="px-5 py-2.5 bg-stone-800 text-[#fefce8] text-xs font-bold rounded-sm shadow-md hover:bg-stone-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-wait"
      >
        <span v-if="isGenerating" class="animate-spin">↻</span>
        <span v-else class="group-hover:scale-105 transition-transform">✍️ 帮我润色</span>
      </button>
    </div>
  </div>
</template>
