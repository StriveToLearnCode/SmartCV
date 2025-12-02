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

      <div class="flex flex-col min-h-[160px] relative">
        <!-- 引导语 -->
        <div v-if="!prompt && !isFocused" class="absolute top-0 left-0 w-full pointer-events-none select-none z-10 mt-2">
          <p class="text-stone-400 font-handwriting text-xl md:text-2xl transform -rotate-1">
            "今天面试感觉怎么样？或者...需要我帮你改改简历吗？"
          </p>
        </div>

        <textarea
          v-model="prompt"
          class="w-full h-full resize-none outline-none text-stone-700 text-lg placeholder:text-transparent font-serif bg-transparent relative z-10 leading-relaxed mt-2"
          placeholder="在这里输入..."
          @focus="isFocused = true"
          @blur="isFocused = false"
          @keydown.enter.prevent="sendMessage"
        ></textarea>

        <div class="mt-auto flex justify-between items-end pt-4">
          <!-- 情感化小提示 -->
          <span class="text-xs text-stone-400 font-serif italic" v-if="isFocused">
            放心写，我会帮你整理成专业的表达。
          </span>
          <span v-else></span>

          <button
            @click="sendMessage"
            class="p-3 rounded-full bg-stone-800 text-[#fefce8] hover:bg-stone-700 transition-all duration-300 transform active:scale-95 shadow-sm flex items-center gap-2 px-6"
            :disabled="!prompt.trim()"
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
import { ref } from 'vue'
import { Motion } from 'motion-v'
import { useRouter } from 'vue-router'

const router = useRouter()
const prompt = ref('')
const isFocused = ref(false)

const commands = [
  { text: '帮我优化这段经历', color: 'bg-yellow-100' },
  { text: '面试会被问什么？', color: 'bg-blue-50' },
  { text: '我很焦虑，聊聊？', color: 'bg-green-50' }, // Emotional support
  { text: '生成本周计划', color: 'bg-orange-50' }
]

const useCommand = (cmd: string) => {
  prompt.value = cmd
  isFocused.value = true
}

const sendMessage = () => {
  if (!prompt.value.trim()) return
  console.log('Sending:', prompt.value)
  // In a real app, this would trigger AI response
  prompt.value = ''
  isFocused.value = false
  // Example routing or action
  // router.push('/edit') 
}
</script>

<style scoped>
/* Add any specific scoped styles here if needed */
</style>
