<template>
  <div class="relative z-10">
    <!-- 顶部手写标签 -->
    <div
      class="inline-flex items-center px-3 py-1 bg-[#fffbeb] border border-stone-200/60 text-stone-600 text-sm font-handwriting transform -rotate-2 mb-8 shadow-sm rounded-sm"
    >
      <span class="w-2 h-2 rounded-full bg-yellow-400 inline-block mr-2 animate-pulse"></span>
      {{ DEFAULT_CONTENT.version }}
    </div>

    <!-- 标题 -->
    <h1
      class="font-serif-display leading-[1.15] font-medium tracking-tight mb-8 text-stone-800 text-5xl md:text-6xl lg:text-7xl relative z-10 whitespace-pre-line"
    >
      {{ DEFAULT_CONTENT.hero.title }}
      <br />
      <span class="relative inline-block mt-2">
        <span class="highlight-marker z-10 relative">{{ DEFAULT_CONTENT.hero.highlight }}</span>
      </span>
    </h1>

    <!-- 描述 -->
    <div class="relative mb-12 max-w-lg">
      <p class="text-lg md:text-xl text-stone-600 font-sans font-light leading-relaxed">
        {{ DEFAULT_CONTENT.hero.description }}
      </p>
      <!-- 装饰：左侧手绘竖线 -->
      <svg class="absolute -left-6 top-2 bottom-2 w-2 h-full text-stone-300" viewBox="0 0 5 100" preserveAspectRatio="none">
         <path d="M2 0 Q 4 50 1 100" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
      </svg>
    </div>

    <!-- 按钮组 -->
    <div class="flex flex-col sm:flex-row gap-5 items-start relative z-10">
      <button
        class="group relative px-8 py-4 bg-stone-800 text-[#fefce8] text-base font-bold tracking-wide hover:bg-stone-700 transition-all rounded-sm shadow-[3px_3px_0px_0px_rgba(28,25,23,0.2)] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,0.2)] active:translate-y-[3px] active:shadow-none border-2 border-stone-800 transform -rotate-1 hover:rotate-0"
      >
        <span class="relative z-10 flex items-center gap-2 font-serif">
          {{ DEFAULT_CONTENT.hero.primaryCta }}
          <!-- 手绘箭头 -->
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
        </span>
      </button>

      <button
        class="group px-8 py-4 bg-[#fff] border-2 border-stone-200 text-stone-600 text-base font-bold tracking-wide hover:border-stone-400 hover:text-stone-800 transition-all rounded-sm flex items-center gap-2 shadow-sm hover:-translate-y-0.5 font-serif"
      >
        <span>{{ DEFAULT_CONTENT.hero.secondaryCta }}</span>
      </button>
    </div>
    
    <!-- Social Proof: 更加温暖的社区感 -->
    <div class="mt-16 pt-8 border-t border-dashed border-stone-300 flex flex-col sm:flex-row items-start sm:items-center gap-6 text-stone-500">
      <div class="flex -space-x-2">
         <div class="w-8 h-8 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[10px]">👩🏻‍💻</div>
         <div class="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px]">👨🏼‍🎨</div>
         <div class="w-8 h-8 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-[10px]">🧑🏽‍💼</div>
      </div>
      <p class="text-sm font-handwriting text-stone-500 transform -rotate-1">
        已有 <span class="font-bold text-stone-800">1,203</span> 位求职者在这里找到了安心感
      </p>
    </div>

    <!-- 装饰箭头 (手绘风) -->
    <div class="absolute top-1/2 -right-20 hidden lg:block z-0 opacity-40 rotate-[-15deg]">
      <svg width="120" height="60" viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-width="1.5" class="text-stone-400">
        <path d="M10 40 Q 60 10 110 30" stroke-dasharray="5,5" />
        <path d="M105 25 L 110 30 L 103 35" />
        <text x="60" y="55" class="font-handwriting text-sm fill-current border-none">Try it!</text>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_CONTENT } from '../default'
</script>

<style scoped>
h1 {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
