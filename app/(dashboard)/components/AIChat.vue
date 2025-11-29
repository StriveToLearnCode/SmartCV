<template>
  <div class="w-full max-w-3xl mx-auto mb-12">
    <!-- 核心对话框 -->
    <div
      class="bg-white rounded-lg shadow-sm border border-stone-200 p-6 md:p-8 transition-all duration-300 hover:shadow-md"
    >
      <div class="flex flex-col h-[200px] relative">
        <textarea
          v-model="prompt"
          class="w-full h-full resize-none outline-none text-stone-700 text-lg placeholder:text-stone-300 font-serif bg-transparent"
          placeholder="在这里输入你的想法..."
          @keydown.enter.prevent="sendMessage"
        ></textarea>

        <div class="absolute bottom-0 right-0 flex items-center gap-2">
          <button
            @click="sendMessage"
            class="p-3 rounded-full bg-stone-800 text-white hover:bg-stone-700 transition-colors disabled:opacity-50"
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

    <!-- 快捷指令区 -->
    <div class="mt-6 flex flex-wrap justify-center gap-3">
      <button
        v-for="cmd in commands"
        :key="cmd"
        @click="useCommand(cmd)"
        class="px-4 py-2 bg-stone-100 text-stone-600 text-sm rounded-full hover:bg-stone-200 transition-colors border border-stone-200/50"
      >
        {{ cmd }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const prompt = ref('')

const commands = ['帮我写一个产品经理简历', '优化我上一版工作经历', '分析这份岗位的关键要求', '生成本周求职计划']

const useCommand = (cmd: string) => {
  prompt.value = cmd
}

const sendMessage = () => {
  if (!prompt.value.trim()) return
  console.log('Sending:', prompt.value)
  // TODO: Implement actual AI call
  prompt.value = ''
}
</script>
