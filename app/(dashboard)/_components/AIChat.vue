<template>
  <div class="w-full max-w-3xl mx-auto mb-12">
    <!-- 核心对话框 -->
    <div
      class="bg-[#fdfbf7] bg-paper-texture rounded-lg border border-stone-200 p-6 md:p-8 transition-all duration-500 group relative"
      :class="{
        'shadow-lg ring-1 ring-stone-200 animate-breathe-glow': isFocused,
        'shadow-sm hover:shadow-md': !isFocused
      }"
    >
      <div class="flex flex-col h-[200px] relative">
        <!-- AI 欢迎语/墨水显影效果 -->
        <div v-if="!prompt && !isFocused" class="absolute top-0 left-0 w-full pointer-events-none select-none">
          <div class="text-stone-400 font-serif text-lg flex flex-wrap gap-1">
            <Motion
              v-for="(word, index) in welcomeWords"
              :key="index"
              :initial="{ opacity: 0, filter: 'blur(8px)', y: 5 }"
              :animate="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
              :transition="{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.4, 0, 0.2, 1]
              }"
              class="ink-text-word"
            >
              {{ word }}
            </Motion>
          </div>
        </div>

        <textarea
          v-model="prompt"
          class="w-full h-full resize-none outline-none text-stone-700 text-lg placeholder:text-transparent font-serif bg-transparent relative z-10 leading-relaxed"
          placeholder="在这里输入你的想法..."
          @focus="isFocused = true"
          @blur="isFocused = false"
          @keydown.enter.prevent="sendMessage"
        ></textarea>

        <div class="absolute bottom-0 right-0 flex items-center gap-2 z-20">
          <button
            @click="sendMessage"
            class="p-3 rounded-full bg-stone-800 text-white hover:bg-stone-700 transition-all duration-300 transform active:scale-95 shadow-sm sketch-border"
            :disabled="!prompt.trim()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
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

    <!-- 快捷指令区: 便签抽出效果 -->
    <div class="mt-6 flex flex-wrap justify-center gap-3">
      <Motion
        v-for="(cmd, index) in commands"
        :key="cmd"
        is="button"
        @click="useCommand(cmd)"
        :initial="{ y: 20, opacity: 0, rotate: 5 }"
        :animate="{ y: 0, opacity: 1, rotate: index % 2 === 0 ? -1 : 1 }"
        :hover="{ y: -3, rotate: 0, scale: 1.02 }"
        :tap="{ scale: 0.98, rotate: index % 2 === 0 ? -2 : 2 }"
        :transition="{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: index * 0.1
        }"
        class="px-4 py-2 bg-[#fdfbf7] bg-paper-texture text-stone-600 text-sm shadow-sm border border-stone-200/50 font-serif relative cursor-pointer"
      >
        <!-- 模拟便签胶带效果 (可选) -->
        <!-- <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-white/50 -rotate-1"></div> -->
        {{ cmd }}
      </Motion>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Motion } from 'motion-v'

const prompt = ref('')
const isFocused = ref(false)
const fullText = '在这里输入你的想法，AI 将帮你完善简历...'

// 将文本拆分为单词/字符块，模拟墨水书写节奏
const welcomeWords = computed(() => fullText.split(''))

const commands = ['帮我写一个产品经理简历', '优化我上一版工作经历', '分析这份岗位的关键要求', '生成本周求职计划']

const useCommand = (cmd: string) => {
  prompt.value = cmd
  isFocused.value = true
}

const sendMessage = () => {
  if (!prompt.value.trim()) return
  console.log('Sending:', prompt.value)
  prompt.value = ''
  isFocused.value = false
}
</script>
