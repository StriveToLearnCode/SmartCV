<template>
  <Teleport to="body">
    <Transition name="unfold">
      <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-end justify-end p-4 sm:p-8 pointer-events-none">
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-stone-900/30 backdrop-blur-sm transition-opacity pointer-events-auto"
          @click="close"
        ></div>

        <!-- The Cheat Sheet: Folded Paper Style -->
        <div
          class="relative w-full md:w-[450px] max-h-[85vh] bg-[#fdfbf7] rounded-sm shadow-2xl overflow-hidden pointer-events-auto flex flex-col origin-bottom-right rotate-1"
        >
          <!-- Paper Texture -->
          <div class="absolute inset-0 bg-paper-texture opacity-50 pointer-events-none"></div>

          <!-- Fold Effect (Top Right Corner) -->
          <div
            class="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-stone-200 to-white shadow-md z-20"
            style="clip-path: polygon(0 0, 100% 100%, 0 100%)"
          ></div>

          <!-- Top Tape -->
          <div
            class="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/80 border border-yellow-200 rotate-1 shadow-sm z-20"
          ></div>

          <!-- Header Area -->
          <div class="p-8 pb-4 border-b border-dashed border-stone-200 relative">
            <button @click="close" class="absolute top-4 right-4 text-stone-400 hover:text-stone-600 z-30">×</button>
            <h2 class="text-2xl font-bold text-stone-800 font-serif tracking-tight flex items-center gap-2">
              <span>🚑</span> 面试急救包
            </h2>
            <p class="text-xs text-stone-500 mt-2 font-serif italic">"Deep breath. 重点都帮你列好了。"</p>
          </div>

          <!-- Scrollable Content -->
          <div class="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            <!-- 1. WHO: Sticky Note -->
            <div class="relative group transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div class="bg-yellow-50 border border-yellow-100 p-5 shadow-sm relative">
                <!-- Pin -->
                <div
                  class="absolute -top-3 left-1/2 w-3 h-3 rounded-full bg-red-400 shadow-sm z-10 border border-red-500"
                ></div>

                <h3 class="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">WHO: 你的面试官</h3>
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 bg-white rounded-full border-2 border-stone-100 flex items-center justify-center text-2xl"
                  >
                    👤
                  </div>
                  <div>
                    <div class="text-xl font-bold text-stone-800">{{ data?.interviewer?.name || '待确认' }}</div>
                    <div
                      class="text-xs bg-white px-2 py-1 rounded border border-stone-100 inline-block mt-1 text-stone-500"
                    >
                      {{ data?.interviewer?.role || 'Hiring Manager' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. WHAT: Job Keywords (Highlighter style) -->
            <div>
              <h3 class="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">WHAT: 岗位关键词</h3>
              <div class="flex flex-wrap gap-2">
                <span class="bg-yellow-200/70 px-2 py-1 rounded-sm text-sm font-bold text-stone-800 transform -rotate-1"
                  >User Experience</span
                >
                <span class="bg-green-200/70 px-2 py-1 rounded-sm text-sm font-bold text-stone-800 transform rotate-2"
                  >Vue.js</span
                >
                <span class="bg-blue-200/70 px-2 py-1 rounded-sm text-sm font-bold text-stone-800 transform -rotate-1"
                  >System Design</span
                >
              </div>
            </div>

            <!-- 3. SAY: Highlights -->
            <div class="space-y-4">
              <h3 class="text-[10px] font-bold text-stone-400 uppercase tracking-widest">SAY: 你的高光时刻</h3>
              <ul class="space-y-3">
                <li
                  v-for="(story, idx) in data?.stories || defaultStories"
                  :key="idx"
                  class="flex gap-3 text-sm text-stone-700 group"
                >
                  <span class="font-bold text-stone-300 font-mono">{{ idx + 1 }}.</span>
                  <span class="relative leading-relaxed">
                    {{ story }}
                    <span
                      class="absolute bottom-0 left-0 w-full h-2 bg-yellow-100/50 -z-10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"
                    ></span>
                  </span>
                </li>
              </ul>
            </div>

            <!-- 4. ASK: The Question -->
            <div
              class="bg-stone-800 p-5 rounded-sm shadow-lg transform -rotate-1 text-[#f7f5f2] relative overflow-hidden"
            >
              <div class="absolute -right-4 -bottom-4 text-6xl text-stone-700 font-serif opacity-50">?</div>
              <h3 class="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">ASK: 必杀问题</h3>
              <p class="text-sm font-medium font-serif italic leading-relaxed">
                "{{ (data?.questions && data.questions[0]) || defaultQuestions[0] }}"
              </p>
            </div>
          </div>

          <!-- Footer Action -->
          <div class="p-4 bg-stone-50 border-t border-stone-200 text-center">
            <button
              @click="close"
              class="text-xs font-bold text-stone-400 hover:text-stone-600 uppercase tracking-widest"
            >
              收起并开始面试
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { CheatSheetData } from '../types'

const props = defineProps<{
  modelValue: boolean
  data?: CheatSheetData
}>()

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}

const defaultStories = ['在上一份工作中，通过优化流程提升了 20% 的效率', '主导了核心模块的重构，减少了 30% 的技术债']
const defaultQuestions = ['目前的团队结构和协作模式是怎样的？']
</script>

<style scoped>
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z' /%3E%3C/g%3E%3C/svg%3E");
}

.unfold-enter-active,
.unfold-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.unfold-enter-from,
.unfold-leave-to {
  opacity: 0;
  transform: translateY(100px) scale(0.5) rotate(10deg);
}
</style>
