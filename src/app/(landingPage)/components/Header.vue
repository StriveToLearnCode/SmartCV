<template>
  <nav class="fixed top-0 w-full border-b border-stone-200 bg-[#FAFAF9]/90 backdrop-blur-md z-50">
    <div class="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 md:px-12 py-3 md:py-4 flex justify-between items-center w-full relative z-10">
      <!-- Logo: 档案标签风格 -->
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-stone-900 flex items-center justify-center shadow-sm rotate-3">
          <span class="text-white font-serif italic font-bold text-lg">S</span>
        </div>
        <div class="font-serif-display font-bold text-2xl tracking-tight italic text-stone-900">SmartCV.</div>
        <span
          class="text-[10px] font-mono uppercase border border-stone-300 px-1.5 py-0.5 bg-white text-stone-500 ml-1 hidden sm:inline-block shadow-sm -rotate-2"
          >Beta</span
        >
      </div>

      <button
        class="px-6 py-2 bg-[#1C1917] text-white font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition-all shadow-paper hover:shadow-paper-hover hover:-translate-y-0.5"
      >
        开始制作
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped></style>
