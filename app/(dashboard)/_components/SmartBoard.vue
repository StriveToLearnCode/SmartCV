<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1400px] mx-auto px-4 pb-12 transition-all duration-500"
  >
    <!-- 1. 简历卡片区: Paper Drop Motion -->
    <Motion
      :initial="{ y: -50, rotate: -2, opacity: 0 }"
      :animate="{ y: 0, rotate: 0, opacity: 1 }"
      :transition="{ type: 'spring', stiffness: 120, damping: 14, delay: 0.1 }"
      class="flex flex-col gap-4"
    >
      <h3 class="text-stone-500 text-sm font-medium uppercase tracking-wider pl-1 font-serif">简历草稿</h3>
      <Motion
        :hover="{ rotate: 1, scale: 1.01, y: -2 }"
        class="bg-[#fdfbf7] bg-paper-texture p-5 rounded shadow-sm border border-stone-200 min-h-[200px] cursor-pointer relative group origin-top"
      >
        <!-- 贴纸效果 -->
        <div
          class="absolute -top-2 -right-2 bg-red-50 text-red-400 text-[10px] px-2 py-1 rounded-sm shadow-sm transform rotate-12 font-serif border border-red-100"
        >
          NEW
        </div>

        <div class="text-xs text-stone-400 mb-2 font-serif italic">刚刚生成</div>
        <div class="font-serif text-lg text-stone-800 mb-3 border-b border-dashed border-stone-300 pb-2">
          产品经理_V3.pdf
        </div>
        <p class="text-stone-600 text-sm line-clamp-4 leading-relaxed font-serif">
          资深产品经理，拥有5年SaaS平台经验。擅长用户体验设计与数据驱动决策。在上一家公司主导了核心模块重构...
        </p>
      </Motion>
    </Motion>

    <!-- 2. JD 智能解析: Paper Drop Motion -->
    <Motion
      :initial="{ y: -50, rotate: 2, opacity: 0 }"
      :animate="{ y: 0, rotate: 0, opacity: 1 }"
      :transition="{ type: 'spring', stiffness: 120, damping: 14, delay: 0.2 }"
      class="flex flex-col gap-4"
    >
      <h3 class="text-stone-500 text-sm font-medium uppercase tracking-wider pl-1 font-serif">JD 分析笔记</h3>
      <div
        class="bg-[#fffdf5] bg-paper-texture p-5 rounded shadow-sm border border-yellow-100 min-h-[200px] relative overflow-hidden group hover:shadow-md transition-shadow duration-500"
      >
        <div class="flex items-baseline justify-between mb-4 relative z-10">
          <span class="text-stone-600 font-serif font-bold">匹配度</span>
          <div class="relative">
            <span class="text-3xl font-serif text-stone-800 relative z-10">85%</span>
            <!-- 手绘圈圈/强调 -->
            <svg
              class="absolute -bottom-2 -left-2 w-16 h-8 pointer-events-none text-yellow-400 opacity-60"
              viewBox="0 0 100 50"
            >
              <path
                d="M5,25 Q25,45 50,25 T95,25"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                class="hand-drawn-path"
              />
            </svg>
          </div>
        </div>
        <div class="space-y-3 relative z-10">
          <div class="text-xs text-stone-500 uppercase tracking-widest">缺失技能</div>
          <div class="flex flex-wrap gap-2">
            <span
              class="px-2 py-1 bg-white/80 border border-stone-200 rounded-sm text-xs text-stone-600 font-serif transform -rotate-1"
              >SQL</span
            >
            <span
              class="px-2 py-1 bg-white/80 border border-stone-200 rounded-sm text-xs text-stone-600 font-serif transform rotate-2"
              >Figma</span
            >
          </div>
        </div>
        <div class="mt-4 text-sm text-stone-600 leading-relaxed font-serif border-t border-stone-100 pt-3">
          <span class="text-stone-400 mr-1">💡</span> 建议强调你在上一份工作中主导的<span
            class="relative inline-block mx-1"
          >
            数据分析
            <svg
              class="absolute bottom-0 left-0 w-full h-1 text-red-300"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path d="M0,5 Q50,10 100,5" fill="none" stroke="currentColor" stroke-width="2" class="hand-drawn-path" />
            </svg> </span
          >项目。
        </div>
      </div>
    </Motion>

    <!-- 3. 求职看板: Sticky Note Motion -->
    <Motion
      :initial="{ y: -50, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ type: 'spring', stiffness: 120, damping: 14, delay: 0.3 }"
      class="flex flex-col gap-4"
    >
      <h3 class="text-stone-500 text-sm font-medium uppercase tracking-wider pl-1 font-serif">本周任务</h3>
      <div class="bg-[#fdfbf7] bg-paper-texture p-5 rounded shadow-sm border border-stone-200 min-h-[200px]">
        <ul class="space-y-3">
          <Motion
            v-for="(task, i) in tasks"
            :key="i"
            is="li"
            :initial="{ x: -20, opacity: 0, rotate: -2 }"
            :animate="{ x: 0, opacity: 1, rotate: 0 }"
            :hover="{ scale: 1.02, rotate: 1, x: 2 }"
            :tap="{ scale: 0.98 }"
            :transition="{ delay: i * 0.1 + 0.4 }"
            class="flex items-start gap-3 group cursor-pointer p-2 -mx-2 rounded hover:bg-stone-100/50 transition-colors"
          >
            <div
              class="w-4 h-4 rounded-sm border border-stone-400 mt-0.5 group-hover:bg-stone-800 transition-colors duration-300"
            ></div>
            <span
              class="text-sm text-stone-600 font-serif group-hover:text-stone-800 transition-colors"
              :class="{ 'line-through opacity-50': task.done }"
              >{{ task.text }}</span
            >
          </Motion>
        </ul>
        <button
          class="mt-5 w-full py-2 text-xs text-stone-400 border border-dashed border-stone-300 rounded hover:border-stone-500 hover:text-stone-600 transition-colors font-serif sketch-border"
        >
          + 添加任务
        </button>
      </div>
    </Motion>

    <!-- 4. 模板推荐: Book Page Flip Motion -->
    <Motion
      :initial="{ y: -50, rotate: 1, opacity: 0 }"
      :animate="{ y: 0, rotate: 0, opacity: 1 }"
      :transition="{ type: 'spring', stiffness: 120, damping: 14, delay: 0.4 }"
      class="flex flex-col gap-4"
    >
      <div class="flex justify-between items-end">
        <h3 class="text-stone-500 text-sm font-medium uppercase tracking-wider pl-1 font-serif">推荐模板</h3>
        <div class="flex gap-1">
          <button
            @click="prevTemplate"
            class="text-stone-400 hover:text-stone-600 w-6 h-6 flex items-center justify-center hover:bg-stone-100 rounded-full transition-colors"
          >
            &lt;
          </button>
          <button
            @click="nextTemplate"
            class="text-stone-400 hover:text-stone-600 w-6 h-6 flex items-center justify-center hover:bg-stone-100 rounded-full transition-colors"
          >
            &gt;
          </button>
        </div>
      </div>

      <!-- Flip Container -->
      <div class="relative w-full aspect-3/4 perspective-1000 group cursor-pointer">
        <div
          class="w-full h-full relative transition-all duration-700 transform-style-3d ease-in-out-cubic"
          :class="{ 'rotate-y-180': isFlipped }"
        >
          <!-- Current Template (Front) -->
          <div
            class="absolute inset-0 bg-[#f5f5f4] rounded shadow-sm border border-stone-200 p-3 flex flex-col items-center justify-center backface-hidden"
          >
            <div
              class="w-full h-full bg-white shadow-inner flex items-center justify-center border border-stone-100 relative overflow-hidden"
            >
              <!-- 纸张阴影 -->
              <div class="absolute inset-0 bg-linear-to-r from-stone-100/50 to-transparent pointer-events-none"></div>
              <span class="font-serif text-stone-400 tracking-widest z-10">{{ currentTemplate?.name }}</span>
            </div>
            <div class="mt-2 text-xs text-stone-500 font-serif flex items-center gap-1">
              <span>点击翻阅</span>
            </div>
          </div>

          <!-- Next/Detail Template (Back) -->
          <div
            class="absolute inset-0 bg-[#fffdf5] bg-paper-texture rounded shadow-sm border border-stone-200 p-4 flex flex-col items-center justify-center backface-hidden rotate-y-180"
          >
            <div class="text-center space-y-2 relative z-10">
              <h4 class="font-serif text-lg text-stone-800">{{ currentTemplate?.name }}</h4>
              <p class="text-xs text-stone-500 leading-relaxed">{{ currentTemplate?.desc }}</p>
              <button
                class="mt-4 px-4 py-1 bg-stone-800 text-white text-xs rounded-full sketch-border hover:bg-stone-700 transition-colors"
              >
                使用此模板
              </button>
            </div>
          </div>
        </div>

        <!-- Click trigger for flip -->
        <div class="absolute inset-0 z-10" @click="isFlipped = !isFlipped"></div>
      </div>
    </Motion>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Motion } from 'motion-v'

