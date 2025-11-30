<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
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
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simple template combining
  const generated = `在${form.value.situation || '相关项目'}背景下，面对${form.value.task || '挑战'}，我主动${form.value.action || '采取行动'}，最终${form.value.result || '取得了显著成果'}。`
  
  emit('update:modelValue', generated)
  isGenerating.value = false
  emit('close')
}

const autoFill = () => {
  // Simulate parsing existing text to STAR (Mock)
  // In real app, this would use AI to reverse-engineer the text
}
</script>

<template>
  <div class="bg-[#fffdf5] border border-amber-200/50 rounded-lg p-4 shadow-sm relative overflow-hidden my-3 transform transition-all">
    <!-- "Tape" visual -->
    <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/80 opacity-60 rotate-1 shadow-sm pointer-events-none z-10"></div>
    
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xs font-bold text-amber-800 uppercase tracking-widest flex items-center gap-2">
        <span class="text-lg">✨</span> STAR 写作助手
      </h3>
      <button @click="$emit('close')" class="text-amber-400 hover:text-amber-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    <div class="space-y-3">
      <div class="group">
        <label class="block text-[10px] font-bold text-amber-600/70 mb-1 uppercase">S - 情境 (Situation)</label>
        <input v-model="form.situation" placeholder="例如：在高并发促销活动期间..." class="w-full bg-white/50 border-b border-amber-200 focus:border-amber-500 outline-none text-sm py-1 text-stone-700 placeholder:text-amber-300/70 transition-colors" />
      </div>
      
      <div class="group">
        <label class="block text-[10px] font-bold text-amber-600/70 mb-1 uppercase">T - 任务 (Task)</label>
        <input v-model="form.task" placeholder="例如：需要优化页面加载速度..." class="w-full bg-white/50 border-b border-amber-200 focus:border-amber-500 outline-none text-sm py-1 text-stone-700 placeholder:text-amber-300/70 transition-colors" />
      </div>

      <div class="group">
        <label class="block text-[10px] font-bold text-amber-600/70 mb-1 uppercase">A - 行动 (Action)</label>
        <input v-model="form.action" placeholder="例如：使用了Redis缓存策略..." class="w-full bg-white/50 border-b border-amber-200 focus:border-amber-500 outline-none text-sm py-1 text-stone-700 placeholder:text-amber-300/70 transition-colors" />
      </div>

      <div class="group">
        <label class="block text-[10px] font-bold text-amber-600/70 mb-1 uppercase">R - 结果 (Result)</label>
        <input v-model="form.result" placeholder="例如：加载时间减少了40%..." class="w-full bg-white/50 border-b border-amber-200 focus:border-amber-500 outline-none text-sm py-1 text-stone-700 placeholder:text-amber-300/70 transition-colors" />
      </div>
    </div>

    <button 
      @click="generateDescription"
      :disabled="isGenerating"
      class="mt-4 w-full bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold py-2 rounded border border-amber-200 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
    >
      <span v-if="isGenerating" class="animate-spin">↻</span>
      <span v-else>⚡️ 生成专业描述</span>
    </button>
  </div>
</template>

