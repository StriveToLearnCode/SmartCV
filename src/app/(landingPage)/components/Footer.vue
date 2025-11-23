<template>
  <section class="py-16 px-4 md:py-32 md:px-12 border-b border-stone-200 bg-[#e7e5e4] relative overflow-hidden">
    <!-- 背景装饰：网格底板 -->
    <div class="absolute inset-0 bg-grid-paper opacity-40 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="flex justify-between items-end mb-16 md:mb-24">
        <h2 class="font-serif-display text-4xl md:text-6xl font-bold text-imprint">The Toolset.</h2>
        <span
          class="font-mono text-[10px] md:text-xs uppercase tracking-widest text-stone-500 bg-white px-2 py-1 border border-stone-200 shadow-sm rotate-2"
          >Vol. 01 — 2024</span
        >
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div v-for="(tool, index) in DEFAULT_CONTENT.tools" :key="tool.title" class="relative group perspective-1000">
          <!-- 卡片本体 -->
          <div
            class="bg-[#fafaf9] p-8 md:p-10 border border-stone-200 shadow-paper transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-paper-hover relative overflow-hidden min-h-[320px] flex flex-col"
            :class="index % 2 === 0 ? 'rotate-1' : '-rotate-1'"
          >
            <!-- 顶部胶带 -->
            <div
              class="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/50 border-l border-r border-white/80 -translate-y-4 group-hover:-translate-y-3 transition-transform duration-300"
            ></div>

            <!-- 图标 (印章风格) -->
            <div
              class="font-mono text-xl font-bold mb-8 text-stone-300 group-hover:text-stone-900 transition-colors border-2 border-current w-12 h-12 flex items-center justify-center rounded-full transform group-hover:rotate-12 duration-500"
            >
              {{ tool.icon }}
            </div>

            <h3 class="font-serif-display text-2xl md:text-3xl font-bold mb-4 relative inline-block">
              {{ tool.title }}
              <span
                class="absolute bottom-1 left-0 w-full h-[0.3em] bg-yellow-200/50 -z-10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
              ></span>
            </h3>

            <p class="text-stone-600 font-serif text-sm md:text-base leading-relaxed italic flex-1 relative z-10">
              {{ tool.desc }}
            </p>

            <!-- 底部裁切线 -->
            <div class="absolute bottom-4 left-4 right-4 h-px border-b border-dashed border-stone-300"></div>

            <!-- 装饰箭头 -->
            <div class="absolute bottom-4 right-4 text-stone-400 group-hover:text-stone-900 transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="transform group-hover:translate-x-1 transition-transform"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            <!-- 纸张纹理 -->
            <div class="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DEFAULT_CONTENT } from '../default'
</script>

<style></style>
