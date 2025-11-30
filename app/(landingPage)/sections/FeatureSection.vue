<template>
  <section class="py-24 px-4 md:px-12 bg-[#fafaf9] relative overflow-hidden">
    <!-- 背景装饰：网格底板 -->
    <div class="absolute inset-0 bg-grid-paper opacity-40 pointer-events-none"></div>
    <div class="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-4">
        <div>
          <span class="font-serif text-stone-500 italic text-lg block mb-2">Core Features</span>
          <h2 class="font-serif-display font-medium text-4xl md:text-5xl text-stone-800 tracking-tight">
            打造求职核心竞争力
          </h2>
        </div>
        <span
          class="font-sans text-[10px] md:text-xs uppercase tracking-widest text-stone-400 border border-stone-200 px-3 py-1 rounded-full bg-white/50"
        >
          Toolkit Vol. 01
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <div v-for="(tool, index) in DEFAULT_CONTENT.tools" :key="tool.title" class="relative group">
          <!-- 卡片本体 -->
          <div
            class="bg-white p-8 border border-stone-100 shadow-paper hover:shadow-paper-hover transition-all duration-500 ease-out hover:-translate-y-2 relative overflow-hidden h-full flex flex-col rounded-sm group-hover:border-stone-200"
          >
            <!-- 顶部胶带装饰 (仅偶数项显示，增加随机感) -->
            <div
              v-if="index % 2 !== 0"
              class="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-stone-100/80 rotate-[-2deg] shadow-sm backdrop-blur-sm z-20"
            ></div>

            <!-- 图标 -->
            <div
              class="text-3xl mb-6 transform transition-transform duration-500 group-hover:scale-110 origin-left"
            >
              {{ tool.icon }}
            </div>

            <h3 class="font-serif text-xl font-semibold mb-3 text-stone-800 group-hover:text-stone-600 transition-colors">
              {{ tool.title }}
            </h3>

            <p class="text-stone-500 font-sans text-sm leading-relaxed font-light relative z-10">
              {{ tool.desc }}
            </p>

            <!-- 底部装饰线 -->
            <div class="mt-auto pt-6">
              <div class="w-8 h-0.5 bg-stone-100 group-hover:w-full group-hover:bg-stone-200 transition-all duration-700 ease-out"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DEFAULT_CONTENT } from '../default'
</script>

<style scoped>
/* 增强纸质质感 */
.shadow-paper {
  box-shadow: 
    0 1px 1px rgba(0,0,0,0.02), 
    0 2px 2px rgba(0,0,0,0.02),
    0 4px 4px rgba(0,0,0,0.02), 
    0 8px 8px rgba(0,0,0,0.02);
}
.shadow-paper-hover {
  box-shadow: 
    0 2px 2px rgba(0,0,0,0.03), 
    0 4px 4px rgba(0,0,0,0.03),
    0 8px 8px rgba(0,0,0,0.03), 
    0 16px 16px rgba(0,0,0,0.03),
    0 32px 32px rgba(0,0,0,0.03);
}
</style>