// Removed filtering props as SmartBoard should display all content for 'overview'

const tasks = [
  { text: '更新项目经历', done: true },
  { text: '投递 A 岗位', done: false },
  { text: '补充技能 React', done: false }
]

const templates = [
  { name: '极简主义', desc: '适合技术类岗位，强调专业技能与项目经验的清晰呈现。' },
  { name: '创意手账', desc: '适合设计、运营类岗位，展现你的审美与个性。' },
  { name: '经典商务', desc: '传统行业的最佳选择，稳重而大气。' }
]

const currentIndex = ref(0)
const isFlipped = ref(false)
const currentTemplate = ref(templates[0] || { name: '', desc: '' })

const nextTemplate = () => {
  isFlipped.value = false
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % templates.length
    currentTemplate.value = templates[currentIndex.value]
  }, 200)
}

const prevTemplate = () => {
  isFlipped.value = false
  setTimeout(() => {
    currentIndex.value = (currentIndex.value - 1 + templates.length) % templates.length
    currentTemplate.value = templates[currentIndex.value]
  }, 200)
}
</script>

<style scoped>
/* Custom Utilities for 3D Flip */
.perspective-1000 {
  perspective: 1000px;
}
.transform-style-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
.ease-in-out-cubic {
  transition-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
}
</style>
