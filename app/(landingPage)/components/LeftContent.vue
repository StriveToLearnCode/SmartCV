<template>
  <div class="relative z-10">
    <!-- 版本号 -->
    <div
      class="inline-flex items-center px-3 py-1.5 bg-transparent border border-stone-200 text-[10px] font-medium uppercase tracking-widest mb-8 rounded-full text-stone-500"
    >
      <span class="w-1.5 h-1.5 rounded-full bg-stone-400 inline-block mr-2"></span>
      {{ DEFAULT_CONTENT.version }}
    </div>

    <!-- 标题 -->
    <h1
      class="font-serif-display leading-[1.1] font-medium tracking-tight mb-8 text-stone-800 text-5xl md:text-6xl lg:text-7xl relative z-10"
    >
      {{ DEFAULT_CONTENT.hero.title }} <br />
      <span class="relative inline-block mt-2 text-stone-500 font-light">
        {{ DEFAULT_CONTENT.hero.highlight }}
      </span>
    </h1>

    <!-- 描述 -->
    <div class="relative mb-12 max-w-lg">
      <p class="text-lg text-stone-600 font-sans font-light leading-relaxed">
        {{ DEFAULT_CONTENT.hero.description }}
      </p>
    </div>

    <!-- 按钮组 -->
    <div class="flex flex-col sm:flex-row gap-4 items-start relative z-10">
      <button
        class="group relative px-8 py-3 bg-stone-800 text-stone-50 text-sm font-medium uppercase tracking-widest hover:bg-stone-700 transition-all rounded-sm shadow-sm"
      >
        <span class="relative z-10">Start Building</span>
      </button>

      <button
        class="group px-8 py-3 bg-transparent border border-stone-200 text-stone-600 text-sm font-medium uppercase tracking-widest hover:border-stone-400 transition-all rounded-sm flex items-center gap-2"
      >
        <span>View Examples</span>
        <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-4 group-hover:ml-0 text-stone-400">→</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_CONTENT } from '../default'
</script>

<style></style>
