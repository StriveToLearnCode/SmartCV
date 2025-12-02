<template>
  <div class="space-y-6">
    <!-- AI Suggestions Box -->
    <div
      class="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-100 rounded-xl p-5 relative overflow-hidden group"
    >
      <!-- Decorative Icon -->
      <div
        class="absolute -right-4 -top-4 text-indigo-100/50 rotate-12 group-hover:rotate-0 transition-transform duration-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div class="relative z-10">
        <div class="flex items-center gap-2 mb-3">
          <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
          <h4 class="text-sm font-bold text-indigo-900">AI 智能复盘助手</h4>
        </div>

        <div v-if="!node.questions || node.questions.length < 10" class="text-xs text-stone-500 py-4">
          请先填写左侧的“面试问题记录”，AI 将为您自动生成分析建议。
        </div>

        <div v-else-if="!node.aiSummary" class="py-2">
          <button
            @click="generateAnalysis"
            class="px-4 py-2 bg-white text-indigo-600 text-xs font-bold rounded-lg shadow-sm border border-indigo-100 hover:bg-indigo-50 transition-all flex items-center gap-2"
          >
            <span v-if="isGenerating">Thinking...</span>
            <span v-else>✨ 生成分析建议</span>
          </button>
        </div>

        <div v-else class="space-y-3 animate-fade-in">
          <!-- Growth Report Sticker (Visualized Growth) -->
          <div
            v-if="node.growthStats"
            class="bg-[#fffdf5] p-3 rounded-lg shadow-sm border border-yellow-100/50 rotate-[-1deg] mb-4 relative overflow-hidden"
          >
            <div class="absolute top-0 left-0 w-full h-1 bg-yellow-200/30"></div>
            <div class="flex items-center justify-between mb-2">
              <h5 class="text-xs font-bold text-stone-700 font-serif">成长报表</h5>
              <span class="text-[10px] text-stone-400">{{ new Date().toLocaleDateString() }}</span>
            </div>
            <div class="space-y-2">
              <div
                v-for="stat in node.growthStats"
                :key="stat.category"
                class="flex items-center justify-between text-xs"
              >
                <span class="text-stone-600">{{ stat.category }}</span>
                <div class="flex items-center gap-2">
                  <div class="w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-emerald-400 rounded-full"
                      :style="{ width: stat.score + '%' }"
                    ></div>
                  </div>
                  <span class="font-bold text-emerald-600 text-[10px]">+{{ stat.delta }}%</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="text-[10px] font-bold text-indigo-400 uppercase mb-1">缺失技能 / 薄弱点</div>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="point in node.aiSummary.weakPoints"
                :key="point"
                class="text-[10px] px-2 py-1 bg-white/60 border border-indigo-100 rounded text-stone-600"
              >
                {{ point }}
              </span>
            </div>
          </div>
          <div>
            <div class="text-[10px] font-bold text-indigo-400 uppercase mb-1">改进建议</div>
            <p class="text-xs text-stone-600 leading-relaxed">
              {{ node.aiSummary.suggestions }}
            </p>
          </div>

          <!-- Feedback Loop Action -->
          <button
            class="w-full mt-2 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clip-rule="evenodd"
              />
            </svg>
            反哺优化简历
          </button>
        </div>
      </div>
    </div>

    <!-- Improvement Plan -->
    <div>
      <label class="block text-xs font-bold text-stone-500 uppercase mb-2">行动计划 / 改进方案</label>
      <div class="relative">
        <textarea
          v-model="node.improvement"
          @input="$emit('auto-save')"
          placeholder="针对本次面试的不足，接下来准备如何改进？"
          class="w-full h-24 p-3 text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-stone-400 outline-none transition-colors resize-none"
        ></textarea>
        <!-- Sync to Resume Checkbox -->
        <div class="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            :id="'sync-' + node.id"
            checked
            class="rounded text-stone-800 focus:ring-stone-800 border-stone-300"
          />
          <label
            :for="'sync-' + node.id"
            class="text-[10px] font-medium text-stone-500 cursor-pointer select-none"
          >
            同步至简历优化模块
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TimelineNode } from '../../types'

const props = defineProps<{
  node: TimelineNode
}>()

const emit = defineEmits(['auto-save'])

const isGenerating = ref(false)

const generateAnalysis = () => {
  if (!props.node.id) return
  isGenerating.value = true

  // Mock AI Latency
  setTimeout(() => {
    props.node.aiSummary = {
      feedback: '整体表现良好，但在深挖底层原理时显得略有犹豫。',
      weakPoints: ['Vue3 响应式源码细节', '浏览器渲染机制', 'TypeScript 高级类型'],
      suggestions:
        '建议重新阅读 Vue3 源码中关于 Proxy 和 Reflect 的部分；加强对浏览器 Event Loop 的理解。项目描述中可以使用 STAR 法则更清晰地表述。'
    }

    // Generate Growth Stats
    props.node.growthStats = [
      { category: '算法表现', score: 85, delta: 10 },
      { category: '沟通表达', score: 92, delta: 6 },
      { category: '项目深度', score: 78, delta: 15 }
    ]

    isGenerating.value = false
    emit('auto-save')
  }, 2000)
}
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.animate-fade-in {
  animation: fade-in 0.4s ease-out forwards;
}
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

