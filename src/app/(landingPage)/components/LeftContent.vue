<template>
  <div class="relative z-10">
    <!-- 装饰：左上角胶带 -->
    <div
      class="absolute -top-12 -left-12 w-40 h-12 bg-[#f5f5f4]/80 -rotate-45 backdrop-blur-sm border-y border-white/50 shadow-sm z-0 hidden md:block"
    ></div>

    <!-- 版本号 (贴纸风格) -->
    <div
      class="inline-flex items-center px-3 py-1.5 bg-white border border-stone-200 text-[10px] font-bold uppercase tracking-widest mb-8 shadow-paper-sm -rotate-2 relative z-10"
    >
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-2 animate-pulse"></span>
      {{ DEFAULT_CONTENT.version }}
    </div>

    <!-- 标题 (压印风格 + 荧光笔) -->
    <h1
      class="font-serif-display leading-[0.9] font-medium tracking-tight mb-10 text-stone-900 text-5xl md:text-7xl lg:text-[5rem] text-imprint relative z-10"
    >
      {{ DEFAULT_CONTENT.hero.title }} <br />
      <span class="italic relative inline-block mt-2">
        <span class="relative z-10 mix-blend-hard-light">{{ DEFAULT_CONTENT.hero.highlight }}</span>
        <!-- 荧光笔效果 -->
        <span
          class="absolute bottom-3 left-0 w-full h-[0.4em] bg-[#fef08a] z-0 -rotate-1 rounded-sm mix-blend-multiply"
        ></span>
      </span>
    </h1>

    <!-- 描述 (侧边批注风格) -->
    <div class="relative mb-12 max-w-lg pl-2 md:pl-0">
      <!-- 左侧装饰线 -->
      <div class="absolute left-0 top-2 bottom-2 w-0.5 bg-stone-200 rounded-full hidden md:block"></div>

      <p class="text-lg md:text-xl text-stone-600 font-serif leading-relaxed md:pl-8 italic relative">
        {{ DEFAULT_CONTENT.hero.description }}
        <!-- 手写圈注装饰 -->
        <svg
          class="absolute -right-12 -top-8 w-24 h-24 text-stone-300 rotate-6 pointer-events-none hidden lg:block"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M10,50 C20,10 80,20 90,50 C100,90 40,100 20,80"
            stroke-width="1"
            stroke-dasharray="4,4"
            opacity="0.6"
          />
        </svg>
      </p>
    </div>

    <!-- 按钮组 (便签/卡片风格) -->
    <div class="flex flex-col sm:flex-row gap-6 items-start relative z-10">
      <button
        class="group relative px-8 py-4 bg-[#1C1917] text-[#FAFAF9] text-sm font-bold uppercase tracking-widest hover:-translate-y-1 transition-all shadow-paper hover:shadow-paper-hover overflow-hidden"
      >
        <span class="relative z-10">Start Building</span>
        <!-- 纹理叠加 -->
        <div class="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
      </button>

      <button
        class="group px-8 py-4 bg-white border border-stone-200 text-stone-900 text-sm font-bold uppercase tracking-widest hover:-translate-y-1 transition-all shadow-paper hover:shadow-paper-hover flex items-center gap-2"
      >
        <span>View Examples</span>
        <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-4 group-hover:ml-0">→</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_CONTENT } from '../default'
</script>

<style></style>
