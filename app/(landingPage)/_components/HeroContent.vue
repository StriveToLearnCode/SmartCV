<template>
  <div class="relative z-10">
    <!-- 版本号 / 标签 -->
    <div
      class="inline-flex items-center px-3 py-1 bg-white/80 border border-stone-200 text-[10px] font-bold uppercase tracking-widest mb-8 rounded-sm text-stone-500 shadow-sm backdrop-blur-md"
    >
      <span class="w-1.5 h-1.5 rounded-full bg-green-500 inline-block mr-2 animate-pulse"></span>
      {{ DEFAULT_CONTENT.version }}
    </div>

    <!-- 标题 -->
    <h1
      class="font-serif-display leading-[1.15] font-medium tracking-tight mb-8 text-stone-900 text-5xl md:text-6xl lg:text-7xl relative z-10 whitespace-pre-line"
    >
      {{ DEFAULT_CONTENT.hero.title }}
      <br />
      <span class="relative inline-block mt-2 text-stone-500 font-light italic">
        {{ DEFAULT_CONTENT.hero.highlight }}
        <!-- 手写风格下划线 -->
        <svg class="absolute w-[110%] h-4 -bottom-2 -left-2 text-stone-300 -z-10 opacity-80" viewBox="0 0 150 15" preserveAspectRatio="none">
           <path d="M5 10 Q 75 15 145 5" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" />
        </svg>
      </span>
    </h1>

    <!-- 描述 -->
    <div class="relative mb-12 max-w-lg">
      <p class="text-lg md:text-xl text-stone-600 font-sans font-light leading-relaxed">
        {{ DEFAULT_CONTENT.hero.description }}
      </p>
      <!-- 装饰：左侧竖线 -->
      <div class="absolute -left-6 top-2 bottom-2 w-0.5 bg-stone-200"></div>
    </div>

    <!-- 按钮组 -->
    <div class="flex flex-col sm:flex-row gap-5 items-start relative z-10">
      <button
        class="group relative px-8 py-4 bg-stone-900 text-stone-50 text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-all rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-[4px] active:shadow-none border border-stone-900"
      >
        <span class="relative z-10 flex items-center gap-2">
          {{ DEFAULT_CONTENT.hero.primaryCta }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </span>
      </button>

      <button
        class="group px-8 py-4 bg-white border-2 border-stone-200 text-stone-600 text-sm font-bold uppercase tracking-widest hover:border-stone-400 hover:text-stone-900 transition-all rounded-sm flex items-center gap-2 shadow-sm hover:-translate-y-0.5"
      >
        <span>{{ DEFAULT_CONTENT.hero.secondaryCta }}</span>
      </button>
    </div>
    
    <!-- Social Proof / Trust Indicators -->
    <div class="mt-16 pt-8 border-t border-stone-200/60 flex flex-col sm:flex-row items-start sm:items-center gap-6 text-stone-400">
      <span class="text-[10px] font-bold uppercase tracking-widest opacity-60">Trusted by professionals at</span>
      <div class="flex gap-6 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
         <!-- 简单的文字Logo代替图片，保持风格统一 -->
         <span class="font-serif font-bold text-stone-600">Google</span>
         <span class="font-serif font-bold text-stone-600">Airbnb</span>
         <span class="font-serif font-bold text-stone-600">Spotify</span>
      </div>
    </div>

    <!-- 装饰箭头指向右侧 (在大屏幕显示) -->
    <div class="absolute top-1/2 -right-12 hidden lg:block z-0 opacity-20 rotate-[-10deg]">
      <svg width="100" height="40" viewBox="0 0 100 40" fill="none" stroke="currentColor" stroke-width="2" class="text-stone-800">
        <path d="M0 20 Q 50 0 90 20 L 85 15 M 90 20 L 85 25" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_CONTENT } from '../default'
</script>

<style scoped>
/* 优化字体渲染 */
h1 {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
