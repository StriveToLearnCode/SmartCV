<template>
  <section class="py-20 px-4 md:py-32 md:px-12 bg-[#fafaf9] relative overflow-hidden">
    <!-- 背景装饰：网格底板 -->
    <div class="absolute inset-0 bg-grid-paper opacity-30 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="flex justify-between items-end mb-16 md:mb-24">
        <h2 class="font-sans font-medium text-4xl md:text-5xl text-stone-800 tracking-tight">The Toolset.</h2>
        <span
          class="font-sans text-[10px] md:text-xs uppercase tracking-widest text-stone-400 bg-transparent px-2 py-1"
          >Vol. 01 — 2024</span
        >
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div v-for="(tool, index) in DEFAULT_CONTENT.tools" :key="tool.title" class="relative group">
          <!-- 卡片本体 -->
          <div
            class="bg-white p-8 md:p-10 border border-stone-100 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-md relative overflow-hidden min-h-[320px] flex flex-col rounded-sm"
          >
            <!-- 图标 -->
            <div
              class="font-sans text-xl font-medium mb-8 text-stone-400 group-hover:text-stone-800 transition-colors w-12 h-12 flex items-center justify-start"
            >
              {{ tool.icon }}
            </div>

            <h3 class="font-sans text-xl md:text-2xl font-medium mb-4 text-stone-800">
              {{ tool.title }}
            </h3>

            <p class="text-stone-500 font-sans text-sm md:text-base leading-relaxed font-light flex-1 relative z-10">
              {{ tool.desc }}
            </p>

            <!-- 装饰箭头 -->
            <div class="absolute bottom-8 right-8 text-stone-300 group-hover:text-stone-800 transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="transform group-hover:translate-x-1 transition-transform"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
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

<style></style>
