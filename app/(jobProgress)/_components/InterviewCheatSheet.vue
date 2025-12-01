<template>
  <Teleport to="body">
    <Transition name="paper-slide">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:justify-end md:pr-10 pb-0 md:pb-0 pointer-events-none"
      >
        <!-- Backdrop (Invisible but clickable to close) -->
        <div
          class="absolute inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity pointer-events-auto"
          @click="close"
        ></div>

        <!-- The Paper Card -->
        <div
          class="relative w-full md:w-[380px] h-[85vh] md:h-[600px] bg-[#fdfbf7] rounded-t-2xl md:rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-out pointer-events-auto flex flex-col"
          :class="{ 'translate-y-full md:translate-x-full': !modelValue }"
        >
          <!-- Paper Texture -->
          <div class="absolute inset-0 bg-paper-texture opacity-50 pointer-events-none"></div>

          <!-- Top Fold/Binding Visual -->
          <div class="h-8 bg-stone-100 border-b border-stone-200 flex items-center justify-center relative shrink-0">
            <div class="w-12 h-1 bg-stone-300 rounded-full"></div>
            <!-- Close Button for Desktop -->
            <button
              @click="close"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors md:block hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Content Scroll Area -->
          <div class="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 relative no-scrollbar">
            <!-- Header -->
            <div class="text-center space-y-1">
              <div
                class="inline-block px-3 py-1 bg-stone-800 text-white text-[10px] font-bold tracking-widest uppercase rounded-full mb-2"
              >
                Interview Cheat Sheet
              </div>
              <h2 class="text-xl font-serif font-bold text-stone-800">面试急救包</h2>
              <p class="text-xs text-stone-500 font-serif italic">深呼吸，你已经准备好了</p>
            </div>

            <!-- 1. WHO -->
            <section class="relative group">
              <div
                class="absolute -left-3 top-0 text-[10px] font-bold text-stone-300 -rotate-90 origin-bottom-right translate-y-4 uppercase tracking-widest"
              >
                Who
              </div>
              <div
                class="bg-white border border-stone-200 p-4 rounded-lg shadow-sm rotate-1 transition-transform group-hover:rotate-0"
              >
                <div class="text-xs text-stone-400 mb-1 uppercase font-bold tracking-wider">你要面对的是</div>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-xl">👤</div>
                  <div>
                    <div class="text-2xl font-handwriting text-stone-800 leading-none mb-1">
                      {{ data?.interviewer?.name || '未知面试官' }}
                    </div>
                    <div class="text-xs font-bold text-stone-500 bg-stone-100 inline-block px-1.5 py-0.5 rounded">
                      {{ data?.interviewer?.role || 'HR / Hiring Manager' }}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- 2. WHAT -->
            <section class="relative group">
              <div
                class="absolute -left-3 top-0 text-[10px] font-bold text-stone-300 -rotate-90 origin-bottom-right translate-y-4 uppercase tracking-widest"
              >
                What
              </div>
              <div class="space-y-3">
                <div class="text-xs text-stone-400 uppercase font-bold tracking-wider pl-1">核心关键词 (JD提取)</div>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="(kw, idx) in data?.keywords || defaultKeywords"
                    :key="idx"
                    class="px-3 py-2 bg-yellow-100/80 border border-yellow-200/50 text-stone-800 font-serif font-bold text-lg rounded-md shadow-sm transform transition-transform hover:scale-105 cursor-default marker-highlight"
                    :style="{ transform: `rotate(${Math.random() * 4 - 2}deg)` }"
                  >
                    {{ kw }}
                  </div>
                </div>
              </div>
            </section>

            <!-- 3. SAY -->
            <section class="relative">
              <div
                class="absolute -left-3 top-0 text-[10px] font-bold text-stone-300 -rotate-90 origin-bottom-right translate-y-4 uppercase tracking-widest"
              >
                Say
              </div>
              <div class="bg-stone-50 border-l-4 border-stone-300 p-4 rounded-r-lg space-y-3">
                <div class="text-xs text-stone-400 uppercase font-bold tracking-wider">你的高光时刻 (一句话备忘)</div>
                <ul class="space-y-3">
                  <li
                    v-for="(story, idx) in data?.stories || defaultStories"
                    :key="idx"
                    class="flex gap-3 text-sm font-serif text-stone-700 leading-relaxed"
                  >
                    <span class="font-bold text-stone-400">{{ idx + 1 }}.</span>
                    <span>{{ story }}</span>
                  </li>
                </ul>
              </div>
            </section>

            <!-- 4. ASK -->
            <section class="relative pb-4">
              <div
                class="absolute -left-3 top-0 text-[10px] font-bold text-stone-300 -rotate-90 origin-bottom-right translate-y-4 uppercase tracking-widest"
              >
                Ask
              </div>
              <div class="border-t border-dashed border-stone-300 pt-4">
                <div class="text-xs text-stone-400 uppercase font-bold tracking-wider mb-3">如果不记得问什么...</div>
                <div class="grid gap-3">
                  <div
                    v-for="(q, idx) in data?.questions || defaultQuestions"
                    :key="idx"
                    class="text-xs text-stone-500 bg-white border border-stone-100 p-3 rounded shadow-sm font-serif italic hover:text-stone-800 hover:border-stone-300 transition-colors cursor-default"
                  >
                    "{{ q }}"
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Footer / Fold Hint -->
          <div
            class="p-4 border-t border-stone-100 text-center text-stone-400 text-[10px] uppercase tracking-widest cursor-pointer hover:bg-stone-50 transition-colors"
            @click="close"
          >
            点击空白处收起
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CheatSheetData } from '../types'

const props = defineProps<{
  modelValue: boolean
  data?: CheatSheetData
}>()

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}

const defaultKeywords = ['用户增长', '数据驱动', '跨部门协作']
const defaultStories = [
  '提及在Q3项目中通过A/B测试提升转化率15%的经历',
  '重点讲作为Owner协调设计与研发资源的例子',
  '如果是压力面，用去年的“双十一”突发故障处理来展示抗压能力'
]
const defaultQuestions = ['您对这个岗位未来半年的核心期待是什么？', '目前的团队结构和协作模式是怎样的？']
</script>

<style scoped>
.bg-paper-texture {
  background-color: #fdfbf7;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
  background-repeat: repeat;
}

.font-handwriting {
  font-family: 'Caveat', 'Comic Sans MS', 'Marker Felt', cursive;
}

.marker-highlight {
  background-image: linear-gradient(120deg, rgba(250, 204, 21, 0.4) 0%, rgba(250, 204, 21, 0) 100%);
  background-repeat: no-repeat;
  background-size: 100% 40%;
  background-position: 0 80%;
}

/* Animations */
.paper-slide-enter-active,
.paper-slide-leave-active {
  transition: opacity 0.3s ease;
}

.paper-slide-enter-from,
.paper-slide-leave-to {
  opacity: 0;
}

/* Inner content slide */
.paper-slide-enter-active .relative,
.paper-slide-leave-active .relative {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.paper-slide-enter-from .relative,
.paper-slide-leave-to .relative {
  transform: translateY(100%);
}

@media (min-width: 768px) {
  .paper-slide-enter-from .relative,
  .paper-slide-leave-to .relative {
    transform: translateX(100%);
  }
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
